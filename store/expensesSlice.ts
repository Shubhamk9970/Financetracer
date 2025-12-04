import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  note: string;
  createdAt: number;
  userId: string;
}

interface ExpensesState {
  items: Expense[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  items: [],
  isLoading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.items.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearExpenses: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const { setExpenses, addExpense, setLoading, setError, clearExpenses } =
  expensesSlice.actions;

export default expensesSlice.reducer;
