import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostsPath = path.join(__dirname, "../src/blog");
const blogDataPath = path.join(__dirname, "../src/data/blog-posts.json");

// Placeholder for AI tag generation
async function generateTagsWithAI(content) {
  // In a real application, this would call an AI service (e.g., Google Cloud AI, OpenAI)
  // For demonstration, we'll return some dummy tags based on keywords
  const dummyTags = [];
  if (content.toLowerCase().includes("bit")) {
    dummyTags.push("Bit");
  }
  if (content.toLowerCase().includes("component")) {
    dummyTags.push("Component Management");
  }
  if (content.toLowerCase().includes("monorepo")) {
    dummyTags.push("Monorepo");
  }
  if (content.toLowerCase().includes("pnpm")) {
    dummyTags.push("pnpm");
  }
  if (content.toLowerCase().includes("react")) {
    dummyTags.push("React");
  }
  if (content.toLowerCase().includes("development")) {
    dummyTags.push("Development");
  }
  if (content.toLowerCase().includes("software")) {
    dummyTags.push("Software Engineering");
  }
  return Array.from(new Set(dummyTags)); // Return unique tags
}

export async function generateBlogTags() {
  try {
    const blogPosts = JSON.parse(await fs.readFile(blogDataPath, "utf8"));
    const markdownFiles = (await fs.readdir(blogPostsPath)).filter((file) =>
      file.endsWith(".md"),
    );

    for (const file of markdownFiles) {
      const slug = file.replace(".md", "");
      const filePath = path.join(blogPostsPath, file);
      const content = await fs.readFile(filePath, "utf8");

      const tags = await generateTagsWithAI(content);

      const postIndex = blogPosts.findIndex((post) => post.slug === slug);
      if (postIndex !== -1) {
        blogPosts[postIndex].tags = tags;
      }
    }

    await fs.writeFile(
      blogDataPath,
      JSON.stringify(blogPosts, null, 2),
      "utf8",
    );
    console.log("Blog tags generated and updated successfully!");
  } catch (error) {
    console.error("Error generating blog tags:", error);
  }
}
