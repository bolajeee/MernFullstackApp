import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),


  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "please fill in all required fields" };
    }

    
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "product created successfully" };
      } else if (res.status === 500) {
        return { success: false, message: "internal server error" };
      } else {
        return { success: false, message: "error creating product" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "error creating product" };
    }
  },

  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/api/products"); 
    const data = await res.json()
    set({products: data.data})
  }
}));
