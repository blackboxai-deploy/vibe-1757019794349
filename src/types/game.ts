export interface Product {
    id: number;
    name: string;
    cost: number;
    price: number;
    stock: number;
    productionTime: number; // in ms
}

export interface Upgrade {
    id: number;
    name: string;
    cost: number;
    level: number;
    maxLevel: number;
    effect: number; // multiplier
}

export interface Employee {
    id: number;
    name: string;
    salary: number; // per day
    hireCost: number;
    count: number;
    effect: number; // multiplier for their task
    type: 'production' | 'sales';
}

export interface TutorialStep {
    text: string;
}

export interface GameState {
    day: number;
    money: number;
    businessName: string;
    products: Product[];
    upgrades: Upgrade[];
    employees: Employee[];
    isProducing: boolean;
    productionProgress: number;
    customers: {
        queue: number;
        salesLog: string[];
    }
    financials: {
        revenue: number;
        costs: number;
    }
    tutorial: {
        isOpen: boolean;
        currentStep: number;
        steps: TutorialStep[];
    }
}
