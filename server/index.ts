import { Hono } from "hono";
import * as p from "pathe";
import { recoverer } from "./error";
import Shell from "./shell";

const postsGlob = import.meta.glob("../posts/*.md", {
	as: "raw",
});

const posts = Object.entries(postsGlob).map(([path, importer]) => ({
	slug: p.basename(path, ".md"),
	importer,
}));

const app = new Hono()

	.use(recoverer)

	.get("/ping", (c) => c.text("pong"))

	.get("/api/blog", async (c) => c.json(posts.map((p) => p.slug)))

	.get("/api/blog/:post", async (c) => {
		const post = c.req.param("post");
		const postImporter = posts.find((p) => p.slug === post)?.importer;
		if (!postImporter) return c.notFound();
		const postContent = await postImporter();
		return c.json(postContent);
	});

app.get("*", (c) =>
	c.html(Shell({ data: { title: "wow" } }) as unknown as string)
);

export default app;
