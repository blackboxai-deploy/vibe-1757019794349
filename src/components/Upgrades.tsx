"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

export const Upgrades = () => {
  const { gameState, dispatch } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {gameState.upgrades.map(upgrade => (
          <div key={upgrade.id} className="flex justify-between items-center">
            <div>
              <p className="font-bold">{upgrade.name}</p>
              <p>Custo: R$ {upgrade.cost.toFixed(2)}</p>
              <p>Nível: {upgrade.level}</p>
            </div>
            <Button 
              onClick={() => dispatch({ type: 'BUY_UPGRADE', upgradeId: upgrade.id })}
              disabled={gameState.money < upgrade.cost || upgrade.level >= upgrade.maxLevel}
            >
              Comprar
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
