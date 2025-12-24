"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import videosData from "@/data/videos.json";
import websitesData from "@/data/websites.json";
import designsData from "@/data/designs.json";
import photosData from "@/data/photos.json";
import { getYouTubeThumbnail, getTechLogo } from "@/lib/youtube";
import { useState } from "react";

// Fonction de scroll simplifiée avec scrollIntoView natif
const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedWebsiteCategory, setSelectedWebsiteCategory] = useState<string>("all");
  const [selectedDesignCategory, setSelectedDesignCategory] = useState<string>("all");
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<{type: 'video' | 'design' | 'photo', data: any} | null>(null);

  const filteredVideos = selectedCategory === "all" 
    ? videosData 
    : videosData.filter(video => video.category === selectedCategory);

  const filteredWebsites = selectedWebsiteCategory === "all"
    ? websitesData
    : websitesData.filter(project => project.category === selectedWebsiteCategory);

  const filteredDesigns = selectedDesignCategory === "all"
    ? designsData
    : designsData.filter(design => design.category === selectedDesignCategory);

  const filteredPhotos = selectedPhotoCategory === "all"
    ? photosData
    : photosData.filter(photo => photo.category === selectedPhotoCategory);

  const openLightbox = (type: 'video' | 'design' | 'photo', data: any) => {
    setLightboxItem({ type, data });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxItem) return;

    const { type, data } = lightboxItem;
    let items: any[] = [];
    let currentIndex = -1;

    // Get items by type and category
    if (type === 'video') {
      items = filteredVideos;
      currentIndex = items.findIndex(item => item.url === data.url);
    } else if (type === 'design') {
      items = filteredDesigns;
      currentIndex = items.findIndex(item => item.image === data.image);
    } else if (type === 'photo') {
      items = filteredPhotos;
      currentIndex = items.findIndex(item => item.image === data.image);
    }

    if (items.length === 0 || currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    } else {
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    }

    setLightboxItem({ type, data: items[newIndex] });
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="border-b border-l-2 border-r-2 border-border">
        <div className="mx-auto w-[1200px] border-l-2 border-r-2 border-border text-left py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Bonjour
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              En quoi puis-je vous aider ?
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <Button size="lg" variant="outline" onClick={() => scrollToSection('websites')}>
                Développement
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('graphic')}>
                Graphisme
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('videos')}>
                Vidéos
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('photos')}>
                Photos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="border-b border-l-2 border-r-2 border-border">
        <div className="mx-auto w-[1200px] border-l-2 border-r-2 border-border text-left py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Développement</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mes projets data / web.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <Button 
                variant={selectedWebsiteCategory === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedWebsiteCategory("all")}
              >
                Tous
              </Button>
              <Button 
                variant={selectedWebsiteCategory === "web" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedWebsiteCategory("web")}
              >
                Web
              </Button>
              <Button 
                variant={selectedWebsiteCategory === "data" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedWebsiteCategory("data")}
              >
                Data
              </Button>
            </div>

            <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
              {filteredWebsites.map((project, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden p-1">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 rounded-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-[3px]">
                    <div className="flex items-center gap-1 mb-4 p-2">
                      <span className="text-xs text-white mr-2">Technos:</span>
                      {project.technologies.map((tech, techIndex) => (
                        <img
                          key={techIndex}
                          src={getTechLogo(tech)}
                          alt={tech}
                          className="h-4.5 w-auto"
                          title={tech}
                        />
                      ))}
                    </div>
                    <Button variant="outline" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Voir le projet
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Graphic Design Section */}
      <section id="graphic" className="border-b border-l-2 border-r-2 border-border">
        <div className="mx-auto w-[1200px] border-l-2 border-r-2 border-border text-left py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Graphisme</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mes créations graphiques.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <Button 
                variant={selectedDesignCategory === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedDesignCategory("all")}
              >
                Tous
              </Button>
              <Button 
                variant={selectedDesignCategory === "Entreprise" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedDesignCategory("Entreprise")}
              >
                Entreprise
              </Button>
              <Button 
                variant={selectedDesignCategory === "Création" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedDesignCategory("Création")}
              >
                Création
              </Button>
              <Button 
                variant={selectedDesignCategory === "Autre" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedDesignCategory("Autre")}
              >
                Autre
              </Button>
            </div>

            <div className="mt-16 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-6">
              {filteredDesigns.map((design, index) => (
                <Card 
                  key={index} 
                  className="w-full aspect-square p-2 cursor-pointer"
                  onClick={() => openLightbox('design', design)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={design.image}
                        alt={`Design ${index + 1} - ${design.category}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/20 text-xs cursor-pointer">
                          Voir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="border-b border-l-2 border-r-2 border-border">
        <div className="mx-auto w-[1200px] border-l-2 border-r-2 border-border text-left py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Vidéos</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tournage et montage seul.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <Button 
                variant={selectedCategory === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                Toutes
              </Button>
              <Button 
                variant={selectedCategory === "interview" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("interview")}
              >
                Interviews
              </Button>
              <Button 
                variant={selectedCategory === "évènementiel" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("évènementiel")}
              >
                Évènementiel
              </Button>
              <Button 
                variant={selectedCategory === "autre" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("autre")}
              >
                Autre
              </Button>
            </div>

            <div className="mt-16 grid max-w-4xl grid-cols-6 gap-3 sm:gap-4 lg:mt-20">
              {filteredVideos.map((video, index) => (
                <Card 
                  key={index} 
                  className="w-full aspect-[4/3] p-2 cursor-pointer"
                  onClick={() => openLightbox('video', video)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={getYouTubeThumbnail(video.url)}
                        alt={`Vidéo ${index + 1} - ${video.category}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/20 text-xs cursor-pointer">
                          Voir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="border-b border-l-2 border-r-2 border-border">
        <div className="mx-auto w-[1200px] border-l-2 border-r-2 border-border text-left py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Photos</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ma galerie photo.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <Button 
                variant={selectedPhotoCategory === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("all")}
              >
                Toutes
              </Button>
              <Button 
                variant={selectedPhotoCategory === "Paysage" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("Paysage")}
              >
                Paysage
              </Button>
              <Button 
                variant={selectedPhotoCategory === "Évènement" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("Évènement")}
              >
                Évènement
              </Button>
              <Button 
                variant={selectedPhotoCategory === "Autre" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("Autre")}
              >
                Autre
              </Button>
            </div>

            <div className="mt-16 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-6">
              {filteredPhotos.map((photo, index) => (
                <Card 
                  key={index} 
                  className="w-full aspect-square p-2 cursor-pointer"
                  onClick={() => openLightbox('photo', photo)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={photo.image}
                        alt={`Photo ${index + 1} - ${photo.category}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/20 text-xs cursor-pointer">
                          Voir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-l-2 border-r-2 border-border">
        <div className="mx-auto w-[1200px] border-l-2 border-r-2 border-border text-left py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              N'hésitez pas à me contacter pour discuter de vos projets.
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-muted-foreground">
                Email: votre.email@example.com
              </p>
              <p className="text-muted-foreground">
                Téléphone: +33 1 23 45 67 89
              </p>
              <p className="text-muted-foreground">
                LinkedIn: linkedin.com/in/votreprofil
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && lightboxItem && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full flex items-center">
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute -left-[50px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-bold z-10"
            >
              ‹
            </button>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ✕
            </button>
            
            <div className="relative">
              {lightboxItem.type === 'video' && (
                <div className="w-[900px] aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(lightboxItem.data.url)}`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              {(lightboxItem.type === 'design' || lightboxItem.type === 'photo') && (
                <img
                  src={lightboxItem.data.image}
                  alt={`${lightboxItem.type} - ${lightboxItem.data.category}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute -right-[50px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl font-bold z-10"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-left text-sm leading-loose text-muted-foreground">
            © 2025 Portfolio. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
