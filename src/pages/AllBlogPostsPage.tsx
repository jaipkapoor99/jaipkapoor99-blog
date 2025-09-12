import React from "react";
import { Link } from "react-router-dom";
import blogPostsData from "../data/blog-posts.json";
import { Card, CardContent, CardHeader } from "../components/ui/card";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

const AllBlogPostsPage: React.FC = () => {
  const blogPosts: BlogPost[] = blogPostsData;

  return (
    <div className="mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">All Blog Posts</h1>
      <div className="grid grid-cols-1 gap-4">
        {blogPosts.map((post: BlogPost) => (
          <Card
            key={post.slug}
            className="relative bg-white border-gray-200 hover:border-pink-primary/40 hover:bg-gradient-to-br hover:from-pink-50/60 hover:to-white transition-all shadow-sm hover:shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row items-center p-4"
          >
            <CardHeader className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </CardHeader>
            <CardContent className="flex-shrink-0 relative z-10">
              <Link to={`/blog/${post.slug}`} className="text-pink-primary font-medium link-underline">
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
