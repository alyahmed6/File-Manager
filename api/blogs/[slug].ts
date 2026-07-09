import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  deleteBlogPost,
  getBlogPostBySlug,
  updateBlogPost,
} from "../../lib/blog-service";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    if (req.method === "GET") {
      const post = await getBlogPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.status(200).json(post);
    }

    if (req.method === "PUT") {
      const post = await updateBlogPost(slug, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.status(200).json(post);
    }

    if (req.method === "DELETE") {
      const deleted = await deleteBlogPost(slug);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.status(204).end();
    }

    res.setHeader("Allow", "GET, PUT, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(`API /api/blogs/${slug} failed:`, error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
