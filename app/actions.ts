// app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function addMedia(formData: FormData) {
    // Pega os dados digitados nos campos do formulário
    const title = formData.get('title') as string
    const type = formData.get('type') as string
    const status = formData.get('status') as string
    const rating = formData.get('rating') as string
    const comment = formData.get('comment') as string
    const coverUrl = formData.get('coverUrl') as string

    // Salva no Banco de Dados
    await prisma.media.create({
        data: {
            title,
            type,
            status,
            coverUrl: coverUrl || null,
            reviews: {
                create: {
                    rating: Number(rating),
                    comment
                }
            }
        }
    })

    // Adicione isso no final do arquivo app/actions.ts

    // Volta para a home e atualiza a lista
    redirect('/')
}
export async function deleteMedia(formData: FormData) {
    const id = formData.get('id') as string

    await prisma.media.delete({
        where: {
            id: Number(id)
        }
    })

    // Atualiza a tela
    redirect('/')
}

// --- Adicione isso no final do app/actions.ts ---

// 1. Adicionar um Episódio
export async function addEpisode(formData: FormData) {
  const title = formData.get('title') as string
  const mediaId = formData.get('mediaId') as string

  await prisma.episode.create({
    data: {
      title,
      mediaId: Number(mediaId)
    }
  })

  // Recarrega a página atual para mostrar o novo episódio
  redirect(`/item/${mediaId}`)
}

// 2. Adicionar Comentário (Pode ser na Série ou no Episódio)
export async function addReview(formData: FormData) {
  const comment = formData.get('comment') as string
  const rating = formData.get('rating') as string
  // O checkbox retorna "on" se marcado, ou null se não
  const isSpoiler = formData.get('isSpoiler') === 'on' 
  
  const mediaId = formData.get('mediaId') as string | null
  const episodeId = formData.get('episodeId') as string | null

  await prisma.review.create({
    
    data: {
      comment,
      rating: Number(rating),
      isSpoiler,
      // Se tiver ID de episódio, salva lá. Se não, salva na mídia geral.
      mediaId: mediaId ? Number(mediaId) : null,
      episodeId: episodeId ? Number(episodeId) : null
    }
  })
  
  // Volta para a página da obra
  if (mediaId) redirect(`/item/${mediaId}`)
  // Se for comentário de episódio, precisariamos tratar o redirect melhor, 
  // mas por enquanto vamos voltar para a obra geral para simplificar
  if (episodeId) {
     // Truque para achar o ID da midia pai seria necessário, 
     // mas vamos assumir que o form passa o ID da midia também no redirect
     const parentId = formData.get('parentMediaId')
     redirect(`/item/${parentId}`)
  }
}