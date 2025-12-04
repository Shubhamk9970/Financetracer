import { Expense } from "@/store/expensesSlice";

export interface AIInsight {
  id: string;
  message: string;
  category?: string;
  type: "warning" | "tip" | "info";
  createdAt: number;
}

const categoryMessages: Record<string, string[]> = {
  "Food & Dining": [
    "You've been spending a lot on food lately. Consider meal prepping!",
    "Your dining expenses are above average this week.",
    "Great job keeping food costs reasonable this month!",
  ],
  Transportation: [
    "Transportation costs are adding up. Try carpooling?",
    "Your commute expenses seem higher than usual.",
    "Consider using public transit to save on gas.",
  ],
  Shopping: [
    "You spent quite a bit on shopping recently. Need vs want?",
    "Your shopping habits are impacting your savings.",
    "Try waiting 24 hours before making non-essential purchases.",
  ],
  Entertainment: [
    "Entertainment spending is high. Look for free activities!",
    "Consider streaming subscriptions instead of frequent outings.",
    "Balance fun with financial goals!",
  ],
  "Bills & Utilities": [
    "Utility bills seem consistent. Good job managing them!",
    "Consider reviewing your subscriptions for unused services.",
    "Your bills are under control this month.",
  ],
  Other: [
    "Miscellaneous expenses can add up quickly.",
    "Track your 'other' expenses to identify patterns.",
    "Every small expense counts towards your budget.",
  ],
};

const generalTips = [
  "Set a weekly budget to stay on track!",
  "The 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Track every expense, no matter how small.",
  "Review your spending weekly to spot trends.",
  "Automate your savings for better financial health.",
];

export function generateInsight(expense: Expense): AIInsight {
  const messages = categoryMessages[expense.category] || categoryMessages.Other;
  const message = messages[Math.floor(Math.random() * messages.length)];

  return {
    id: `insight_${Date.now()}`,
    message,
    category: expense.category,
    type: expense.amount > 50 ? "warning" : "tip",
    createdAt: Date.now(),
  };
}

export function generateWeeklyInsights(expenses: Expense[]): AIInsight[] {
  const insights: AIInsight[] = [];
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const weeklyExpenses = expenses.filter((e) => e.createdAt > oneWeekAgo);
  const totalSpent = weeklyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals: Record<string, number> = {};
  weeklyExpenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  if (totalSpent > 500) {
    insights.push({
      id: `insight_high_spending_${Date.now()}`,
      message: `You've spent $${totalSpent.toFixed(2)} this week. That's quite a lot!`,
      type: "warning",
      createdAt: Date.now(),
    });
  }

  if (topCategory) {
    const messages = categoryMessages[topCategory[0]] || categoryMessages.Other;
    insights.push({
      id: `insight_top_category_${Date.now()}`,
      message: `${topCategory[0]} is your biggest expense category ($${topCategory[1].toFixed(2)}). ${messages[0]}`,
      category: topCategory[0],
      type: "info",
      createdAt: Date.now(),
    });
  }

  if (insights.length < 3) {
    const randomTip = generalTips[Math.floor(Math.random() * generalTips.length)];
    insights.push({
      id: `insight_tip_${Date.now()}`,
      message: randomTip,
      type: "tip",
      createdAt: Date.now(),
    });
  }

  return insights;
}
