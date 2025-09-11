import fs from "fs/promises"; // Use fs.promises for async operations
import path from "path";
import { fileURLToPath } from "url"; // To get __dirname in ES modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostsDir = path.resolve(__dirname, "../src/blog");
const outputFilePath = path.resolve(__dirname, "../src/data/blog-posts.json");

async function generateBlogData() {
  const blogPosts = [];

  try {
    const files = await fs.readdir(blogPostsDir); // Use fs.readdir directly

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(blogPostsDir, file);
        const content = await fs.readFile(filePath, "utf-8"); // Use fs.readFile directly
        const lines = content.split("\n");
        const title = lines[0].replace(/^#+\s*/, "").trim();
        const slug = file.replace(".md", "");

        blogPosts.push({
          slug,
          title,
        });
      }
    }

    await fs.writeFile(outputFilePath, JSON.stringify(blogPosts, null, 2)); // Use fs.writeFile directly
    console.log(
      `Generated ${blogPosts.length} blog posts data to ${outputFilePath}`,
    );
  } catch (error) {
    console.error("Error generating blog data:", error);
  }
}

generateBlogData();
