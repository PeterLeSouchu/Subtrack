import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('🌱 Seeding database...')

  const sql = fs.readFileSync(
    path.join(__dirname, 'seed.sql'),
    'utf8'
  )

  await prisma.$executeRawUnsafe(sql)

  console.log('✅ Seed terminé')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
