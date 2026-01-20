// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Criar um Anime
  const arcane = await prisma.media.create({
    data: {
      title: 'Arcane',
      type: 'anime', // ou 'series'
      status: 'completo',
      coverUrl: 'https://br.web.img3.acsta.net/pictures/21/11/02/16/57/0237748.jpg',
      reviews: {
        create: {
          rating: 10,
          comment: 'Simplesmente uma obra de arte visual e narrativa.',
        },
      },
    },
  })

  // Criar um Filme
  const godfather = await prisma.media.create({
    data: {
      title: 'O Poderoso Chefão',
      type: 'movie',
      status: 'quero ver',
      releaseYear: 1972,
    },
  })

  console.log('Dados inseridos:', { arcane, godfather })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })