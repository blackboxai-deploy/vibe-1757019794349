"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export const ProductionLine = () => {
  const { gameState, dispatch } = useGame();
  const product = gameState.products[0];

  const handleProduce = () => {
    if (gameState.money >= product.cost) {
      dispatch({ type: 'START_PRODUCTION', productId: product.id });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linha de Produção</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p>Custo de Produção: R$ {product.cost.toFixed(2)}</p>
            <p>Em estoque: {product.stock}</p>
          </div>
          {gameState.isProducing ? (
            <Progress value={(gameState.productionProgress / 1000) * 100} className="w-full" />
          ) : (
            <Button onClick={handleProduce} disabled={gameState.money < product.cost}>
              Produzir (Custa R$ {product.cost.toFixed(2)})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
