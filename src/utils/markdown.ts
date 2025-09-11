import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export async function processMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const title = lines[0].replace(/^#+\s*/, "").trim(); // First line is the title, remove leading # and spaces
  const contentWithoutTitle = lines.slice(1).join("\n"); // Rest is content

  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(contentWithoutTitle);

  const date = new Date().toISOString(); // Current timestamp
  const author = "Jai Kapoor"; // Hardcoded author

  return {
    title,
    date,
    author,
    htmlContent: result.toString(),
  };
}
