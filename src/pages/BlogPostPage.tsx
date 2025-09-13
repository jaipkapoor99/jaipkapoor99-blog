import React from "react";
import { useParams, Link } from "react-router-dom";
import BlogGenerator from "../components/BlogGenerator";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPostPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug ?? "";

  return (
    <div className="mx-auto p-4 max-w-3xl">
      <Button
        asChild
        className="mb-4 bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow hover:shadow-md"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 size-4" /> Back to Home
        </Link>
      </Button>
      <BlogGenerator slug={slug} />
    </div>
  );
};

export default BlogPostPage;
