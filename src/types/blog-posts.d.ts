declare module "*.json" {
  const value: { slug: string; title: string; date: string; tags: string[] }[];
  export default value;
}
