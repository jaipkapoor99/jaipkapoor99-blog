import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BlogGenerator from "./components/BlogGenerator";
import Layout from "./components/Layout"; // Import Layout
import blogPostsData from "./data/blog-posts.json"; // Import generated data
import "./App.css"; // Keep existing CSS

// Define interface for BlogPost
interface BlogPost {
  slug: string;
  title: string;
}

// Simple Homepage component
const HomePage: React.FC = () => {
  // Use the imported data and type it
  const blogPosts: BlogPost[] = blogPostsData;

  return (
    <div className="container">
      <h1>Welcome to My Tech Blog</h1>
      <p>Explore my latest articles:</p>
      <ul>
        {blogPosts.map((post: BlogPost) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        {" "}
        {/* Use Layout component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Component to render individual blog posts
const BlogPostPage: React.FC = () => {
  const { pathname } = window.location;
  // Extract slug from pathname, e.g., /blog/my-first-post -> my-first-post
  const slug = pathname.split("/").pop();
  const markdownPath = `/src/blog/${slug}.md`; // Path to your markdown file

  return (
    <div className="container">
      <Link to="/">Back to Home</Link>
      <BlogGenerator markdownPath={markdownPath} />
    </div>
  );
};

export default App;
