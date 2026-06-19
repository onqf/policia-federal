import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

const VIEWS_KEY = "pf:site:views"

// Retorna a contagem atual de visualizações
export async function GET() {
  const views = (await redis.get<number>(VIEWS_KEY)) ?? 0
  return NextResponse.json({ views })
}

// Incrementa a contagem global de visualizações
export async function POST() {
  const views = await redis.incr(VIEWS_KEY)
  return NextResponse.json({ views })
}
