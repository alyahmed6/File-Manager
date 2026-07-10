import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostBySlug,
  updateBlogPost,
} from "../blog-service.js";

const ALLOWED_ORIGINS = [
  "https://www.theblockchainpulse.org",
  "https://theblockchainpulse.org",
  "http://localhost:5000",
  "http://localhost:3001",
  "https://blockchainpulse-five.vercel.app",
];

function setCorsHeaders(res: VercelResponse, origin: string | undefined) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://www.theblockchainpulse.org");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function extractSlug(req: VercelRequest): string | null {
  if (req.query.slug) return req.query.slug as string;
  const parts = (req.url ?? "").split("/").filter(Boolean);
  const idx = parts.indexOf("blogs");
  if (idx !== -1 && idx + 1 < parts.length) return parts[idx + 1];
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const slug = extractSlug(req);

  try {
    if (slug) {
      if (req.method === "GET") {
        const post = await getBlogPostBySlug(slug);
        if (!post) return res.status(404).json({ error: "Blog post not found" });
        return res.status(200).json(post);
      }

      if (req.method === "PUT") {
        const post = await updateBlogPost(slug, req.body);
        if (!post) return res.status(404).json({ error: "Blog post not found" });
        return res.status(200).json(post);
      }

      if (req.method === "DELETE") {
        const deleted = await deleteBlogPost(slug);
        if (!deleted) return res.status(404).json({ error: "Blog post not found" });
        return res.status(204).end();
      }

      res.setHeader("Allow", "GET, PUT, DELETE");
      return res.status(405).json({ error: "Method not allowed" });
    }

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
