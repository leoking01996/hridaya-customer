import React, { useEffect, useState } from "react";
import { User as UserIcon } from "lucide-react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface UserData {
  id: string;
  full_name: string;
  email: string;
  phone_no?: string;
  date_of_birth?: string;
  profile_pic?: string;
  address?: string;
}
interface transactionHistory{
  color:string;
created_at:string;
fragrance:string;
id:number;
name:string;
payment_method:string;
price:number;
product_id:number;
qty:number;
size:number;
status:string;
total_price:number;
user_id:number;
}

function Profile() {
const [userData, setUserData] = useState<UserData | null>(null);
const [isEditClicked,setIsEditClicked]=useState(false);
const [preview, setPreview] = useState<string>("");
const [paymentHistory,setPaymentHistory]=useState<transactionHistory[]>([]);
const [formData,setFormData]=useState<UserData>({
    full_name: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
    profile_pic: "",
    address: "",
    id:''
})
//     useEffect(() => {

//       const userDatas = sessionStorage.getItem('user') ;
//       if(userDatas){
//         const parsedData : UserData = JSON.parse(userDatas);
//       setUserData(parsedData);
// console.log("Loaded from sessionStorage:", parsedData);
//       }

      
//     }, []);

useEffect(() => {
transaction_history();

  const stored = sessionStorage.getItem("user");
  if (stored) {
    const parsed = JSON.parse(stored);

    setUserData({
      id: parsed.id || "",
      full_name: parsed.full_name || "",
      email: parsed.email || "",
      phone_no: parsed.phone_no || "",
      date_of_birth: parsed.date_of_birth || "",
      profile_pic: parsed.profile_pic || "",
      address: parsed.address || ""
    });
  }

}, []);


useEffect(() => {


  transaction_history();
}, [userData]);

const transaction_history =async ()=>{
               const req = await fetch('http://localhost/backend_php_hridaya/transaction_history.php');
                const data = await req.json(); 
                const transaction_list =  data.data.filter((list: { user_id: string; })=>list.user_id == userData?.id)
              //  console.log(data.data.filter(list=>list.user_id == userData.id),"asdasdsadsad")
      setPaymentHistory(transaction_list);
}


const edit =()=>{
  
  if (userData) {
    setFormData({
      id: userData.id,
      full_name: userData.full_name || "",
      email: userData.email || "",
      phone_no: userData.phone_no || "",
      date_of_birth: userData.date_of_birth || "",
      profile_pic: userData.profile_pic || "",
      address: userData.address || "",
    });

    // set preview image
    setPreview(userData.profile_pic || "");
  }

  setIsEditClicked(true);

}
const cancle=()=>{
    setIsEditClicked(false);

}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      setIsEditClicked(false);
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
    return (
        <>
          <div className=" bg-gray-100  flex items-center mt-10 justify-center p-6">
      <div className="grid grid-cols-1 mt-20 md:grid-cols-2 gap-6 max-w-6xl w-full">
        

                {/* Profile Card */}
           
        <div className="bg-white rounded-2xl shadow p-6">
            {/* profile section */}
                 {!isEditClicked&&(
  <div>
           <button
           type="button"
           className="flex  float-right items-center gap-2  text-gray px-3 py-1 rounded hover:text-white  hover:bg-gray-600"
           onClick={edit}
         
         >
           <PencilIcon className="w-5 h-5" />
         </button>
         <strong className="fw-20">Profile</strong>

<img

  src={userData?.profile_pic || "https://i.pravatar.cc/150"}
  alt="profile"
  className="w-28 h-28 mt-6 rounded-full mx-auto object-cover"
/>

          <h3 className="text-center font-semibold mt-4">{userData?.full_name}</h3>
          <p className="text-center text-xs text-gray-400">
            {userData?.email}
          </p>

     
        
  </div>
                )}

            {/* edit profile section */}

{isEditClicked&&(
    
      
   <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-2xl shadow-lg">

    <XMarkIcon
  className="w-5 h-5 text-gray-600 hover:text-white  hover:bg-gray-600 rounded float-right cursor-pointer transition-transform duration-200 ease-in-out"
  onClick={cancle}
/>
      <h2 className="text-2xl font-semibold mb-6 text-center">User Form</h2>   

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
          Save
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

 

        {/* Pofile detail*/}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">User Detail</h3>
         
          </div>
     <div className="mt-6 space-y-3 text-sm">
            <p><strong>Id:</strong> {userData?.id||'null'}</p>
            <p><strong>Name:</strong> {userData?.full_name}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Phone no:</strong> {userData?.phone_no}</p>
            <p><strong>Address:</strong> {userData?.address}</p>
            

          </div>

        </div>

      </div>

    </div>
          {/* =================== TRANSACTION HISTORY =================== */}
<div className="mt-0 bg-white rounded-2xl shadow p-6 w-full max-w-6xl mx-auto">
  <h3 className="text-xl font-semibold mb-4">Transaction History</h3>

  {paymentHistory.length === 0 ? (
    <p className="text-gray-400 text-center py-4">No transactions found</p>
  ) : (
    <div className="space-y-4">
      {paymentHistory.map((tx) => (
        <div
          key={tx.id}
          className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Order info */}
            <div>
              <p className="text-sm text-gray-500">Order ID:</p>
              <p className="font-medium">{tx.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date:</p>
              <p>{new Date(tx.created_at).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Amount:</p>
              <p>Rs.{tx.total_price}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status:</p>
              <p
                className={`font-semibold ${
                  tx.status === "delivered"
                    ? "text-green-600"
                    : tx.status === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mt-2 md:mt-0 text-sm text-gray-600">
            <p className="font-medium">Product Detail:</p>

            <p>
              <strong>{tx.name}</strong> ({tx.qty}) — Rs.{tx.price}
              {tx.size && ` | Size: ${tx.size}`}
              {tx.color && ` | Color: ${tx.color}`}
              {tx.fragrance && ` | Fragrance: ${tx.fragrance}`}
              {tx.payment_method && ` | Payment: ${tx.payment_method}`}
            </p>

          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </>
  
          
            
      
     
    );
}

export default Profile;
