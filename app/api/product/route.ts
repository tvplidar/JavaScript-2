// app/api/product/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT id, PRODUCT_NAME, PRICE, CAT_ID, create_date 
      FROM product 
      WHERE IS_DELETE = 0
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
