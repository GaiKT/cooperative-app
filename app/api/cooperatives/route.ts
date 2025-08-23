import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cooperatives = await prisma.cooperative.findMany({
      include: {
        memberships: {
          include: {
            user: true
          }
        }
      }
    })
    
    return NextResponse.json(cooperatives)
  } catch (error) {
    console.error('Error fetching cooperatives:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cooperatives' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description } = body
    
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    const cooperative = await prisma.cooperative.create({
      data: {
        name,
        description
      }
    })
    
    return NextResponse.json(cooperative, { status: 201 })
  } catch (error) {
    console.error('Error creating cooperative:', error)
    return NextResponse.json(
      { error: 'Failed to create cooperative' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
