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
  is_verified?: number;
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
  const [mode, setMode] = useState<"login" | "register" | "resetpw">("login");
  const [userData, setUserData] = useState<User>(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

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
        setCartListNo(data.cart.length);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost/backend_php_hridaya/hridaya-admin-backend/get_create_product_type.php"
        );
        const result = await res.json();
        setCategoryList(result.success ? result.data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCart();
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
    }, 100);
  };

  const cartList = () => navigate("/cartList");
  const Auth = () => navigate("/auth");
  const profile = () => navigate("/profile");
  const logout = () => {
    sessionStorage.removeItem("user");
    toast.success("Logout sucessfully");
    navigate("/");
    setUserData(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
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
                <a href="/" className="font-light tracking-[0.1em] text-sm">
                  The Gift Beyond Heart
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/#shop"
                className="text-sm tracking-wider hover:text-accent transition-colors"
              >
                HOME
              </NavLink>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-sm tracking-wider hover:text-accent transition-colors cursor-pointer">
                  CATEGORY
                </span>
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300">
                    {categoryList.map((cat) => (
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

              <NavLink
                to="/about"
                className="text-sm tracking-wider hover:text-accent transition-colors"
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/contact"
                className="text-sm tracking-wider hover:text-accent transition-colors"
              >
                CONTACT
              </NavLink>
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
              <Button
                onClick={cartList}
                variant="ghost"
                size="icon"
                className="hover:bg-accent/10 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>

              {!userData && (
                <Button
                  onClick={() => setOpen(true)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              {!userData && (
                <Popup isOpen={open} title="Confirm Action" onClose={() => setOpen(false)}>
                  <div className="auth-card">
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
                    {mode === "login" ? (
                      <Login
                        onSuccess={(userData) => {
                          setUserData(userData);
                          setOpen(false);
                        }}
                      />
                    ) : (
                      <Register
                        onSuccess={() => setOpen(false)}
                      />
                    )}
                  </div>
                </Popup>
              )}

              {userData && (
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

              {/* Mobile menu toggle */}
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
   {/* Mobile Menu */}
{isMobileMenuOpen && (
  <div
    className="md:hidden absolute top-full left-0 w-full bg-white border-t p-4 space-y-2 z-50 shadow-md"
    style={{ top: "70px" }} // adjust 70px to match your navbar height
  >
    {/* Category section */}
    <div>
      <button
        className="flex justify-between w-full py-2 px-3 text-left hover:bg-gray-100 rounded"
        onClick={() => setIsProductsOpen(!isProductsOpen)}
      >
        CATEGORY
        <span>{isProductsOpen ? "▲" : "▼"}</span>
      </button>
      {isProductsOpen && (
        <div className="pl-4 mt-1 space-y-1">
          {categoryList.map((cat) => (
            <NavLink
              key={cat.id}
              to="products_"
              state={{ category: cat.typename }}
              className="block py-2 px-3 hover:bg-gray-100 rounded"
            >
              {cat.typename}
            </NavLink>
          ))}
        </div>
      )}
    </div>

    <NavLink to="/about" className="block py-2 px-3 hover:bg-gray-100 rounded">
      About
    </NavLink>
    <NavLink to="/contact" className="block py-2 px-3 hover:bg-gray-100 rounded">
      Contact
    </NavLink>

    {userData && (
      <div className="border-t pt-2">
        <button
          className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}
    </>
  );
};

export default Navigation;