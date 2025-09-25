import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import VisitorStats from "@/components/VisitorStats";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe, Github, ExternalLink, Calendar, Clock, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Import work data (in a real app, this would come from an API or separate file)
import { projects } from "./workData";

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Find the project by ID
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navigation />
        <div className="pt-32 pb-16 px-8 text-center">
          <h1 className="text-4xl font-light mb-4">Proje bulunamadı</h1>
          <Link to="/work">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Çalışmalara dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const metaTitle = `${project.title} - ${project.category} | Tech Blog`;
  const metaDescription = `${project.description}. ${project.details}`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
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
                  <Link to="/work" className="hover:text-foreground transition-colors">
                    {t("work")}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground truncate">{project.title}</li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  {project.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {project.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground">{t("category")}</p>
                  <p className="font-medium capitalize">{project.category}</p>
                </div>
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
              </div>
            </header>

            {/* Project Image */}
            {project.images && project.images.length > 0 && (
              <div className="mb-12 -mx-8 md:mx-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Content Sections */}
            <div className="space-y-8 mb-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Proje Detayları</h2>
                <p className="text-muted-foreground leading-relaxed">{project.details}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Karşılaşılan Zorluklar</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Uygulanan Çözümler</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Elde Edilen Sonuçlar</h2>
                <p className="text-muted-foreground leading-relaxed">{project.results}</p>
              </section>
            </div>

            <Separator className="my-12" />

            {/* Technologies */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">{t("technologies")}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Links */}
            {(project.liveUrl || project.githubUrl) && (
              <>
                <Separator className="my-12" />
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Button variant="default">
                        <Globe className="w-4 h-4 mr-2" />
                        Canlı Demo
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Button variant="outline">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <>
                <Separator className="my-12" />
                <div>
                  <h3 className="text-xl font-semibold mb-4">Öne Çıkan Özellikler</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Related Projects */}
            {project.relatedProjects && project.relatedProjects.length > 0 && (
              <>
                <Separator className="my-12" />
                <div>
                  <h3 className="text-xl font-semibold mb-6">İlgili Projeler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.relatedProjects.map((relatedId: string) => {
                      const relatedProject = projects.find(p => p.id === relatedId);
                      if (!relatedProject) return null;
                      
                      return (
                        <Link
                          key={relatedProject.id}
                          to={`/work/${relatedProject.id}`}
                          className="group"
                        >
                          <div className="bg-card rounded-lg p-4 hover-float">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                {relatedProject.icon}
                              </div>
                              <h4 className="font-medium group-hover:text-primary transition-colors">
                                {relatedProject.title}
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedProject.description}
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

export default WorkDetail;