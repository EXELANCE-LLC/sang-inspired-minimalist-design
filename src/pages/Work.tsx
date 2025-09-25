import { useState } from "react";
import { Link } from "react-router-dom";
 
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { projects } from "./workData";

const Work = () => {
  const { language, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const pageTitle = language === 'tr' ? 'Projeler ve Çalışmalar | Tech Blog' : 'Projects and Work | Tech Blog';
  const pageDescription = language === 'tr' 
    ? 'Farklı teknolojiler ve endüstrilerde geliştirdiğim projeler. Web, mobil, AI ve blockchain projeleri.'
    : 'Projects I have developed in different technologies and industries. Web, mobile, AI and blockchain projects.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft">
        {/* Navigation and ActiveVisitorsBar are global */}

        <main className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-4">
                {t("work")}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'tr' 
                  ? 'Farklı teknolojiler ve endüstrilerde geliştirdiğim projeler'
                  : 'Projects I have developed in different technologies and industries'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <div 
                      className="bg-card rounded-2xl p-6 shadow-soft hover-float cursor-pointer group"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          {project.icon}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {t(project.category)}
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
                    {selectedProject && (
                      <>
                        <DialogHeader>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                              {selectedProject.icon}
                            </div>
                            <div>
                              <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                              <p className="text-muted-foreground">{selectedProject.description}</p>
                            </div>
                          </div>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm font-medium text-muted-foreground">{t("duration")}</p>
                              <p className="font-medium">{selectedProject.duration}</p>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm font-medium text-muted-foreground">{t("role")}</p>
                              <p className="font-medium">{selectedProject.role}</p>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm font-medium text-muted-foreground">{t("client")}</p>
                              <p className="font-medium">{selectedProject.client}</p>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm font-medium text-muted-foreground">{t("category")}</p>
                              <p className="font-medium">{t(selectedProject.category)}</p>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-2">Proje Detayları</h3>
                            <p className="text-muted-foreground">{selectedProject.details}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Karşılaşılan Zorluk</h3>
                            <p className="text-muted-foreground">{selectedProject.challenge}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Uygulanan Çözüm</h3>
                            <p className="text-muted-foreground">{selectedProject.solution}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Elde Edilen Sonuçlar</h3>
                            <p className="text-muted-foreground">{selectedProject.results}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-3">{t("technologies")}</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <Link to={`/work/${selectedProject.id}`}>
                              <Button variant="default">
                                Detaylı Görünüm
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                            {selectedProject.liveUrl && (
                              <a
                                href={selectedProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center"
                              >
                                <Button variant="outline">
                                  Canlı Demo
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    )}
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
    </>
  );
};

export default Work;