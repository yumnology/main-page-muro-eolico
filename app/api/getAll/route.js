import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(req) {
  try {
    // Fetch the latest added record from your database
    const latestData = await prisma.propellerData.findMany();

    if (!latestData) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    return NextResponse.json(latestData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export const fetchCache = 'force-no-store';