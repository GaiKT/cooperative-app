const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create users (use upsert to handle existing data)
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe'
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith'
    }
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Johnson'
    }
  })

  // Create cooperatives
  const coop1 = await prisma.cooperative.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Green Valley Co-op',
      description: 'A sustainable farming cooperative focused on organic produce'
    }
  })

  const coop2 = await prisma.cooperative.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Tech Workers Union',
      description: 'A cooperative for freelance tech workers'
    }
  })

  // Create memberships (check if they exist first)
  const existingMemberships = await prisma.membership.count()
  
  if (existingMemberships === 0) {
    await prisma.membership.createMany({
      data: [
        {
          userId: user1.id,
          cooperativeId: coop1.id,
          role: 'admin'
        },
        {
          userId: user2.id,
          cooperativeId: coop1.id,
          role: 'member'
        },
        {
          userId: user2.id,
          cooperativeId: coop2.id,
          role: 'admin'
        },
        {
          userId: user3.id,
          cooperativeId: coop2.id,
          role: 'member'
        }
      ]
    })
  }

  console.log('Database seeded successfully!')
  console.log(`Created ${await prisma.user.count()} users`)
  console.log(`Created ${await prisma.cooperative.count()} cooperatives`)
  console.log(`Created ${await prisma.membership.count()} memberships`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
