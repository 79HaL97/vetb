import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), '..', 'data', 'TUBERCULOSIS_DX_clean.csv');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return new NextResponse(fileData, {
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error loading CSV' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}