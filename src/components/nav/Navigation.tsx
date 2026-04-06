import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import './nav.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCartAPI } from "../product-detail/cart";
import Popup from "../popup-modules/auth/popupProps";
import Login from "../auth/login";
import Register from "../auth/register";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { toast } from "react-toastify";
import logo2 from "assets/logo2.png"
import { useCart } from "../cart-context/CartContext";


interface User {
  id: number;
  full_name: string;
  email: string;
  auth_type: string;
  type: string;
  is_verified?: number; // optional, in case it’s missing
}
interface Category {
  id: string;
  typename: string;
  description: string;
  created_at: string;
  updated_at: string;
}
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartListNo, setCartListNo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
const [categoryList, setCategoryList] = useState<Category[]>([]);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
   const [mode, setMode] = useState<"login" | "register"|"resetpw">("login");
   const nav =useNavigate();
     const [userData, setUserData] = useState<User>(() => {
    const stored = sessionStorage.getItem("user"); 

    return stored ? JSON.parse(stored) : null;     
  });
  
  const categories = [
    {
      key: "Soy Wax",
      label: "Soy Wax",
      description: "Premium soy wax candles made from natural ingredients, clean burn, and eco-friendly.",
    },
    {
      key: "Paraffin Wax",
      label: "Paraffin Wax",
      description: "Affordable candles with vibrant colors and smooth finish using premium paraffin wax.",
    },
    {
      key: "Edible Candles",
      label: "Edible Candles",
      description: "Delicious edible candles made with food-grade ingredients — safe and fun for parties.",
    },
    {
      key: "Gel Wax",
      label: "Gel Candles",
      description: "Transparent and artistic gel wax candles perfect for creative displays.",
    },
    {
      key: "Our Special Candles",
      label: "Our Special Candles",
      description: "Our signature collection of handcrafted designs with unique scents and shapes.",
    },
  ];

  const { cartCount } = useCart();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userData = sessionStorage.getItem("user");
      if (!userData) return;
      const userId = JSON.parse(userData).id;
       const res = await fetch(
        `http://localhost/backend_php_hridaya/hridaya-admin-backend/addToCart/get_cart.php?user_id=${userId}`
      );
      const data = await res.json();
        console.log('responsadasdse',data)
        const cartLength = data.cart.length ;
        console.log('cartLength',cartLength)
        setCartListNo(cartLength);

      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost/backend_php_hridaya/hridaya-admin-backend/get_create_product_type.php");
    const result = await res.json();
    if (result.success) {
      setCategoryList(result.data); // store the array in state
    } else {
      setCategoryList([]);
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};
    fetchCart()
    fetchCategories();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);


  }, [userData]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 100); // 3 seconds delay before closing
  };
  const cartList = () => {
    navigate("/cartList");
  };
const Auth=()=>{
  navigate('/auth')
}

const profile =()=>{

}
const logout =()=>{
  sessionStorage.removeItem("user");
  toast.success("Logout sucessfully");
  navigate("/");
  setUserData(null);
}
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.png" className="logo me-2" />

              <div className="leading-[0.5]">
                <a
                  href="/"
                  className="text-2xl md:text-3xl font-light tracking-[0.1em] text-foreground"
                >
                  HRIDAYA
                </a>
                <br />
                <a
                  href="/"
                  className="font-light tracking-[0.1em]  text-sm"
                >
                  The Gift Beyond Heart
                </a>
              </div>

            </div>



            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-sm tracking-wider hover:text-accent transition-colors">

                <NavLink to="/#shop">
                  HOME
                </NavLink>
              </a>
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="#shop"
                  className="text-sm tracking-wider hover:text-accent transition-colors cursor-pointer"
                >
                  CATEGORY
                </a>

                {/* Dropdown Menu */}
             {isProductsOpen && (
  <div
    className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300"
    style={{ overflow: "visible" }}
  >
    {categoryList.map(cat => (
      <div key={cat.id} className="relative group">
        <NavLink
          to="products_"
          state={{ category: cat.typename }}
          className="block px-4 py-3 text-sm tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {cat.typename}
        </NavLink>
        <div className="absolute left-full top-0 ml-2 hidden group-hover:flex w-64 bg-white border border-gray-300 rounded-md shadow-md p-3 text-sm text-gray-700">
          {cat.description}
        </div>
      </div>
    ))}
  </div>
)}
              </div>
              <a href="#about" className="text-sm tracking-wider hover:text-accent transition-colors">
                ABOUT
              </a>
              <a href="#contact" className="text-sm tracking-wider hover:text-accent transition-colors">
                CONTACT
              </a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-accent/10"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button onClick={(e) => { cartList() }} variant="ghost" size="icon" className="hover:bg-accent/10 relative">
                <ShoppingCart className="h-5 w-5" />
               <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
  {cartCount}
</span>
              </Button>
              {!userData&&(
 <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="hover:bg-accent/10">
                <User className="h-5 w-5" />
              </Button>
              )}
             {/* if not log in */}
   {!userData&&(
          <Popup
              isOpen={open}
              title="Confirm Action"
              onClose={() => setOpen(false)}>

      <div className="auth-card">
        {/* Toggle Buttons */}
        <div className="auth-toggle">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* Forms */}
          {mode === "login" ? (
      <Login
        onSuccess={(userData) => {
          setUserData(userData);
          setOpen(false); // close popup if needed
        }}
      />
    ) : (
      <Register
        onSuccess={(data) => {
          // console.log("Register data:", data);
          setOpen(false); // close popup if needed
        }}
      />
    )}
      </div>

</Popup>
   )}
   {/* if login */}
   {userData&&(
        <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <User className="h-5 w-5 text-gray-700" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="z-50 min-w-[160px] rounded-xl bg-white p-2 shadow-lg border border-gray-200 animate-in fade-in-0 zoom-in-95"
        >
          <DropdownMenu.Item
            className="flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer outline-none hover:bg-gray-100 transition"
            onClick={profile}
          >
            <Link to={'/profile'}>Profile</Link>
            
            
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

          <DropdownMenu.Item
            className="flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer outline-none text-red-600 hover:bg-red-50 transition"
            onClick={logout}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
   )}
        
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-accent/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="mt-4 animate-slide-up">
              <Input
                type="search"
                placeholder="Search for candles..."
                className="w-full bg-background border-border"
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
 
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-sm tracking-wider hover:text-accent transition-colors cursor-pointer">
            CATEGORY
          </div>

          {isProductsOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300"
              style={{ overflow: "visible" }}
            >
              {categories.map((cat) => (
                <div key={cat.key} className="relative group">
                  {/* Clickable Category */}
                  <div
                    onClick={() => navigate("/products_", { state: { category: cat.key } })}
                    className="block px-4 py-3 text-sm tracking-wide hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    {cat.label}
                  </div>

                  {/* Hover Info Box */}
                  <div className="absolute left-full top-0 ml-2 hidden group-hover:flex w-64 bg-white border border-gray-300 rounded-md shadow-md p-3 text-sm text-gray-700 pointer-events-none">
                    {cat.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navigation;
