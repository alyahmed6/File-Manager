import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Mail, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-4">
                  <Bell className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-register-heading">
                  Get Notified
                </h1>
                <p className="text-muted-foreground">
                  Be the first to know when our Blockchain Mastery Course opens for enrollment!
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-accent mb-6">
                    <Sparkles className="h-4 w-4" />
                    <span>Early access benefits coming soon</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          data-testid="input-email"
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-destructive mt-1">{error}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border border-accent"
                      size="lg"
                      disabled={isSubmitting}
                      data-testid="button-notify-me"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Notify Me"}
                    </Button>
                  </form>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    We'll only email you about the course launch. No spam, ever.
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-success-heading">
                You're on the List!
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for registering! You will be notified about updates and when the course starts.
              </p>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-sm text-muted-foreground">
                  Keep an eye on your inbox for exclusive early access offers and course updates.
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
