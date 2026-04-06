
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    soyWaxProducts,
    paraffinWaxProducts,
    edibleCandleProducts,
    gelWaxProducts,
    specialProducts,
    Product,
} from "@/product-data/productData";
interface ProductList {
  id: string;
  name: string;
  type: string;
  short_description: string;
  price: string;
  image: string;
  created_at: string;
}

const categoryTitleMap: Record<string, string> = {
    'Soy Wax': "Soy Wax Collection",
    'Paraffin Wax': "Paraffin Wax Collection",
    'Edible Candles': "Edible Candles Collection",
    'Gel Wax': "Gel Candles Collection",
    'Our Special Candles': "Our Special Collection",
};

function Products_() {
    const navigate = useNavigate();
    const location = useLocation();

    // Safely extract category from location.state
    const category = (location.state as { category?: string })?.category || "soyWax";
const [productLists, setProducts] = useState<ProductList[]>([]);

    const [productData, setProductData] = useState<Product[]>([]);
    const [title, setTitle] = useState<string>(categoryTitleMap[category]);

    useEffect(() => {
        console.log()
        switch (category) {
            case "Soy Wax":

                setProductData(soyWaxProducts);
                fetchProductsAsync('soy');
                break;
            case "Paraffin Wax":
                setProductData(paraffinWaxProducts);
                fetchProductsAsync('paraffin');

                break;
            case "Edible Candles":
                setProductData(edibleCandleProducts);
                fetchProductsAsync('eatable');

                break;
            case "Gel Wax":
                alert()
                setProductData(gelWaxProducts);
                fetchProductsAsync('gel');

                break;
            case "Our Special Candles":
                setProductData(specialProducts);
                fetchProductsAsync('special');

                break;
            default:
                setProductData(soyWaxProducts);
                fetchProductsAsync('soy');

        }

        setTitle(categoryTitleMap[category] || "Soy Wax Collection");







// fetchProductsAsync('');
        window.scrollTo(0, 0);
    }, [category]);

 const fetchProductsAsync = async (type:string) => {
  try {
    const res = await fetch(
      "http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/get_product.php"
    );
    const data: ProductList[] = await res.json();

    const selectedCandle = data.filter(list=>list.type == type)

    setProducts(selectedCandle); // store array directly
  
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

    return (
        <section className="mt-20 py-20 px-4 bg-white">
            <div className="container mx-auto max-w-6xl text-center space-y-8 animate-slide-up">
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">{title}</h2>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    {productLists.map((product: ProductList) => (
                        <div
                            key={product.id}
                            className="bg-secondary/10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                            onClick={() => navigate(`/productsDetail_/${product.id}`, { state: { product } })}
                        >
                            <div className="overflow-hidden">
                                <img
                                 src={`http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/uploads/${product.image}`}
                                 alt={product.name}
                                 className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
/>
                            </div>

                            <div className="p-5 text-left space-y-2">
                                <h3 className="text-xl font-medium text-foreground">{product.name}</h3>
                                <p className="text-muted-foreground text-sm">{product.short_description}</p>
                                <span className="block text-lg font-semibold text-accent mt-2">
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products_;

