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
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
        method: "DELETE"
      });
    const data = await res.json()
    if (!data.success) {
      return {success: false, message: data.message}
    }
    set(state => (
      {
      products: state.products.filter(product => product._id !== pid)
    }))
  },

  updateProduct: async (pid, updatedProduct) => {
   const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(updatedProduct),
   });
    console.log(pid);
    
    if (!res.ok) {
      return { success: false, message: "Failed to update product" };
    }
    
    const data = await res.json()

    if (!data.success) {
      return {success: false, message: data.message}
    }

    // updates Ui withouth need for refresh
    set(state => ({
      products: state.products.map(product => product._id === pid ? data.data : product)
    }))
  }
}));
