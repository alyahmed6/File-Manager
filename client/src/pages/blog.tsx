import { useEffect } from "react";
import { Link } from "wouter";
import { Newspaper, Clock, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-background py-16 md:py-24" data-testid="section-blog-hero">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('${featuredPost.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Newspaper className="h-4 w-4" />
                Blockchain Pulse Blog
              </div>
              <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl" data-testid="text-blog-heading">
                Insights for Blockchain, Web3, and Startup Growth
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Original explainers, market education, and practical Web3 notes from The Blockchain Pulse.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-12 md:py-16" data-testid="section-featured-blog">
          <div className="container mx-auto px-4">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="grid gap-8 rounded-lg border border-primary/20 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:grid-cols-[0.9fr_1.1fr] md:p-8"
              data-testid="link-featured-blog"
            >
              <div className="min-h-64 overflow-hidden rounded-md border border-border bg-muted">
                <img
                  src={featuredPost.image}
                  alt=""
                  className="h-full w-full object-cover"
                  data-testid="img-featured-blog"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-primary">
                    <Tag className="h-4 w-4" />
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground md:text-4xl" data-testid="text-featured-blog-title">
                  {featuredPost.title}
                </h2>
                <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
              </div>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
