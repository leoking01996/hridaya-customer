import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = () => {
    const userData = sessionStorage.getItem("user");
    if (!userData) return;

    const userId = JSON.parse(userData).id;

    fetch(`http://localhost/backend_php_hridaya/hridaya-admin-backend/addToCart/get_cart.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setCartCount(data.cart.length);
      })
      .catch(err => console.error("Error fetching cart:", err));
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};