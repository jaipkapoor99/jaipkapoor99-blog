import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

function sanitizeHtml(html: string): string {
  // Minimal sanitizer: remove script/style, event handlers, and javascript: URLs
  const template = document.createElement("template");
  template.innerHTML = html;

  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_ELEMENT, null);
  const toRemove: Element[] = [];
  while (walker.nextNode()) {
    const el = walker.currentNode as Element;

    // Remove script and style tags entirely
    const tag = el.tagName.toLowerCase();
    if (tag === "script" || tag === "style") {
      toRemove.push(el);
      continue;
    }

    // Strip event handler attributes and javascript: URLs
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim();
      if (name.startsWith("on")) {
        el.removeAttribute(attr.name);
      }
      if ((name === "href" || name === "src") && value.toLowerCase().startsWith("javascript:")) {
        el.removeAttribute(attr.name);
      }
    }
  }

  toRemove.forEach((el) => el.remove());
  return template.innerHTML;
}

export async function processMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const title = lines[0].replace(/^#+\s*/, "").trim(); // First line is the title, remove leading # and spaces
  // Support optional second-line date prefix: "Date: YYYY-MM-DD"
  let date = new Date().toISOString();
  let startIndex = 1;
  if (lines[1] && /^\s*Date:\s*/i.test(lines[1])) {
    const parsed = lines[1].replace(/^\s*Date:\s*/i, "").trim();
    // Accept YYYY-MM-DD or ISO strings
    const d = new Date(parsed);
    if (!isNaN(d.getTime())) {
      date = d.toISOString();
    }
    startIndex = 2;
  }
  const contentWithoutTitle = lines.slice(startIndex).join("\n"); // Rest is content

  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(contentWithoutTitle);

  const author = "Jai Kapoor"; // Hardcoded author

  return {
    title,
    date,
    author,
    htmlContent: sanitizeHtml(result.toString()),
  };
}
