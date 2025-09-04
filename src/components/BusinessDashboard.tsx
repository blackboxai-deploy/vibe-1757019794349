"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { ProductionLine } from "./ProductionLine";
import { Storefront } from "./Storefront";
import { Financials } from "./Financials";
import { Upgrades } from "./Upgrades";
import { Employees } from "./Employees";
import { Tutorial } from "./Tutorial";

const BusinessDashboard = () => {
  const { gameState, dispatch } = useGame();

  if (gameState.tutorial.isOpen) {
    return <Tutorial />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <header className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg">
          <h1 className="text-2xl font-bold">{gameState.businessName}</h1>
          <div className="text-lg">
            <p>Dinheiro: R$ {gameState.money.toFixed(2)}</p>
            <p>Dia: {gameState.day}</p>
          </div>
        </header>
        <ProductionLine />
        <Storefront />
      </div>
      <div className="space-y-4">
        <Financials />
        <Upgrades />
        <Employees />
        <Button onClick={() => dispatch({ type: 'RESET_GAME' })}>Reiniciar Jogo</Button>
      </div>
    </div>
  );
};

export default BusinessDashboard;
