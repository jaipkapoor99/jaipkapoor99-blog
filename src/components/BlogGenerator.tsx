import React, { useEffect, useMemo, useState } from "react";
import { processMarkdown } from "../utils/markdown";
import BitDevLogo from "../components/BitDevLogo";

interface BlogGeneratorProps {
  slug: string;
}

interface BlogPostData {
  title: string;
  date: string;
  author: string;
  htmlContent: string;
}

// Map markdown and images at build time for reliable prod paths
const markdownFiles = import.meta.glob("../blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Resolve image file URLs; we'll convert to base64 data URIs at runtime
const imageFiles = import.meta.glob("../blog-images/*.{svg,png,jpg,jpeg,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const BlogGenerator: React.FC<BlogGeneratorProps> = ({ slug }) => {
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Resolve assets for the given slug
  const markdown = useMemo(() => {
    const entry = Object.entries(markdownFiles).find(([path]) =>
      path.endsWith(`/${slug}.md`),
    );
    return entry?.[1] ?? null;
  }, [slug]);

  const imageAssetUrl = useMemo(() => {
    const entries = Object.entries(imageFiles);
    // 1) Try exact basename match with any extension
    const exact = entries.find(([path]) => {
      const file = path.split("/").pop() ?? "";
      const name = file.replace(/\.[^.]+$/, "");
      return name === slug;
    });
    if (exact) return exact[1];

    // 2) Try token-based match (supports images like PNPM.svg for MyPnpmWorkspaceJourney)
    const tokens = slug
      .replace(/([a-z])([A-Z])/g, "$1 $2") // split camelCase
      .split(/[^a-zA-Z]+/)
      .map((t) => t.toLowerCase())
      .filter(Boolean);
    const tokenMatch = entries.find(([path]) => {
      const file = path.split("/").pop() ?? "";
      const name = file.replace(/\.[^.]+$/, "").toLowerCase();
      return tokens.includes(name);
    });
    return tokenMatch?.[1] ?? "";
  }, [slug]);

  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const isBitPost = slug === "bit-component-management-analysis";

  useEffect(() => {
    let cancelled = false;
    const toDataUrl = async (url: string) => {
      try {
        if (!url) {
          setImageDataUrl("");
          return;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load image: ${res.status}`);
        const blob = await res.blob();
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (!cancelled) setImageDataUrl(String(reader.result || ""));
            resolve();
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
      } catch {
        if (!cancelled) setImageDataUrl("");
      }
    };
    toDataUrl(imageAssetUrl);
    return () => {
      cancelled = true;
    };
  }, [imageAssetUrl]);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        if (!markdown) {
          throw new Error("Markdown not found for this slug.");
        }
        const processedData = await processMarkdown(markdown);
        setBlogPost(processedData);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [markdown]);

  if (loading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogPost) {
    return <div>No blog post found.</div>;
  }

  return (
    <div className="mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>
      {isBitPost ? (
        <div className="my-4 flex justify-center">
          <BitDevLogo />
        </div>
      ) : imageDataUrl ? (
        <img
          src={imageDataUrl}
          alt={blogPost.title}
          className="rounded-lg shadow-sm my-4"
        />
      ) : null}
      <p className="text-sm text-gray-500">
        Published: {new Date(blogPost.date).toLocaleDateString()} • Author: {blogPost.author}
      </p>
      <div
        className="blog-content mt-6 leading-7 text-gray-800 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
        dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
      />
    </div>
  );
};

export default BlogGenerator;
