"use client"

import { useEffect, useRef, useState } from "react"
import { Eye, Globe, Pause, Play, Shield } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const INSTAGRAM_URL = "https://www.instagram.com/policiafederal/"
const SITE_URL = "https://www.gov.br/pf/pt-br"
// ID do vídeo da música solicitada
const MUSIC_VIDEO_ID = "1geviNXBT1M"

export function BioCard() {
  const [views, setViews] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const audioFrameRef = useRef<HTMLIFrameElement>(null)

  // Registra e busca a contagem global de visualizações
  useEffect(() => {
    let cancelled = false
    async function registerView() {
      try {
        const res = await fetch("/api/views", { method: "POST" })
        const data = await res.json()
        if (!cancelled) setViews(data.views)
      } catch {
        // fallback: apenas leitura
        try {
          const res = await fetch("/api/views")
          const data = await res.json()
          if (!cancelled) setViews(data.views)
        } catch {
          /* ignora */
        }
      }
    }
    registerView()
    return () => {
      cancelled = true
    }
  }, [])

  function toggleMusic() {
    setPlaying((p) => !p)
  }

  return (
    <div className="w-full max-w-md">
      {/* Player de música (oculto) - controlado pelo botão */}
      {playing && (
        <iframe
          ref={audioFrameRef}
          className="sr-only h-0 w-0"
          src={`https://www.youtube.com/embed/${MUSIC_VIDEO_ID}?autoplay=1&loop=1&playlist=${MUSIC_VIDEO_ID}`}
          title="Música de fundo"
          allow="autoplay; encrypted-media"
        />
      )}

      <div className="rounded-2xl border border-white/10 bg-black/70 p-8 text-white shadow-2xl backdrop-blur-md">
        {/* Cabeçalho */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex size-24 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20">
            <Shield className="size-12 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-balance text-2xl font-bold tracking-tight">Polícia Federal</h1>
          <p className="mt-1 text-sm leading-relaxed text-white/70">Página oficial de links</p>
        </div>

        {/* Botão de música */}
        <button
          type="button"
          onClick={toggleMusic}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/20"
          aria-pressed={playing}
        >
          {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
          {playing ? "Pausar música" : "Tocar música"}
        </button>

        {/* Links */}
        <nav className="flex flex-col gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/20"
          >
            <InstagramIcon className="size-5" />
            Instagram
          </a>

          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/20"
          >
            <Globe className="size-5" aria-hidden="true" />
            Site Oficial
          </a>
        </nav>

        {/* Contador de visualizações */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
          <Eye className="size-4" aria-hidden="true" />
          <span>
            {views === null ? "Carregando..." : `${views.toLocaleString("pt-BR")} visualizações`}
          </span>
        </div>
      </div>
    </div>
  )
}
