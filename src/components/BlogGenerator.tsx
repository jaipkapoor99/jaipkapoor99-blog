import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { processMarkdown } from "../utils/markdown";
import BitDevLogo from "../components/BitDevLogo";
import blogPostsData from "../data/blog-posts.json";
// Image decoding handled locally per page; no global lazy-loading yet
import { Calendar, User, Github, ExternalLink } from "lucide-react";

interface BlogGeneratorProps {
  slug: string;
}

interface BlogPostData {
  title: string;
  date: string;
  author: string;
  htmlContent: string;
  tags: string[];
  repoUrl?: string;
}

// Map markdown and images at build time for reliable prod paths
const markdownFiles = import.meta.glob("../blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Resolve image file URLs; we'll convert to base64 data URIs at runtime
const imageFiles = import.meta.glob(
  "../blog-images/*.{svg,png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const BlogGenerator: React.FC<BlogGeneratorProps> = ({ slug }) => {
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Lazy loading will be applied later; keep content rendering simple for now

  const currentBlogPostMetaData = useMemo(() => {
    return blogPostsData.find((post) => post.slug === slug);
  }, [slug]);

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
        // Prefer direct URL for SVGs (avoids fetch/reader issues in some environments)
        if (/\.svg(\?|$)/i.test(url)) {
          if (!cancelled) setImageDataUrl(url);
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
        // Fallback to original URL if conversion fails
        if (!cancelled) setImageDataUrl(url);
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
        if (!markdown || !currentBlogPostMetaData) {
          throw new Error(
            "Markdown or blog post metadata not found for this slug.",
          );
        }
        const processedData = await processMarkdown(markdown);
        setBlogPost({
          ...processedData,
          tags: currentBlogPostMetaData.tags || [], // Add tags from metadata
        });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [markdown, currentBlogPostMetaData]);

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
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {blogPost.title}
      </h1>
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
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-primary/30 bg-pink-light px-3 py-1 text-xs font-medium text-pink-dark shadow-sm transition-colors hover:bg-pink-light/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent/40">
          <Calendar className="size-3.5 text-pink-primary" />
          {new Date(blogPost.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {/* Responsive separator: dot on mobile, thin divider on larger screens */}
        <span aria-hidden className="mx-1 text-pink-primary sm:hidden">
          •
        </span>
        <span
          aria-hidden
          className="hidden sm:inline-block h-4 w-px bg-pink-primary/50 mx-2 align-middle"
        />
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-full border border-pink-primary/30 bg-pink-light px-3 py-1 text-xs font-medium text-pink-dark shadow-sm transition-colors hover:bg-pink-light/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent/40"
        >
          <User className="size-3.5 text-pink-primary" />
          {blogPost.author}
        </Link>
        {blogPost.repoUrl && (
          <>
            {/* Responsive separator: dot on mobile, thin divider on larger screens */}
            <span aria-hidden className="mx-1 text-pink-primary sm:hidden">•</span>
            <span
              aria-hidden
              className="hidden sm:inline-block h-4 w-px bg-pink-primary/50 mx-1 align-middle"
            />
          </>
        )}
        {blogPost.repoUrl && (
          <a
            href={blogPost.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-pink-primary/30 bg-white px-3 py-1 text-xs font-medium text-pink-primary shadow-sm transition-[colors,transform,box-shadow] duration-500 hover:bg-primary hover:text-white hover:border-pink-primary hover:shadow-lg dark:hover:bg-primary dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent/40 transform hover:scale-105"
          >
            <Github className="size-3.5" />
            View Repo
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
      {blogPost.tags && blogPost.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {blogPost.tags.map((tag) => (
            <Link
              to={`/all-posts?tag=${encodeURIComponent(tag)}`}
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-pink-primary/30 bg-pink-light px-2.5 py-0.5 text-xs font-medium text-pink-dark shadow-sm transition-colors hover:bg-pink-light/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-accent/40"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <div
        className="blog-content mt-6 leading-7 text-gray-800 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
        dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
      />
    </div>
  );
};

export default BlogGenerator;
