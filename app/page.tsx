"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import videosData from "@/data/videos.json";
import websitesData from "@/data/websites.json";
import designsData from "@/data/designs.json";
import photosData from "@/data/photos.json";
import { getYouTubeThumbnail } from "@/lib/youtube";
import { useState } from "react";
import Image from 'next/image';

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

  const getVimeoVideoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    return match ? match[1] : null;
  };

  const getVideoId = (url: string) => {
    return getYouTubeVideoId(url) || getVimeoVideoId(url);
  };

  const getEmbedUrl = (url: string) => {
    const youtubeId = getYouTubeVideoId(url);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
    const vimeoId = getVimeoVideoId(url);
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return '';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight md:sm:text-6xl">
              Bonjour
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-muted-foreground">
              En quoi puis-je vous aider ?
            </p>
            <div className="mt-6 md:mt-10 flex flex-wrap items-center justify-start gap-2 md:gap-x-6">
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
      <section id="websites" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl">Développement</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
              Mes projets data / web.
            </p>
            
            {(() => {
              const highlights = websitesData.filter(project => project.highlight === "oui");
              return highlights.length > 0 ? (
                <div className="mt-6 md:mt-8 flex gap-3 md:gap-4 justify-start md:justify-center max-w-4xl overflow-x-auto pb-2">
                  {highlights.map((project, index) => (
                    <Card 
                      key={`highlight-${index}`} 
                      className="w-[180px] md:w-[211px] flex-shrink-0 cursor-pointer py-0 gap-1"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <CardContent className="p-2">
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                          <Image
                            src={`/images/${project.image}`}
                            alt={`Projet ${index + 1} - ${project.category}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/20 text-xs cursor-pointer">
                              Voir
                            </Button>
                          </div>
                        </div>
                        <div className="pl-2 gap-2 flex flex-col">
                          <h3 className="text-sm font-semibold">{project.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pl-3 mb-4">
                        <div className="flex flex-wrap gap-1 w-full">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-input bg-transparent text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : null;
            })()}
            
            {/* Filter Buttons */}
            <div className="mt-12 md:mt-20 flex flex-wrap gap-2 justify-center">
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

            <div className="mt-10 md:mt-16 lg:mt-20">
              {(() => {
                const others = filteredWebsites.filter(project => project.highlight !== "oui");
                return others.length > 0 ? (
                  <div className="grid max-w-4xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                    {others.map((project, index) => (
                      <Card 
                        key={`other-${index}`} 
                        className="w-full aspect-[4/3] p-2 cursor-pointer gap-2"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <CardContent className="p-0 h-full">
                          <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                              src={`/images/${project.image}`}
                              alt={`Projet ${index + 1} - ${project.category}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/20 text-xs cursor-pointer">
                                Voir
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-2 pt-0 mt-2 pb-1">
                          <div className="flex flex-wrap gap-1 w-full">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-input bg-transparent text-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Graphic Design Section */}
      <section id="graphic" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl">Graphisme</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
              Mes créations graphiques.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-2 justify-center">
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
                      <Image
                        src={`/images/${design.image}`}
                        alt={`Design ${index + 1} - ${design.category}`}
                        fill
                        className="object-cover"
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
      <section id="videos" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl">Vidéos</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
              Tournage et montage seul.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-2 justify-center">
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
                variant={selectedCategory === "motion design" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("motion design")}
              >
                Motion Design
              </Button>
              <Button 
                variant={selectedCategory === "autre" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory("autre")}
              >
                Autre
              </Button>
            </div>

            <div className="mt-10 md:mt-16 grid max-w-4xl grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:mt-20">
              {filteredVideos.map((video, index) => (
                <Card 
                  key={index} 
                  className="w-full aspect-[4/3] p-2 cursor-pointer"
                  onClick={() => openLightbox('video', video)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={getYouTubeThumbnail(video.url)}
                        alt={`Vidéo ${index + 1} - ${video.category}`}
                        fill
                        className="object-cover"
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
      <section id="photos" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl">Photos</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
              Ma galerie photo.
            </p>
            
            {/* Filter Buttons */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-2 justify-center">
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
                      <Image
                        src={`/images/${photo.image}`}
                        alt={`Photo ${index + 1} - ${photo.category}`}
                        fill
                        className="object-cover"
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
      <section id="contact" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl">Contact</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-4xl max-h-full flex items-center">
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-2 md:-left-[50px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-3xl md:text-4xl font-bold z-10 bg-black/50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
            >
              ‹
            </button>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 md:-top-12 right-2 md:right-0 text-white hover:text-gray-300 text-xl md:text-2xl font-bold z-10 bg-black/50 md:bg-transparent w-8 h-8 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
            >
              ✕
            </button>
            
            <div className="relative w-full w-full px-12 md:px-0">
              {lightboxItem.type === 'video' && (
                <div className="w-full md:w-[900px] aspect-video mx-auto">
                  <iframe
                    src={getEmbedUrl(lightboxItem.data.url)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              {(lightboxItem.type === 'design' || lightboxItem.type === 'photo') && (
                <div className="relative w-full h-[70vh] md:h-[80vh]">
                  <Image
                    src={`/images/${lightboxItem.data.image}`}
                    alt={`${lightboxItem.type} - ${lightboxItem.data.category}`}
                    fill
                    className="object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-2 md:-right-[50px] top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-3xl md:text-4xl font-bold z-10 bg-black/50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
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
