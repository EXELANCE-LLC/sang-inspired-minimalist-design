import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Tag, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
}

const Logs = () => {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // JSON formatında blog makaleleri
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Yapay Zeka ve Geleceğin Yazılım Geliştirme Pratikleri",
      content: `Yapay zeka teknolojileri, yazılım geliştirme süreçlerini kökten değiştiriyor. Bu yazıda, AI destekli kod yazma araçlarından otomatik test oluşturmaya kadar modern geliştirme pratiklerini inceleyeceğiz.

      ## AI Destekli Kod Yazma

      GitHub Copilot ve benzeri araçlar artık geliştiricilerin vazgeçilmezi haline geldi. Bu araçlar:
      - Kod tamamlamayı hızlandırıyor
      - Hata yakalama oranını artırıyor
      - Daha temiz kod yazımını teşvik ediyor

      ## Otomatik Test Oluşturma

      AI modelleri artık test senaryolarını otomatik olarak oluşturabiliyor. Bu da:
      - Test kapsamını artırıyor
      - Manuel test yazma süresini azaltıyor
      - Regresyon hatalarını erken yakalıyor

      ## Geleceğe Bakış

      2024'te AI entegrasyonu artık bir seçenek değil, zorunluluk. Geliştiricilerin AI araçlarını etkin kullanmaları gerekiyor.`,
      excerpt: "Yapay zeka teknolojilerinin yazılım geliştirme süreçlerine entegrasyonu ve gelecek trendleri.",
      date: "2024-01-15",
      readTime: "8 dk okuma",
      category: "Yapay Zeka",
      tags: ["AI", "Machine Learning", "Software Development", "Future"],
      author: "Ahmet Yılmaz",
      featured: true
    },
    {
      id: "2",
      title: "Web3 ve Blockchain Teknolojilerinin Güncel Durumu",
      content: `Web3 ekosistemi hızla gelişiyor ve geleneksel web paradigmalarını değiştiriyor. Bu yazıda, blockchain teknolojilerinin güncel durumunu ve gelecek beklentilerini değerlendireceğiz.

      ## DeFi'nin Yükselişi

      Merkeziyetsiz finans (DeFi) protokolleri artık trilyonlarca dolarlık piyasa değerine sahip. Bu büyümenin arkasındaki faktörler:
      - Yüksek getiri oranları
      - Finansal özgürlük
      - Küresel erişilebilirlik

      ## NFT Devrimi

      NFT'ler artık sadece sanat eserleri değil, çok daha fazlası. Güncel kullanım alanları:
      - Oyun içi varlıklar
      - Dijital kimlik
      - Gayrimenkul tokenizasyonu
      - Müzik hakları

      ## Kurumsal Benimseme

      Büyük şirketler artık blockchain teknolojilerini benimsemeye başladı. Bu trendin getireceği değişiklikler:
      - Tedarik zinciri optimizasyonu
      - Güvenli veri paylaşımı
      - Akıllı sözleşmeler`,
      excerpt: "Web3 teknolojilerinin gelişimi, DeFi protokolleri ve kurumsal benimseme trendleri.",
      date: "2024-01-12",
      readTime: "6 dk okuma",
      category: "Blockchain",
      tags: ["Web3", "Blockchain", "DeFi", "NFT", "Cryptocurrency"],
      author: "Mehmet Kaya",
      featured: true
    },
    {
      id: "3",
      title: "Mikroservis Mimarisi ve Modern Backend Geliştirme",
      content: `Mikroservis mimarisi, modern yazılım geliştirmenin temel taşlarından biri haline geldi. Bu yazıda, mikroservislerin avantajlarını ve uygulama pratiklerini inceleyeceğiz.

      ## Mikroservislerin Avantajları

      Mikroservis mimarisi aşağıdaki faydaları sağlar:
      - Ölçeklenebilirlik
      - Teknoloji bağımsızlığı
      - Takım bazlı geliştirme
      - Hızlı deployment

      ## Containerization ve Orchestration

      Docker ve Kubernetes artık standart hale geldi:
      - Docker: Uygulamaları konteyner haline getirme
      - Kubernetes: Konteyner orkestrasyonu
      - Helm: Paket yönetimi

      ## API Gateway ve Service Mesh

      Modern mikroservis mimarilerinde vazgeçilmezler:
      - API Gateway: Tek giriş noktası
      - Service Mesh: Servisler arası iletişim
      - Load Balancing: Trafik dağıtımı

      ## Gözlemleme ve Monitoring

      Dağıtık sistemlerde kritik önem taşıyor:
      - Log aggregation
      - Metrics collection
      - Distributed tracing`,
      excerpt: "Mikroservis mimarisinin avantajları, container teknolojileri ve modern backend pratikleri.",
      date: "2024-01-10", 
      readTime: "7 dk okuma",
      category: "Backend",
      tags: ["Microservices", "Docker", "Kubernetes", "API", "Architecture"],
      author: "Ayşe Demir",
      featured: false
    },
    {
      id: "4",
      title: "Cyber Güvenlik Trendleri ve Bug Bounty Programları",
      content: `Siber güvenlik alanında yaşanan gelişmeler ve bug bounty programlarının önemini tartışacağız.

      ## Güncel Tehditler

      2024'te karşılaştığımız başlıca tehditler:
      - Zero-day exploit'ler
      - Supply chain attacks
      - AI destekli saldırılar
      - Ransomware evrimi

      ## Bug Bounty Programları

      Güvenlik araştırmacıları için önemli fırsatlar:
      - Yüksek kazanç potansiyeli
      - Profesyonel tanınma
      - Ağ oluşturma
      - Öğrenme fırsatı

      ## Etik Hacking Pratikleri

      Sorumlu güvenlik araştırmacılığının temelleri:
      - Yasal sınırlar
      - Koordineli disclosure
      - Vulnerability management
      - Responsible reporting

      ## Gelecek Beklentileri

      Önümüzdeki dönemde beklenen gelişmeler:
      - AI destekli güvenlik araçları
      - Otomatik vulnerability scanning
      - Blockchain güvenliği
      - IoT security`,
      excerpt: "Siber güvenlik trendleri, bug bounty programları ve etik hacking pratikleri.",
      date: "2024-01-08",
      readTime: "9 dk okuma",
      category: "Cyber Security",
      tags: ["Cyber Security", "Bug Bounty", "Ethical Hacking", "Penetration Testing"],
      author: "Can Özkan",
      featured: true
    },
    {
      id: "5",
      title: "React 19 ve Modern Frontend Geliştirme",
      content: `React 19'un yeni özellikleri ve modern frontend geliştirme trendlerini inceleyeceğiz.

      ## React 19 Yenilikleri

      Yeni sürümdür getirdiği özellikler:
      - Server Components
      - Actions API
      - Asset Loading
      - Improved Developer Experience

      ## Modern Frontend Pratikleri

      Güncel geliştirme yaklaşımları:
      - Component composition
      - Custom hooks
      - Performance optimization
      - Accessibility

      ## State Management

      Modern state yönetim çözümleri:
      - Zustand
      - Jotai
      - Redux Toolkit
      - React Query

      ## Build Tools ve Optimization

      Geliştirme deneyimini iyileştiren araçlar:
      - Vite
      - Turborepo
      - SWC
      - Bundle analysis`,
      excerpt: "React 19'un yeni özellikleri ve modern frontend geliştirme pratikleri.",
      date: "2024-01-06",
      readTime: "6 dk okuma",
      category: "Frontend",
      tags: ["React", "JavaScript", "Frontend", "Web Development"],
      author: "Fatma Çelik",
      featured: false
    },
    {
      id: "6",
      title: "Edge Computing ve Serverless Teknolojiler",
      content: `Edge computing ve serverless mimarilerin avantajlarını ve kullanım senaryolarını tartışacağız.

      ## Edge Computing Avantajları

      Geleneksel bulut bilişimden farkları:
      - Düşük latency
      - Bandwidth optimization
      - Privacy ve security
      - Offline functionality

      ## Serverless Architecture

      Fonksiyon olarak servis yaklaşımı:
      - Auto-scaling
      - Cost optimization
      - Infrastructure abstraction
      - Rapid deployment

      ## Kullanım Senaryoları

      Uygun kullanım alanları:
      - IoT uygulamaları
      - Real-time analytics
      - Content delivery
      - Mobile backends

      ## Best Practices

      Başarılı uygulamalar için öneriler:
      - Cold start optimization
      - Function size limits
      - Monitoring ve logging
      - Security considerations`,
      excerpt: "Edge computing ve serverless teknolojilerinin avantajları ve modern kullanım senaryoları.",
      date: "2024-01-04",
      readTime: "7 dk okuma",
      category: "Cloud Computing",
      tags: ["Edge Computing", "Serverless", "Cloud", "IoT"],
      author: "Burak Aydın",
      featured: false
    },
    {
      id: "7",
      title: "Veri Bilimi ve Makine Öğrenmesi Pratikleri",
      content: `Modern veri bilimi pratiklerini ve makine öğrenmesi tekniklerini inceleyeceğiz.

      ## Veri Bilimi Süreci

      End-to-end veri bilimi yaklaşımı:
      - Veri toplama ve temizleme
      - Exploratory data analysis
      - Feature engineering
      - Model geliştirme ve değerlendirme

      ## Modern ML Teknikleri

      Güncel makine öğrenmesi yöntemleri:
      - Deep Learning
      - Transfer Learning
      - AutoML
      - MLOps

      ## Araçlar ve Teknolojiler

      Veri bilimi ekosistemindeki araçlar:
      - Python ekosistemi
      - Jupyter notebooks
      - TensorFlow/PyTorch
      - MLflow

      ## Production Deployment

      Model deployment stratejileri:
      - REST API'ler
      - Streaming inference
      - Edge deployment
      - A/B testing`,
      excerpt: "Veri bilimi süreçleri, makine öğrenmesi teknikleri ve production deployment pratikleri.",
      date: "2024-01-02",
      readTime: "8 dk okuma",
      category: "Data Science",
      tags: ["Data Science", "Machine Learning", "Python", "AI"],
      author: "Deniz Kara",
      featured: false
    },
    {
      id: "8",
      title: "DevOps Kültür ve CI/CD Pratikleri",
      content: `DevOps kültürünün önemini ve modern CI/CD pratiklerini tartışacağız.

      ## DevOps İlkeleri

      DevOps yaklaşımının temelleri:
      - Collaboration
      - Automation
      - Continuous improvement
      - Infrastructure as Code

      ## CI/CD Pipeline

      Modern deployment süreçleri:
      - Automated testing
      - Container orchestration
      - Blue-green deployment
      - Rollback strategies

      ## Monitoring ve Observability

      Sistem gözlemleme pratikleri:
      - Application metrics
      - Log aggregation
      - Distributed tracing
      - Alert management

      ## Security Integration

      DevSecOps yaklaşımı:
      - Security scanning
      - Vulnerability management
      - Compliance automation
      - Threat modeling`,
      excerpt: "DevOps kültürünün önemi ve modern CI/CD deployment pratikleri.",
      date: "2023-12-30",
      readTime: "6 dk okuma",
      category: "DevOps",
      tags: ["DevOps", "CI/CD", "Automation", "Infrastructure"],
      author: "Emre Şahin",
      featured: false
    }
  ];

  const categories = ["all", "Yapay Zeka", "Blockchain", "Backend", "Cyber Security", "Frontend", "Cloud Computing", "Data Science", "DevOps"];

  const filteredPosts = filterCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === filterCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
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
              Teknoloji, yapay zeka ve yazılım gelişmeleri üzerine düşüncelerim ve deneyimlerim
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6 text-center">Öne Çıkan Makaleler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="hover-float cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                {category === "all" ? "Tümü" : category}
              </Button>
            ))}
                </div>
                
          {/* All Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover-float cursor-pointer" onClick={() => setSelectedPost(post)}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Post Detail Modal */}
          {selectedPost && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{selectedPost.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedPost.readTime}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPost(null)}
                    >
                      ✕
                    </Button>
                  </div>

                  <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>

                  <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {selectedPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(selectedPost.date).toLocaleDateString('tr-TR')}
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    {selectedPost.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return <h2 key={index} className="text-2xl font-semibold mb-4 mt-8">{paragraph.slice(3)}</h2>;
                      } else if (paragraph.startsWith('### ')) {
                        return <h3 key={index} className="text-xl font-medium mb-3 mt-6">{paragraph.slice(4)}</h3>;
                      } else if (paragraph.startsWith('- ')) {
                        return <li key={index} className="mb-2">{paragraph.slice(2)}</li>;
                      } else if (paragraph.trim()) {
                        return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
                      }
                      return null;
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-medium mb-4">Etiketler</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="text-center pb-8">
        <p className="text-sm text-muted-foreground">
          © 2024 — Made with love
        </p>
      </footer>
    </div>
  );
};

export default Logs;