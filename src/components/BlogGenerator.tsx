import React, { useEffect, useState } from "react";
import { processMarkdown } from "../utils/markdown"; // Changed import

interface BlogGeneratorProps {
  markdownPath: string;
}

interface BlogPostData {
  title: string;
  date: string;
  author: string;
  htmlContent: string;
}

const BlogGenerator: React.FC<BlogGeneratorProps> = ({ markdownPath }) => {
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract slug from markdownPath
  const slug = markdownPath.split("/").pop()?.replace(".md", "");
  const imageUrl = slug ? `/src/blog-images/${slug}.svg` : ""; // Construct image URL

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(markdownPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdown = await response.text();
        const processedData = await processMarkdown(markdown);
        setBlogPost(processedData);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [markdownPath]);

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
    <div className="blog-post-container">
      <h1>{blogPost.title}</h1>
      {imageUrl && (
        <img src={imageUrl} alt={blogPost.title} className="blog-post-image" />
      )}{" "}
      {/* Display image */}
      <p>Published: {new Date(blogPost.date).toLocaleDateString()}</p>
      <p>Author: {blogPost.author}</p>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
      />
    </div>
  );
};

export default BlogGenerator;
