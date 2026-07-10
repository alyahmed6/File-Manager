import { useState, useEffect } from "react";
import { Link } from "wouter";
import { BlogPost } from "@/data/blog-posts";
import {
  createBlogPost,
  deleteBlogPost,
  fetchBlogPosts,
  updateBlogPost,
} from "@/lib/blog-api";
import { Button } from "@/components/ui/button";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type AdminSection = {
  heading: string;
  bold?: boolean;
  fontSize?: string;
  fontFamily?: string;
  image?: string;
  paragraphs: string[];
};

type AdminPost = Omit<BlogPost, "slug" | "sections"> & {
  sections: AdminSection[];
};

const createEmptySection = (): AdminSection => ({
  heading: "",
  paragraphs: [""],
  image: "",
  bold: false,
  fontSize: "16px",
  fontFamily: "system-ui",
});

const sectionToAdminSection = (section: BlogPost["sections"][number]): AdminSection => ({
  heading: section.heading,
  bold: section.bold,
  fontSize: section.fontSize,
  fontFamily: section.fontFamily,
  image: section.image,
  paragraphs:
    section.body?.trim().length > 0
      ? section.body.split(/\n\n+/).map((paragraph) => paragraph.trim())
      : [""],
});

const adminSectionToBlogSection = (section: AdminSection): BlogPost["sections"][number] => ({
  heading: section.heading,
  bold: section.bold,
  fontSize: section.fontSize,
  fontFamily: section.fontFamily,
  image: section.image,
  body: section.paragraphs.filter((paragraph) => paragraph.trim() !== "").join("\n\n"),
});

const ADMIN_PASSWORD = "admin123";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add-post' | 'profile' | 'about'>('dashboard');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [newPost, setNewPost] = useState<AdminPost>({
    title: "",
    category: "",
    date: "",
    readTime: "",
    excerpt: "",
    image: "",
    sections: [createEmptySection()],
    takeaways: [],
  });
  const [activeSelection, setActiveSelection] = useState<{
    sectionIndex: number;
    paragraphIndex: number;
    start: number;
    end: number;
  } | null>(null);
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to load blog posts from the database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setPosts([]);
    setEditingPostId(null);
    setNewPost({
      title: "",
      category: "",
      date: "",
      readTime: "",
      excerpt: "",
      image: "",
      sections: [createEmptySection()],
      takeaways: [],
    });
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle textarea changes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof Omit<BlogPost, "slug">) => {
    const { value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add new section
  const addSection = () => {
    setNewPost((prev) => ({
      ...prev,
      sections: [...prev.sections, createEmptySection()],
    }));
  };

  // Remove section
  const removeSection = (index: number) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };
  const addParagraph = (sectionIndex: number) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex
          ? { ...section, paragraphs: [...section.paragraphs, ""] }
          : section,
      ),
    }));
  };

  const updateParagraph = (sectionIndex: number, paragraphIndex: number, value: string) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              paragraphs: section.paragraphs.map((paragraph, j) =>
                j === paragraphIndex ? value : paragraph,
              ),
            }
          : section,
      ),
    }));
  };

  const moveParagraph = (sectionIndex: number, fromIndex: number, toIndex: number) => {
    setNewPost((prev) => {
      const sections = [...prev.sections];
      const paragraphs = [...sections[sectionIndex].paragraphs];
      const temp = paragraphs[fromIndex];
      paragraphs[fromIndex] = paragraphs[toIndex];
      paragraphs[toIndex] = temp;
      sections[sectionIndex] = { ...sections[sectionIndex], paragraphs };
      return { ...prev, sections };
    });
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              paragraphs:
                section.paragraphs.length === 1
                  ? [""]
                  : section.paragraphs.filter((_, j) => j !== paragraphIndex),
            }
          : section,
      ),
    }));
  };
  // Move section up
  const moveSectionUp = (index: number) => {
    if (index > 0) {
      setNewPost((prev) => {
        const sections = [...prev.sections];
        const temp = sections[index];
        sections[index] = sections[index - 1];
        sections[index - 1] = temp;
        return { ...prev, sections };
      });
    }
  };

  // Move section down
  const moveSectionDown = (index: number) => {
    if (index < newPost.sections.length - 1) {
      setNewPost((prev) => {
        const sections = [...prev.sections];
        const temp = sections[index];
        sections[index] = sections[index + 1];
        sections[index + 1] = temp;
        return { ...prev, sections };
      });
    }
  };

  // Add takeaway
  const addTakeaway = () => {
    setNewPost((prev) => ({
      ...prev,
      takeaways: [...prev.takeaways, ""],
    }));
  };

  // Remove takeaway
  const removeTakeaway = (index: number) => {
    setNewPost((prev) => ({
      ...prev,
      takeaways: prev.takeaways.filter((_, i) => i !== index),
    }));
  };

  const handleParagraphSelect = (
    e: React.SyntheticEvent<HTMLTextAreaElement>,
    sectionIndex: number,
    paragraphIndex: number,
  ) => {
    const target = e.currentTarget;
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? 0;

    console.debug('handleParagraphSelect', { sectionIndex, paragraphIndex, start, end, value: target.value.slice(start, end) });
    if (start !== end) {
      setActiveSelection({ sectionIndex, paragraphIndex, start, end });
    } else {
      setActiveSelection(null);
    }
  };

  const handleParagraphBlur = () => {
    console.debug('handleParagraphBlur - clearing activeSelection', { activeSelection });
    setActiveSelection(null);
  };

  const keyFor = (s: number, p: number) => `${s}-${p}`;

  const getTextareaSelection = (sectionIndex: number, paragraphIndex: number) => {
    const id = `section-paragraph-${sectionIndex}-${paragraphIndex}`;
    const el = document.getElementById(id) as HTMLTextAreaElement | null;
    if (!el) return null;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    return { start, end, value: el.value, el };
  };

  const markdownToHtml = (md: string) => {
    if (!md) return "";
    try {
      const raw = marked.parse(md) as string;
      return DOMPurify.sanitize(raw);
    } catch (e) {
      // fallback to plain escaped text if parser fails
      return md.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  };

  const applyInlineFormat = (
    sectionIndex: number,
    paragraphIndex: number,
    format: "bold" | "italic" | "link" | "code" | "quote" | "comment",
  ) => {
    let sel = activeSelection;
    console.debug('applyInlineFormat called', { sectionIndex, paragraphIndex, format, activeSelection: sel });
    if (!sel || sel.sectionIndex !== sectionIndex || sel.paragraphIndex !== paragraphIndex) {
      const domSel = getTextareaSelection(sectionIndex, paragraphIndex);
      if (domSel && domSel.start !== domSel.end) {
        sel = { sectionIndex, paragraphIndex, start: domSel.start, end: domSel.end };
        console.debug('applyInlineFormat using DOM selection fallback', domSel);
      } else {
        console.debug('applyInlineFormat aborted: no selection found');
        return;
      }
    }
    let { start, end } = sel;
    const paragraph = newPost.sections[sectionIndex].paragraphs[paragraphIndex] ?? "";

    // If user selected part of a word, expand selection to word boundaries
    const isWordChar = (ch: string) => /[A-Za-z0-9_\u00C0-\u024F]/.test(ch);
    // expand start backward if selection begins in the middle of a word
    if (start > 0 && start <= paragraph.length && isWordChar(paragraph.charAt(start - 1)) && isWordChar(paragraph.charAt(start))) {
      while (start > 0 && isWordChar(paragraph.charAt(start - 1))) start--;
    }
    // expand end forward if selection ends in the middle of a word
    if (end >= 0 && end < paragraph.length && isWordChar(paragraph.charAt(end - 1)) && isWordChar(paragraph.charAt(end))) {
      while (end < paragraph.length && isWordChar(paragraph.charAt(end))) end++;
    }

    const before = paragraph.slice(0, start);
    const selected = paragraph.slice(start, end);
    const after = paragraph.slice(end);

    console.debug('applyInlineFormat selection pieces', { before, selected, after });

    // normalize selection: keep surrounding whitespace outside formatting markers
    const leadingSpaceMatch = selected.match(/^\s+/);
    const trailingSpaceMatch = selected.match(/\s+$/);
    const leadingSpace = leadingSpaceMatch ? leadingSpaceMatch[0] : "";
    const trailingSpace = trailingSpaceMatch ? trailingSpaceMatch[0] : "";
    const core = selected.trim();

    // extract punctuation that's attached to the core (e.g., commas, periods, closing parens)
    const punctPattern = /^[^\w\u00C0-\u024F]+|[^\w\u00C0-\u024F]+$/g;
    const leadingPunctMatch = core.match(/^[^\w\u00C0-\u024F]+/);
    const trailingPunctMatch = core.match(/[^\w\u00C0-\u024F]+$/);
    const leadingPunct = leadingPunctMatch ? leadingPunctMatch[0] : "";
    const trailingPunct = trailingPunctMatch ? trailingPunctMatch[0] : "";
    const coreInner = core.replace(punctPattern, "");

    let replacement = selected;
    if (format === "bold") {
      if (!coreInner) {
        replacement = leadingSpace + leadingPunct + trailingPunct + trailingSpace;
      } else if (coreInner.startsWith("**") && coreInner.endsWith("**")) {
        replacement = leadingSpace + leadingPunct + coreInner.slice(2, -2) + trailingPunct + trailingSpace;
      } else {
        replacement = leadingSpace + leadingPunct + `**${coreInner}**` + trailingPunct + trailingSpace;
      }
    }
    if (format === "italic") {
      if (!coreInner) {
        replacement = leadingSpace + leadingPunct + trailingPunct + trailingSpace;
      } else if (coreInner.startsWith("_") && coreInner.endsWith("_")) {
        replacement = leadingSpace + leadingPunct + coreInner.slice(1, -1) + trailingPunct + trailingSpace;
      } else {
        replacement = leadingSpace + leadingPunct + `_${coreInner}_` + trailingPunct + trailingSpace;
      }
    }
    if (format === "code") {
      if (!coreInner) {
        replacement = leadingSpace + leadingPunct + trailingPunct + trailingSpace;
      } else if (coreInner.startsWith("`") && coreInner.endsWith("`")) {
        replacement = leadingSpace + leadingPunct + coreInner.slice(1, -1) + trailingPunct + trailingSpace;
      } else {
        replacement = leadingSpace + leadingPunct + `\`${coreInner}\`` + trailingPunct + trailingSpace;
      }
    }
    if (format === "link") {
      const url = window.prompt("Enter URL for link", "https://");
      if (!url) return;
      replacement = leadingSpace + leadingPunct + `[${coreInner}](${url})` + trailingPunct + trailingSpace;
    }
    if (format === "quote") {
      replacement = selected
        .split(/\n/)
        .map((l) => `> ${l}`)
        .join("\n");
    }
    if (format === "comment") {
      const note = window.prompt("Enter comment for selection");
      if (!note) return;
      const k = keyFor(sectionIndex, paragraphIndex);
      setComments((prev) => ({ ...(prev || {}), [k]: [...(prev[k] || []), note] }));
      // don't modify text for comment
      console.debug('comment added', { key: k, note });
      setActiveSelection(null);
      return;
    }

    const newText = before + replacement + after;
    console.debug('applyInlineFormat will update paragraph', { newText });

    // Prefer direct DOM replacement to avoid React re-render index races
    const id = `section-paragraph-${sectionIndex}-${paragraphIndex}`;
    const ta = document.getElementById(id) as HTMLTextAreaElement | null;
    if (ta && typeof ta.setRangeText === 'function') {
      try {
        // setRangeText will replace the selected range and move the caret to the end of the replacement
        ta.setRangeText(replacement, start, end, 'end');
        // sync controlled state
        updateParagraph(sectionIndex, paragraphIndex, ta.value);
        // ensure focus remains
        ta.focus();
      } catch (e) {
        console.debug('setRangeText failed, falling back to state replace', e);
        updateParagraph(sectionIndex, paragraphIndex, newText);
        // try to restore caret
        setTimeout(() => {
          const ta2 = document.getElementById(id) as HTMLTextAreaElement | null;
          if (ta2) {
            const caret = before.length + replacement.length;
            try { ta2.selectionStart = ta2.selectionEnd = caret; } catch (_) {}
            ta2.focus();
          }
        }, 0);
      }
    } else {
      updateParagraph(sectionIndex, paragraphIndex, newText);
      setTimeout(() => {
        const ta2 = document.getElementById(id) as HTMLTextAreaElement | null;
        if (ta2) {
          const caret = before.length + replacement.length;
          try { ta2.selectionStart = ta2.selectionEnd = caret; } catch (_) {}
          ta2.focus();
        }
      }, 0);
    }
    // clear selection state
    setActiveSelection(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const normalizedPost = {
        title: newPost.title,
        category: newPost.category,
        date: newPost.date,
        readTime: newPost.readTime,
        excerpt: newPost.excerpt,
        image: newPost.image,
        sections: newPost.sections.map(adminSectionToBlogSection),
        takeaways: newPost.takeaways,
      };

      if (editingPostId) {
        const updatedPost = await updateBlogPost(editingPostId, normalizedPost);
        setPosts((current) =>
          current.map((post) => (post.slug === editingPostId ? updatedPost : post)),
        );
      } else {
        const slug = generateSlug(newPost.title) || `post-${Date.now()}`;
        const createdPost = await createBlogPost({ ...normalizedPost, slug });
        setPosts((current) => [createdPost, ...current]);
      }

      setNewPost({
        title: "",
        category: "",
        date: "",
        readTime: "",
        excerpt: "",
        image: "",
        sections: [createEmptySection()],
        takeaways: [],
      });
      setEditingPostId(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to save blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deleteBlogPost(slug);
      setPosts((current) => current.filter((post) => post.slug !== slug));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to delete blog post.");
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfilePicture((currentPicture) => {
      if (currentPicture) URL.revokeObjectURL(currentPicture);
      return previewUrl;
    });
  };

  const removeProfilePicture = () => {
    if (profilePicture) {
      URL.revokeObjectURL(profilePicture);
    }
    setProfilePicture(null);
  };

  const handleUpload = async (post: BlogPost) => {
    setIsSaving(true);
    try {
      await createBlogPost(post);
      alert("Blog post uploaded to the database.");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to upload blog post to the database.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle edit post
  const handleEdit = (post: BlogPost) => {
    setEditingPostId(post.slug);
    setNewPost({
      title: post.title,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      excerpt: post.excerpt,
      image: post.image,
      sections: post.sections.map(sectionToAdminSection),
      takeaways: post.takeaways,
    });
    setActiveTab('add-post');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-6 p-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary flex-shrink-0">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-foreground">Admin Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-muted-foreground">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            <Button type="submit" onClick={(e) => {
              e.preventDefault();
              handleLogin(adminPassword);
            }} className="w-full">
              Login
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center">
            Default password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Blog Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Logged in as Admin</span>
            <div className="flex items-center gap-3">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                onClick={() => setActiveTab('dashboard')}
                className="h-9 px-4"
              >
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'add-post' ? 'default' : 'outline'}
                onClick={() => setActiveTab('add-post')}
                className="h-9 px-4"
              >
                Add Post
              </Button>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'outline'}
                onClick={() => setActiveTab('profile')}
                className="h-9 px-4"
              >
                Profile
              </Button>
              <Button
                variant={activeTab === 'about' ? 'default' : 'outline'}
                onClick={() => setActiveTab('about')}
                className="h-9 px-4"
              >
                About
              </Button>
            </div>
            <Button variant="outline" onClick={handleLogout} className="h-9 px-4">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Dashboard</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-background rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-foreground">Total Posts</h3>
                  <p className="text-3xl font-bold text-primary mt-2">{posts.length}</p>
                </div>
                <div className="bg-background rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-foreground">Published Posts</h3>
                  <p className="text-3xl font-bold text-primary mt-2">{posts.length}</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-foreground mb-3">Your Blog Posts</h3>
                {isLoading ? (
                  <p className="text-muted-foreground">Loading posts from database...</p>
                ) : posts.length === 0 ? (
                  <p className="text-muted-foreground">No posts found. Create your first post!</p>
                ) : (
                  <div className="space-y-3">
                    {posts.map((post) => (
                      <div key={post.slug} className="flex justify-between items-start p-3 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">{post.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {post.category} • {post.date}
                          </p>
                        </div>
                        <div className="text-sm">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary hover:text-primary/80"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-post' && (
          <div className="space-y-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">
                {editingPostId ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="title" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Title
                  </label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="category" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Category
                  </label>
                  <Input
                    type="text"
                    id="category"
                    name="category"
                    value={newPost.category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="date" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Date
                  </label>
                  <Input
                    type="text"
                    id="date"
                    name="date"
                    value={newPost.date}
                    onChange={handleInputChange}
                    placeholder="e.g., Jun 22, 2026"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="readTime" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Read Time
                  </label>
                  <Input
                    type="text"
                    id="readTime"
                    name="readTime"
                    value={newPost.readTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Excerpt
                  </label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => handleTextareaChange(e, "excerpt")}
                    placeholder="Enter blog post excerpt"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="image" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Featured Image
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="featured-image-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setNewPost(prev => ({
                              ...prev,
                              image: event.target?.result as string,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('featured-image-upload')?.click()}
                      className="h-8 px-3 text-xs"
                    >
                      Upload Image
                    </Button>
                    {newPost.image && newPost.image.startsWith('data:') && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewPost(prev => ({
                            ...prev,
                            image: "",
                          }));
                        }}
                        className="h-8 px-3 text-xs"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  {newPost.image && newPost.image.startsWith('data:') && (
                    <div className="mt-2">
                      <img
                        src={newPost.image}
                        alt="Featured image preview"
                        className="max-h-24 rounded-md shadow-sm"
                      />
                    </div>
                  )}
                  {newPost.image && !newPost.image.startsWith('data:') && (
                    <div className="mt-2 p-2 bg-muted rounded border text-xs break-all">
                      {newPost.image}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Upload a featured image for your blog post header
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Sections</h3>
                  <div className="space-y-3">
                    {newPost.sections.map((section, index) => (
                      <div key={index} className="border border-border p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">Section {index + 1}</h4>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveSectionUp(index)}
                              disabled={index === 0}
                              title="Move up"
                            >
                              ↑
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveSectionDown(index)}
                              disabled={index === newPost.sections.length - 1}
                              title="Move down"
                            >
                              ↓
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeSection(index)}
                              className="h-8 px-3 text-xs"
                              disabled={newPost.sections.length === 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <label htmlFor={`section-heading-${index}`} className="block text-sm font-medium text-muted-foreground">
                              Section Header
                            </label>
                            {section.heading ? (
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                className="h-10 px-3"
                                onClick={() => {
                                  const newSections = [...newPost.sections];
                                  newSections[index] = { ...newSections[index], heading: "" };
                                  setNewPost({ ...newPost, sections: newSections });
                                }}
                              >
                                Delete header
                              </Button>
                            ) : null}
                          </div>
                          <Input
                            type="text"
                            id={`section-heading-${index}`}
                            value={section.heading}
                            onChange={(e) => {
                              const newSections = [...newPost.sections];
                              newSections[index] = { ...newSections[index], heading: e.target.value };
                              setNewPost({ ...newPost, sections: newSections });
                            }}
                            placeholder="Enter section heading"
                          />

                          <div className="space-y-2 mt-4">
                            <label className="block text-sm font-medium text-muted-foreground">
                              Section Image
                            </label>
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id={`section-image-upload-${index}`}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const newSections = [...newPost.sections];
                                      newSections[index] = {
                                        ...newSections[index],
                                        image: event.target?.result as string,
                                      };
                                      setNewPost({ ...newPost, sections: newSections });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`section-image-upload-${index}`)?.click()}
                                className="h-8 px-3 text-xs"
                              >
                                Upload Image
                              </Button>
                              {section.image && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newSections = [...newPost.sections];
                                    newSections[index] = { ...newSections[index], image: "" };
                                    setNewPost({ ...newPost, sections: newSections });
                                  }}
                                  className="h-8 px-3 text-xs"
                                >
                                  Remove Image
                                </Button>
                              )}
                            </div>
                            {section.image && (
                              <div className="mt-2 rounded-md border border-border/50 bg-muted p-2">
                                <img src={section.image} alt="Section preview" className="max-h-48 max-w-full rounded" />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-3 mt-2">
                            <label className="block text-sm font-medium text-muted-foreground">
                              Section Paragraph
                            </label>
                            <div className="flex items-center gap-2">
                              {section.paragraphs.some((paragraph) => paragraph.trim() !== "") ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  type="button"
                                  onClick={() => {
                                    const newSections = [...newPost.sections];
                                    newSections[index] = { ...newSections[index], paragraphs: [""] };
                                    setNewPost({ ...newPost, sections: newSections });
                                  }}
                                >
                                  Clear paragraphs
                                </Button>
                              ) : null}
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => addParagraph(index)}
                              >
                                Add paragraph
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {section.paragraphs.map((paragraph, paragraphIndex) => (
                              <div key={`${index}-${paragraphIndex}`} className="space-y-2 relative">
                                {activeSelection?.sectionIndex === index && activeSelection?.paragraphIndex === paragraphIndex && (
                                  <div onMouseDown={(e) => e.preventDefault()} className="absolute -top-12 left-4 z-50 flex items-center gap-2 rounded-md bg-black/90 text-white px-3 py-2 shadow-md">
                                    <button type="button" onMouseDown={(e) => e.preventDefault()} className="px-2 py-1 text-sm font-bold" onClick={() => { console.debug('toolbar bold', { index, paragraphIndex, activeSelection }); applyInlineFormat(index, paragraphIndex, 'bold') }}>B</button>
                                    <button type="button" onMouseDown={(e) => e.preventDefault()} className="px-2 py-1 text-sm italic" onClick={() => { console.debug('toolbar italic', { index, paragraphIndex, activeSelection }); applyInlineFormat(index, paragraphIndex, 'italic') }}>i</button>
                                    <button type="button" onMouseDown={(e) => e.preventDefault()} className="px-2 py-1 text-sm" onClick={() => { console.debug('toolbar link', { index, paragraphIndex, activeSelection }); applyInlineFormat(index, paragraphIndex, 'link') }}>🔗</button>
                                    <button type="button" onMouseDown={(e) => e.preventDefault()} className="px-2 py-1 text-sm font-mono" onClick={() => { console.debug('toolbar code', { index, paragraphIndex, activeSelection }); applyInlineFormat(index, paragraphIndex, 'code') }}>Tt</button>
                                    <button type="button" onMouseDown={(e) => e.preventDefault()} className="px-2 py-1 text-sm" onClick={() => { console.debug('toolbar quote', { index, paragraphIndex, activeSelection }); applyInlineFormat(index, paragraphIndex, 'quote') }}>❝</button>
                                    <button type="button" onMouseDown={(e) => e.preventDefault()} className="px-2 py-1 text-sm" onClick={() => { console.debug('toolbar comment', { index, paragraphIndex, activeSelection }); applyInlineFormat(index, paragraphIndex, 'comment') }}>💬</button>
                                  </div>
                                )}

                                  <div className="flex gap-2">
                                    <Textarea
                                      id={`section-paragraph-${index}-${paragraphIndex}`}
                                      value={paragraph}
                                      onChange={(e) => updateParagraph(index, paragraphIndex, e.target.value)}
                                      onSelect={(e) => handleParagraphSelect(e, index, paragraphIndex)}
                                      onBlur={handleParagraphBlur}
                                      placeholder="Enter paragraph text"
                                      rows={3}
                                      className="flex-1"
                                    />
                                    <div className="flex flex-col gap-1">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => moveParagraph(index, paragraphIndex, paragraphIndex - 1)}
                                        disabled={paragraphIndex === 0}
                                        className="h-8 w-8 p-0"
                                        title="Move up"
                                      >
                                        ↑
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => moveParagraph(index, paragraphIndex, paragraphIndex + 1)}
                                        disabled={paragraphIndex === section.paragraphs.length - 1}
                                        className="h-8 w-8 p-0"
                                        title="Move down"
                                      >
                                        ↓
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeParagraph(index, paragraphIndex)}
                                        className="h-8 w-8 p-0"
                                        title="Delete"
                                      >
                                        ✕
                                      </Button>
                                    </div>
                                  </div>
                                {paragraph.trim() ? (
                                  <div className="mt-4">
                                    <div className="prose prose-slate max-w-none dark:prose-invert rounded-md border border-border/50 bg-white p-4">
                                      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(paragraph) }} />
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addSection} className="h-8 px-4">
                      Add Section
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSaving ? "Saving..." : editingPostId ? "Update Post" : "Create Post"}
                </Button>
              </form>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Manage Your Blog Posts</h2>
              {posts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No blog posts found. Create your first post!</p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.slug} className="border border-border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-foreground">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {post.category} • {post.date} • {post.readTime}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            View
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            className="h-8 px-3"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleUpload(post)}
                            className="h-8 px-3"
                          >
                            Upload
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.slug)}
                            className="h-8 px-3"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            <h2 className="mb-4 text-xl font-bold text-foreground">Profile</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Admin profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                      A
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Admin User</h3>
                  <p className="text-muted-foreground">theblockchainpulse@example.com</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("profile-picture-upload")?.click()}
                    className="h-9 px-4"
                  >
                    {profilePicture ? "Change Picture" : "Upload Picture"}
                  </Button>
                  {profilePicture ? (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={removeProfilePicture}
                      className="h-9 px-4"
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="border-t border-border/50 pt-6">
                <h3 className="font-semibold text-foreground">Account Settings</h3>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">
                      Username
                    </label>
                    <Input type="text" id="username" defaultValue="admin" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input type="email" id="email" defaultValue="admin@example.com" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="block text-sm font-medium text-muted-foreground">
                      Current Password
                    </label>
                    <Input type="password" id="current-password" placeholder="••••••••" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground">
                      New Password
                    </label>
                    <Input type="password" id="new-password" placeholder="Enter new password" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Profile Picture
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("profile-picture-upload")?.click()}
                        className="h-9 px-4"
                      >
                        {profilePicture ? "Change Picture" : "Upload Picture"}
                      </Button>
                      {profilePicture ? (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={removeProfilePicture}
                          className="h-9 px-4"
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">Upload a JPG or PNG avatar for the admin profile.</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="mb-4 text-xl font-bold text-foreground">About Admin Panel</h2>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                This admin panel allows you to manage blog posts for your website.
                You can create, edit, and delete blog posts, manage your profile, and view dashboard statistics.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Create and manage blog posts</li>
                  <li>Section-based content organization</li>
                  <li>Key takeaways management</li>
                  <li>Post preview and management</li>
                  <li>User profile management</li>
                  <li>Dashboard analytics</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; 2026 Blog Admin Panel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
