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
        address: body.address || null,
        frameStyle: body.frameStyle,
        color: body.color1 || null,  // Usar solo color1 como el color único
        verse: body.verse || null,
        customMessage: body.customMessage || null,
        paymentProof: body.paymentProof || null,
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
