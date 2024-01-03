import { Hono } from "hono";
import * as p from "pathe";
import { recoverer } from "./error";

const postsGlob = import.meta.glob("../posts/*.md", {
  as: "raw",
});

const posts = Object.entries(postsGlob).map(([path, importer]) => ({
  slug: p.basename(path, ".md"),
  importer,
}));

const app = new Hono();

app.use(recoverer);

app.get("/api/blog/:post", async (c) => {
  const post = c.req.param("post");
  const postImporter = posts.find((p) => p.slug === post)?.importer;
  if (!postImporter) return c.notFound();
  const postContent = await postImporter();
  return c.json(postContent);
});

export default app;
