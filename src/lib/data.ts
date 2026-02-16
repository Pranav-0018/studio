import type { Customer, RiskTrend, ModelMetric } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getRiskCategory(score: number): 'Low' | 'Medium' | 'High' {
  if (score <= 40) return 'Low';
  if (score <= 70) return 'Medium';
  return 'High';
}

const generateMockCustomer = (id: number): Customer => {
  const riskScore = Math.floor(Math.random() * 101);
  const name = `Customer ${id}`;
  const avatarData = PlaceHolderImages.find(img => img.id === `avatar${(id % 10) + 1}`) || PlaceHolderImages[0];
  return {
    id: `CUST-${String(id).padStart(4, '0')}`,
    name,
    avatar: avatarData.imageUrl,
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    age: Math.floor(Math.random() * 40) + 25,
    income: Math.floor(Math.random() * 150000) + 50000,
    loanAmount: Math.floor(Math.random() * 200000) + 10000,
    emiAmount: Math.floor(Math.random() * 2000) + 500,
    paymentHistory: {
      onTime: Math.floor(Math.random() * 50) + 10,
      delayed: Math.floor(Math.random() * 10),
    },
    creditScore: Math.floor(Math.random() * 550) + 300,
    missedPayments: Math.floor(Math.random() * 5),
    transactionBehaviorScore: Math.floor(Math.random() * 100),
    riskScore,
    riskCategory: getRiskCategory(riskScore),
  };
};

export const customers: Customer[] = Array.from({ length: 50 }, (_, i) => generateMockCustomer(i + 1));

export const riskTrends: RiskTrend[] = [
  { month: 'Jan', 'High Risk': 15, 'Medium Risk': 25, 'Low Risk': 60 },
  { month: 'Feb', 'High Risk': 18, 'Medium Risk': 28, 'Low Risk': 54 },
  { month: 'Mar', 'High Risk': 20, 'Medium Risk': 30, 'Low Risk': 50 },
  { month: 'Apr', 'High Risk': 17, 'Medium Risk': 32, 'Low Risk': 51 },
  { month: 'May', 'High Risk': 22, 'Medium Risk': 35, 'Low Risk': 43 },
  { month: 'Jun', 'High Risk': 25, 'Medium Risk': 38, 'Low Risk': 37 },
];

export const modelMetrics: ModelMetric[] = [
    {
        name: 'Precision',
        value: '88%',
        description: 'Of all positive predictions, 88% were correct.'
    },
    {
        name: 'Recall',
        value: '92%',
        description: 'Correctly identified 92% of all actual positives.'
    },
    {
        name: 'AUC',
        value: '0.95',
        description: 'Model has a 95% chance of ranking a positive instance higher than a negative one.'
    }
]
