import { connectDB } from "./db.js";
import { BlogPostModel } from "./models/blog.js";
import { seedPosts } from "./seed-posts.js";
import type { BlogPost, BlogPostInput, BlogPostUpdate } from "./blog-types.js";

function toBlogPost(doc: Record<string, unknown>): BlogPost {
  return {
    slug: doc.slug as string,
    title: doc.title as string,
    category: doc.category as string,
    date: doc.date as string,
    readTime: doc.readTime as string,
    excerpt: doc.excerpt as string,
    image: doc.image as string,
    sourceUrl: doc.sourceUrl as string | undefined,
    sections: doc.sections as BlogPost["sections"],
    takeaways: doc.takeaways as string[],
  };
}

function getFallbackPosts(): BlogPost[] {
  return seedPosts.map((post) => toBlogPost(post as Record<string, unknown>));
}

function formatDBError(error: unknown, fallbackMessage: string): Error {
  const message = error instanceof Error ? error.message : fallbackMessage;
  const lower = message.toLowerCase();

  if (lower.includes("authentication failed")) {
    return new Error(
      "Database authentication failed. Please check your MongoDB credentials in .env."
    );
  }

  if (
    lower.includes("could not connect to any servers") ||
    lower.includes("failed to connect to server") ||
    lower.includes("timed out") ||
    lower.includes("network") ||
    lower.includes("ip whitelist")
  ) {
    return new Error(
      "Database connection failed. Ensure your Atlas cluster is reachable and your current IP is allowed."
    );
  }

  return new Error(message);
}

async function seedIfEmpty() {
  const count = await BlogPostModel.countDocuments();
  if (count === 0) {
    await BlogPostModel.insertMany(seedPosts);
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    await seedIfEmpty();

    const posts = await BlogPostModel.find().sort({ createdAt: -1 }).lean();
    return posts.map((post) => toBlogPost(post as Record<string, unknown>));
  } catch (error) {
    console.error("Using fallback seed posts because database is unavailable:", error);
    return getFallbackPosts();
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await connectDB();
    await seedIfEmpty();

    const post = await BlogPostModel.findOne({ slug }).lean();
    if (!post) return null;
    return toBlogPost(post as Record<string, unknown>);
  } catch (error) {
    console.error(`Using fallback post for slug ${slug} because database is unavailable:`, error);
    return getFallbackPosts().find((post) => post.slug === slug) ?? null;
  }
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  try {
    await connectDB();

    const existing = await BlogPostModel.findOne({ slug: input.slug });
    if (existing) {
      throw new Error("A blog post with this slug already exists");
    }

    const post = await BlogPostModel.create(input);
    return toBlogPost(post.toObject() as Record<string, unknown>);
  } catch (error) {
    throw formatDBError(error, "Failed to create blog post");
  }
}

export async function updateBlogPost(slug: string, input: BlogPostUpdate): Promise<BlogPost | null> {
  try {
    await connectDB();

    const post = await BlogPostModel.findOneAndUpdate({ slug }, input, {
      new: true,
      runValidators: true,
    }).lean();

    if (!post) return null;
    return toBlogPost(post as Record<string, unknown>);
  } catch (error) {
    throw formatDBError(error, "Failed to update blog post");
  }
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  try {
    await connectDB();

    const result = await BlogPostModel.deleteOne({ slug });
    return result.deletedCount === 1;
  } catch (error) {
    throw formatDBError(error, "Failed to delete blog post");
  }
}
