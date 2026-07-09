import "dotenv/config";
import express from "express";
import cors from "cors";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostBySlug,
  updateBlogPost,
} from "../lib/blog-service";

const app = express();

function formatRouteError(defaultMessage: string, error: unknown): string {
  const message = error instanceof Error ? error.message : defaultMessage;
  const lower = message.toLowerCase();

  if (lower.includes("authentication failed")) {
    return "Database authentication failed. Please check MongoDB credentials in .env.";
  }

  if (
    lower.includes("could not connect to any servers") ||
    lower.includes("failed to connect to server") ||
    lower.includes("timed out") ||
    lower.includes("network") ||
    lower.includes("ip whitelist")
  ) {
    return "Database connection failed. Ensure your Atlas cluster is reachable and your current IP is allowed.";
  }

  return message;
}
const port = Number(process.env.API_PORT ?? 3001);

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/api/blogs", async (_req, res) => {
  try {
    const posts = await getAllBlogPosts();
    res.json(posts);
  } catch (error) {
    console.error("GET /api/blogs failed:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

app.get("/api/blogs/:slug", async (req, res) => {
  try {
    const post = await getBlogPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error("GET /api/blogs/:slug failed:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const post = await createBlogPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.error("POST /api/blogs failed:", error);
    const message = formatRouteError("Failed to create blog post", error);
    res.status(400).json({ error: message });
  }
});

app.put("/api/blogs/:slug", async (req, res) => {
  try {
    const post = await updateBlogPost(req.params.slug, req.body);
    if (!post) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error("PUT /api/blogs/:slug failed:", error);
    const message = formatRouteError("Failed to update blog post", error);
    res.status(500).json({ error: message });
  }
});

app.delete("/api/blogs/:slug", async (req, res) => {
  try {
    const deleted = await deleteBlogPost(req.params.slug);
    if (!deleted) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error("DELETE /api/blogs/:slug failed:", error);
    const message = formatRouteError("Failed to delete blog post", error);
    res.status(500).json({ error: message });
  }
});

const server = app.listen(port, () => {
  console.log(`Blog API running at http://localhost:${port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Either stop the process using that port or set API_PORT in .env to a free port.`,
    );
    process.exit(1);
  }
  throw error;
});
