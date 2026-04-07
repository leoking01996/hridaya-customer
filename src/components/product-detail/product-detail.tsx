import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../cart-context/CartContext";
import { toast } from "react-toastify";

interface Variant {
  id: string;
  product_id: string;
  variant_name: string;
  long_description: string;
  price: string;
  size: string | null;
  color: string | null;
  fragrance: string | null;
  shape: string | null;
  weight: string | null;
  burn_time: string | null;
  stock: string;
  sku: string | null;
  images: string;
}

interface ProductDetailProps {
  productDetail?: {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
  };
}

interface CartItem {
  product_variant_id: string;
  user_id: string;
  name: string;
  amount: number;
  quantity: number;
  image: string;
    size: string | null;

  color: string | null;

  fragrance: string | null;

}

export default function ProductDetail_({}: ProductDetailProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  const productDetail = location.state?.product;

  // State
  const [verientDetail, setVerientDetail] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState<string>("user123");
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);

  // Option selections
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFragrance, setSelectedFragrance] = useState<string | null>(null);

  // Load variants
  useEffect(() => {
    if (!productDetail) return;

    // Load user ID from session
    const userData = sessionStorage.getItem("user");
    if (userData) setUserId(JSON.parse(userData).id);

    const fetchVariants = async () => {
      try {
        const res = await fetch(
          "http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/get_verient.php"
        );
        const data: Variant[] = await res.json();

        const productVariants = data.filter((v) => v.product_id === productDetail.id);
        setVerientDetail(productVariants);

        if (productVariants.length > 0) {
          setSelectedVariant(productVariants[0]);
          const imgs = JSON.parse(productVariants[0].images || "[]");
          setMainImage(imgs[0] || "");
          setAmount(Number(productVariants[0].price));
        }
      } catch (err) {
        console.error("Error fetching variants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productDetail]);

  // Quantity handlers
  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    setAmount(Number(selectedVariant?.price || 0) * newQty);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    const newQty = quantity - 1;
    setQuantity(newQty);
    setAmount(Number(selectedVariant?.price || 0) * newQty);
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    const item: CartItem = {
      product_variant_id: selectedVariant.id,
      user_id: userId,
      name: productDetail.name,
      amount,
      quantity,
      image: mainImage || productDetail.image,
      size:selectedSize,
      color:selectedColor,
      fragrance:selectedFragrance,
      
    };

    try {
      const res = await fetch(
        "http://localhost/backend_php_hridaya/hridaya-admin-backend/addToCart/add_to_cart.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      const data = await res.json();
      refreshCart();

    if (data.status === 'success' ) {
      toast.success(data.message);
      navigate("/cartList");
      
    } else {
      toast.error(data.message||"Failed to add item");
    }
    } catch (err) {
      toast.error(err.message||"Failed to add item");
    }
  };

  // Filter variants based on selection
  const filteredBySize = selectedSize
    ? verientDetail.filter((v) => v.size === selectedSize)
    : verientDetail;

  const filteredBySizeAndColor =
    selectedSize && selectedColor
      ? verientDetail.filter((v) => v.size === selectedSize && v.color === selectedColor)
      : filteredBySize;

  const filteredVariants = filteredBySizeAndColor.filter((v) =>
    selectedFragrance ? v.fragrance === selectedFragrance : true
  );

  const currentVariant = filteredVariants[0] || null;

  // Unique options
  const sizes = Array.from(new Set(verientDetail.map((v) => v.size))).filter(Boolean);
  const colors = Array.from(new Set(filteredBySize.map((v) => v.color))).filter(Boolean);
  const fragrances = Array.from(new Set(filteredBySizeAndColor.map((v) => v.fragrance))).filter(Boolean);

  // Reset dependent options
  useEffect(() => {
    setSelectedColor(null);
    setSelectedFragrance(null);
  }, [selectedSize]);

  useEffect(() => {
    setSelectedFragrance(null);
  }, [selectedColor]);

  if (loading) return <div>Loading...</div>;

  const images = currentVariant ? JSON.parse(currentVariant.images || "[]") : [];

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row mt-20 gap-12">
      {/* Images */}
 <div className="lg:w-1/2 flex flex-col lg:flex-row gap-4">
  {/* Main Image */}
  <div className="flex-1 order-1 lg:order-2">
    <img
      src={`http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/uploads/${mainImage}`}
      alt={currentVariant?.variant_name}
      className="w-full h-[400px] object-cover rounded-2xl"
    />
  </div>

  {/* Thumbnails */}
  <div className="flex flex-row lg:flex-col gap-2 order-2 lg:order-1">
    {images.map((img: string, idx: number) => (
      <img
        key={idx}
        src={`http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/uploads/${img}`}
        alt={`Thumbnail ${idx}`}
        className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
          mainImage === img ? "border-accent" : "border-gray-200"
        }`}
        onClick={() => setMainImage(img)}
      />
    ))}
  </div>
</div>

      {/* Details */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        <div className="p-4">
          {currentVariant ? (
            <div>
              <h1 className="mb-4 text-2xl font-bold">{currentVariant.variant_name}</h1>
              <p className="mb-2 font-semibold ">{currentVariant.long_description}</p>
              <p className="mb-2">
                <strong>Price:</strong> Rs.{currentVariant.price}
              </p>
              <p className="mb-2">
                <strong>Weight:</strong> {currentVariant.weight}g
              </p>
              <p className="mb-2">
                <strong>Burn Time:</strong> {currentVariant.burn_time} min
              </p>
              <p className="mb-2">
                <strong>Stock:</strong> {currentVariant.stock}
              </p>
              <div className="flex mb-4 items-center gap-4 mt-4">
  
  <button
    onClick={decreaseQty}
    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
  >
    -
  </button>

  <span className="text-lg font-semibold">{quantity}</span>

  <button
    onClick={increaseQty}
    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
  >
    +
  </button>

</div>
            </div>
          ) : (
            <p className="mt-4 text-red-500">No variant matches your selection</p>
          )}

          {/* Options */}
          <h2 className="text-xl font-bold mb-4">Select Product Options</h2>

          <div className="mb-0">
            <strong>Size:</strong>{" "}
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-2 py-1 m-1 border rounded ${
                  selectedSize === size ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {colors.length > 0 && (
            <div className="mb-0">
              <strong>Color:</strong>{" "}
              {colors.map((color) => (
                <button
                  key={color}
                  className={`px-2 py-1 m-1 border rounded ${
                    selectedColor === color ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          )}

          {fragrances.length > 0 && (
            <div className="mb-4">
              <strong>Fragrance:</strong>{" "}
              {fragrances.map((fragrance) => (
                <button
                  key={fragrance}
                  className={`px-2 py-1 m-1 border rounded ${
                    selectedFragrance === fragrance ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => setSelectedFragrance(fragrance)}
                >
                  {fragrance}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!currentVariant}
          className={`bg-accent text-white py-3 px-6 rounded-xl w-full md:w-auto hover:bg-accent-dark transition ${
            !currentVariant ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Add to Cart
        </button>

        {/* Tabs */}
        <div className="mt-10 sticky top-20">
          <div className="flex gap-4 overflow-x-auto border-b border-gray-200 pb-2">
            <button
              className={`whitespace-nowrap px-4 py-2 font-medium border-b-2 transition ${
                activeTab === "description"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-500 hover:text-accent"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
          </div>
          <div className="mt-6">
            {activeTab === "description" && <p>{selectedVariant?.long_description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}