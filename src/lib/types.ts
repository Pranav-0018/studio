export type Customer = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  age: number;
  income: number;
  loanAmount: number;
  emiAmount: number;
  paymentHistory: {
    onTime: number;
    delayed: number;
  };
  creditScore: number;
  missedPayments: number;
  transactionBehaviorScore: number;
  riskScore: number;
  riskCategory: 'Low' | 'Medium' | 'High';
};

export type RiskTrend = {
  month: string;
  'High Risk': number;
  'Medium Risk': number;
  'Low Risk': number;
};

export type ModelMetric = {
  name: 'Precision' | 'Recall' | 'AUC';
  value: string;
  description: string;
};
