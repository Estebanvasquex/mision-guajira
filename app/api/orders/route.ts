import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const order = await prisma.order.create({
      data: {
        name: body.name,
        phone: body.phone,
        deliveryMethod: body.deliveryMethod,
        address: body.address,
        frameStyle: body.frameStyle,
        color1: body.color1,
        color2: body.color2,
        color3: body.color3,
        verse: body.verse,
        customMessage: body.customMessage,
        paymentProof: body.paymentProof,
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear el pedido' },
      { status: 500 }
    );
  }
}
