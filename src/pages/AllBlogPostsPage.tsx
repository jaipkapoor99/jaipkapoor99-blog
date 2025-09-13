import React, { useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import blogPostsData from "../data/blog-posts.json";
import { Card, CardContent, CardHeader } from "../components/ui/card";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

const AllBlogPostsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag"); // legacy single-tag support
  const tagsParam = searchParams.get("tags");
  const qParam = searchParams.get("q") ?? ""; // fuzzy search query

  // Selected tags (comma-separated in `tags` param or legacy `tag`)
  const selectedTags = useMemo<string[]>(() => {
    if (tagsParam) {
      return tagsParam
        .split(",")
        .map((t) => decodeURIComponent(t.trim()))
        .filter(Boolean);
    }
    if (activeTag) return [activeTag];
    return [];
  }, [tagsParam, activeTag]);

  // All unique tags across posts
  const allTags = useMemo<string[]>(() => {
    const s = new Set<string>();
    (blogPostsData as BlogPost[]).forEach((p) =>
      p.tags?.forEach((t) => s.add(t)),
    );
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  // Helper to update URL state
  const setSelectedTags = useCallback(
    (tags: string[]) => {
      const next = new URLSearchParams(searchParams);
      next.delete("tag"); // drop legacy param once multi-select is used
      if (tags.length) {
        next.set("tags", tags.map((t) => encodeURIComponent(t)).join(","));
      } else {
        next.delete("tags");
      }
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const set = new Set(selectedTags);
      if (set.has(tag)) set.delete(tag);
      else set.add(tag);
      setSelectedTags(Array.from(set));
    },
    [selectedTags, setSelectedTags],
  );

  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9\s-]/g, "");
  const fuzzyTokens = useMemo(
    () =>
      norm(qParam)
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter(Boolean),
    [qParam],
  );

  const blogPosts: BlogPost[] = (blogPostsData as BlogPost[]).filter((p) => {
    // AND filter for explicitly selected tags
    const passesSelected = selectedTags.length
      ? selectedTags.every((t) => p.tags?.includes(t))
      : true;
    if (!passesSelected) return false;

    // Fuzzy search: OR across tokens; match if any tag contains any token
    if (fuzzyTokens.length === 0) return true;
    const tagsNorm = p.tags?.map(norm) ?? [];
    return fuzzyTokens.some((tok) => tagsNorm.some((tg) => tg.includes(tok)));
  });

  return (
    <div className="mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
        All Blog Posts
      </h1>
      <div className="mb-6 mx-auto max-w-3xl">
        <label htmlFor="tag-search" className="sr-only">
          Search by tags
        </label>
        <input
          id="tag-search"
          className="w-full rounded-md border border-pink-primary/30 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-accent/40"
          placeholder="Search tags (e.g., writing, systems, react)"
          value={qParam}
          onChange={(e) => {
            const next = new URLSearchParams(searchParams);
            const value = e.target.value;
            if (value) next.set("q", value);
            else next.delete("q");
            setSearchParams(next);
          }}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm border " +
                  (active
                    ? "bg-pink-accent/10 border-pink-accent text-pink-dark"
                    : "bg-pink-light border-pink-primary/30 text-pink-dark hover:bg-pink-light/80")
                }
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-pink-primary/30 px-2.5 py-0.5 text-xs font-medium text-pink-primary shadow-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {blogPosts.map((post: BlogPost) => (
          <Card
            key={post.slug}
            className="relative bg-white border-gray-200 hover:border-pink-primary/40 hover:bg-gradient-to-br hover:from-pink-50/60 hover:to-white transition-all shadow-sm hover:shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-4"
          >
            <CardHeader className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-pink-primary/30 bg-pink-light px-2.5 py-0.5 text-xs font-medium text-pink-dark shadow-sm hover:bg-pink-light/80"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-shrink-0 relative z-10">
              <Link
                to={`/blog/${post.slug}`}
                className="text-pink-primary font-medium link-underline"
              >
                Read More
              </Link>
            </CardContent>
            {/* Stretched link overlay to make entire card clickable */}
            <Link
              to={`/blog/${post.slug}`}
              aria-label={`Open ${post.title}`}
              className="absolute inset-0"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllBlogPostsPage;
