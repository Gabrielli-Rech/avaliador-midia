import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { deleteMedia } from './actions' // <--- Note que aqui é apenas UM ponto

const prisma = new PrismaClient()

export default async function Home() {
  const allMedia = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    include: { reviews: true }
  })

  const destaque = allMedia[0]
  const catalogo = allMedia.slice(1)
  const filmes = catalogo.filter(m => m.type === 'movie')
  const animes = catalogo.filter(m => m.type === 'anime')
  const series = catalogo.filter(m => m.type === 'series' || m.type === 'cartoon')

  return (
    <main className="min-h-screen pb-20 overflow-x-hidden bg-black text-white">
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">AVFS</h1>
        <Link href="/novo" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all text-sm uppercase tracking-wide">+ Adicionar</Link>
      </nav>

      {destaque ? (
        <div className="relative w-full h-[85vh]">
          <div className="absolute inset-0">
             {destaque.coverUrl && <img src={destaque.coverUrl} className="w-full h-full object-cover opacity-60" />}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl pt-20">
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">{destaque.title}</h1>
            <div className="flex gap-4">
              <Link href={`/item/${destaque.id}`} className="px-8 py-3 bg-white text-black font-bold text-lg rounded hover:bg-gray-200 transition">▶ Assistir / Detalhes</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center text-gray-500">Nada cadastrado...</div>
      )}

      <div className="relative z-20 -mt-32 px-8 md:px-16 space-y-12">
        <CategoriaSection title="Animes" items={animes} />
        <CategoriaSection title="Filmes" items={filmes} />
        <CategoriaSection title="Séries" items={series} />
      </div>
    </main>
  )
}

function CategoriaSection({ title, items }: { title: string, items: any[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-600 pl-3">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <Link href={`/item/${item.id}`} key={item.id} className="block group relative bg-gray-900 rounded-md transition-all hover:scale-110 hover:z-50 cursor-pointer">
            <div className="aspect-[2/3] w-full relative overflow-hidden rounded-md">
              {item.coverUrl ? <img src={item.coverUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs">Sem Imagem</div>}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-all">
              <h3 className="text-white font-bold text-sm">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}