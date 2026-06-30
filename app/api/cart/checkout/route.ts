import { NextRequest, NextResponse } from "next/server";

/**
 * MOCK — checkout do carrinho.
 *
 * Simula o contrato real do backend: `POST /orders`
 * (ver FuloBack: src/controllers/orderController.ts -> OrderController.create)
 *
 * Body esperado (igual ao back):
 * { items: { productId: number; quantity: number; color?: string }[] }
 *
 * Resposta esperada (igual ao back):
 * { data: Order }
 *
 * Para substituir pelo back real:
 * 1. Adicionar `orders.createOrder` no endpointsMap (`/orders`, POST) — já feito.
 * 2. Em `features/cart/lib/useCart.ts`, troque a chamada a esta rota mock
 *    por `createEndpointHook` usando `endpointsMap.orders.createOrder`.
 * 3. Apagar esta pasta `app/api/cart`.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  // Simula latência de rede
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!body?.items?.length) {
    return NextResponse.json(
      { error: "Carrinho vazio" },
      { status: 400 }
    );
  }

  const total = body.items.reduce(
    (acc: number, item: { price?: number; quantity: number }) =>
      acc + (item.price ?? 0) * item.quantity,
    0
  );

  const mockOrder = {
    id: Math.floor(Math.random() * 100000),
    status: "AGUARDANDO_PAGAMENTO",
    total,
    items: body.items,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ data: mockOrder }, { status: 201 });
}
