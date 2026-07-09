import type { BlogPost, BlogPostUpdate } from "@/data/blog-posts";

const API_BASE = "/api/blogs";

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Request failed");
  }
  return res.json() as Promise<T>;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(API_BASE);
  return parseResponse<BlogPost[]>(res);
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/${slug}`);
  if (res.status === 404) return null;
  return parseResponse<BlogPost>(res);
}

export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return parseResponse<BlogPost>(res);
}

export async function updateBlogPost(slug: string, post: BlogPostUpdate): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return parseResponse<BlogPost>(res);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${slug}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to delete blog post");
  }
}
