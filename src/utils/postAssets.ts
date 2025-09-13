// Utilities to resolve assets for a given blog post slug
// Maps image files and provides a simple resolver used by the homepage cards

// Vite static import map for image files
const imageFiles = import.meta.glob(
  "../blog-images/*.{svg,png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

export const findImageAssetUrl = (slug: string): string => {
  const entries = Object.entries(imageFiles);
  // 1) Exact basename match with any extension
  const exact = entries.find(([path]) => {
    const file = path.split("/").pop() ?? "";
    const name = file.replace(/\.[^.]+$/, "");
    return name === slug;
  });
  if (exact) return exact[1];

  // 2) Token-based match: support cases like PNPM.svg for MyPnpmWorkspaceJourney
  const tokens = slug
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z]+/)
    .map((t) => t.toLowerCase())
    .filter(Boolean);
  const tokenMatch = entries.find(([path]) => {
    const file = path.split("/").pop() ?? "";
    const name = file.replace(/\.[^.]+$/, "").toLowerCase();
    return tokens.includes(name);
  });
  return tokenMatch?.[1] ?? "";
};
