import { useState } from "react";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Smartphone,
  Monitor,
  Watch,
  ShoppingCart,
  Shield,
  Globe,
  Code,
  Cpu,
  Gamepad2,
  CreditCard,
  Heart,
  BookOpen,
  MessageSquare,
  BarChart3,
  Home,
  Plane,
  Truck,
  Dumbbell,
  Music,
  Video,
  FolderKanban,
  Users,
  Package,
  MessageCircle,
  Eye
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  technologies: string[];
  duration: string;
  role: string;
  client: string;
  details: string;
  challenge: string;
  solution: string;
  results: string;
}

const Work = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "FitLife Pro",
      description: "Kapsamlı fitness takip uygulaması",
      icon: <Dumbbell className="w-8 h-8" />,
      category: t("fitness_tracker"),
      technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      duration: "6 ay",
      role: "Lead Developer",
      client: "FitLife Inc.",
      details: "Kullanıcıların egzersiz rutinlerini takip edebildiği, beslenme programları oluşturabildiği ve sosyal özelliklerle motivasyonlarını artırabildiği kapsamlı bir fitness uygulaması.",
      challenge: "Gerçek zamanlı veri senkronizasyonu ve yüksek performans gerektiren karmaşık algoritmalar.",
      solution: "React Native ile cross-platform geliştirme, Node.js backend ile gerçek zamanlı senkronizasyon ve optimizasyon algoritmaları.",
      results: "App Store'da 4.8 yıldız, 100k+ aktif kullanıcı, %85 kullanıcı memnuniyeti."
    },
    {
      id: "2",
      title: "MediCare Connect",
      description: "Hastane yönetim sistemi",
      icon: <Heart className="w-8 h-8" />,
      category: t("healthcare_app"),
      technologies: ["React", "Python", "PostgreSQL", "Docker"],
      duration: "8 ay",
      role: "Full Stack Developer",
      client: "MediCare Solutions",
      details: "Hastaların randevu alabileceği, tıbbi kayıtlarını yönetebildiği ve doktorlarla iletişim kurabildiği kapsamlı sağlık platformu.",
      challenge: "HIPAA uyumluluğu ve yüksek güvenlik gereksinimleri.",
      solution: "End-to-end şifreleme, rol tabanlı erişim kontrolü ve güvenli veri depolama.",
      results: "5 hastanede aktif kullanım, %40 randevu optimizasyonu, %99.9 uptime."
    },
    {
      id: "3",
      title: "EduLearn Platform",
      description: "İnteraktif eğitim platformu",
      icon: <BookOpen className="w-8 h-8" />,
      category: t("education_platform"),
      technologies: ["Next.js", "TypeScript", "GraphQL", "AWS"],
      duration: "10 ay",
      role: "Senior Developer",
      client: "EduTech Corp",
      details: "Öğrencilerin etkileşimli derslere katılabildiği, quiz'ler çözebildği ve ilerlemelerini takip edebildiği modern eğitim platformu.",
      challenge: "Yüksek trafik ve gerçek zamanlı etkileşim gereksinimleri.",
      solution: "Next.js ile SSR, GraphQL API'leri ve AWS altyapısı ile ölçeklenebilir mimari.",
      results: "500k+ öğrenci, %92 öğrenci memnuniyeti, %30 öğrenme hızı artışı."
    },
    {
      id: "4",
      title: "ShopEase",
      description: "Modern e-ticaret platformu",
      icon: <ShoppingCart className="w-8 h-8" />,
      category: t("ecommerce_platform"),
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      duration: "7 ay",
      role: "Full Stack Developer",
      client: "RetailPlus",
      details: "Kullanıcı dostu arayüzü ve güçlü yönetim paneli ile modern e-ticaret deneyimi.",
      challenge: "Yoğun trafik dönemlerinde performans optimizasyonu.",
      solution: "Mikroservis mimarisi, Redis caching ve veritabanı optimizasyonu.",
      results: "%150 satış artışı, %85 dönüşüm oranı, 1M+ aylık ziyaretçi."
    },
    {
      id: "5",
      title: "SecureBank App",
      description: "Mobil bankacılık uygulaması",
      icon: <CreditCard className="w-8 h-8" />,
      category: t("fintech_app"),
      technologies: ["Flutter", "Firebase", "Biometric Auth", "Blockchain"],
      duration: "9 ay",
      role: "Mobile Developer",
      client: "SecureBank",
      details: "Güvenli mobil bankacılık işlemleri, biyometrik doğrulama ve blockchain tabanlı güvenlik.",
      challenge: "Bankacılık seviyesinde güvenlik ve düzenleme gereksinimleri.",
      solution: "End-to-end şifreleme, biyometrik kimlik doğrulama ve blockchain güvenlik.",
      results: "1M+ aktif kullanıcı, %99.9 güvenlik, App Store lideri."
    },
    {
      id: "6",
      title: "GameZone Arena",
      description: "Mobil oyun platformu",
      icon: <Gamepad2 className="w-8 h-8" />,
      category: t("gaming_app"),
      technologies: ["Unity", "C#", "Photon", "Firebase"],
      duration: "12 ay",
      role: "Game Developer",
      client: "GameZone Studios",
      details: "Çok oyunculu mobil oyun platformu, gerçek zamanlı multiplayer ve sosyal özellikler.",
      challenge: "Yüksek performanslı gerçek zamanlı multiplayer sistemi.",
      solution: "Photon networking, optimizasyon teknikleri ve cross-platform destek.",
      results: "10M+ indirme, %4.7 yıldız, aylık 2M+ aktif oyuncu."
    },
    {
      id: "7",
      title: "SmartWatch Health",
      description: "Akıllı saat sağlık uygulaması",
      icon: <Watch className="w-8 h-8" />,
      category: t("smart_watch_app"),
      technologies: ["Swift", "WatchOS", "HealthKit", "CoreML"],
      duration: "5 ay",
      role: "iOS Developer",
      client: "HealthTech",
      details: "Kalp ritmi, adım sayısı ve uyku takibi ile kapsamlı sağlık izleme uygulaması.",
      challenge: "Düşük güç tüketimi ve yüksek doğruluk.",
      solution: "WatchOS optimizasyonu, HealthKit entegrasyonu ve makine öğrenmesi algoritmaları.",
      results: "App Store sağlık kategorisinde #1, %95 doğruluk oranı."
    },
    {
      id: "8",
      title: "TravelMate",
      description: "Seyahat rezervasyon uygulaması",
      icon: <Plane className="w-8 h-8" />,
      category: t("travel_booking"),
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
      duration: "8 ay",
      role: "Full Stack Developer",
      client: "TravelCorp",
      details: "Uçak bileti, otel ve araç kiralama rezervasyonları için kapsamlı seyahat platformu.",
      challenge: "Çoklu API entegrasyonu ve gerçek zamanlı fiyat güncellemeleri.",
      solution: "Mikroservis mimarisi, gerçek zamanlı veri senkronizasyonu ve güvenli ödeme.",
      results: "500k+ rezervasyon, %98 müşteri memnuniyeti, %40 maliyet tasarrufu."
    },
    {
      id: "9",
      title: "FoodieExpress",
      description: "Yiyecek teslimat uygulaması",
      icon: <Truck className="w-8 h-8" />,
      category: t("food_delivery"),
      technologies: ["Flutter", "Django", "PostgreSQL", "Google Maps"],
      duration: "6 ay",
      role: "Mobile Developer",
      client: "Foodie Inc.",
      details: "Gerçek zamanlı sipariş takibi ve teslimat optimizasyonu ile modern yemek teslimat uygulaması.",
      challenge: "Gerçek zamanlı konum takibi ve rota optimizasyonu.",
      solution: "Google Maps API, gerçek zamanlı tracking ve algoritmik rota optimizasyonu.",
      results: "30 dakikalık ortalama teslimat, %95 müşteri memnuniyeti."
    },
    {
      id: "10",
      title: "MusicStream Pro",
      description: "Müzik akış platformu",
      icon: <Music className="w-8 h-8" />,
      category: t("music_streaming"),
      technologies: ["React", "Python", "AWS", "WebRTC"],
      duration: "11 ay",
      role: "Senior Developer",
      client: "MusicTech",
      details: "Yüksek kaliteli müzik akışı, playlist yönetimi ve sosyal paylaşım özelliklerini içeren platform.",
      challenge: "Yüksek trafik ve ses kalitesi optimizasyonu.",
      solution: "CDN altyapısı, ses kodlama optimizasyonu ve ölçeklenebilir mimari.",
      results: "50M+ şarkı, 5M+ aktif kullanıcı, %99.9 uptime."
    },
    {
      id: "11",
      title: "VideoConf Hub",
      description: "Video konferans platformu",
      icon: <Video className="w-8 h-8" />,
      category: t("video_conferencing"),
      technologies: ["WebRTC", "React", "Node.js", "WebSocket"],
      duration: "7 ay",
      role: "Full Stack Developer",
      client: "CommTech Solutions",
      details: "HD video konferansı, ekran paylaşımı ve gerçek zamanlı sohbet özelliklerini içeren platform.",
      challenge: "Yüksek kaliteli video akışı ve düşük gecikme.",
      solution: "WebRTC teknolojisi, optimizasyon teknikleri ve bulut altyapısı.",
      results: "1M+ günlük toplantı, %98 bağlantı kalitesi, kurumsal müşterilerin %70'i."
    },
    {
      id: "12",
      title: "ProjectFlow",
      description: "Proje yönetim aracı",
      icon: <FolderKanban className="w-8 h-8" />,
      category: t("project_management"),
      technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
      duration: "9 ay",
      role: "Full Stack Developer",
      client: "DevTools Inc.",
      details: "Kanban board, zaman takibi ve ekip işbirliği özelliklerini içeren proje yönetim platformu.",
      challenge: "Gerçek zamanlı işbirliği ve veri senkronizasyonu.",
      solution: "WebSocket teknolojisi, optimistik güncellemeler ve offline destek.",
      results: "%40 verimlilik artışı, 10k+ aktif takım, kurumsal adoption %85."
    },
    {
      id: "13",
      title: "CRM Pro",
      description: "Müşteri ilişkileri yönetimi",
      icon: <Users className="w-8 h-8" />,
      category: t("crm_system"),
      technologies: ["Angular", "Spring Boot", "PostgreSQL", "Redis"],
      duration: "10 ay",
      role: "Senior Developer",
      client: "SalesTech",
      details: "Müşteri takibi, satış pipeline yönetimi ve analitik dashboard içeren kapsamlı CRM sistemi.",
      challenge: "Büyük veri setleri ve performans optimizasyonu.",
      solution: "Mikroservis mimarisi, caching stratejileri ve veritabanı optimizasyonu.",
      results: "%35 satış artışı, %90 müşteri memnuniyeti, 500+ kurumsal müşteri."
    },
    {
      id: "14",
      title: "InventoryMaster",
      description: "Envanter yönetim sistemi",
      icon: <Package className="w-8 h-8" />,
      category: t("inventory_management"),
      technologies: ["React", "Express.js", "MongoDB", "Docker"],
      duration: "6 ay",
      role: "Full Stack Developer",
      client: "Logistics Plus",
      details: "Barkod tarama, stok takibi ve otomatik sipariş yönetimi içeren envanter kontrol sistemi.",
      challenge: "Gerçek zamanlı stok güncellemeleri ve raporlama.",
      solution: "RESTful API'ler, gerçek zamanlı güncellemeler ve kapsamlı raporlama.",
      results: "%50 envanter hatası azalması, %30 maliyet tasarrufu, 200+ mağaza."
    },
    {
      id: "15",
      title: "PaySecure",
      description: "Ödeme geçidi çözümü",
      icon: <CreditCard className="w-8 h-8" />,
      category: t("payment_gateway"),
      technologies: ["Go", "PostgreSQL", "Redis", "Docker"],
      duration: "8 ay",
      role: "Backend Developer",
      client: "FinTech Solutions",
      details: "Güvenli ödeme işleme, fraud detection ve çoklu para birimi desteği.",
      challenge: "Banka seviyesinde güvenlik ve yüksek hacimli işlemler.",
      solution: "Mikroservis mimarisi, end-to-end şifreleme ve fraud detection algoritmaları.",
      results: "1B+ işlem, %99.99 uptime, %0.01 fraud rate."
    },
    {
      id: "16",
      title: "ChatBot AI",
      description: "AI destekli chatbot çözümü",
      icon: <MessageCircle className="w-8 h-8" />,
      category: t("chatbot_solution"),
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      duration: "7 ay",
      role: "AI Developer",
      client: "BotTech AI",
      details: "Makine öğrenmesi tabanlı akıllı chatbot, doğal dil işleme ve çoklu dil desteği.",
      challenge: "Doğal dil anlayışı ve bağlam koruması.",
      solution: "NLP modelleri, derin öğrenme algoritmaları ve çoklu dil desteği.",
      results: "%85 başarı oranı, 50+ dil desteği, 1M+ günlük etkileşim."
    },
    {
      id: "17",
      title: "DataViz Pro",
      description: "Veri görselleştirme platformu",
      icon: <BarChart3 className="w-8 h-8" />,
      category: t("data_visualization"),
      technologies: ["D3.js", "React", "Python", "PostgreSQL"],
      duration: "9 ay",
      role: "Frontend Developer",
      client: "DataCorp",
      details: "Etkileşimli dashboard'lar, gerçek zamanlı grafikler ve kapsamlı analitik araçları.",
      challenge: "Büyük veri setlerinin performanslı görselleştirilmesi.",
      solution: "D3.js optimizasyonu, WebGL teknolojisi ve veri sıkıştırma.",
      results: "%60 raporlama hızı artışı, 1000+ dashboard, kurumsal adoption %95."
    },
    {
      id: "18",
      title: "RealEstate Hub",
      description: "Emlak yönetim platformu",
      icon: <Home className="w-8 h-8" />,
      category: t("real_estate_platform"),
      technologies: ["Next.js", "Prisma", "PostgreSQL", "MapBox"],
      duration: "11 ay",
      role: "Full Stack Developer",
      client: "PropertyTech",
      details: "İlan yönetimi, sanal turlar ve akıllı arama özelliklerini içeren modern emlak platformu.",
      challenge: "Yüksek çözünürlüklü görseller ve sanal tur entegrasyonu.",
      solution: "Next.js SSR, MapBox entegrasyonu ve 3D sanal tur teknolojisi.",
      results: "100k+ aktif ilan, %75 daha hızlı satış, pazar lideri."
    },
    {
      id: "19",
      title: "SocialConnect",
      description: "Sosyal medya uygulaması",
      icon: <MessageSquare className="w-8 h-8" />,
      category: t("social_media_app"),
      technologies: ["React Native", "GraphQL", "MongoDB", "AWS"],
      duration: "10 ay",
      role: "Mobile Developer",
      client: "SocialTech Inc.",
      details: "Stories, live streaming ve topluluk özelliklerini içeren modern sosyal medya platformu.",
      challenge: "Yüksek trafik ve gerçek zamanlı içerik akışı.",
      solution: "Mikroservis mimarisi, CDN optimizasyonu ve gerçek zamanlı sistemler.",
      results: "20M+ kullanıcı, günlük 1B+ etkileşim, %4.8 yıldız."
    },
    {
      id: "20",
      title: "TaskMaster",
      description: "Üretkenlik yönetim aracı",
      icon: <FolderKanban className="w-8 h-8" />,
      category: t("productivity_tool"),
      technologies: ["Electron", "React", "SQLite", "Node.js"],
      duration: "5 ay",
      role: "Desktop Developer",
      client: "Productivity Labs",
      details: "Görev yönetimi, zaman takibi ve pomodoro tekniği içeren masaüstü üretkenlik uygulaması.",
      challenge: "Cross-platform desktop uygulaması geliştirme.",
      solution: "Electron framework, SQLite veritabanı ve native entegrasyonlar.",
      results: "500k+ indirme, %4.6 yıldız, aylık 100k+ aktif kullanıcı."
    },
    {
      id: "21",
      title: "IoT Control Center",
      description: "IoT yönetim platformu",
      icon: <Cpu className="w-8 h-8" />,
      category: t("iot_platform"),
      technologies: ["React", "MQTT", "Node.js", "InfluxDB"],
      duration: "8 ay",
      role: "IoT Developer",
      client: "SmartHome Inc.",
      details: "Akıllı ev cihazlarının uzaktan kontrolü, sensör verileri takibi ve otomasyon kuralları.",
      challenge: "Gerçek zamanlı cihaz iletişimi ve veri işleme.",
      solution: "MQTT protokolü, gerçek zamanlı dashboard ve otomasyon motoru.",
      results: "50k+ bağlı cihaz, %99.9 uptime, enerji tasarrufu %30."
    },
    {
      id: "22",
      title: "BlockChain Wallet",
      description: "Kripto cüzdan uygulaması",
      icon: <CreditCard className="w-8 h-8" />,
      category: t("blockchain_solution"),
      technologies: ["React Native", "Web3.js", "Solidity", "IPFS"],
      duration: "9 ay",
      role: "Blockchain Developer",
      client: "CryptoTech",
      details: "Multi-currency destekli güvenli kripto cüzdan, DeFi entegrasyonu ve NFT yönetimi.",
      challenge: "Blockchain güvenliği ve kullanıcı dostu deneyim.",
      solution: "Web3.js entegrasyonu, güvenli key management ve sezgisel UI/UX.",
      results: "1M+ kullanıcı, $500M+ işlem hacmi, %99.9 güvenlik."
    },
    {
      id: "23",
      title: "AI Analytics",
      description: "AI destekli analitik platformu",
      icon: <BarChart3 className="w-8 h-8" />,
      category: t("ai_ml_integration"),
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
      duration: "11 ay",
      role: "AI Engineer",
      client: "Analytics Pro",
      details: "Makine öğrenmesi tabanlı tahmin analitiği, anomali tespiti ve otomatik raporlama.",
      challenge: "Büyük veri işleme ve gerçek zamanlı AI çıkarım.",
      solution: "Dağıtık ML sistemleri, optimizasyon algoritmaları ve ölçeklenebilir altyapı.",
      results: "%85 doğruluk oranı, %50 maliyet tasarrufu, Fortune 500 müşterilerinin %40'ı."
    },
    {
      id: "24",
      title: "Red Team Ops",
      description: "Kırmızı takım operasyonları",
      icon: <Shield className="w-8 h-8" />,
      category: t("red_team_specialist"),
      technologies: ["Kali Linux", "Metasploit", "Burp Suite", "Custom Tools"],
      duration: "6 ay",
      role: "Red Team Specialist",
      client: "CyberSecurity Corp",
      details: "Kurumsal ağların güvenliğini test etmek için kapsamlı penetration testing ve red team operasyonları.",
      challenge: "Gelişmiş persistent tehditler ve zero-day exploit'ler.",
      solution: "Gelişmiş penetration testing metodolojileri, custom exploit geliştirme.",
      results: "50+ güvenlik açığı keşfi, %95 tespit oranı, sertifikalı raporlar."
    },
    {
      id: "25",
      title: "Bug Bounty Hunter",
      description: "Bug bounty program yönetimi",
      icon: <Shield className="w-8 h-8" />,
      category: t("bug_bounty_hunter"),
      technologies: ["Burp Suite", "OWASP ZAP", "Custom Scripts", "Blockchain"],
      duration: "4 ay",
      role: "Security Researcher",
      client: "BugBounty Platform",
      details: "Otomatik bug bounty platformu, akıllı sözleşme güvenlik analizi ve ödül yönetimi.",
      challenge: "Blockchain protokollerinin güvenliği ve otomatik tespit.",
      solution: "Gelişmiş fuzzing teknikleri, statik/dinamik analiz ve AI destekli tespit.",
      results: "$250k+ ödül kazanımı, 100+ kritik güvenlik açığı, platform lideri."
    },
    {
      id: "26",
      title: "VR Learning",
      description: "VR eğitim deneyimi",
      icon: <Eye className="w-8 h-8" />,
      category: t("vr_ar_experience"),
      technologies: ["Unity", "C#", "Oculus SDK", "Photon"],
      duration: "10 ay",
      role: "VR Developer",
      client: "EduVR Inc.",
      details: "İmmersive eğitim deneyimleri için VR uygulaması, etkileşimli dersler ve sanal laboratuvarlar.",
      challenge: "VR performans optimizasyonu ve doğal etkileşim tasarımı.",
      solution: "Unity VR optimizasyonu, gesture recognition ve gerçekçi fizik simülasyonu.",
      results: "%200 öğrenme verimliliği artışı, 50k+ öğrenci, eğitim sektöründe devrim."
    },
    {
      id: "27",
      title: "Web Redesign Pro",
      description: "Kurumsal web yeniden tasarımı",
      icon: <Globe className="w-8 h-8" />,
      category: t("web_redesign"),
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Strapi"],
      duration: "5 ay",
      role: "Frontend Developer",
      client: "Global Corp",
      details: "Modern, responsive ve yüksek performanslı kurumsal web sitesi yeniden tasarımı.",
      challenge: "SEO optimizasyonu ve kullanıcı deneyimi iyileştirme.",
      solution: "Next.js SSR, performans optimizasyonu ve modern tasarım prensipleri.",
      results: "%150 trafik artışı, %300 dönüşüm artışı, Webby Award kazananı."
    },
    {
      id: "28",
      title: "API Gateway",
      description: "Mikroservis API gateway",
      icon: <Code className="w-8 h-8" />,
      category: t("api_development"),
      technologies: ["Go", "gRPC", "Docker", "Kubernetes"],
      duration: "7 ay",
      role: "Backend Developer",
      client: "MicroTech Solutions",
      details: "Yüksek performanslı API gateway, rate limiting, authentication ve monitoring.",
      challenge: "Yüksek trafik altında düşük gecikme ve yüksek güvenilirlik.",
      solution: "Go dilinde yüksek performanslı gateway, dağıtık caching ve monitoring.",
      results: "1B+ günlük istek, 10ms ortalama yanıt süresi, %99.99 uptime."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <VisitorStats />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-foreground mb-4">
              {t("Work")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Farklı teknolojiler ve endüstrilerde geliştirdiğim projeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div className="bg-card rounded-2xl p-6 shadow-soft hover-float cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {project.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" className="w-full text-sm">
                      {t("view_details")}
                    </Button>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        {project.icon}
                      </div>
                      <div>
                        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-muted-foreground">{t("duration")}</p>
                        <p className="font-medium">{project.duration}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-muted-foreground">{t("role")}</p>
                        <p className="font-medium">{project.role}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-muted-foreground">{t("client")}</p>
                        <p className="font-medium">{project.client}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-muted-foreground">{t("category")}</p>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Proje Detayları</h3>
                      <p className="text-muted-foreground">{project.details}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Karşılaşılan Zorluk</h3>
                      <p className="text-muted-foreground">{project.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Uygulanan Çözüm</h3>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Elde Edilen Sonuçlar</h3>
                      <p className="text-muted-foreground">{project.results}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">{t("technologies")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
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

export default Work;