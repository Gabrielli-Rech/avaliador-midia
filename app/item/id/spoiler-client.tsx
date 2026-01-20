'use client'
import { useState } from 'react'

export function SpoilerCard({ review }: { review: any }) {
  const [revealed, setRevealed] = useState(false)

  if (!review.isSpoiler) {
    return (
      <div className="bg-black/30 p-3 rounded border border-gray-800">
        <div className="flex items-center gap-2 mb-1">
           <span className="text-yellow-500 text-xs font-bold">★ {review.rating}</span>
           <span className="text-gray-500 text-xs">Comentário</span>
        </div>
        <p className="text-gray-300">{review.comment}</p>
      </div>
    )
  }

  return (
    <div className="bg-black/30 p-3 rounded border border-red-900/30 relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-1">
           <span className="text-yellow-500 text-xs font-bold">★ {review.rating}</span>
           <span className="text-red-500 text-xs font-bold bg-red-900/20 px-1 rounded border border-red-900/50">SPOILER</span>
      </div>
      
      <div 
        onClick={() => setRevealed(true)}
        className={`transition-all duration-500 cursor-pointer ${revealed ? 'blur-0' : 'blur-md select-none'}`}
      >
        <p className="text-gray-300">{review.comment}</p>
      </div>

      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-red-400 font-bold bg-black/80 px-3 py-1 rounded shadow-lg text-sm">
            Clique para ver o spoiler
          </span>
        </div>
      )}
    </div>
  )
}