declare module "*.json" {
  const value: { slug: string; title: string; date: string }[];
  export default value;
}
