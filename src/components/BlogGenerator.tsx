import React, { useEffect, useMemo, useState } from "react";
import { processMarkdown } from "../utils/markdown";

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

const imageFiles = import.meta.glob("../blog-images/*.svg", {
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

  const imageUrl = useMemo(() => {
    const entry = Object.entries(imageFiles).find(([path]) =>
      path.endsWith(`/${slug}.svg`),
    );
    return entry?.[1] ?? "";
  }, [slug]);

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
      {imageUrl && (
        <img
          src={imageUrl}
          alt={blogPost.title}
          className="rounded-lg shadow-sm my-4"
        />
      )}
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
