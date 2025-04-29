import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function DELETE(req) {
    const prisma = new PrismaClient();
    
    try {
        await prisma.propellerData.deleteMany();
        return NextResponse.json({ message: 'All data deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
    }
