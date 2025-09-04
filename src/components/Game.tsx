"use client";

import { GameProvider } from "@/context/GameContext";
import BusinessDashboard from "./BusinessDashboard";
import BackgroundImage from "./BackgroundImage";

const Game = () => {
  return (
    <GameProvider>
      <BackgroundImage />
      <BusinessDashboard />
    </GameProvider>
  );
};

export default Game;
