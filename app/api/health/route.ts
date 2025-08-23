import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Get counts of each model
    const userCount = await prisma.user.count()
    const cooperativeCount = await prisma.cooperative.count()
    const membershipCount = await prisma.membership.count()
    
    return NextResponse.json({
      message: 'Database connection successful!',
      data: {
        users: userCount,
        cooperatives: cooperativeCount,
        memberships: membershipCount
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
