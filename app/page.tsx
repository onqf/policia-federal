import { BioCard } from "@/components/bio-card"

export default function Page() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-background">
      {/* Vídeo de fundo do YouTube */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <iframe
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.77777778vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/ToRiflECtU8?autoplay=1&mute=1&controls=0&loop=1&playlist=ToRiflECtU8&modestbranding=1&playsinline=1&rel=0&showinfo=0"
          title="Vídeo de fundo"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>

      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* Conteúdo */}
      <div className="relative z-20 flex min-h-dvh items-center justify-center p-4">
        <BioCard />
      </div>
    </main>
  )
}
