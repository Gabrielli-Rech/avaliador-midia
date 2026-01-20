import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { addEpisode, addReview, deleteMedia } from '../../actions'
import { SpoilerCard } from './spoiler-client' // <--- O IMPORT TEM QUE SER AQUI EM CIMA

const prisma = new PrismaClient()

export default async function Detalhes({ params }: { params: { id: string } }) {
  // Converte o ID da URL para número
  const idNumero = Number(params.id)

  const item = await prisma.media.findUnique({
    where: { id: idNumero },
    include: { 
      episodes: {
        include: { reviews: true } 
      },
      reviews: {
        where: { episodeId: null } 
      }
    }
  })

  if (!item) return <div className="text-white p-10">Item não encontrado</div>

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="relative h-[60vh] w-full">
        {item.coverUrl && (
          <div className="absolute inset-0">
            <img src={item.coverUrl} className="w-full h-full object-cover opacity-40" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-10 w-full">
          <Link href="/" className="text-cyan-400 hover:underline mb-4 block">← Voltar para Home</Link>
          <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded uppercase">{item.type}</span>
          <h1 className="text-5xl md:text-7xl font-black mt-2 mb-4 drop-shadow-2xl">{item.title}</h1>
          <div className="flex items-center gap-4">
             <span className="text-xl text-gray-300 capitalize">{item.status}</span>
             <form action={deleteMedia}>
                <input type="hidden" name="id" value={item.id} />
                <button className="bg-red-900/50 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition">Excluir Obra</button>
             </form>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 max-w-6xl mx-auto -mt-10 relative z-20">
        
        {/* --- ÁREA DE COMENTÁRIOS GERAIS --- */}
        <section className="mb-12 bg-gray-900/80 backdrop-blur p-6 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-cyan-500 pl-3">Comentários da Obra</h2>
          
          <div className="space-y-4 mb-6">
            {item.reviews.map(review => (
               <SpoilerCard key={review.id} review={review} />
            ))}
            {item.reviews.length === 0 && <p className="text-gray-500 italic">Nenhum comentário ainda.</p>}
          </div>

          <form action={addReview} className="flex flex-col gap-3 bg-black/40 p-4 rounded border border-gray-700">
            <input type="hidden" name="mediaId" value={item.id} />
            <textarea name="comment" required placeholder="Escreva sua opinião sobre a obra..." className="bg-transparent border-b border-gray-600 focus:border-cyan-500 outline-none p-2 text-white h-20 resize-none" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <input type="number" name="rating" min="0" max="10" placeholder="Nota" className="bg-gray-800 w-20 p-2 rounded text-center border border-gray-700" required />
                <label className="flex items-center gap-2 cursor-pointer text-sm text-red-400 font-bold hover:text-red-300">
                  <input type="checkbox" name="isSpoiler" className="w-4 h-4 accent-red-500" />
                  Contém Spoiler?
                </label>
              </div>
              <button className="bg-cyan-600 hover:bg-cyan-500 px-6 py-2 rounded font-bold transition">Comentar</button>
            </div>
          </form>
        </section>

        {/* --- ÁREA DE EPISÓDIOS --- */}
        {item.type !== 'movie' && (
          <section>
             <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl font-bold text-white">Episódios</h2>
             </div>

             <div className="space-y-6">
               {item.episodes.map((ep) => (
                 <div key={ep.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-900 transition">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">{ep.title}</h3>
                    
                    <div className="pl-4 border-l-2 border-gray-700 space-y-3 mb-4">
                      {ep.reviews.map(review => (
                        <SpoilerCard key={review.id} review={review} />
                      ))}
                      {ep.reviews.length === 0 && <span className="text-xs text-gray-600">Sem comentários neste ep.</span>}
                    </div>

                    <details className="text-sm text-gray-400 cursor-pointer">
                      <summary className="hover:text-white transition">💬 Comentar neste episódio</summary>
                      <form action={addReview} className="mt-3 flex gap-2 items-start">
                        <input type="hidden" name="episodeId" value={ep.id} />
                        <input type="hidden" name="parentMediaId" value={item.id} />
                        <input type="text" name="comment" placeholder="O que achou do ep?" className="flex-1 bg-black border border-gray-700 rounded p-2 text-white" required />
                        <input type="number" name="rating" placeholder="Nota" className="w-16 bg-black border border-gray-700 rounded p-2" max="10" />
                        <label className="flex items-center gap-1 text-xs text-red-400 font-bold px-2">
                           <input type="checkbox" name="isSpoiler" /> Spoiler
                        </label>
                        <button className="bg-blue-600 px-4 py-2 rounded text-white font-bold">Enviar</button>
                      </form>
                    </details>
                 </div>
               ))}
             </div>

             <div className="mt-8 p-6 border-2 border-dashed border-gray-800 rounded-lg text-center">
                <h3 className="text-gray-400 mb-4">Adicionar Episódio</h3>
                <form action={addEpisode} className="flex gap-2 max-w-md mx-auto">
                   <input type="hidden" name="mediaId" value={item.id} />
                   <input name="title" placeholder="Ex: S01E05 - O Grande Final" className="flex-1 bg-gray-900 border border-gray-700 rounded p-3 outline-none focus:border-blue-500" required />
                   <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 rounded font-bold">+</button>
                </form>
             </div>
          </section>
        )}
      </div>
    </main>
  )
}