import React from "react";
import { Link } from "react-router-dom";
import blogPostsData from "../data/blog-posts.json";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import BitDevLogo from "../components/BitDevLogo";
import { findImageAssetUrl } from "../utils/postAssets";

interface BlogPost {
  slug: string;
  title: string;
}

const HomePage: React.FC = () => {
  const blogPosts: BlogPost[] = blogPostsData;
  const recentBlogPosts = blogPosts.slice(0, 3);

  return (
    <div className="mx-auto p-4">
      <section className="max-w-6xl mx-auto relative overflow-hidden rounded-2xl border border-pink-primary/20 bg-gradient-to-b from-pink-50 to-transparent p-8 mb-10">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">The Subversive Writer</h1>
          <p className="text-lg text-gray-600">Essays that challenge the default</p>
          <p className="text-base text-gray-500">Culture, creativity, work, and tech — unorthodox ideas for curious minds.</p>
        </div>
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-pink-200/40 blur-3xl rounded-full" />
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogPosts.map((post: BlogPost) => (
          <Card
            key={post.slug}
            className="relative bg-white border-gray-200 hover:border-pink-primary/40 hover:shadow-md hover:bg-gradient-to-br hover:from-pink-50/60 hover:to-white transition-all shadow-sm rounded-xl overflow-hidden"
          >
            {(() => {
              const img = findImageAssetUrl(post.slug);
              if (!img) {
                if (post.slug === "bit-component-management-analysis") {
                  return (
                    <div className="w-full aspect-[16/9] bg-pink-light/40 overflow-hidden rounded-t-xl">
                      <BitDevLogo className="w-full h-full" />
                    </div>
                  );
                }
                return null;
              }
              return (
                <div className="w-full aspect-[16/9] bg-pink-light/40 overflow-hidden rounded-t-xl">
                  <img src={img} alt={post.title} className="w-full h-full object-contain" />
                </div>
              );
            })()}
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            </CardHeader>
            <CardContent>
              <Link to={`/blog/${post.slug}`} className="text-pink-primary font-medium link-underline relative z-10">
                Read More
              </Link>
            </CardContent>
            <Link to={`/blog/${post.slug}`} aria-label={`Open ${post.title}`} className="absolute inset-0" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

