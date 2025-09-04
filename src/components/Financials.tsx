"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Financials = () => {
  const { gameState } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Receita Total: R$ {gameState.financials.revenue.toFixed(2)}</p>
        <p>Custo Total: R$ {gameState.financials.costs.toFixed(2)}</p>
        <p>Lucro: R$ {(gameState.financials.revenue - gameState.financials.costs).toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};
