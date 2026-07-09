import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "wouter";
import { BlogPost } from "@/data/blog-posts";
import { blogPosts } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ADMIN_PASSWORD = "admin123"; // Simple password protection

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(16);
  const [textColor, setTextColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle authentication
  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Load initial posts
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

  // Handle rich text formatting (bold, italic, etc.)
  const handleFormatText = (field: keyof Omit<BlogPost, "slug">, format: 'bold' | 'italic' | 'underline') => {
    // This is a simplified version - in a real app you'd use a rich text editor
    alert(`${format} formatting would be applied to ${field} in a full rich text editor`);
  };

  // Increase font size
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 36));
  };

  // Decrease font size
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 8));
  };

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, isBackground: boolean = false) => {
    if (isBackground) {
      setBgColor(e.target.value);
    } else {
      setTextColor(e.target.value);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file to server (simulated)
      const formData = new FormData();
      formData.append('file', file);

      // In a real app, you would upload to your backend here
      console.log('Uploading file:', file.name);
    }
  };

  // Trigger file input
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Remove uploaded image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        const newSections = [...prev.sections];
        const temp = newSections[index];
        newSections[index] = newSections[index - 1];
        newSections[index - 1] = temp;
        return { ...prev, sections: newSections };
      });
    }
  };

  // Move section down
  const moveSectionDown = (index: number) => {
    if (index < newPost.sections.length - 1) {
      setNewPost((prev) => {
        const newSections = [...prev.sections];
        const temp = newSections[index];
        newSections[index] = newSections[index + 1];
        newSections[index + 1] = temp;
        return { ...prev, sections: newSections };
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
      setEditingPostId(null);
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
    setActiveTab('add-post'); // Switch to add/edit post tab when editing
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
              // Get password value from input
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
            {/* Dashboard Overview */}
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
            {/* Add/Edit Post Form */}
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
                    placeholder="e.g., Jun 11, 2026"
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
                    placeholder="e.g., 3 min read"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Excerpt
                  </label>
                  {/* Text formatting toolbar */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 p-2 border border-border rounded-lg bg-muted/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFormatText('excerpt', 'bold')}
                      className="h-8 px-3"
                    >
                      B
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFormatText('excerpt', 'italic')}
                      className="h-8 px-3"
                    >
                      I
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFormatText('excerpt', 'underline')}
                      className="h-8 px-3"
                    >
                      U
                    </Button>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decreaseFontSize}
                        className="h-8 px-3"
                      >
                        A-
                      </Button>
                      <span className="text-sm text-muted-foreground">Font: {fontSize}px</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={increaseFontSize}
                        className="h-8 px-3"
                      >
                        A+
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Label htmlFor="text-color" className="text-sm font-medium">Text Color:</Label>
                      <input
                        type="color"
                        id="text-color"
                        value={textColor}
                        onChange={(e) => handleColorChange(e, false)}
                        className="w-8 h-8 p-0 border-none rounded cursor-pointer"
                      />
                      <Label htmlFor="bg-color" className="text-sm font-medium ml-2">Background:</Label>
                      <input
                        type="color"
                        id="bg-color"
                        value={bgColor}
                        onChange={(e) => handleColorChange(e, true)}
                        className="w-8 h-8 p-0 border-none rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => handleTextareaChange(e, "excerpt")}
                    placeholder="Enter blog post excerpt"
                    rows={3}
                    required
                    style={{ fontSize: `${fontSize}px`, color: textColor, backgroundColor: bgColor }}
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="image" className="mb-2 block text-sm font-medium text-muted-foreground">
                    Featured Image
                  </label>
                  {/* Image upload section */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            id="image-upload"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={triggerFileUpload}
                            className="h-10 px-4"
                          >
                            {imageFile ? "Change Image" : "Upload Image"}
                          </Button>
                          {imageFile && (
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={removeImage}
                              className="h-10 px-4"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        {imagePreview && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Image Preview:</p>
                            <div className="border border-border rounded-lg p-4 bg-muted/50">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded-md shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                        {!imagePreview && newPost.image && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Current Image URL:</p>
                            <div className="border border-border rounded-lg p-3 bg-muted/50 break-all">
                              {newPost.image}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
                              className="h-8 px-3 text-xs"
                              disabled={index === 0}
                              title="Move up"
                            >
                              ↑
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveSectionDown(index)}
                              className="h-8 px-3 text-xs"
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
                              title="Remove section"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor={`section-heading-${index}`} className="block text-sm font-medium text-muted-foreground">
                            Heading
                          </label>
                          <div className="flex flex-wrap items-start gap-2 mb-1">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleFormatText(`section-heading-${index}` as keyof Omit<BlogPost, "slug">, 'bold')}
                              className="h-7 px-2"
                            >
                              B
                            </Button>
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleFormatText(`section-heading-${index}` as keyof Omit<BlogPost, "slug">, 'italic')}
                              className="h-7 px-2"
                            >
                              I
                            </Button>
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
                          />

                          <label htmlFor={`section-body-${index}`} className="block text-sm font-medium text-muted-foreground mt-2">
                            Body
                          </label>
                          <div className="flex flex-wrap items-start gap-2 mb-1">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleFormatText(`section-body-${index}` as keyof Omit<BlogPost, "slug">, 'bold')}
                              className="h-7 px-2"
                            >
                              B
                            </Button>
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleFormatText(`section-body-${index}` as keyof Omit<BlogPost, "slug">, 'italic')}
                              className="h-7 px-2"
                            >
                              I
                            </Button>
                          </div>
                          <Textarea
                            id={`section-body-${index}`}
                            value={section.body}
                            onChange={(e) => {
                              const newSections = [...newPost.sections];
                              newSections[index] = { ...newSections[index], body: e.target.value };
                              setNewPost({ ...newPost, sections: newSections });
                            }}
                            rows={3}
                            style={{ fontSize: `${fontSize}px`, color: textColor, backgroundColor: bgColor }}
                          />
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
                      <div key={index} className="flex items-center gap-2 border border-border p-3 rounded-lg">
                        <div className="flex items-center gap-2 flex-1">
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
                            style={{ fontSize: `${fontSize}px`, color: textColor }}
                          />
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => {
                              setTextColor(e.target.value);
                            }}
                            className="w-8 h-8 p-0 border-none rounded cursor-pointer"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTakeaway(index)}
                          className="h-8 px-3 text-xs"
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
              <div class="border-t border-border/50 pt-6">
                <h3 className="font-semibold text-foreground">Account Settings</h3>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">
                      Username
                    </label>
                    <Input
                      type="text"
                      id="username"
                      defaultValue="admin"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      defaultValue="admin@example.com"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="block text-sm font-medium text-muted-foreground">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      id="current-password"
                      placeholder="••••••••"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground">
                      New Password
                    </label>
                    <Input
                      type="password"
                      id="new-password"
                      placeholder="Enter new password"
                      className="w-full"
                    />
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
                This admin panel allows you to manage blog posts for The Blockchain Pulse website.
                You can create, edit, and delete blog posts, manage your profile, and view dashboard statistics.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Create and manage blog posts</li>
                  <li>Rich text editing with basic formatting</li>
                  <li>Section-based content organization</li>
                  <li>Key takeaways management</li>
                  <li>Post preview and management</li>
                  <li>User profile management</li>
                  <li>Dashboard analytics</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Login with admin credentials (default: admin123)</li>
                  <li>Use the tabs to navigate between Dashboard, Add Post, Profile, and About</li>
                  <li>In Add Post tab, fill in the form to create new blog posts</li>
                  <li>Use the formatting buttons (B, I, U) for basic text styling</li>
                  <li>Manage existing posts from the Dashboard or Add Post tabs</li>
                  <li>Update your profile information in the Profile tab</li>
                </ol>
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