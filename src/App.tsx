import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout
import AllBlogPostsPage from "./pages/AllBlogPostsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";

const App: React.FC = () => {
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
};

export default App;
