"use client";

import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

export const Employees = () => {
  const { gameState, dispatch } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funcionários</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
          {gameState.employees.map(employee => (
            <div key={employee.id} className="flex justify-between items-center">
                <div>
                    <p className="font-bold">{employee.name}</p>
                    <p>Salário: R$ {employee.salary.toFixed(2)}/dia</p>
                    <p>Contratados: {employee.count}</p>
                </div>
                <Button 
                    onClick={() => dispatch({ type: 'HIRE_EMPLOYEE', employeeId: employee.id })}
                    disabled={gameState.money < employee.hireCost}
                >
                    Contratar (R$ {employee.hireCost.toFixed(2)})
                </Button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
