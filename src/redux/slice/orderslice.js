import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all orders OR by status
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (status = "", { rejectWithValue }) => {
    try {
      const query = status ? `?status=${status}` : "";
      const response = await axios.get(`/api/orders${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// ✅ Fetch order items
export const fetchOrderItems = createAsyncThunk(
  "orders/fetchOrderItems",
  async (orderId = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/orderitems${orderId ? `?orderId=${orderId}` : ""}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch order items");
    }
  }
);

// ✅ Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/orders", { id, status });
      return response.data; // returns updated order object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderItems: [],
    selectedOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearOrder: (state) => {
      state.selectedOrder = null;
      state.orderItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch order items
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.orderItems = action.payload;
      })

      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.orders.findIndex((o) => o.id === updated.id);
        if (index !== -1) {
          state.orders[index] = updated;
        }

        if (state.selectedOrder?.id === updated.id) {
          state.selectedOrder = updated;
        }
      });
  },
});

export const { selectOrder, clearOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
