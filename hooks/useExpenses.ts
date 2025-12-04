import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/config/firebase";
import { RootState, AppDispatch } from "@/store";
import {
  setExpenses,
  addExpense,
  setLoading,
  setError,
  Expense,
} from "@/store/expensesSlice";
import { addInsight } from "@/store/insightsSlice";
import { generateInsight, generateWeeklyInsights } from "@/utils/mockAI";
import { useAuth } from "./useAuth";

export function useExpenses() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.expenses
  );
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid || !isFirebaseConfigured || !db) {
      dispatch(setExpenses([]));
      return;
    }

    dispatch(setLoading(true));

    const expensesRef = collection(db, "expenses");
    const q = query(
      expensesRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const expenses: Expense[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          expenses.push({
            id: doc.id,
            amount: data.amount,
            category: data.category,
            note: data.note || "",
            createdAt: data.createdAt?.toMillis() || Date.now(),
            userId: data.userId,
          });
        });
        dispatch(setExpenses(expenses));

        const insights = generateWeeklyInsights(expenses);
        insights.forEach((insight) => {
          dispatch(addInsight(insight));
        });
      },
      (err) => {
        console.error("Error fetching expenses:", err);
        dispatch(setError("Failed to load expenses"));
      }
    );

    return () => unsubscribe();
  }, [user?.uid, dispatch]);

  const createExpense = async (
    amount: number,
    category: string,
    note: string
  ) => {
    if (!user?.uid) {
      throw new Error("Must be logged in to add expense");
    }

    if (!isFirebaseConfigured || !db) {
      throw new Error("Firebase is not configured");
    }

    try {
      const expenseData = {
        amount,
        category,
        note,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "expenses"), expenseData);

      const newExpense: Expense = {
        id: docRef.id,
        amount,
        category,
        note,
        userId: user.uid,
        createdAt: Date.now(),
      };

      dispatch(addExpense(newExpense));

      const insight = generateInsight(newExpense);
      dispatch(addInsight(insight));

      return newExpense;
    } catch (err) {
      console.error("Error adding expense:", err);
      dispatch(setError("Failed to add expense"));
      throw err;
    }
  };

  const totalSpent = items.reduce((sum, expense) => sum + expense.amount, 0);

  const thisMonthTotal = items
    .filter((expense) => {
      const now = new Date();
      const expenseDate = new Date(expense.createdAt);
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  return {
    expenses: items,
    isLoading,
    error,
    createExpense,
    totalSpent,
    thisMonthTotal,
  };
}
