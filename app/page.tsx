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
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);

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
    
    // Load image dimensions for design and photo types
    if (type === 'design' || type === 'photo') {
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = `/images/${data.image}`;
    } else {
      setImageDimensions(null);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxItem(null);
    setImageDimensions(null);
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

    const newData = items[newIndex];
    
    // Reset dimensions first to avoid zoom effect
    if (type === 'design' || type === 'photo') {
      setImageDimensions(null);
    }
    
    setLightboxItem({ type, data: newData });
    
    // Load new image dimensions
    if (type === 'design' || type === 'photo') {
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = `/images/${newData.image}`;
    }
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
              <div className="relative group p-[1px] inline-flex items-center justify-center overflow-hidden rounded-md">
                {/* La bordure avec tes couleurs, sans aucune transition parasite */}
                <div 
                  className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite]" 
                  style={{ 
                    backgroundImage: `conic-gradient(from 90deg at 50% 50%, #000 0%, #000 50%, #e2e8f062 100%)`,
                    animationTimingFunction: 'linear',
                    transition: 'none' // Désactive toute transition qui pourrait lisser le mouvement
                  }}
                />
                {/* Le bouton */}
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('about')}
                  className="relative bg-background"
                >
                  Contact
                </Button>
              </div>
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
                <>
                  <div className="mt-6 md:mt-8 flex gap-3 md:gap-4 justify-start md:justify-center max-w-4xl overflow-x-auto pb-2">
                    {highlights.map((project, index) => (
                      <Card 
                        key={`highlight-${index}`} 
                        className={`w-[180px] md:w-[211px] flex-shrink-0 cursor-pointer py-0 gap-1 hover:bg-[#1c1c1c] hover:border-white/20 transition-colors ${project.title === "GitHub" ? "bg-transparent" : ""}`}
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <CardContent className="p-2">
                          <div className={`relative w-full ${project.title === "GitHub" ? "h-[200px]" : "aspect-[4/3]"} rounded-lg overflow-hidden mb-2`}>
                            <Image
                              src={`/images/${project.image}`}
                              alt={`Projet ${index + 1} - ${project.category}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="pl-2 gap-2 flex flex-col">
                            <h3 className="text-sm font-semibold">{project.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 pl-3 mb-4 flex flex-col gap-2">
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
                          <Button 
                            size="sm" 
                            variant="default"
                            className="self-start bg-[#00b9ff] h-6 border cursor-pointer text-white rounded-[6px] mt-1 hover:bg-[#00b9ff]/80"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.link, '_blank');
                            }}
                          >
                            Voir
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  {/* Flèche de défilement pour mobile */}
                  <div className="flex justify-center mt-2 md:hidden">
                    <div 
                      className="mt-2"
                      style={{
                        animation: 'slideRight 1.5s ease-in-out infinite'
                      }}
                    >
                      <style jsx>{`
                        @keyframes slideRight {
                          0%, 100% { transform: translateX(0px); }
                          50% { transform: translateX(8px); }
                        }
                      `}</style>
                      <Image
                        src="/arrow.svg"
                        alt="Défiler horizontalement"
                        width={24}
                        height={24}
                        className=""
                      />
                    </div>
                  </div>
                </>
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
                  <div className="grid max-w-4xl grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                    {others.map((project, index) => (
                      <Card 
                        key={`other-${index}`} 
                        className="w-full aspect-[4/3] p-2 cursor-pointer gap-2 hover:bg-[#1c1c1c] hover:border-white/20 transition-colors"
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
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-0 mt-2 pb-1">
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
                  className="w-full aspect-square p-2 cursor-pointer hover:bg-[#1c1c1c] hover:border-white/20 transition-colors"
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
                  className="w-full aspect-[4/3] p-2 cursor-pointer hover:bg-[#1c1c1c] hover:border-white/20 transition-colors"
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
                variant={selectedPhotoCategory === "paysage" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("paysage")}
              >
                Paysage
              </Button>
              <Button 
                variant={selectedPhotoCategory === "portrait" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("portrait")}
              >
                Portrait
              </Button>
              <Button 
                variant={selectedPhotoCategory === "évènement" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("évènement")}
              >
                Évènementiel
              </Button>
              <Button 
                variant={selectedPhotoCategory === "pub" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("pub")}
              >
                Pub
              </Button>
              <Button 
                variant={selectedPhotoCategory === "autre" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedPhotoCategory("autre")}
              >
                Autre
              </Button>
            </div>

            <div className="mt-16 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-6">
              {filteredPhotos.map((photo, index) => (
                <Card 
                  key={index} 
                  className="w-full aspect-square p-2 cursor-pointer hover:bg-[#1c1c1c] hover:border-white/20 transition-colors"
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* Section Biographie & Contact */}
      <section id="about" className="border-b md:border-l-2 md:border-r-2 border-border">
        <div className="mx-auto w-full md:w-[1200px] md:border-l-2 md:border-r-2 border-border text-left py-12 md:py-24 px-4 section-border-animate">
          <div className="max-w-4xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Colonne Gauche : Contenu (8/12) */}
              <div className="md:col-span-8 space-y-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl mb-4">Qui suis-je ?</h2>
                  <div className="space-y-4 text-base md:text-l text-muted-foreground leading-relaxed leading-7 md:leading-6">
                    <p>mon parcours rapidement :</p>
                    <p>
                      Après un Bac S, j'ai été diplômé d'un Bachelor Web effectué à Hétic. 
                      J'ai travaillé pendant presque 5 ans dans un groupe du CAC 40 et aujourd'hui, 
                      je suis freelance en création de sites web, graphisme, vidéo, photo depuis 3 ans.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight md:sm:text-4xl mb-4">Contact</h3>
                  <p className="text-base md:text-lg">
                    <a href="mailto:t@tanguym.fr" className="text-foreground hover:text-[#009ae9] transition-colors">t@tanguym.fr</a>
                    <span className="mx-2 text-muted-foreground">ou</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tanguy-mombert-a68b81159/" className="underline underline-offset-4 hover:text-[#009ae9] transition-colors">LinkedIn</a>
                  </p>
                </div>
              </div>

              {/* Colonne Droite : Image (4/12) */}
              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="relative w-full aspect-square max-w-[300px] rounded-sm overflow-hidden border-border">
                  <Image
                    src="/images/_DSC1998-copie-3.jpeg"
                    alt="Photo de profil"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

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
          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-3xl md:text-4xl font-bold z-10 bg-black/50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
          >
            ‹
          </button>

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="fixed top-2 md:top-8 right-2 md:right-8 text-white hover:text-gray-300 text-xl md:text-2xl font-bold z-10 bg-black/50 md:bg-transparent w-8 h-8 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
          >
            ✕
          </button>

          <div className={`relative w-full max-h-full flex items-center justify-center ${lightboxItem.type === 'video' ? 'max-w-4xl' : ''}`}>
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
            
            {(lightboxItem.type === 'design' || lightboxItem.type === 'photo') && imageDimensions && (
              <div 
                className="relative mx-auto rounded-lg overflow-hidden"
                style={{
                  maxWidth: 'min(calc(100vw - 120px), ' + imageDimensions.width + 'px)',
                  maxHeight: 'min(calc(100vh - 80px), ' + imageDimensions.height + 'px)',
                  width: imageDimensions.width + 'px',
                  aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}`
                }}
              >
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
            className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-3xl md:text-4xl font-bold z-10 bg-black/50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none flex items-center justify-center"
          >
            ›
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-left text-sm leading-loose text-muted-foreground">
            © 2026 TanguyM.fr. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
