import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Tag, User, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface BlogPost {
  id: string;
  slug: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
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
          '1-ai-and-future-software-development.json',
          '2-web3-blockchain-current-state.json',
          '3-microservices-modern-backend.json',
          '4-cyber-security-bug-bounty.json',
          '5-react-19-modern-frontend.json',
          '6-edge-computing-serverless.json',
          '7-data-science-machine-learning.json',
          '8-devops-cicd-practices.json'
        ];

        const posts: BlogPost[] = [];
        
        for (const file of blogFiles) {
          try {
            const response = await fetch(`/blogs/${file}`);
            if (response.ok) {
              const data = await response.json();
              posts.push(data);
            }
          } catch (error) {
            console.error(`Error fetching ${file}:`, error);
          }
        }

        setBlogPosts(posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
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

  const pageTitle = language === 'tr' ? 'Tech Blog - Yazılım, AI ve Teknoloji' : 'Tech Blog - Software, AI and Technology';
  const pageDescription = language === 'tr' 
    ? 'Teknoloji, yapay zeka, blockchain, siber güvenlik ve yazılım geliştirme üzerine güncel içerikler ve derinlemesine analizler.'
    : 'Current content and in-depth analysis on technology, artificial intelligence, blockchain, cybersecurity, and software development.';

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
        <Navigation />
        <VisitorStats />
        
        <main className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-4">
                {t("Logs")}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'tr' 
                  ? 'Teknoloji, yapay zeka ve yazılım gelişmeleri üzerine düşüncelerim ve deneyimlerim'
                  : 'My thoughts and experiences on technology, AI, and software development'
                }
              </p>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-6 text-center">
                  {language === 'tr' ? 'Öne Çıkan Makaleler' : 'Featured Articles'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => {
                    const title = post.title[language as keyof typeof post.title] || post.title.tr;
                    const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.tr;
                    const readTime = post.readTime[language as keyof typeof post.readTime] || post.readTime.tr;
                    const category = post.category[language as keyof typeof post.category] || post.category.tr;
                    
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
                  className="capitalize"
                >
                  {category === "all" 
                    ? (language === 'tr' ? "Tümü" : "All")
                    : category
                  }
                </Button>
              ))}
            </div>
                
            {/* All Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const title = post.title[language as keyof typeof post.title] || post.title.tr;
                const excerpt = post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.tr;
                const readTime = post.readTime[language as keyof typeof post.readTime] || post.readTime.tr;
                const category = post.category[language as keyof typeof post.category] || post.category.tr;
                
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