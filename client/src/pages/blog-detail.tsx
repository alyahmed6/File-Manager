import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/not-found";
import type { BlogPost } from "@/data/blog-posts";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/blog-api";

export default function BlogDetail() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: remotePost, isLoading, isError } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: Boolean(slug),
  });

  const { data: remotePosts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const post = remotePost;

  const renderTextWithLineBreaks = (text: string) =>
    text.split("\n").map((line, idx, arr) => (
      <span key={idx}>
        {line}
        {idx < arr.length - 1 ? <br /> : null}
      </span>
    ));

  const markdownToHtml = (md: string) => {
    if (!md) return "";
    try {
      const raw = marked.parse(md) as string;
      return DOMPurify.sanitize(raw);
    } catch (e) {
      return md.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative overflow-hidden py-12 md:py-20">
            <div className="container relative mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <Skeleton className="mb-8 h-5 w-32" />
                <Skeleton className="mb-4 h-5 w-48" />
                <Skeleton className="mb-5 h-16 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          </section>
          <section className="pb-12 md:pb-16">
            <div className="container mx-auto px-4">
              <Skeleton className="mx-auto mb-8 h-[420px] w-full max-w-3xl rounded-lg" />
              <div className="mx-auto max-w-3xl space-y-4 p-5 md:p-8">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-6 w-1/3 mt-8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Unable to load blog post</h1>
          <p className="text-muted-foreground mb-4">
            The blog post could not be loaded. Check the API response below and visit <span className="font-mono">/api/debug</span> for diagnostics.
          </p>
          <code className="block max-w-md mx-auto p-3 bg-muted rounded text-xs text-left whitespace-pre-wrap">
            {slug}
          </code>
          <a href="/blog" className="mt-6 inline-block text-primary hover:underline">
            &larr; Back to Blog
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) return <NotFound />;

  const author = {
    name: "Nauman",
    role: "Blockchain Analyst & Writer",
    bio: "Nauman writes about DeFi, tokenomics, and crypto trends with a focus on practical market insights, research-led analysis, and responsible education.",
    tags: ["Cryptocurrency", "Bitcoin", "Ethereum", "Blockchain", "Investing"],
  };

  const morePosts = remotePosts?.filter((item) => item.slug !== slug).slice(0, 2) ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <article>
          <section className="relative overflow-hidden py-12 md:py-20" data-testid="section-blog-detail-hero">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/95 to-background" />
            <div className="container relative mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <Link
                  href="/blog"
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  data-testid="link-back-blog"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-primary">
                    <Tag className="h-4 w-4" />
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="mb-5 font-bold tracking-tight text-foreground" data-testid="text-blog-detail-title" style={{ fontSize: "3.2rem", lineHeight: "normal" }}>
                  {post.title}
                </h1>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </section>

          <section className="pb-12 md:pb-16" data-testid="section-blog-detail-body">
            <div className="container mx-auto px-4">
              <div className="mx-auto mb-8 max-w-3xl overflow-hidden rounded-lg border border-border bg-muted">
                <img src={post.image} alt="" className="h-full max-h-[420px] w-full object-cover" />
              </div>

              <div className="mx-auto max-w-3xl p-5 md:p-8">
                <div className="prose prose-slate max-w-none dark:prose-invert [&_blockquote]:[quotes:none]">
                  {post.sections.map((section: BlogPost["sections"][number]) => (
                    <div key={section.heading}>
                      <h2>{section.heading}</h2>
                      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(section.body) }} />
                    </div>
                  ))}
                </div>

              

                <div className="mt-10 rounded-2xl border border-border/80 bg-card p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">About the author</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {author.bio}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {author.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {morePosts.length > 0 ? (
                  <div className="mt-10">
                    <h2 className="mb-6 text-2xl font-semibold text-foreground">More from {author.name}</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      {morePosts.map((morePost) => (
                        <Link
                          key={morePost.slug}
                          href={`/blog/${morePost.slug}`}
                          className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:border-foreground/20"
                        >
                          <div className="p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{morePost.category}</p>
                            <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary">
                              {morePost.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {morePost.excerpt}
                            </p>
                          </div>
                          <div className="h-40 overflow-hidden">
                            <img src={morePost.image} alt={morePost.title} className="h-full w-full object-cover" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/blog"
                        className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-foreground/80 hover:bg-muted"
                      >
                        See all from {author.name}
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
