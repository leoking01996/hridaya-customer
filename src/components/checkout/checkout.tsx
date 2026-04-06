import { Route, useLocation,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { jsPDF } from "jspdf";
import logo from '@/assets/logo.png'

interface CartItem {
  id: number;
  name: string;
  image: string;
 
  qty: number;
  price: number;
  total_price: number;
  size:number;
  color:string;
  fragrance:string;
}
interface UserData {
  id: string;
  full_name: string;
  email: string;
  phone_no?: string;
  date_of_birth?: string;
  profile_pic?: string;
  address?: string;
}
function Checkout() {
  const location = useLocation();
const navigate = useNavigate();
  const cartItems: CartItem[] = location.state?.cartItems || [];
  const [preview, setPreview] = useState<string>("");
  const totalAmount: number = location.state?.totalAmount || 0;
//   const user_id: number = location.state?.userId || 0;
const[userDatass,setuserDatass]=useState<UserData|null>(null);
const [user ,setUser]=useState({
      full_name: "",
  phone_no: "",
  email: "",
  address: ""
})
const [formData,setFormData]=useState<UserData>({
    full_name: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
    profile_pic: "",
    address: "",
    id:''
})
const[user_id,setUser_id]=useState()
  const [paymentMethod, setPaymentMethod] = useState("cod");
const [userData, setUserData] = useState<UserData | null>(null);

const[isEditClicked,setisEditClicked]=useState(false);


  useEffect(() => {
   

    const userData = sessionStorage.getItem('user');
    console.log('userdataasdsadasd',JSON.parse(userData));
    
setuserDatass(JSON.parse(userData));
    const userId = JSON.parse(userData).id;
    setUser_id(userId);
  getUserData();
  setUser({
    full_name: JSON.parse(userData).full_name,
  phone_no: JSON.parse(userData).phone_no,
  email:JSON.parse(userData).email,
  address: JSON.parse(userData).address
  })
  }, []);

  const getUserData =async ( )=>{
    try{
const res = await fetch("http://localhost/backend_php_hridaya/get_user.php");
 const data =await res.json();
 console.log('66666666',data.user)

 setUser({
      full_name: data.user.full_name,
  phone_no: data.user.phone_no,
  email: data.user.email,
  address: data.user.address
 })
 setFormData({

        full_name: data.user.full_name,
  phone_no: data.user.phone_no,
  email: data.user.email,
  address: data.user.address,
    date_of_birth: data.user.date_of_birth,
    profile_pic: data.user.profile_pic,
    id:data.user.id
 })
    }catch{

    }
  }

const edit =()=>{
  console.log(userDatass)
  if (userDatass) {
    setFormData({
      id: userDatass.id,
      full_name: userDatass.full_name || "",
      email: userDatass.email || "",
      phone_no: userDatass.phone_no || "",
      // date_of_birth: userData.date_of_birth || "",
      profile_pic: userDatass.profile_pic || "",
      address: userDatass.address || "",
    });

    // set preview image
    setPreview(userDatass.profile_pic || "");
  }

  setisEditClicked(true);

}
const cancle = ()=>{
  setisEditClicked(false);
}
const handelPlaceOrder = async () => {

  const payload = {
    user_id: user_id,
    payment_method: paymentMethod,
    cart_items: cartItems,
  
  };

  try {
    const res = await fetch(
      "http://localhost/backend_php_hridaya/paymentHistory.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await res.json();
const orderdList = cartItems.map(list=>list.name)
console.log('cartItems',orderdList);

if (data.status === "success") {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div style={{
          backgroundColor: "#fff9f0",
          borderRadius: "15px",
          padding: "30px",
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          fontFamily: "'Arial', sans-serif"
        }}>
          <h2 style={{ color: "#f97316", fontSize: "1.5rem", marginBottom: "10px" }}>
            {data.message}
          </h2>
          <p style={{ marginBottom: "20px", color: "#333" }}>
            Your order: <strong>{cartItems.map(c => c.name).join(", ")}</strong> has been successfully placed!
          </p>

          <button
            onClick={() => downloadPDF(user, cartItems, totalAmount)}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#f97316",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Download Bill
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            style={{
              padding: "10px 25px",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      );
    }
  });
} else {
      toast.error(data.message||"Order failed ❌");
      
    }

  } catch (error) {
    toast.error("Server error ❌");
  }
};


// const downloadPDF = async (user: any, cartItems: any[], totalAmount: number) => {
//   const doc = new jsPDF();

//   // Fetch logo and convert to base64
//   const getBase64FromUrl = async (url: string) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const logoBase64 = await getBase64FromUrl(logo);

//   // Add logo as background (watermark)
//   doc.addImage(logoBase64, "PNG", 50, 100, 100, 100); // x, y, width, height

//   // Title
//   doc.setFontSize(22);
//   doc.setTextColor(243, 115, 22); // orange
//   doc.text("Hridaya Order Receipt", 105, 40, { align: "center" });

//   // User Details
//   doc.setFontSize(12);
//   doc.setTextColor(0, 0, 0);
//   doc.text(`Name: ${user.full_name}`, 20, 60);
//   doc.text(`Email: ${user.email}`, 20, 68);
//   doc.text(`Phone: ${user.phone_no}`, 20, 76);
//   doc.text(`Address: ${user.address}`, 20, 84);

//   // Order Table Header
//   doc.setFontSize(14);
//   doc.text("Order Items:", 20, 100);

//   let startY = 108;
//   cartItems.forEach((item, index) => {
//     doc.setFontSize(12);
//     doc.text(
//       `${index + 1}. ${item.name} | Qty: ${item.qty} | Price: Rs.${item.price} | Total: Rs.${item.total_price}`,
//       20,
//       startY
//     );
//     doc.text(
//       `Size: ${item.size} | Color: ${item.color} | Fragrance: ${item.fragrance}`,
//       20,
//       startY + 6
//     );
//     startY += 14;
//   });

//   // Total Amount
//   doc.setFontSize(14);
//   doc.setTextColor(0, 128, 0);
//   doc.text(`Total Amount: Rs.${totalAmount}`, 20, startY + 10);

//   // Footer
//   doc.setFontSize(10);
//   doc.setTextColor(150, 150, 150);
//   doc.text("Thank you for shopping with Hridaya!", 105, startY + 30, { align: "center" });

//   // Save PDF
//   doc.save(`Hridaya_Order_${Date.now()}.pdf`);
// };

const downloadPDF = async (user: any, cartItems: any[], totalAmount: number) => {
  const doc = new jsPDF();

  // Fetch logo and convert to base64
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

  // ---- Add Hridaya watermark ----
  doc.setFontSize(60);
  doc.setTextColor(200, 200, 200); // light gray
  doc.setFont("helvetica", "bold");
  doc.text("Hridaya", 105, 150, { align: "center", angle: 45 });

  // ---- Add logo at top ----
  doc.addImage(logoBase64, "PNG", 80, 10, 50, 50);

  // ---- Title ----
  doc.setFontSize(22);
  doc.setTextColor(243, 115, 22);
  doc.setFont("helvetica", "bold");
  doc.text("Hridaya Order Receipt", 105, 70, { align: "center" });

  // ---- User Details ----
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${user.full_name}`, 20, 85);
  doc.text(`Email: ${user.email}`, 20, 93);
  doc.text(`Phone: ${user.phone_no}`, 20, 101);
  doc.text(`Address: ${user.address}`, 20, 109);

  // ---- Order Items ----
  doc.setFontSize(14);
  doc.text("Order Items:", 20, 125);

  let startY = 133;
  cartItems.forEach((item, index) => {
    doc.setFontSize(12);
    doc.text(
      `${index + 1}. ${item.name} | Qty: ${item.qty} | Price: Rs.${item.price} | Total: Rs.${item.total_price}`,
      20,
      startY
    );
    doc.text(
      `Size: ${item.size} | Color: ${item.color} | Fragrance: ${item.fragrance}`,
      20,
      startY + 6
    );
    startY += 14;
  });

  // ---- Delivery Status (dynamic position) ----
  startY += 10; // small gap after items
  doc.setFontSize(14);
  doc.setTextColor(243, 115, 22); // optional color
  doc.text("Delivery Status: Pending", 20, startY);

  // ---- Total Amount ----
  startY += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0);
  doc.text(`Total Amount: Rs.${totalAmount}`, 20, startY);

  // ---- Footer ----
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("Thank you for shopping with Hridaya!", 105, startY + 30, { align: "center" });

  // ---- Save PDF ----
  doc.save(`Hridaya_Order_${Date.now()}.pdf`);
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 try {
    const response = await fetch("http://localhost/backend_php_hridaya/update_user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      // Update local userData state
      setUserData(formData);
      setisEditClicked(false);
       setUser({
        full_name: formData.full_name,
        phone_no: formData.phone_no || "",
        email: formData.email,
        address: formData.address || ""
      });
      // Optionally, save in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(formData));
    } else {
      console.error("Update failed:", result.error);
      alert(result.error || "Update failed");
    }
  } catch (error) {
    console.error("Error calling API:", error);
    alert("An error occurred while updating the profile");
  }


  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  return (
    <div className="max-w-6xl mx-auto mt-40 px-4">

      {/* <h2 className="text-3xl font-bold mb-8 text-center">
        Checkout
      </h2> */}
 <h2 className="text-4xl mb-10 md:text-5xl text-center font-light tracking-tight">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="space-y-8">

 
  {!isEditClicked&&(
<>
 {/* Address */}
  <div className="bg-white shadow-md rounded-xl p-6">
<div className="flex justify-between items-center">
  <h3 className="text-xl font-semibold mb-4">
    Shipping Detail
  </h3>

  <p onClick={edit} className="text-blue-500 cursor-pointer hover:underline">
    Edit
  </p>
</div>

  

    <div className="space-y-4">

      <div>
        <p className="text-sm text-gray-500">Full Name</p>
        <p className="font-medium">{user.full_name || "—"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Phone Number</p>
        <p className="font-medium">{user.phone_no || "—"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium">{user.email || "—"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Full Address</p>
        <p className="font-medium">{user.address || "—"}</p>
      </div>

    </div>
  </div>
</>
  )}

  {isEditClicked&&(
    
      
   <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-2xl shadow-lg">

    <XMarkIcon
  className="w-5 h-5 text-gray-600 hover:text-white  hover:bg-gray-600 rounded float-right cursor-pointer transition-transform duration-200 ease-in-out"
  onClick={cancle}
/>
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit User Form</h2>   

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>


        {/* Profile Pic (optional) */}
     {/* Profile Pic (choose file) */}
<div>
  <label className="block mb-1 font-medium text-gray-700">Profile Pic (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string); // preview for display
          setFormData({ ...formData, profile_pic: reader.result as string }); // save in formData
        };
        reader.readAsDataURL(file);
      }
    }}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  {/* Preview */}
  {preview && (
    <img
      src={preview}
      alt="profile preview"
      className="w-28 h-28 rounded-full mt-4 object-cover mx-auto"
    />
  )}
</div>

        {/* Address (optional) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Address (optional)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 rounded-full mt-4 hover:opacity-90 transition"
        >
          Edit
        </button>
    <button
      type="button"
      className="w-full max-w-xs mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 rounded-full mt-4 hover:opacity-90 transition"
      onClick={cancle}
    >
      Cancel
    </button>
      </form>
    </div>
   

)}

</div>

        {/* RIGHT SIDE */}
   <div className="bg-white shadow-md rounded-xl p-6">

  <h3 className="text-xl font-semibold mb-4">
    Order Summary
  </h3>

  <div className="space-y-4 max-h-80 overflow-y-auto">

    {cartItems.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between border-b pb-3"
      >
        <div className="flex items-center gap-3">

          <img
            src={`http://localhost/backend_php_hridaya/hridaya-admin-backend/product-backend/uploads/${item.image}`}
            className="w-16 h-16 object-cover rounded-lg"
          />

          <div>
        <div>    <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-700">
             <strong> Qty:</strong> {item.qty} * <strong> Per Price :</strong> {item.price}
            </p></div>
              <div>   
            <p className="text-sm text-gray-700">
             <strong> Size :</strong> {item.size}  <strong> Color :</strong> {item.color}  <strong> fragrance :</strong> {item.fragrance} 
            </p></div>
          </div>

        </div>

        <div className="font-semibold">
          Rs.{item.total_price}
        </div>
      </div>
    ))}

  </div>

  {/* TOTAL */}
  <div className="flex justify-between mt-6 text-xl font-bold">
    <span>Total</span>
    <span>Rs.{totalAmount}</span>
  </div>

  {/* PAYMENT METHOD */}
  <div className="mt-6 border-t pt-4">
    <h3 className="text-lg font-semibold mb-3">
      Payment Method
    </h3>

    <div className="space-y-2">

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
        />
        Cash on Delivery
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="esewa"
          checked={paymentMethod === "esewa"}
          onChange={() => setPaymentMethod("esewa")}
        />
        eSewa
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="khalti"
          checked={paymentMethod === "khalti"}
          onChange={() => setPaymentMethod("khalti")}
        />
        Khalti
      </label>

    </div>
  </div>

  {/* PLACE ORDER */}
  <button onClick={handelPlaceOrder} className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold">
    Place Order
  </button>

</div>

      </div>

    </div>
    
  );
}

export default Checkout;