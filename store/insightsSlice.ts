import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AIInsight } from "@/utils/mockAI";

interface InsightsState {
  items: AIInsight[];
  latestInsight: AIInsight | null;
}

const initialState: InsightsState = {
  items: [],
  latestInsight: null,
};

const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<AIInsight[]>) => {
      state.items = action.payload;
    },
    addInsight: (state, action: PayloadAction<AIInsight>) => {
      state.latestInsight = action.payload;
      const exists = state.items.some((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload);
        if (state.items.length > 10) {
          state.items = state.items.slice(0, 10);
        }
      }
    },
    clearLatestInsight: (state) => {
      state.latestInsight = null;
    },
    clearInsights: (state) => {
      state.items = [];
      state.latestInsight = null;
    },
  },
});

export const { setInsights, addInsight, clearLatestInsight, clearInsights } =
  insightsSlice.actions;

export default insightsSlice.reducer;
