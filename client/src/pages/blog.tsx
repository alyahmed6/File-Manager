import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, Clock, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBlogPosts } from "@/lib/blog-api";

export default function Blog() {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = posts?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-background py-16 md:py-24">
            <div className="container relative mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <Skeleton className="mx-auto mb-6 h-10 w-48 rounded-full" />
                <Skeleton className="mx-auto mb-4 h-16 w-3/4" />
                <Skeleton className="mx-auto h-6 w-2/3" />
              </div>
            </div>
          </section>
          <section className="bg-background py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 rounded-lg border p-5 md:grid-cols-[1.1fr_0.9fr] md:p-8">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-4/6" />
                </div>
                <Skeleton className="h-64 w-full rounded-md" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!featuredPost) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-24 text-center text-muted-foreground">
          No blog posts available yet.
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {isError ? (
          <div className="container mx-auto px-4 py-4">
            <p className="rounded-md border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-700">
              Could not reach the database. Showing cached sample posts.
            </p>
          </div>
        ) : null}

        <section className="relative overflow-hidden bg-background py-16 md:py-24" data-testid="section-blog-hero">
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Blockchain Pulse Blog
              </div>
              <h1 className="max-w-5xl mx-auto text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" data-testid="text-blog-heading">
                Insights for Blockchain,<br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Web3, and Startup Growth
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
                Original explainers, market education, and practical Web3 notes from The Blockchain Pulse.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-12 md:py-16" data-testid="section-featured-blog">
          <div className="container mx-auto px-4">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="grid gap-8 rounded-lg border border-primary/20 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md md:grid-cols-[1.1fr_0.9fr] md:p-8"
              data-testid="link-featured-blog"
            >
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
              <div className="min-h-64 overflow-hidden rounded-md border border-border bg-muted">
                <img
                  src={featuredPost.image}
                  alt=""
                  className="h-full w-full object-cover"
                  data-testid="img-featured-blog"
                />
              </div>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
