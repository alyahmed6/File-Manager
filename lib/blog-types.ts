export type BlogSection = {
  heading: string;
  body: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  sourceUrl?: string;
  sections: BlogSection[];
  takeaways: string[];
};

export type BlogPostInput = BlogPost;

export type BlogPostUpdate = Omit<BlogPost, "slug">;
