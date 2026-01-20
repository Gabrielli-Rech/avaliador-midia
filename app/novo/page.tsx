// app/novo/page.tsx
import { addMedia } from '../actions'

export default function NovaMidia() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-700 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-emerald-400">Adicionar Nova Mídia</h1>

        {/* O 'action={addMedia}' conecta este form direto com o banco */}
        <form action={addMedia} className="space-y-4">
          
          {/* Título */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Título</label>
            <input name="title" required placeholder="Ex: Breaking Bad" className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-emerald-500 outline-none" />
          </div>

          {/* Tipo e Status (Lado a Lado) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Tipo</label>
              <select name="type" className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-emerald-500 outline-none">
                <option value="movie">Filme</option>
                <option value="series">Série</option>
                <option value="anime">Anime</option>
                <option value="cartoon">Desenho</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Status</label>
              <select name="status" className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-emerald-500 outline-none">
                <option value="quero ver">Quero Ver</option>
                <option value="assistindo">Assistindo</option>
                <option value="completo">Completo</option>
                <option value="abandonado">Abandonado</option>
              </select>
            </div>
          </div>

          {/* Nota */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Sua Nota (0 a 10)</label>
            <input name="rating" type="number" min="0" max="10" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-emerald-500 outline-none" />
          </div>

          {/* URL da Imagem */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Link da Imagem (Opcional)</label>
            <input name="coverUrl" type="url" placeholder="https://..." className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-emerald-500 outline-none" />
          </div>

          {/* Comentário */}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Minha Crítica</label>
            <textarea name="comment" rows={3} placeholder="O que você achou?" className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-emerald-500 outline-none"></textarea>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
             <a href="/" className="flex-1 text-center py-2 bg-slate-700 hover:bg-slate-600 rounded transition">Cancelar</a>
             <button type="submit" className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 font-bold rounded transition">Salvar</button>
          </div>

        </form>
      </div>
    </main>
  )
}