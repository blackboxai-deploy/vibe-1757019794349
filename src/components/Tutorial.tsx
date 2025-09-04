"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

export const Tutorial = () => {
  const { gameState, dispatch } = useGame();
  const step = gameState.tutorial.currentStep;
  const totalSteps = gameState.tutorial.steps.length;
  const tutorialStep = gameState.tutorial.steps[step];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tutorial ({step + 1}/{totalSteps})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{tutorialStep.text}</p>
        <div className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={() => dispatch({ type: 'PREV_TUTORIAL' })}>
              Anterior
            </Button>
          )}
          {step < totalSteps - 1 ? (
            <Button onClick={() => dispatch({ type: 'NEXT_TUTORIAL' })}>
              Próximo
            </Button>
          ) : (
            <Button onClick={() => dispatch({ type: 'END_TUTORIAL' })}>
              Finalizar Tutorial
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
