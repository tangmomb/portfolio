"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import videosData from "@/data/videos.json";
import websitesData from "@/data/websites.json";
import { getYouTubeThumbnail, getTechLogo } from "@/lib/youtube";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedWebsiteCategory, setSelectedWebsiteCategory] = useState<string>("all");

  const filteredVideos = selectedCategory === "all" 
    ? videosData 
    : videosData.filter(video => video.category === selectedCategory);

  const filteredWebsites = selectedWebsiteCategory === "all"
    ? websitesData
    : websitesData.filter(project => project.category === selectedWebsiteCategory);

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
              <Button size="lg" variant="outline" asChild>
                <a href="#websites">Développement</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#graphic">Graphisme</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#videos">Vidéos</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#photos">Photos</a>
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
                    <div className="flex items-center gap-1 mb-4 border border-gray-600 rounded-md p-2">
                      <span className="text-xs text-muted-foreground mr-2">Technos:</span>
                      {project.technologies.map((tech, techIndex) => (
                        <img
                          key={techIndex}
                          src={getTechLogo(tech)}
                          alt={tech}
                          className="w-5 h-5"
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
            <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Design 1</CardTitle>
                  <CardDescription>Description du design 1.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Voir le design</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Design 2</CardTitle>
                  <CardDescription>Description du design 2.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Voir le design</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Design 3</CardTitle>
                  <CardDescription>Description du design 3.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Voir le design</Button>
                </CardContent>
              </Card>
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

            <div className="mt-16 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-6">
              {filteredVideos.map((video, index) => (
                <Card key={index} className="w-full aspect-square p-2">
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={getYouTubeThumbnail(video.url)}
                        alt={`Vidéo ${index + 1} - ${video.category}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white text-xs">
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
            <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Photo 1</CardTitle>
                  <CardDescription>Description de la photo 1.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Voir la photo</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Photo 2</CardTitle>
                  <CardDescription>Description de la photo 2.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Voir la photo</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Photo 3</CardTitle>
                  <CardDescription>Description de la photo 3.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Voir la photo</Button>
                </CardContent>
              </Card>
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
