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

export const projects = [
  {
    id: "1",
    title: "FitLife Pro",
    description: "Kapsamlı fitness takip uygulaması",
    icon: <Dumbbell className="w-8 h-8" />,
    category: "fitness_tracker",
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    duration: "6 ay",
    role: "Lead Developer",
    client: "FitLife Inc.",
    details: "Kullanıcıların egzersiz rutinlerini takip edebildiği, beslenme programları oluşturabildiği ve sosyal özelliklerle motivasyonlarını artırabildiği kapsamlı bir fitness uygulaması.",
    challenge: "Gerçek zamanlı veri senkronizasyonu ve yüksek performans gerektiren karmaşık algoritmalar.",
    solution: "React Native ile cross-platform geliştirme, Node.js backend ile gerçek zamanlı senkronizasyon ve optimizasyon algoritmaları.",
    results: "App Store'da 4.8 yıldız, 100k+ aktif kullanıcı, %85 kullanıcı memnuniyeti.",
    images: [
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"
    ],
    features: [
      "Kişiselleştirilmiş antrenman programları",
      "Kalori ve makro takibi",
      "Sosyal özellikler ve yarışmalar",
      "Apple Watch ve Fitbit entegrasyonu",
      "AI destekli form analizi"
    ],
    liveUrl: "https://fitlifepro.com",
    githubUrl: null,
    relatedProjects: ["3", "7"]
  },
  {
    id: "2",
    title: "MediCare Connect",
    description: "Hastane yönetim sistemi",
    icon: <Heart className="w-8 h-8" />,
    category: "healthcare_app",
    technologies: ["React", "Python", "PostgreSQL", "Docker"],
    duration: "8 ay",
    role: "Full Stack Developer",
    client: "MediCare Solutions",
    details: "Hastaların randevu alabileceği, tıbbi kayıtlarını yönetebildiği ve doktorlarla iletişim kurabildiği kapsamlı sağlık platformu.",
    challenge: "HIPAA uyumluluğu ve yüksek güvenlik gereksinimleri.",
    solution: "End-to-end şifreleme, rol tabanlı erişim kontrolü ve güvenli veri depolama.",
    results: "5 hastanede aktif kullanım, %40 randevu optimizasyonu, %99.9 uptime.",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    ],
    features: [
      "Online randevu sistemi",
      "Dijital tıbbi kayıtlar",
      "Telemedicine video görüşmeleri",
      "İlaç takip ve hatırlatıcıları",
      "Acil durum bildirimleri"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["15", "7"]
  },
  {
    id: "3",
    title: "EduLearn Platform",
    description: "İnteraktif eğitim platformu",
    icon: <BookOpen className="w-8 h-8" />,
    category: "education_platform",
    technologies: ["Next.js", "TypeScript", "GraphQL", "AWS"],
    duration: "10 ay",
    role: "Senior Developer",
    client: "EduTech Corp",
    details: "Öğrencilerin etkileşimli derslere katılabildiği, quiz'ler çözebildği ve ilerlemelerini takip edebildiği modern eğitim platformu.",
    challenge: "Yüksek trafik ve gerçek zamanlı etkileşim gereksinimleri.",
    solution: "Next.js ile SSR, GraphQL API'leri ve AWS altyapısı ile ölçeklenebilir mimari.",
    results: "500k+ öğrenci, %92 öğrenci memnuniyeti, %30 öğrenme hızı artışı.",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
    ],
    features: [
      "Interaktif video dersler",
      "Gerçek zamanlı quiz'ler ve sınavlar",
      "İlerleme takibi ve analytics",
      "Gamification özellikleri",
      "Offline öğrenme desteği"
    ],
    liveUrl: "https://edulearn.com",
    githubUrl: "https://github.com/example/edulearn",
    relatedProjects: ["26", "1"]
  },
  {
    id: "4",
    title: "ShopEase",
    description: "Modern e-ticaret platformu",
    icon: <ShoppingCart className="w-8 h-8" />,
    category: "ecommerce_platform",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
    duration: "7 ay",
    role: "Full Stack Developer",
    client: "RetailPlus",
    details: "Kullanıcı dostu arayüzü ve güçlü yönetim paneli ile modern e-ticaret deneyimi.",
    challenge: "Yoğun trafik dönemlerinde performans optimizasyonu.",
    solution: "Mikroservis mimarisi, Redis caching ve veritabanı optimizasyonu.",
    results: "%150 satış artışı, %85 dönüşüm oranı, 1M+ aylık ziyaretçi.",
    images: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],
    features: [
      "AI destekli ürün önerileri",
      "360° ürün görüntüleme",
      "Tek tıkla satın alma",
      "Multi-currency desteği",
      "Advanced inventory management"
    ],
    liveUrl: "https://shopease.com",
    githubUrl: null,
    relatedProjects: ["17", "15"]
  },
  {
    id: "5",
    title: "SecureBank App",
    description: "Mobil bankacılık uygulaması",
    icon: <CreditCard className="w-8 h-8" />,
    category: "fintech_app",
    technologies: ["Flutter", "Firebase", "Biometric Auth", "Blockchain"],
    duration: "9 ay",
    role: "Mobile Developer",
    client: "SecureBank",
    details: "Güvenli mobil bankacılık işlemleri, biyometrik doğrulama ve blockchain tabanlı güvenlik.",
    challenge: "Bankacılık seviyesinde güvenlik ve düzenleme gereksinimleri.",
    solution: "End-to-end şifreleme, biyometrik kimlik doğrulama ve blockchain güvenlik.",
    results: "1M+ aktif kullanıcı, %99.9 güvenlik, App Store lideri.",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
    ],
    features: [
      "Face ID ve Touch ID desteği",
      "QR kod ile para transferi",
      "Kripto para entegrasyonu",
      "AI fraud detection",
      "Offline transaction support"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["15", "22"]
  },
  {
    id: "6",
    title: "GameZone Arena",
    description: "Mobil oyun platformu",
    icon: <Gamepad2 className="w-8 h-8" />,
    category: "gaming_app",
    technologies: ["Unity", "C#", "Photon", "Firebase"],
    duration: "12 ay",
    role: "Game Developer",
    client: "GameZone Studios",
    details: "Çok oyunculu mobil oyun platformu, gerçek zamanlı multiplayer ve sosyal özellikler.",
    challenge: "Yüksek performanslı gerçek zamanlı multiplayer sistemi.",
    solution: "Photon networking, optimizasyon teknikleri ve cross-platform destek.",
    results: "10M+ indirme, %4.7 yıldız, aylık 2M+ aktif oyuncu.",
    images: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"
    ],
    features: [
      "Cross-platform multiplayer",
      "Turnuva ve lig sistemi",
      "In-game voice chat",
      "Cloud save sync",
      "NFT rewards integration"
    ],
    liveUrl: "https://gamezonearena.com",
    githubUrl: null,
    relatedProjects: ["19", "26"]
  },
  {
    id: "7",
    title: "SmartWatch Health",
    description: "Akıllı saat sağlık uygulaması",
    icon: <Watch className="w-8 h-8" />,
    category: "smart_watch_app",
    technologies: ["Swift", "WatchOS", "HealthKit", "CoreML"],
    duration: "5 ay",
    role: "iOS Developer",
    client: "HealthTech",
    details: "Kalp ritmi, adım sayısı ve uyku takibi ile kapsamlı sağlık izleme uygulaması.",
    challenge: "Düşük güç tüketimi ve yüksek doğruluk.",
    solution: "WatchOS optimizasyonu, HealthKit entegrasyonu ve makine öğrenmesi algoritmaları.",
    results: "App Store sağlık kategorisinde #1, %95 doğruluk oranı.",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80"
    ],
    features: [
      "EKG ve kalp ritmi analizi",
      "Uyku döngüsü takibi",
      "Stres seviyesi ölçümü",
      "Emergency SOS",
      "Health data sharing"
    ],
    liveUrl: "https://smartwatchhealth.com",
    githubUrl: null,
    relatedProjects: ["1", "2"]
  },
  {
    id: "8",
    title: "TravelMate",
    description: "Seyahat rezervasyon uygulaması",
    icon: <Plane className="w-8 h-8" />,
    category: "travel_booking",
    technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
    duration: "8 ay",
    role: "Full Stack Developer",
    client: "TravelCorp",
    details: "Uçak bileti, otel ve araç kiralama rezervasyonları için kapsamlı seyahat platformu.",
    challenge: "Çoklu API entegrasyonu ve gerçek zamanlı fiyat güncellemeleri.",
    solution: "Mikroservis mimarisi, gerçek zamanlı veri senkronizasyonu ve güvenli ödeme.",
    results: "500k+ rezervasyon, %98 müşteri memnuniyeti, %40 maliyet tasarrufu.",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
    ],
    features: [
      "Price comparison engine",
      "AR destination preview",
      "Trip planner with AI",
      "Loyalty program",
      "Offline trip access"
    ],
    liveUrl: "https://travelmate.com",
    githubUrl: null,
    relatedProjects: ["17", "9"]
  },
  {
    id: "9",
    title: "FoodieExpress",
    description: "Yiyecek teslimat uygulaması",
    icon: <Truck className="w-8 h-8" />,
    category: "food_delivery",
    technologies: ["Flutter", "Django", "PostgreSQL", "Google Maps"],
    duration: "6 ay",
    role: "Mobile Developer",
    client: "Foodie Inc.",
    details: "Gerçek zamanlı sipariş takibi ve teslimat optimizasyonu ile modern yemek teslimat uygulaması.",
    challenge: "Gerçek zamanlı konum takibi ve rota optimizasyonu.",
    solution: "Google Maps API, gerçek zamanlı tracking ve algoritmik rota optimizasyonu.",
    results: "30 dakikalık ortalama teslimat, %95 müşteri memnuniyeti.",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
    ],
    features: [
      "Live order tracking",
      "AI meal recommendations",
      "Group ordering",
      "Scheduled deliveries",
      "Carbon-neutral delivery options"
    ],
    liveUrl: "https://foodieexpress.com",
    githubUrl: null,
    relatedProjects: ["8", "4"]
  },
  {
    id: "10",
    title: "MusicStream Pro",
    description: "Müzik akış platformu",
    icon: <Music className="w-8 h-8" />,
    category: "music_streaming",
    technologies: ["React", "Python", "AWS", "WebRTC"],
    duration: "11 ay",
    role: "Senior Developer",
    client: "MusicTech",
    details: "Yüksek kaliteli müzik akışı, playlist yönetimi ve sosyal paylaşım özelliklerini içeren platform.",
    challenge: "Yüksek trafik ve ses kalitesi optimizasyonu.",
    solution: "CDN altyapısı, ses kodlama optimizasyonu ve ölçeklenebilir mimari.",
    results: "50M+ şarkı, 5M+ aktif kullanıcı, %99.9 uptime.",
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
    ],
    features: [
      "Lossless audio streaming",
      "Collaborative playlists",
      "AI DJ feature",
      "Live concert streaming",
      "Spatial audio support"
    ],
    liveUrl: "https://musicstreampro.com",
    githubUrl: null,
    relatedProjects: ["11", "19"]
  },
  {
    id: "11",
    title: "VideoConf Hub",
    description: "Video konferans platformu",
    icon: <Video className="w-8 h-8" />,
    category: "video_conferencing",
    technologies: ["WebRTC", "React", "Node.js", "WebSocket"],
    duration: "7 ay",
    role: "Full Stack Developer",
    client: "CommTech Solutions",
    details: "HD video konferansı, ekran paylaşımı ve gerçek zamanlı sohbet özelliklerini içeren platform.",
    challenge: "Yüksek kaliteli video akışı ve düşük gecikme.",
    solution: "WebRTC teknolojisi, optimizasyon teknikleri ve bulut altyapısı.",
    results: "1M+ günlük toplantı, %98 bağlantı kalitesi, kurumsal müşterilerin %70'i.",
    images: [
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80"
    ],
    features: [
      "4K video support",
      "Virtual backgrounds with AI",
      "Live transcription",
      "Breakout rooms",
      "Recording and streaming"
    ],
    liveUrl: "https://videoconfhub.com",
    githubUrl: null,
    relatedProjects: ["10", "28"]
  },
  {
    id: "12",
    title: "ProjectFlow",
    description: "Proje yönetim aracı",
    icon: <FolderKanban className="w-8 h-8" />,
    category: "project_management",
    technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
    duration: "9 ay",
    role: "Full Stack Developer",
    client: "DevTools Inc.",
    details: "Kanban board, zaman takibi ve ekip işbirliği özelliklerini içeren proje yönetim platformu.",
    challenge: "Gerçek zamanlı işbirliği ve veri senkronizasyonu.",
    solution: "WebSocket teknolojisi, optimistik güncellemeler ve offline destek.",
    results: "%40 verimlilik artışı, 10k+ aktif takım, kurumsal adoption %85.",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    ],
    features: [
      "Gantt charts",
      "Time tracking",
      "Resource management",
      "Budget tracking",
      "Custom workflows"
    ],
    liveUrl: "https://projectflow.io",
    githubUrl: "https://github.com/example/projectflow",
    relatedProjects: ["13", "20"]
  },
  {
    id: "13",
    title: "CRM Pro",
    description: "Müşteri ilişkileri yönetimi",
    icon: <Users className="w-8 h-8" />,
    category: "crm_system",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Redis"],
    duration: "10 ay",
    role: "Senior Developer",
    client: "SalesTech",
    details: "Müşteri takibi, satış pipeline yönetimi ve analitik dashboard içeren kapsamlı CRM sistemi.",
    challenge: "Büyük veri setleri ve performans optimizasyonu.",
    solution: "Mikroservis mimarisi, caching stratejileri ve veritabanı optimizasyonu.",
    results: "%35 satış artışı, %90 müşteri memnuniyeti, 500+ kurumsal müşteri.",
    images: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80"
    ],
    features: [
      "Lead scoring with AI",
      "Email automation",
      "Sales forecasting",
      "Custom reporting",
      "Mobile CRM app"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["12", "14"]
  },
  {
    id: "14",
    title: "InventoryMaster",
    description: "Envanter yönetim sistemi",
    icon: <Package className="w-8 h-8" />,
    category: "inventory_management",
    technologies: ["React", "Express.js", "MongoDB", "Docker"],
    duration: "6 ay",
    role: "Full Stack Developer",
    client: "Logistics Plus",
    details: "Barkod tarama, stok takibi ve otomatik sipariş yönetimi içeren envanter kontrol sistemi.",
    challenge: "Gerçek zamanlı stok güncellemeleri ve raporlama.",
    solution: "RESTful API'ler, gerçek zamanlı güncellemeler ve kapsamlı raporlama.",
    results: "%50 envanter hatası azalması, %30 maliyet tasarrufu, 200+ mağaza.",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
    ],
    features: [
      "Barcode/QR scanning",
      "Multi-warehouse support",
      "Automatic reordering",
      "Supplier management",
      "Real-time analytics"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["13", "4"]
  },
  {
    id: "15",
    title: "PaySecure",
    description: "Ödeme geçidi çözümü",
    icon: <CreditCard className="w-8 h-8" />,
    category: "payment_gateway",
    technologies: ["Go", "PostgreSQL", "Redis", "Docker"],
    duration: "8 ay",
    role: "Backend Developer",
    client: "FinTech Solutions",
    details: "Güvenli ödeme işleme, fraud detection ve çoklu para birimi desteği.",
    challenge: "Banka seviyesinde güvenlik ve yüksek hacimli işlemler.",
    solution: "Mikroservis mimarisi, end-to-end şifreleme ve fraud detection algoritmaları.",
    results: "1B+ işlem, %99.99 uptime, %0.01 fraud rate.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1549421263-6064833b071b?w=800&q=80"
    ],
    features: [
      "PCI DSS compliance",
      "3D Secure support",
      "Cryptocurrency payments",
      "Recurring billing",
      "Multi-currency support"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["5", "22"]
  },
  {
    id: "16",
    title: "ChatBot AI",
    description: "AI destekli chatbot çözümü",
    icon: <MessageCircle className="w-8 h-8" />,
    category: "chatbot_solution",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    duration: "7 ay",
    role: "AI Developer",
    client: "BotTech AI",
    details: "Makine öğrenmesi tabanlı akıllı chatbot, doğal dil işleme ve çoklu dil desteği.",
    challenge: "Doğal dil anlayışı ve bağlam koruması.",
    solution: "NLP modelleri, derin öğrenme algoritmaları ve çoklu dil desteği.",
    results: "%85 başarı oranı, 50+ dil desteği, 1M+ günlük etkileşim.",
    images: [
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80"
    ],
    features: [
      "Natural language understanding",
      "Sentiment analysis",
      "Multi-channel support",
      "Voice integration",
      "Custom training"
    ],
    liveUrl: "https://chatbotai.com",
    githubUrl: null,
    relatedProjects: ["23", "2"]
  },
  {
    id: "17",
    title: "DataViz Pro",
    description: "Veri görselleştirme platformu",
    icon: <BarChart3 className="w-8 h-8" />,
    category: "data_visualization",
    technologies: ["D3.js", "React", "Python", "PostgreSQL"],
    duration: "9 ay",
    role: "Frontend Developer",
    client: "DataCorp",
    details: "Etkileşimli dashboard'lar, gerçek zamanlı grafikler ve kapsamlı analitik araçları.",
    challenge: "Büyük veri setlerinin performanslı görselleştirilmesi.",
    solution: "D3.js optimizasyonu, WebGL teknolojisi ve veri sıkıştırma.",
    results: "%60 raporlama hızı artışı, 1000+ dashboard, kurumsal adoption %95.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80"
    ],
    features: [
      "Real-time dashboards",
      "Custom chart types",
      "Data storytelling",
      "Export capabilities",
      "Collaborative annotations"
    ],
    liveUrl: "https://datavizpro.com",
    githubUrl: null,
    relatedProjects: ["23", "4"]
  },
  {
    id: "18",
    title: "RealEstate Hub",
    description: "Emlak yönetim platformu",
    icon: <Home className="w-8 h-8" />,
    category: "real_estate_platform",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "MapBox"],
    duration: "11 ay",
    role: "Full Stack Developer",
    client: "PropertyTech",
    details: "İlan yönetimi, sanal turlar ve akıllı arama özelliklerini içeren modern emlak platformu.",
    challenge: "Yüksek çözünürlüklü görseller ve sanal tur entegrasyonu.",
    solution: "Next.js SSR, MapBox entegrasyonu ve 3D sanal tur teknolojisi.",
    results: "100k+ aktif ilan, %75 daha hızlı satış, pazar lideri.",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      "https://images.unsplash.com/photo-1565953522043-baea26b83b7e?w=800&q=80"
    ],
    features: [
      "Virtual 3D tours",
      "AI property valuation",
      "Neighborhood insights",
      "Mortgage calculator",
      "Document management"
    ],
    liveUrl: "https://realestatehub.com",
    githubUrl: null,
    relatedProjects: ["8", "26"]
  },
  {
    id: "19",
    title: "SocialConnect",
    description: "Sosyal medya uygulaması",
    icon: <MessageSquare className="w-8 h-8" />,
    category: "social_media_app",
    technologies: ["React Native", "GraphQL", "MongoDB", "AWS"],
    duration: "10 ay",
    role: "Mobile Developer",
    client: "SocialTech Inc.",
    details: "Stories, live streaming ve topluluk özelliklerini içeren modern sosyal medya platformu.",
    challenge: "Yüksek trafik ve gerçek zamanlı içerik akışı.",
    solution: "Mikroservis mimarisi, CDN optimizasyonu ve gerçek zamanlı sistemler.",
    results: "20M+ kullanıcı, günlük 1B+ etkileşim, %4.8 yıldız.",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80"
    ],
    features: [
      "Stories and Reels",
      "Live streaming",
      "AR filters",
      "End-to-end encryption",
      "Creator monetization"
    ],
    liveUrl: "https://socialconnect.app",
    githubUrl: null,
    relatedProjects: ["6", "10"]
  },
  {
    id: "20",
    title: "TaskMaster",
    description: "Üretkenlik yönetim aracı",
    icon: <FolderKanban className="w-8 h-8" />,
    category: "productivity_tool",
    technologies: ["Electron", "React", "SQLite", "Node.js"],
    duration: "5 ay",
    role: "Desktop Developer",
    client: "Productivity Labs",
    details: "Görev yönetimi, zaman takibi ve pomodoro tekniği içeren masaüstü üretkenlik uygulaması.",
    challenge: "Cross-platform desktop uygulaması geliştirme.",
    solution: "Electron framework, SQLite veritabanı ve native entegrasyonlar.",
    results: "500k+ indirme, %4.6 yıldız, aylık 100k+ aktif kullanıcı.",
    images: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    ],
    features: [
      "Pomodoro timer",
      "Habit tracking",
      "Calendar integration",
      "Markdown notes",
      "Cloud sync"
    ],
    liveUrl: "https://taskmaster.app",
    githubUrl: "https://github.com/example/taskmaster",
    relatedProjects: ["12", "3"]
  },
  {
    id: "21",
    title: "IoT Control Center",
    description: "IoT yönetim platformu",
    icon: <Cpu className="w-8 h-8" />,
    category: "iot_platform",
    technologies: ["React", "MQTT", "Node.js", "InfluxDB"],
    duration: "8 ay",
    role: "IoT Developer",
    client: "SmartHome Inc.",
    details: "Akıllı ev cihazlarının uzaktan kontrolü, sensör verileri takibi ve otomasyon kuralları.",
    challenge: "Gerçek zamanlı cihaz iletişimi ve veri işleme.",
    solution: "MQTT protokolü, gerçek zamanlı dashboard ve otomasyon motoru.",
    results: "50k+ bağlı cihaz, %99.9 uptime, enerji tasarrufu %30.",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      "https://images.unsplash.com/photo-1565891741441-64926e441838?w=800&q=80"
    ],
    features: [
      "Device discovery",
      "Rule engine",
      "Energy monitoring",
      "Voice control",
      "Predictive maintenance"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["7", "28"]
  },
  {
    id: "22",
    title: "BlockChain Wallet",
    description: "Kripto cüzdan uygulaması",
    icon: <CreditCard className="w-8 h-8" />,
    category: "blockchain_solution",
    technologies: ["React Native", "Web3.js", "Solidity", "IPFS"],
    duration: "9 ay",
    role: "Blockchain Developer",
    client: "CryptoTech",
    details: "Multi-currency destekli güvenli kripto cüzdan, DeFi entegrasyonu ve NFT yönetimi.",
    challenge: "Blockchain güvenliği ve kullanıcı dostu deneyim.",
    solution: "Web3.js entegrasyonu, güvenli key management ve sezgisel UI/UX.",
    results: "1M+ kullanıcı, $500M+ işlem hacmi, %99.9 güvenlik.",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80"
    ],
    features: [
      "Multi-chain support",
      "DeFi integration",
      "NFT gallery",
      "Hardware wallet support",
      "Staking rewards"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["5", "15"]
  },
  {
    id: "23",
    title: "AI Analytics",
    description: "AI destekli analitik platformu",
    icon: <BarChart3 className="w-8 h-8" />,
    category: "ai_ml_integration",
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
    duration: "11 ay",
    role: "AI Engineer",
    client: "Analytics Pro",
    details: "Makine öğrenmesi tabanlı tahmin analitiği, anomali tespiti ve otomatik raporlama.",
    challenge: "Büyük veri işleme ve gerçek zamanlı AI çıkarım.",
    solution: "Dağıtık ML sistemleri, optimizasyon algoritmaları ve ölçeklenebilir altyapı.",
    results: "%85 doğruluk oranı, %50 maliyet tasarrufu, Fortune 500 müşterilerinin %40'ı.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6baac?w=800&q=80"
    ],
    features: [
      "Predictive analytics",
      "Anomaly detection",
      "Natural language queries",
      "AutoML capabilities",
      "Custom model training"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["17", "16"]
  },
  {
    id: "24",
    title: "Red Team Ops",
    description: "Kırmızı takım operasyonları",
    icon: <Shield className="w-8 h-8" />,
    category: "red_team_specialist",
    technologies: ["Kali Linux", "Metasploit", "Burp Suite", "Custom Tools"],
    duration: "6 ay",
    role: "Red Team Specialist",
    client: "CyberSecurity Corp",
    details: "Kurumsal ağların güvenliğini test etmek için kapsamlı penetration testing ve red team operasyonları.",
    challenge: "Gelişmiş persistent tehditler ve zero-day exploit'ler.",
    solution: "Gelişmiş penetration testing metodolojileri, custom exploit geliştirme.",
    results: "50+ güvenlik açığı keşfi, %95 tespit oranı, sertifikalı raporlar.",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80"
    ],
    features: [
      "Advanced exploitation",
      "Social engineering",
      "Physical security testing",
      "Custom payload development",
      "Comprehensive reporting"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["25", "28"]
  },
  {
    id: "25",
    title: "Bug Bounty Hunter",
    description: "Bug bounty program yönetimi",
    icon: <Shield className="w-8 h-8" />,
    category: "bug_bounty_hunter",
    technologies: ["Burp Suite", "OWASP ZAP", "Custom Scripts", "Blockchain"],
    duration: "4 ay",
    role: "Security Researcher",
    client: "BugBounty Platform",
    details: "Otomatik bug bounty platformu, akıllı sözleşme güvenlik analizi ve ödül yönetimi.",
    challenge: "Blockchain protokollerinin güvenliği ve otomatik tespit.",
    solution: "Gelişmiş fuzzing teknikleri, statik/dinamik analiz ve AI destekli tespit.",
    results: "$250k+ ödül kazanımı, 100+ kritik güvenlik açığı, platform lideri.",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
    ],
    features: [
      "Automated scanning",
      "Smart contract auditing",
      "Reward management",
      "Vulnerability tracking",
      "Community collaboration"
    ],
    liveUrl: null,
    githubUrl: null,
    relatedProjects: ["24", "22"]
  },
  {
    id: "26",
    title: "VR Learning",
    description: "VR eğitim deneyimi",
    icon: <Eye className="w-8 h-8" />,
    category: "vr_ar_experience",
    technologies: ["Unity", "C#", "Oculus SDK", "Photon"],
    duration: "10 ay",
    role: "VR Developer",
    client: "EduVR Inc.",
    details: "İmmersive eğitim deneyimleri için VR uygulaması, etkileşimli dersler ve sanal laboratuvarlar.",
    challenge: "VR performans optimizasyonu ve doğal etkileşim tasarımı.",
    solution: "Unity VR optimizasyonu, gesture recognition ve gerçekçi fizik simülasyonu.",
    results: "%200 öğrenme verimliliği artışı, 50k+ öğrenci, eğitim sektöründe devrim.",
    images: [
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80",
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80"
    ],
    features: [
      "Hand tracking",
      "Multiplayer sessions",
      "Virtual labs",
      "Progress tracking",
      "Cross-platform support"
    ],
    liveUrl: "https://vrlearning.edu",
    githubUrl: null,
    relatedProjects: ["3", "6"]
  },
  {
    id: "27",
    title: "Web Redesign Pro",
    description: "Kurumsal web yeniden tasarımı",
    icon: <Globe className="w-8 h-8" />,
    category: "web_redesign",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Strapi"],
    duration: "5 ay",
    role: "Frontend Developer",
    client: "Global Corp",
    details: "Modern, responsive ve yüksek performanslı kurumsal web sitesi yeniden tasarımı.",
    challenge: "SEO optimizasyonu ve kullanıcı deneyimi iyileştirme.",
    solution: "Next.js SSR, performans optimizasyonu ve modern tasarım prensipleri.",
    results: "%150 trafik artışı, %300 dönüşüm artışı, Webby Award kazananı.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c553?w=800&q=80"
    ],
    features: [
      "Responsive design",
      "SEO optimization",
      "Performance focused",
      "CMS integration",
      "A/B testing"
    ],
    liveUrl: "https://globalcorp.com",
    githubUrl: null,
    relatedProjects: ["18", "4"]
  },
  {
    id: "28",
    title: "API Gateway",
    description: "Mikroservis API gateway",
    icon: <Code className="w-8 h-8" />,
    category: "api_development",
    technologies: ["Go", "gRPC", "Docker", "Kubernetes"],
    duration: "7 ay",
    role: "Backend Developer",
    client: "MicroTech Solutions",
    details: "Yüksek performanslı API gateway, rate limiting, authentication ve monitoring.",
    challenge: "Yüksek trafik altında düşük gecikme ve yüksek güvenilirlik.",
    solution: "Go dilinde yüksek performanslı gateway, dağıtık caching ve monitoring.",
    results: "1B+ günlük istek, 10ms ortalama yanıt süresi, %99.99 uptime.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    ],
    features: [
      "Rate limiting",
      "JWT authentication",
      "Request routing",
      "Load balancing",
      "Circuit breaker"
    ],
    liveUrl: null,
    githubUrl: "https://github.com/example/api-gateway",
    relatedProjects: ["11", "21"]
  }
];