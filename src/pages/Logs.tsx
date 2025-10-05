import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
 
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Tag, User, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: { tr: string; en: string; ar?: string };
  excerpt: { tr: string; en: string; ar?: string };
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
  metaImage: string;
}

const Logs = () => {
  const { language, t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const fetchBlogPosts = async () => {
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
              return (await response.json()) as BlogPost;
            } catch (error) {
              console.error(`Error fetching ${file}:`, error);
              return null;
            }
          })
        );

        const posts = results.filter((p): p is BlogPost => Boolean(p));
        setBlogPosts(
          posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(blogPosts.map(post => post.category.en))];

  const filteredPosts = filterCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category.en === filterCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  // Multi-language page metadata
  const pageTitles = {
    en: 'WebustaLLC - Software, AI and Technology',
    tr: 'WebustaLLC - Yazılım, AI ve Teknoloji',
    ar: 'WebustaLLC - البرمجيات والذكاء الاصطناعي والتكنولوجيا'
  };

  const pageDescriptions = {
    en: 'Current content and in-depth analysis on technology, artificial intelligence, blockchain, cybersecurity, and software development.',
    tr: 'Teknoloji, yapay zeka, blockchain, siber güvenlik ve yazılım geliştirme üzerine güncel içerikler ve derinlemesine analizler.',
    ar: 'محتوى حالي وتحليل متعمق حول التكنولوجيا والذكاء الاصطناعي والبلوكشين والأمن السيبراني وتطوير البرمجيات.'
  };

  const pageTitle = pageTitles[language as keyof typeof pageTitles] || pageTitles.en;
  const pageDescription = pageDescriptions[language as keyof typeof pageDescriptions] || pageDescriptions.en;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        {/* Navigation and ActiveVisitorsBar are global */}
        <main className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-96 mx-auto" />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-8 w-20 rounded-full" />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="rounded-lg border bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft">
        {/* Navigation and ActiveVisitorsBar are global */}
        
        <main className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-4">
                {t("Logs")}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'tr' 
                  ? 'Teknoloji, yapay zeka ve yazılım gelişmeleri üzerine düşüncelerim ve deneyimlerim'
                  : language === 'ar'
                  ? 'أفكاري وتجاربي حول التكنولوجيا والذكاء الاصطناعي وتطوير البرمجيات'
                  : 'My thoughts and experiences on technology, AI, and software development'
                }
              </p>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-6 text-center">
                  {language === 'tr' ? 'Öne Çıkan Makaleler' : language === 'ar' ? 'المقالات المميزة' : 'Featured Articles'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => {
                    const title = post.title[language as keyof typeof post.title] || post.title.en || post.title.tr;
                    const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.en || post.excerpt.tr;
                    const readTime = post.readTime[language as keyof typeof post.readTime] || post.readTime.en || post.readTime.tr;
                    const category = post.category[language as keyof typeof post.category] || post.category.en || post.category.tr;
                    
                    return (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                        <Card className="hover-float cursor-pointer h-full">
                          {post.metaImage && (
                            <div className="aspect-video overflow-hidden rounded-t-lg">
                              <img 
                                src={post.metaImage} 
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary">{category}</Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                {readTime}
                              </div>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <img 
                                  src={post.author.avatar} 
                                  alt={post.author.name}
                                  className="w-6 h-6 rounded-full mr-2"
                                />
                                {post.author.name}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(post.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className=""
                >
                  {category === "all" 
                    ? (language === 'tr' ? "Tümü" : language === 'ar' ? "الكل" : "All")
                    : category
                  }
                </Button>
              ))}
            </div>
                
            {/* All Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const title = post.title[language as keyof typeof post.title] || post.title.en || post.title.tr;
                const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.en || post.excerpt.tr;
                const readTime = post.readTime[language as keyof typeof post.readTime] || post.readTime.en || post.readTime.tr;
                const category = post.category[language as keyof typeof post.category] || post.category.en || post.category.tr;
                
                return (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                    <Card className="hover-float cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {readTime}
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <img 
                              src={post.author.avatar} 
                              alt={post.author.name}
                              className="w-5 h-5 rounded-full mr-2"
                            />
                            {post.author.name}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
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

export default Logs;