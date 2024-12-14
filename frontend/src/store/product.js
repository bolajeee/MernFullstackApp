import { create } from "zustand";

const API_BASE_URL = "http://localhost:5174/api/products";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all required fields" };
    }

    try {
      const res = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
      } else if (res.status === 500) {
        return { success: false, message: "Internal server error" };
      } else {
        return { success: false, message: "Error creating product" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error creating product" };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}`, { mode: "no-cors" });

      if (res.ok) {
        const data = await res.json();
        set({ products: data.data });
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: "Product deleted successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Error deleting product" };
    }
  },


  updateProduct: async (pid, updatedProduct) => {
     console.log("Updating product with ID:", pid); 
  try {
    const res = await fetch(`${API_BASE_URL}/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      console.error(
        `Failed to update product: ${res.status} ${res.statusText}`
      );
      return { success: false, message: "Error updating product" };
    }

    const data = await res.json();

    if (data.success) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Error updating product" };
  }
  },
}));
