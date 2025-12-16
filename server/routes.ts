import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/register", async (req, res) => {
    try {
      const body = insertRegistrationSchema.parse(req.body);
      
      const existing = await storage.getRegistrationByEmail(body.email);
      if (existing) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const registration = await storage.createRegistration(body);
      
      console.log(`New registration: ${body.email} - Forward to registration@theblockchainpulse.org`);
      
      res.status(201).json({ success: true, id: registration.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  return httpServer;
}
