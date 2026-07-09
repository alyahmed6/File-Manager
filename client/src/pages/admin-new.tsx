import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define Section type with inline image support
interface Section {
  id: string;
  heading: string;
  body: string;
  image?: string;
  imageFile?: File;
  imagePreview?: string;
  fontSize: number;
  textColor: string;
  bgColor: string;
}

// Define BlogPost type
interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  featuredImage: string;
  featuredImageFile?: File;
  featuredImagePreview?: string;
  sections: Section[];
  takeaways: string[];
  slug?: string;
}

const ADMIN_PASSWORD = "admin123";

export default function AdminNew() {
  const [location, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add-post' | 'profile' | 'about'>('dashboard');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<Omit<BlogPost, "slug">>({
    title: "",
    category: "",
    date: "",
    readTime: "",
    excerpt: "",
    featuredImage: "",
    sections: [],
    takeaways: [],
  });
  const [fontSize, setFontSize] = useState<number>(16);
  const [textColor, setTextColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle authentication
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
      featuredImage: "",
      sections: [],
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
    const newSection: Section = {
      id: Date.now().toString(),
      heading: "",
      body: "",
      fontSize: 16,
      textColor: "#000000",
      bgColor: "#ffffff",
    };
    setNewPost((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  // Remove section
  const removeSection = (id: string) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }));
  };

  // Move section up
  const moveSectionUp = (id: string) => {
    setNewPost((prev) => {
      const sections = [...prev.sections];
      const index = sections.findIndex(s => s.id === id);
      if (index > 0) {
        const temp = sections[index];
        sections[index] = sections[index - 1];
        sections[index - 1] = temp;
      }
      return { ...prev, sections };
    });
  };

  // Move section down
  const moveSectionDown = (id: string) => {
    setNewPost((prev) => {
      const sections = [...prev.sections];
      const index = sections.findIndex(s => s.id === id);
      if (index < sections.length - 1) {
        const temp = sections[index];
        sections[index] = sections[index + 1];
        sections[index + 1] = temp;
      }
      return { ...prev, sections };
    });
  };

  // Handle section input changes
  const handleSectionChange = (id: string, field: keyof Section, value: string | number | File) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      ),
    }));
  };

  // Handle section image upload
  const handleSectionImageUpload = (e: React.ChangeEvent<HTMLInputElement>, sectionId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPost((prev) => ({
          ...prev,
          sections: prev.sections.map((section) =>
            section.id === sectionId
              ? { ...section, imageFile: file, imagePreview: event.target?.result as string }
              : section
          ),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove section image
  const removeSectionImage = (sectionId: string) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, imageFile: undefined, imagePreview: undefined, image: "" }
          : section
      ),
    }));
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPostId) {
      // Update existing post
      const updatedPosts = posts.map((post) =>
        post.slug === editingPostId ? { ...newPost, slug: editingPostId } : post
      );
      setPosts(updatedPosts);
    } else {
      // Create new post
      const slug = generateSlug(newPost.title) || `post-${Date.now()}`;
      const newBlogPost: BlogPost = {
        ...newPost,
        slug,
      };
      setPosts([...posts, newBlogPost]);
    }

    // Reset form
    setNewPost({
      title: "",
      category: "",
      date: "",
      readTime: "",
      excerpt: "",
      featuredImage: "",
      sections: [],
      takeaways: [],
    });
  };

  // Handle delete post
  const handleDelete = (slug: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.slug !== slug));
    }
  };

  // Handle edit post
  const handleEdit = (post: BlogPost) => {
    setEditingPostId(post.slug || null);
    setNewPost({
      title: post.title,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      sections: post.sections.map(section => ({
        ...section,
        imageFile: undefined,
        imagePreview: section.image,
      })),
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
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
              />
            </div>
            <Button type="submit" onClick={(e) => {
              e.preventDefault();
              const passwordInput = document.getElementById("password") as HTMLInputElement;
              handleLogin(passwordInput.value);
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
                <h3 className="font-semibold text-foreground mb-3">Recent Posts</h3>
                {posts.length === 0 ? (
                  <p className="text-muted-foreground">No posts available</p>
                ) : (
                  <div className="space-y-3">
                    {posts.slice(0, 5).map((post) => (
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
                {/* Post Metadata */}
                <div className="space-y-4">
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

                  <div className="grid md:grid-cols-2 gap-4">
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
                        placeholder="e.g., Blockchain"
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-3">
                  <label htmlFor="featuredImage" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Featured Image (Post Header)
                  </label>
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            id="featured-image-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setNewPost(prev => ({
                                    ...prev,
                                    featuredImageFile: file,
                                    featuredImagePreview: event.target?.result as string,
                                    featuredImage: "",
                                  }));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('featured-image-upload')?.click()}
                            className="h-10 px-4"
                          >
                            {newPost.featuredImagePreview ? "Change Image" : "Upload Featured Image"}
                          </Button>
                          {newPost.featuredImagePreview && (
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                setNewPost(prev => ({
                                  ...prev,
                                  featuredImageFile: undefined,
                                  featuredImagePreview: undefined,
                                  featuredImage: "",
                                }));
                              }}
                              className="h-10 px-4"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        {newPost.featuredImagePreview && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Preview:</p>
                            <img
                              src={newPost.featuredImagePreview}
                              alt="Featured preview"
                              className="max-h-32 mx-auto rounded-md shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Excerpt */}
                <div className="space-y-3">
                  <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Excerpt (Short Description)
                  </label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => handleTextareaChange(e, "excerpt")}
                    placeholder="Enter short excerpt for the post"
                    rows={3}
                    required
                  />
                </div>

                {/* Sections - Main Content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-foreground">Sections (Main Content)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSection}
                    >
                      + Add Section
                    </Button>
                  </div>

                  {newPost.sections.map((section) => (
                    <Card key={section.id} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-foreground">Section {newPost.sections.indexOf(section) + 1}</h4>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => moveSectionUp(section.id)}
                              disabled={newPost.sections.indexOf(section) === 0}
                              title="Move up"
                            >
                              ↑
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => moveSectionDown(section.id)}
                              disabled={newPost.sections.indexOf(section) === newPost.sections.length - 1}
                              title="Move down"
                            >
                              ↓
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeSection(section.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              × Remove
                            </Button>
                          </div>
                        </div>

                        {/* Section Heading */}
                        <div className="space-y-2 mb-4">
                          <Label htmlFor={`section-heading-${section.id}`} className="text-sm font-medium">
                            Heading
                          </Label>
                          <Input
                            type="text"
                            id={`section-heading-${section.id}`}
                            value={section.heading}
                            onChange={(e) => handleSectionChange(section.id, "heading", e.target.value)}
                            placeholder="Enter section heading"
                          />
                        </div>

                        {/* Section Image */}
                        <div className="space-y-3 mb-4">
                          <Label className="text-sm font-medium">Section Image (Inline)</Label>
                          <div className="flex items-center gap-3">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id={`section-image-upload-${section.id}`}
                              onChange={(e) => handleSectionImageUpload(e, section.id)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`section-image-upload-${section.id}`)?.click()}
                            >
                              {section.imagePreview ? "Change Image" : "Upload Image"}
                            </Button>
                            {section.imagePreview && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeSectionImage(section.id)}
                                className="text-red-500"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          {section.imagePreview && (
                            <div className="mt-3">
                              <img
                                src={section.imagePreview}
                                alt="Section inline"
                                className="max-h-40 rounded-md shadow-sm"
                              />
                            </div>
                          )}
                        </div>

                        {/* Section Body */}
                        <div className="space-y-2">
                          <Label htmlFor={`section-body-${section.id}`} className="text-sm font-medium">
                            Content (Paragraph)
                          </Label>
                          <Textarea
                            id={`section-body-${section.id}`}
                            value={section.body}
                            onChange={(e) => handleSectionChange(section.id, "body", e.target.value)}
                            placeholder="Enter section content..."
                            rows={5}
                            style={{
                              fontSize: `${section.fontSize}px`,
                              color: section.textColor,
                              backgroundColor: section.bgColor,
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-foreground">Key Takeaways</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTakeaway}
                    >
                      + Add Takeaway
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {newPost.takeaways.map((takeaway, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={takeaway}
                          onChange={(e) => {
                            const newTakeaways = [...newPost.takeaways];
                            newTakeaways[index] = e.target.value;
                            setNewPost(prev => ({ ...prev, takeaways: newTakeaways }));
                          }}
                          placeholder="Enter key takeaway"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTakeaway(index)}
                          className="text-red-500"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {editingPostId ? "Update Post" : "Create Post"}
                </Button>
              </form>
            </div>

            {/* Posts List */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Manage Blog Posts</h2>
              {posts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No blog posts found.</p>
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
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.slug || "")}
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
            <h2 className="mb-4 text-xl font-bold text-foreground">Profile</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="currentColor">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0-2.236 4.472l-.364.273a1.99 1.99 0 0 0-.487.955v.858a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-.858a1.99 1.99 0 0 0-.487-.955l-.364-.273A3 3 0 0 0 15 12V5a3 3 0 0 0-3-3zm0 10.18a2 2 0 1 1 0-3.999 2 2 0 0 1 0 3.999z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-foreground">Admin User</h3>
                  <p className="text-muted-foreground">theblockchainpulse@example.com</p>
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
                This admin panel allows you to create Medium-style blog posts with inline images in each section.
              </p>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Create Medium-style blog posts</li>
                  <li>Each section has heading and paragraph</li>
                  <li>Upload images within each section (inline images)</li>
                  <li>Reorder sections with up/down arrows</li>
                  <li>Manage featured image for post header</li>
                  <li>Add key takeaways</li>
                  <li>Rich text editing with formatting</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; 2026 The Blockchain Pulse Admin Panel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
