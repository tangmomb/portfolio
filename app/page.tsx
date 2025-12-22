import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="border-b my-4 py-24 sm:py-32 px-4">
        <div className="mx-auto max-w-4xl text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Bonjour
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            En quoi puis-je vous aider ?
          </p>
          <div className="mt-10 flex items-center justify-start gap-x-6">
            <Button size="lg" asChild>
              <a href="#websites">Sites Web</a>
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
      </section>

      {/* Websites Section */}
      <section id="websites" className="border-b my-4 py-24 px-4">
        <div className="mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sites Web</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mes projets de développement web.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Projet 1</CardTitle>
              <CardDescription>Description du projet web 1.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Voir le projet</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Projet 2</CardTitle>
              <CardDescription>Description du projet web 2.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Voir le projet</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Projet 3</CardTitle>
              <CardDescription>Description du projet web 3.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Voir le projet</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Graphic Design Section */}
      <section id="graphic" className="border-b my-4 py-24 px-4">
        <div className="mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Graphisme</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mes créations graphiques.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
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
      </section>

      {/* Videos Section */}
      <section id="videos" className="border-b my-4 py-24 px-4">
        <div className="mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Vidéos</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mes productions vidéo.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Vidéo 1</CardTitle>
              <CardDescription>Description de la vidéo 1.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Voir la vidéo</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vidéo 2</CardTitle>
              <CardDescription>Description de la vidéo 2.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Voir la vidéo</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vidéo 3</CardTitle>
              <CardDescription>Description de la vidéo 3.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Voir la vidéo</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="border-b my-4 py-24 px-4">
        <div className="mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Photos</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ma galerie photo.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-3">
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b my-4 py-24 px-4">
        <div className="mx-auto max-w-4xl text-left">
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
