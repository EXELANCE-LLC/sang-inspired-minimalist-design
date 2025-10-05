import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
 
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Tag, User, ArrowLeft, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPostData {
  id: string;
  slug: string;
  title: { tr: string; en: string; ar?: string };
  excerpt: { tr: string; en: string; ar?: string };
  content: { tr: string; en: string; ar?: string };
  date: string;
  readTime: { tr: string; en: string; ar?: string };
  category: { tr: string; en: string; ar?: string };
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: { tr: string; en: string; ar?: string };
  };
  featured: boolean;
  metaTitle: { tr: string; en: string; ar?: string };
  metaDescription: { tr: string; en: string; ar?: string };
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

  // Custom sanitize schema to allow iframes and other HTML elements
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      iframe: [
        'src',
        'width',
        'height',
        'frameborder',
        'allow',
        'allowfullscreen',
        'title',
        'loading',
        'class',
        'style'
      ],
      div: [...(defaultSchema.attributes?.div || []), 'class', 'style'],
      span: [...(defaultSchema.attributes?.span || []), 'class', 'style'],
    },
    tagNames: [...(defaultSchema.tagNames || []), 'iframe'],
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const blogFiles = [
          '9-docker-stability-coldstart-optimization.json',
          '1-ai-and-future-software-development.json',
          '2-web3-blockchain-current-state.json',
          '3-microservices-modern-backend.json',
          '4-cyber-security-bug-bounty.json',
          '5-react-19-modern-frontend.json',
          '6-edge-computing-serverless.json',
          '7-data-science-machine-learning.json',
          '8-devops-cicd-practices.json'
        ];

        const results = await Promise.all(
          blogFiles.map(async (file) => {
            try {
              const response = await fetch(`/blogs/${file}`);
              if (!response.ok) return null;
              return (await response.json()) as BlogPostData;
            } catch (error) {
              console.error(`Error fetching ${file}:`, error);
              return null;
            }
          })
        );

        const allPosts = results.filter((p): p is BlogPostData => Boolean(p));
        const found = allPosts.find(p => p.slug === slug) || null;

        if (found) {
          setPost(found);
          const related = allPosts
            .filter(p => p.id !== found.id && p.category.en === found.category.en)
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
      <div className="min-h-screen bg-gradient-soft">
        {/* Navigation and ActiveVisitorsBar are global */}
        <main className="pt-32 pb-16">
          <article className="max-w-4xl mx-auto px-8">
            <div className="mb-6 flex items-center gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-2/3 mb-8" />
            <Skeleton className="h-64 w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-full" />
              ))}
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        {/* Navigation is global */}
        <div className="pt-32 pb-16 px-8 text-center">
          <h1 className="text-4xl font-light mb-4">
            {language === 'tr' ? 'Blog yazısı bulunamadı' : language === 'ar' ? 'لم يتم العثور على المقالة' : 'Blog post not found'}
          </h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'tr' ? "Blog'a dön" : language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = post.title[language as keyof typeof post.title] || post.title.en || post.title.tr;
  const content = post.content[language as keyof typeof post.content] || post.content.en || post.content.tr;
  const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.en || post.excerpt.tr;
  const readTime = post.readTime[language as keyof typeof post.readTime] || post.readTime.en || post.readTime.tr;
  const category = post.category[language as keyof typeof post.category] || post.category.en || post.category.tr;
  const authorBio = post.author.bio[language as keyof typeof post.author.bio] || post.author.bio.en || post.author.bio.tr;
  const metaTitle = post.metaTitle[language as keyof typeof post.metaTitle] || post.metaTitle.en || post.metaTitle.tr;
  const metaDescription = post.metaDescription[language as keyof typeof post.metaDescription] || post.metaDescription.en || post.metaDescription.tr;

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
        {/* Navigation and ActiveVisitorsBar are global */}

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
                rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
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
                  code: ({ children, className }) => {
                    const isInline = !className?.includes('language-');
                    return isInline ? (
                      <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>
                    ) : (
                      <code className={`block bg-muted p-4 rounded-lg overflow-x-auto ${className || ''}`}>{children}</code>
                    );
                  },
                  pre: ({ children }) => <pre className="mb-4">{children}</pre>,
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="rounded-lg shadow-md my-6" loading="lazy" />
                  ),
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {children}
                    </a>
                  ),
                  iframe: ({ src, width, height, ...props }) => (
                    <div className="my-8 relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={src}
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        {...props}
                      />
                    </div>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            <Separator className="my-12" />

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-medium mb-4">
                {language === 'tr' ? 'Etiketler' : language === 'ar' ? 'العلامات' : 'Tags'}
              </h3>
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
                  <h3 className="text-lg font-medium mb-4">
                    {language === 'tr' ? 'Kaynaklar ve Referanslar' : language === 'ar' ? 'المصادر والمراجع' : 'References and Sources'}
                  </h3>
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
                  <h3 className="text-2xl font-medium mb-6">
                    {language === 'tr' ? 'İlgili Yazılar' : language === 'ar' ? 'المقالات ذات الصلة' : 'Related Posts'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => {
                      const relatedTitle = relatedPost.title[language as keyof typeof relatedPost.title] || relatedPost.title.en || relatedPost.title.tr;
                      const relatedExcerpt = relatedPost.excerpt[language as keyof typeof relatedPost.excerpt] || relatedPost.excerpt.en || relatedPost.excerpt.tr;
                      const relatedReadTime = relatedPost.readTime[language as keyof typeof relatedPost.readTime] || relatedPost.readTime.en || relatedPost.readTime.tr;
                      
                      return (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="bg-card rounded-lg p-6 shadow-soft hover-float h-full">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {relatedPost.category[language as keyof typeof relatedPost.category] || relatedPost.category.en || relatedPost.category.tr}
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