import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Tag, User, ArrowLeft, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostData {
  id: string;
  slug: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  content: { tr: string; en: string };
  date: string;
  readTime: { tr: string; en: string };
  category: { tr: string; en: string };
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: { tr: string; en: string };
  };
  featured: boolean;
  metaTitle: { tr: string; en: string };
  metaDescription: { tr: string; en: string };
  metaImage: string;
  references: Array<{
    title: string;
    url: string;
    author: string;
  }>;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Fetch all blog posts to find the one with matching slug
        const blogFiles = [
          '1-ai-and-future-software-development.json',
          '2-web3-blockchain-current-state.json',
          '3-microservices-modern-backend.json',
          '4-cyber-security-bug-bounty.json',
          '5-react-19-modern-frontend.json',
          '6-edge-computing-serverless.json',
          '7-data-science-machine-learning.json',
          '8-devops-cicd-practices.json'
        ];

        let foundPost = null;
        const allPosts: BlogPostData[] = [];

        for (const file of blogFiles) {
          const response = await fetch(`/blogs/${file}`);
          if (response.ok) {
            const data = await response.json();
            allPosts.push(data);
            if (data.slug === slug) {
              foundPost = data;
            }
          }
        }

        if (foundPost) {
          setPost(foundPost);
          // Get related posts from same category
          const related = allPosts
            .filter(p => p.id !== foundPost.id && p.category.en === foundPost.category.en)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navigation />
        <div className="pt-32 pb-16 px-8 text-center">
          <h1 className="text-4xl font-light mb-4">Blog yazısı bulunamadı</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Blog'a dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = post.title[language as keyof typeof post.title] || post.title.tr;
  const content = post.content[language as keyof typeof post.content] || post.content.tr;
  const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.tr;
  const readTime = post.readTime[language as keyof typeof post.readTime] || post.readTime.tr;
  const category = post.category[language as keyof typeof post.category] || post.category.tr;
  const authorBio = post.author.bio[language as keyof typeof post.author.bio] || post.author.bio.tr;
  const metaTitle = post.metaTitle[language as keyof typeof post.metaTitle] || post.metaTitle.tr;
  const metaDescription = post.metaDescription[language as keyof typeof post.metaDescription] || post.metaDescription.tr;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.metaImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={post.metaImage} />
        <link rel="canonical" href={`${window.location.origin}/blog/${post.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft">
        <Navigation />
        <VisitorStats />

        <main className="pt-32 pb-16">
          <article className="max-w-4xl mx-auto px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-foreground transition-colors">
                    {t("home")}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/blog" className="hover:text-foreground transition-colors">
                    {t("logs")}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground truncate">{title}</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {excerpt}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{authorBio}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </header>

            {/* Hero Image */}
            {post.metaImage && (
              <div className="mb-12 -mx-8 md:mx-0">
                <img
                  src={post.metaImage}
                  alt={title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="eager"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ inline, children }) => 
                    inline ? (
                      <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>
                    ) : (
                      <code className="block bg-muted p-4 rounded-lg overflow-x-auto">{children}</code>
                    ),
                  pre: ({ children }) => <pre className="mb-4">{children}</pre>,
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="rounded-lg shadow-md my-6" loading="lazy" />
                  ),
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            <Separator className="my-12" />

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-4">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* References */}
            {post.references && post.references.length > 0 && (
              <>
                <Separator className="my-12" />
                <div className="mb-12">
                  <h3 className="text-lg font-medium mb-4">Kaynaklar ve Referanslar</h3>
                  <ul className="space-y-3">
                    {post.references.map((ref, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground">[{index + 1}]</span>
                        <div>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {ref.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <p className="text-sm text-muted-foreground">{ref.author}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <>
                <Separator className="my-12" />
                <div>
                  <h3 className="text-2xl font-medium mb-6">İlgili Yazılar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => {
                      const relatedTitle = relatedPost.title[language as keyof typeof relatedPost.title] || relatedPost.title.tr;
                      const relatedExcerpt = relatedPost.excerpt[language as keyof typeof relatedPost.excerpt] || relatedPost.excerpt.tr;
                      const relatedReadTime = relatedPost.readTime[language as keyof typeof relatedPost.readTime] || relatedPost.readTime.tr;
                      
                      return (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="bg-card rounded-lg p-6 shadow-soft hover-float h-full">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {relatedPost.category[language as keyof typeof relatedPost.category] || relatedPost.category.tr}
                              </Badge>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {relatedReadTime}
                              </div>
                            </div>
                            <h4 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {relatedTitle}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {relatedExcerpt}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </article>
        </main>

        <footer className="text-center pb-8">
          <p className="text-sm text-muted-foreground">
            © 2024 — Made with love
          </p>
        </footer>
      </div>
    </>
  );
};

export default BlogPost;