import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { blogPosts } from "@/data/blog-posts";

export default function BlogDetail() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const post = blogPosts.find((blogPost) => blogPost.slug === params?.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <article>
          <section className="relative overflow-hidden py-12 md:py-20" data-testid="section-blog-detail-hero">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('${post.image}')`,
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

                <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl" data-testid="text-blog-detail-title">
                  {post.title}
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
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

              <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-5 md:p-8">
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  {post.sections.map((section) => (
                    <div key={section.heading}>
                      <h2>{section.heading}</h2>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </div>

                {post.takeaways.length > 0 ? (
                  <div className="mt-8 rounded-lg border border-accent/20 bg-accent/5 p-5">
                    <h2 className="mb-3 text-base font-semibold text-foreground">Key takeaways</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {post.takeaways.map((takeaway) => (
                        <li key={takeaway} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
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
