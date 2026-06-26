import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { BlogPost } from "@/data/blog-posts";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ADMIN_PASSWORD = "admin123";

export default function Admin() {
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
    image: "",
    sections: [{ heading: "", body: "" }],
    takeaways: [],
  });

  // Load posts from localStorage on initial render
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Load initial posts if no saved posts
      setPosts([...blogPosts]);
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Handle authentication
  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Load existing posts
      setPosts([...blogPosts]);
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
      sections: [{ heading: "", body: "" }],
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
      sections: [...prev.sections, { heading: "", body: "" }],
    }));
  };

  // Remove section
  const removeSection = (index: number) => {
    setNewPost((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
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
      image: "",
      sections: [{ heading: "", body: "" }],
      takeaways: [],
    });
    setEditingPostId(null);
  };

  // Handle delete post
  const handleDelete = (slug: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.slug !== slug));
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
      sections: post.sections,
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
                name="password"
                onChange={handleInputChange}
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
                <h3 className="font-semibold text-foreground mb-3">Your Blog Posts</h3>
                {posts.length === 0 ? (
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
                          <label htmlFor={`section-heading-${index}`} className="block text-sm font-medium text-muted-foreground">
                            Heading
                          </label>
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

                          <label htmlFor={`section-body-${index}`} className="block text-sm font-medium text-muted-foreground mt-2">
                            Body (Paragraph)
                          </label>
                          <Textarea
                            id={`section-body-${index}`}
                            value={section.body}
                            onChange={(e) => {
                              const newSections = [...newPost.sections];
                              newSections[index] = { ...newSections[index], body: e.target.value };
                              setNewPost({ ...newPost, sections: newSections });
                            }}
                            placeholder="Enter section content"
                            rows={4}
                          />

                          {/* Section Image Upload with File Input */}
                          <div className="space-y-2 mt-3">
                            <Label className="block text-sm font-medium text-muted-foreground">
                              Section Image (Optional)
                            </Label>
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
                                        image: event.target?.result as string
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
                                  Remove
                                </Button>
                              )}
                            </div>
                            {section.image && section.image.startsWith('data:') && (
                              <div className="mt-2">
                                <img
                                  src={section.image}
                                  alt="Section preview"
                                  className="max-h-20 rounded-md shadow-sm"
                                />
                              </div>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Upload an image that will appear within this section
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addSection} className="h-8 px-4">
                      Add Section
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Key Takeaways</h3>
                  <div className="space-y-2">
                    {newPost.takeaways.map((takeaway, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={takeaway}
                          onChange={(e) => {
                            const newTakeaways = [...newPost.takeaways];
                            newTakeaways[index] = e.target.value;
                            setNewPost({ ...newPost, takeaways: newTakeaways });
                          }}
                          placeholder="Enter takeaway"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTakeaway(index)}
                          disabled={newPost.takeaways.length === 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addTakeaway} className="h-8 px-4">
                      Add Takeaway
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {editingPostId ? "Update Post" : "Create Post"}
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
