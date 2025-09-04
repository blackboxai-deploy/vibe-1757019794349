"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Storefront = () => {
  const { gameState } = useGame();
  const product = gameState.products[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vitrine da Loja</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Atendendo clientes...</p>
        <p>Preço de Venda: R$ {product.price.toFixed(2)}</p>
        <p>Clientes na fila: {gameState.customers.queue}</p>
        <div className="mt-4">
          <h4 className="font-bold">Vendas Recentes</h4>
          <ul className="list-disc pl-5">
            {gameState.customers.salesLog.slice(-5).map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
