import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "./db.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const diagnostics: Record<string, unknown> = {
    node: process.version,
    env: {
      MONGODB_URI_SET: !!process.env.MONGODB_URI,
      MONGODB_URI_PREFIX: process.env.MONGODB_URI
        ? process.env.MONGODB_URI.substring(0, 20) + "..."
        : "NOT SET",
    },
  };

  try {
    await connectDB();
    diagnostics.mongo = { status: "connected" };
  } catch (error) {
    diagnostics.mongo = {
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return res.status(200).json(diagnostics);
}
