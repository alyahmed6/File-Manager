import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createBlogPost,
  getAllBlogPosts,
} from "../blog-service.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const posts = await getAllBlogPosts();
      return res.status(200).json(posts);
    }

    if (req.method === "POST") {
      const post = await createBlogPost(req.body);
      return res.status(201).json(post);
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API /api/blogs failed:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
