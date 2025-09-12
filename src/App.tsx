import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import BlogGenerator from "./components/BlogGenerator";
import Layout from "./components/Layout"; // Import Layout
import blogPostsData from "./data/blog-posts.json"; // Import generated data
// Removed unused scaffold CSS

// Define interface for BlogPost
interface BlogPost {
  slug: string;
  title: string;
}

import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";

// Simple Homepage component
const HomePage: React.FC = () => {
  // Use the imported data and type it
  const blogPosts: BlogPost[] = blogPostsData;

  // Get the 3 most recent blog posts
  const recentBlogPosts = blogPosts.slice(0, 3);

  return (
    <div className="mx-auto p-4">
      <section className="max-w-6xl mx-auto relative overflow-hidden rounded-2xl border border-pink-primary/20 bg-gradient-to-b from-pink-50 to-transparent p-8 mb-10">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            Welcome to My Tech Blog
          </h1>
          <p className="text-lg text-gray-600">Explore my latest articles</p>
          <p className="text-base text-gray-500">
            Practical front‑end insights, tools, and monorepo adventures.
          </p>
          {/* CTA buttons removed per request */}
        </div>
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-pink-200/40 blur-3xl rounded-full" />
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogPosts.map((post: BlogPost) => (
          <Card
            key={post.slug}
            className="relative bg-white border-gray-200 hover:border-pink-primary/40 hover:shadow-md hover:bg-gradient-to-br hover:from-pink-50/60 hover:to-white transition-all shadow-sm rounded-xl overflow-hidden"
          >
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
            </CardHeader>
            <CardContent>
              <Link
                to={`/blog/${post.slug}`}
                className="text-pink-primary font-medium link-underline relative z-10"
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

import AllBlogPostsPage from "./pages/AllBlogPostsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        {" "}
        {/* Use Layout component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/all-posts" element={<AllBlogPostsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Component to render individual blog posts
const BlogPostPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug ?? "";

  return (
    <div className="mx-auto p-4 max-w-3xl">
      <Button asChild className="mb-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow hover:shadow-md">
        <Link to="/">
          <ArrowLeft className="mr-2 size-4" /> Back to Home
        </Link>
      </Button>
      <BlogGenerator slug={slug} />
    </div>
  );
};

export default App;
