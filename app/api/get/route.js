import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';



export async function GET(req) {

  const prisma = new PrismaClient();

  try {
    // Fetch the latest added record from your database
    const latestData = await prisma.propellerData.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    if (!latestData) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    return NextResponse.json(latestData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export const fetchCache = 'force-no-store';