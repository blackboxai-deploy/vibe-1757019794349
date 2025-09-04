"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GameState, Product, Upgrade, Employee } from '@/types/game';

const TICK_RATE = 1000; // 1 segundo

const initialProducts: Product[] = [
  { id: 1, name: 'Biscoito Simples', cost: 1, price: 2, stock: 0, productionTime: 5000 },
];

const initialUpgrades: Upgrade[] = [
  { id: 1, name: 'Forno Melhor', cost: 50, level: 0, maxLevel: 5, effect: 0.9 },
  { id: 2, name: 'Marketing Digital', cost: 100, level: 0, maxLevel: 5, effect: 1.2 },
];

const initialEmployees: Employee[] = [
    { id: 1, name: 'Padeiro', salary: 10, hireCost: 20, count: 0, effect: 1, type: 'production' },
];

const initialGameState: GameState = {
  day: 1,
  money: 100,
  businessName: 'Minha Padaria',
  products: initialProducts,
  upgrades: initialUpgrades,
  employees: initialEmployees,
  isProducing: false,
  productionProgress: 0,
  customers: { queue: 0, salesLog: [] },
  financials: { revenue: 0, costs: 0 },
  tutorial: {
    isOpen: true,
    currentStep: 0,
    steps: [
        { text: 'Bem-vindo ao Business Builder! Vamos aprender a gerir seu negócio.' },
        { text: 'Este é o painel de produção. Clique em \'Produzir\' para criar seu primeiro produto.' },
        { text: 'Ótimo! Agora os clientes começarão a chegar na sua loja.' },
        { text: 'Fique de olho no seu dinheiro e invista em upgrades para crescer.' },
        { text: 'Contrate funcionários para automatizar a produção e acelerar as vendas.' },
        { text: 'Parabéns! Você aprendeu o básico. Agora, continue expandindo seu império!' },
    ],
  },
};

type Action = 
    | { type: 'START_PRODUCTION'; productId: number }
    | { type: 'UPDATE_PRODUCTION' }
    | { type: 'FINISH_PRODUCTION'; productId: number }
    | { type: 'SELL_PRODUCT' }
    | { type: 'BUY_UPGRADE'; upgradeId: number }
    | { type: 'HIRE_EMPLOYEE'; employeeId: number }
    | { type: 'NEW_DAY' }
    | { type: 'NEXT_TUTORIAL' }
    | { type: 'PREV_TUTORIAL' }
    | { type: 'END_TUTORIAL' }
    | { type: 'RESET_GAME' };

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'START_PRODUCTION':
        const productToProduce = state.products.find(p => p.id === action.productId);
        if (!productToProduce || state.money < productToProduce.cost) return state;
        return { 
            ...state, 
            isProducing: true, 
            productionProgress: 0,
            money: state.money - productToProduce.cost,
            financials: { ...state.financials, costs: state.financials.costs + productToProduce.cost }
        };
    
    case 'UPDATE_PRODUCTION':
        let progress = state.productionProgress + (1000 / (state.products[0].productionTime * state.upgrades[0].effect ** state.upgrades[0].level));
        // Employee effect
        const producer = state.employees.find(e => e.type === 'production');
        if (producer) {
            progress += producer.count * producer.effect * 10;
        }
        return { ...state, productionProgress: progress };

    case 'FINISH_PRODUCTION':
        const finishedProduct = state.products.find(p => p.id === action.productId);
        if (!finishedProduct) return state;
        return {
            ...state,
            isProducing: false,
            productionProgress: 0,
            products: state.products.map(p => p.id === action.productId ? { ...p, stock: p.stock + 1 } : p)
        };

    case 'SELL_PRODUCT':
        if (state.products[0].stock > 0 && state.customers.queue > 0) {
            const productSold = state.products[0];
            return {
                ...state,
                money: state.money + productSold.price,
                products: state.products.map(p => p.id === productSold.id ? { ...p, stock: p.stock - 1 } : p),
                customers: { 
                    ...state.customers, 
                    queue: state.customers.queue - 1,
                    salesLog: [...state.customers.salesLog, `Vendeu ${productSold.name} por R$ ${productSold.price.toFixed(2)}`]
                },
                financials: { ...state.financials, revenue: state.financials.revenue + productSold.price },
            };
        }
        return state;

    case 'BUY_UPGRADE':
        const upgrade = state.upgrades.find(u => u.id === action.upgradeId);
        if (!upgrade || state.money < upgrade.cost || upgrade.level >= upgrade.maxLevel) return state;
        return {
            ...state,
            money: state.money - upgrade.cost,
            financials: { ...state.financials, costs: state.financials.costs + upgrade.cost },
            upgrades: state.upgrades.map(u => u.id === action.upgradeId ? { ...u, level: u.level + 1, cost: u.cost * 1.5 } : u),
        };

    case 'HIRE_EMPLOYEE':
        const employee = state.employees.find(e => e.id === action.employeeId);
        if (!employee || state.money < employee.hireCost) return state;
        return {
            ...state,
            money: state.money - employee.hireCost,
            financials: { ...state.financials, costs: state.financials.costs + employee.hireCost },
            employees: state.employees.map(e => e.id === action.employeeId ? { ...e, count: e.count + 1, hireCost: e.hireCost * 1.2 } : e)
        };
    
    case 'NEW_DAY':
        let dailyCosts = 0;
        state.employees.forEach(e => dailyCosts += e.count * e.salary);
        return {
            ...state,
            day: state.day + 1,
            money: state.money - dailyCosts,
            financials: {...state.financials, costs: state.financials.costs + dailyCosts},
            customers: { ...state.customers, queue: Math.floor(Math.random() * 5) + (state.upgrades[1].level * 2) },
        };

    case 'NEXT_TUTORIAL':
        if (state.tutorial.currentStep < state.tutorial.steps.length - 1) {
            return { ...state, tutorial: { ...state.tutorial, currentStep: state.tutorial.currentStep + 1 } };
        }
        return state;

    case 'PREV_TUTORIAL':
        if (state.tutorial.currentStep > 0) {
            return { ...state, tutorial: { ...state.tutorial, currentStep: state.tutorial.currentStep - 1 } };
        }
        return state;

    case 'END_TUTORIAL':
        return { ...state, tutorial: { ...state.tutorial, isOpen: false } };

    case 'RESET_GAME':
        return initialGameState;

    default:
      return state;
  }
};

const GameContext = createContext<{ gameState: GameState; dispatch: React.Dispatch<Action>; } | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('businessBuilderState');
        if (savedState) {
          // Implement a hydration logic here if needed
        }
    }

    const gameLoop = setInterval(() => {
        if (gameState.tutorial.isOpen) return;

        if (gameState.isProducing) {
            dispatch({ type: 'UPDATE_PRODUCTION' });
            if (gameState.productionProgress >= 100) {
                dispatch({ type: 'FINISH_PRODUCTION', productId: 1 });
            }
        }

        // Auto-production by employees
        const producer = gameState.employees.find(e => e.type === 'production');
        if (producer && producer.count > 0 && !gameState.isProducing) {
            dispatch({ type: 'START_PRODUCTION', productId: 1 });
        }

        // Customer sales
        dispatch({ type: 'SELL_PRODUCT' });

    }, TICK_RATE);

    const dayTimer = setInterval(() => {
        if (gameState.tutorial.isOpen) return;
        dispatch({ type: 'NEW_DAY' });
    }, 240 * 1000); // 4 minutes per day

    const saveTimer = setInterval(() => {
        localStorage.setItem('businessBuilderState', JSON.stringify(gameState));
    }, 10000); // Save every 10 seconds

    return () => {
      clearInterval(gameLoop);
      clearInterval(dayTimer);
      clearInterval(saveTimer);
    };
  }, [gameState]);

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
