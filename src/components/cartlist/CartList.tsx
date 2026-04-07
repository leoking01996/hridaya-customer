import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { useCart } from "../cart-context/CartContext";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import logo from '@/assets/logo.png'
import { Download } from "lucide-react";

interface CartItem {
  id: number;
  user_id: number;
  product_variant_id: number;
  image: string;
  qty: number;     // numeric quantity
  price: number;   // numeric amount
  created_at: string;
  name:string;
  size:number;
  fragrance:string;
  color:string;
}
interface userdetials{
  address:string;
email:string;
full_name:string;
id:number;
phone_no:number;
profile_pic:string;
}
function Cartlist() {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const navigate = useNavigate();
const [selectedItems, setSelectedItems] = useState<number[]>([]);
const [transactions, setTransactions] = useState<any[]>([]);
const [finalSelectedItems, setFinalSelectedItems] = useState<number[]>([]);
const [isCheckBoxSelected,setIsCheckBoxSelected]=useState(false)
const [userDetails, setuserDetails] = useState<userdetials | null>(null);
const[userIIDD,setuserIIDD]=useState()
const { refreshCart } = useCart();



  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const userData = sessionStorage.getItem("user");
      if (!userData) return;
      const userId = JSON.parse(userData).id;
      console.log(JSON.parse(userData),'4444444444')
setuserIIDD(userId)
setuserDetails(JSON.parse(userData))
      const res = await fetch(
        `http://localhost/backend_php_hridaya/hridaya-admin-backend/addToCart/get_cart.php?user_id=${userId}`
      );
      const data = await res.json();

      if (data.status === "success") {
        const formattedCart: CartItem[] = data.cart.map((item: any) => ({
          ...item,
          qty: Number(item.quantity),
          price: Number(item.amount),
          image: `http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/uploads/${item.image}`,
        }));
        console.log('formattedCart',formattedCart)
        setCartList(formattedCart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
    }
  };
  useEffect(() => {
    fetchCart();
    get_transaction_history();
  }, []);
const get_transaction_history = async ()=>{
  const res  = await fetch('http://localhost/backend_php_hridaya/transaction_history.php');
  const data = await res.json();
  console.log(data.data,'trmsaction data')
  setTransactions(data.data);
}

const getStatus = (cartId: number) => {
  const match = transactions.find(
    (t) => Number(t.product_id) === Number(cartId)
  );

  return match ? match.status : null;
};
  // Remove item from cart
  const removeFromCart = async (cartItemId: number) => {
    try {
      const userData = sessionStorage.getItem("user");
      if (!userData) return;
      const userId = JSON.parse(userData).id;

      const res = await fetch(
        `http://localhost/backend_php_hridaya/hridaya-admin-backend/addToCart/remove_from_cart.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, cart_id: cartItemId }),
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        // alert(data.message);
        //  window.location.reload();
        // toast.success(data.message);
toast.success(`.${data.message}`)
toast.success(`Proceed to checkout - Total Rs.${data.total_amount}`)

        refreshCart();
        fetchCart(); 
      } 
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

const buyItem = (item: CartItem) => {
  // Calculate total for this item
  const totalAmount = item.qty * item.price;

  // Prepare payload
  const payload = {
    user_id: userIIDD,
    cart_ids: [item.id], // you can still send id if needed for backend record
    total_amount: totalAmount // send total directly
  };

  console.log("Single Checkout Payload:", payload);

  // Optionally, you can POST this to your backend for creating an order or payment
  fetch('http://localhost/backend_php_hridaya/checkout.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include", 
    body: JSON.stringify(payload)
  })
    .then((res) => res.json())
    .then((data) => {
      // You can ignore backend calculation since you already know total
      // alert(`Proceed to checkout - Total Rs.${totalAmount}`);
      toast.success(`Proceed to checkout - Total Rs.${totalAmount}`)
           navigate("/checkout", {
      state: {
        cartItems: data.cart_items,
        totalAmount: data.total_amount,
        userId:userIIDD

      },
    });
    })
    .catch((err) => {
      console.error(err);
      alert("Checkout failed");
    });
};
const buySelectedItem = async () => {
  console.log('finalSelectedItems',finalSelectedItems)
  if (finalSelectedItems.length === 0) return;
    const payload = {
    user_id: userIIDD,
    cart_ids: finalSelectedItems, // you can still send id if needed for backend record
     // send total directly
  };
  try {
    const res = await fetch('http://localhost/backend_php_hridaya/checkout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include", 
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('Multiple Checkout:', data);
      

    // alert(`Proceed to checkout - Total Rs.${data.total_amount}`);
toast.success(`Proceed to checkout - Total Rs.${data.total_amount}`)
        navigate("/checkout", {
      state: {
        cartItems: data.cart_items,
        totalAmount: data.total_amount,
        userId:userIIDD
      },
    });
  } catch (err) {
    console.error(err);
    alert('Checkout failed');
  }
};

// Function to fetch payment history
const paymentHystory = async () => {
  try {
    const res = await fetch("http://localhost/backend_php_hridaya/transaction_history.php");
    const data = await res.json(); // parse JSON
    return data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return [];
  }
};
const downloadPDFField = async (user: any, cartItems: any, totalAmount: number) => {
  console.log(user,'user')
  console.log(cartItems,'cartItems')
  console.log(totalAmount,'totalAmount')
  console.log('userdetail',userDetails?.full_name)


  const res = await fetch ("http://localhost/backend_php_hridaya/merchant-backend/get_merchants.php");
const m_data  = await res.json();
console.log(m_data.merchants.filter(list=>list.id==cartItems.merchant_id)[0],'sss5555');
const merchant_data = m_data.merchants.filter(list=>list.id==cartItems.merchant_id)[0];


  try {
    const doc = new jsPDF();

    // Convert cartItems to array if it's a single object
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];

    // Function to fetch image and convert to Base64
    const getBase64FromUrl = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const logoBase64 = await getBase64FromUrl(logo);

    // ---- Hridaya Watermark ----
    doc.setFontSize(60);
    doc.setTextColor(200, 200, 200); // light gray
    doc.setFont("helvetica", "bold");
    doc.text("Hridaya", 105, 150, { align: "center", angle: 45 });

    // ---- Logo ----
    doc.addImage(logoBase64, "PNG", 80, 10, 50, 50);

    // ---- Title ----
    doc.setFontSize(22);
    doc.setTextColor(243, 115, 22); // orange
    doc.setFont("helvetica", "bold");
    doc.text("Hridaya Order Receipt", 105, 70, { align: "center" });

    // ---- User Details ----
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
if (userDetails) {
  doc.text(`Name: ${userDetails.full_name}`, 20, 85);
  doc.text(`Email: ${userDetails.email}`, 20, 93);
  doc.text(`Phone: ${userDetails.phone_no}`, 20, 101);
  doc.text(`Address: ${userDetails.address}`, 20, 109);
}
    // ---- Order Items ----
    doc.setFontSize(14);
    doc.text("Order Items:", 20, 125);

    let startY = 133;

    itemsArray.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${item.name} | Qty: ${item.qty} | Price: Rs.${item.price} | Total: Rs.${item.total_price}`,
        20,
        startY
      );
      doc.text(
        `Size: ${item.size || "-"} | Color: ${item.color || "-"} | Fragrance: ${item.fragrance || "-"}`,
        20,
        startY + 6
      );
      startY += 14;
    });

 // ---- Delivery Status ----
startY += 10;
doc.setFontSize(14);
doc.setTextColor(243, 115, 22); // Orange
doc.setFont("helvetica", "bold");
doc.text(`Delivery Status: ${cartItems.status}`, 20, startY);


// delevery by----
if (merchant_data) {
  startY += 8;

  doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
  doc.text(`Delevered by:`, 20, startY);
  startY += 6;

  doc.text(`Name: ${merchant_data.full_name}`, 20, startY);

  startY += 6;
  doc.text(`Email: ${merchant_data.email}`, 20, startY);

  startY += 6;
  doc.text(`Phone: ${merchant_data.phone}`, 20, startY);

  startY += 6;
  doc.text(`National Id Number: ${merchant_data.national_id_number}`, 20, startY);
}

    // ---- Total Amount ----
    startY += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0);
    doc.text(`Total Amount: Rs.${totalAmount}`, 20, startY);

    // ---- Footer ----
    doc.setFontSize(10);
    // doc.setTextColor(150, 150, 150);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Thank you for shopping with Hridaya!",
      105,
      startY + 30,
      { align: "center" }
    );

    // ---- Save PDF ----
    doc.save(`Hridaya_Order_${Date.now()}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

// Function to download PDF
const downloadPDF = async (data: any) => {
  console.log("data", data);

  // Wait for payment history to load
  const paymentHistoryData = await paymentHystory();
  const paymentHistoryDataForBill = paymentHistoryData.data.filter(list=>list.product_id==data.id)[0];
  console.log("paymentHistory", paymentHistoryDataForBill);
downloadPDFField(data,paymentHistoryDataForBill,paymentHistoryDataForBill.total_price);
  // Now you can use paymentHistoryData to create PDF
};
const removeSelectedItem = async()=>{
      try {
      const userData = sessionStorage.getItem("user");
      if (!userData) return;
      const userId = JSON.parse(userData).id;

        console.log('finalSelectedItems',finalSelectedItems)


      const res = await fetch(
        `http://localhost/backend_php_hridaya/hridaya-admin-backend/addToCart/remove_from_cart.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, cart_id: finalSelectedItems }),
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        // alert(data.message);
        //  window.location.reload();
        // toast.success(data.message);
toast.success(`.${data.message}`)
toast.success(`Proceed to checkout - Total Rs.${data.total_amount}`)

        refreshCart();
        fetchCart(); 
      } 
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
}
const handleCheckboxChange = (id: number) => {

  setSelectedItems((prev) => {
    const updated =
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
setFinalSelectedItems(updated);
    console.log("Selected Items:", updated);
  if(updated.length!==0){
    setIsCheckBoxSelected(true);
  }else{
    setIsCheckBoxSelected(false);

  }
    return updated;
  });
};
// selecetd total
const selectedTotalPrice = cartList
  .filter((item) => selectedItems.includes(item.id))
  .reduce((acc, item) => acc + item.qty * item.price, 0);
  // Total price
  const totalPrice = cartList.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <section className="mt-20 py-20 px-4 bg-gray">
{isCheckBoxSelected && (
  <div className="fixed right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl p-4 flex flex-col items-center space-y-3 z-50 w-64">

    {/* Selected Items Names */}
    <div className="text-center max-h-40 overflow-y-auto">
      <p className="text-lg font-semibold text-gray-800 mb-2">Selected Items:</p>
      <ul className="text-gray-800 text-sm space-y-1">
        {cartList
          .filter((item) => selectedItems.includes(item.id))
          .map((item) => (
            <li key={item.id} className="truncate">
              {item.name} ({item.qty} * {item.price}) = ({item.qty * item.price})
            </li>
          ))}
      </ul>
    </div>

    {/* Selected total */}
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-800">
        Selected Total: <span className="text-green-600">Rs.{selectedTotalPrice.toFixed(2)}</span>
      </p>
    </div>

    {/* Buy button */}
    <button
      onClick={buySelectedItem}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all"
    >
      Buy Selected Items!
    </button>
        <button
      onClick={removeSelectedItem}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all"
    >
      Remove Selected Items!
    </button>
  </div>
)}
      <div className="container mx-auto max-w-4xl text-center space-y-8 animate-slide-up">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight">Your Cart</h2>

        {cartList.length === 0 ? (
          <p className="text-muted-foreground text-lg mt-10">Your cart is empty.</p>
        ) : (
          <>
            <div className="text-left mb-6">
              <span className="text-lg font-semibold text-accent">
                Total:Rs.{totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="space-y-6">
              {cartList.map((item) => (
             <div
  key={item.id}
  className="flex items-center bg-secondary/10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"

>
  {/* Checkbox */}
  <div className="pl-3 me-2">
    <input
      type="checkbox"
      checked={selectedItems.includes(item.id)}
      onChange={(e) => {
        e.stopPropagation();
        handleCheckboxChange(item.id);
      }}
      className="w-4 h-4"
    />
  </div>

  <img
    src={item.image}
    alt={item.id.toString()}
    className="w-32 h-32 object-cover rounded-l-2xl"
  />

  <div className="flex-1 p-5 text-left space-y-2">
    <h3 className=" flex text-xl font-medium text-foreground">
      <strong className="hidden md:block">Product Name:</strong> {item.name}
    </h3>
    
<div className="hidden md:block">
  <div className="flex ">
 <p className=" text-sm me-2"> <strong>size:</strong> {item.size}</p>
    <p className=" text-sm me-2"><strong>Fragrance:</strong> {item.fragrance}</p>
    <p className=" text-sm me-2">  <strong>color: </strong>{item.color}</p>
</div>
</div>
<div className="hidden md:block">

    <div className="flex"> 
     <p className=" text-sm me-2">
     <strong> Quantity:</strong> {item.qty}
    </p> 

   <strong>*</strong>
      <p className=" ms-2 text-sm">
      <strong>Per Price:</strong> {item.price}
    </p>

   <strong className="ms-2">=</strong>

      <p className=" ms-2 text-sm">
      <strong>Total:</strong> {item.price * item.qty}
    </p>
    </div>
</div>

    <span className="block text-lg font-semibold text-accent mt-2">
      Rs.{item.price.toFixed(2)}
    </span>

    


{getStatus(item.id) === "pending" || getStatus(item.id) === "delivered" ? (

  <button
    onClick={() =>
      navigate(`/productsDetail_/${item.product_variant_id}`, {
        state: { product: item },
      })
    }
    className="mt-2 px-3 ms-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
  >
    View
  </button>

) : (

  <>
    <button
      onClick={(e) => {
        e.stopPropagation();
        removeFromCart(item.id);
      }}
      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
    >
      Remove
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        buyItem(item);
      }}
      className="mt-2 ms-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
    >
      Buy
    </button>

    <button
      onClick={() =>
        navigate(`/productsDetail_/${item.product_variant_id}`, {
          state: { product: item },
        })
      }
      className="mt-2 px-3 ms-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
    >
      View
    </button>
  </>

)}
{/* show down load in mobile */}
     <div className="m-2 block md:hidden">
    <p className="text-sm">
  <strong>Status:</strong>{" "}
{getStatus(item.id) ? (
  <>
    <span className="text-green-600">{getStatus(item.id)}</span>
    {getStatus(item.id) === 'delivered' && (
   <button
  onClick={() => downloadPDF(item)}
  className="ml-3 px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
>
  <Download size={18} />
  <span>Bill</span>
</button>
    )}
  </>
) : (
  <span className="text-gray-400">Not Purchased</span>
)}
</p>
  </div>
  </div>
{/* show down load in dextop */}
  
  <div className="m-2 hidden md:block">
    <p className="text-sm">
  <strong>Status:</strong>{" "}
{getStatus(item.id) ? (
  <>
    <span className="text-green-600">{getStatus(item.id)}</span>
    {getStatus(item.id) === 'delivered' && (
     <button
        onClick={() => downloadPDF( item)}
        className="ml-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
      >
        Download Bill
      </button>
    )}
  </>
) : (
  <span className="text-gray-400">Not Purchased</span>
)}
</p>
  </div>

</div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cartlist;