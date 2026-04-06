import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Main_body from "./components/main-body/main";
import Products_ from "./components/products/products";
import ProductDetail_ from "./components/product-detail/product-detail";
// import Cartlist from "./components/cartlist/cartlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/auth/auth";
import Profile from "./components/profile/profile";
import AuthGuard from "./components/auth/AuthGuard";
import Cartlist from "./components/cartlist/CartList";
import Checkout from "./components/checkout/checkout";
import { CartProvider } from "./components/cart-context/CartContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <ToastContainer 
       position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Sonner />
        <CartProvider> <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} >
            <Route path="/" element={<Main_body />} />
            <Route path="products_" element={<Products_ />} />
            <Route path="productsDetail_/:id" element={<ProductDetail_ />} />
            <Route path="cartList" element={<Cartlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="auth" element={<Auth/>} />
            <Route path="profile" element={ <AuthGuard>
           
              
      <Profile />
    </AuthGuard>} />


          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter></CartProvider>
     
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
