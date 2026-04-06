import React, { useState } from "react";

declare global {
  interface Window {
    KhaltiCheckout: any;
  }
}

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const KhaltiPayment: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 200 },
    { id: 3, name: "Product C", price: 150 },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Toggle selection
  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Calculate total price
  const totalAmount = selectedItems
    .map((id) => cart.find((item) => item.id === id)?.price || 0)
    .reduce((a, b) => a + b, 0);

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const amountInPaisa = totalAmount * 100; // Khalti requires paisa

    const config = {
      publicKey: "test_public_key_0123456789abcdef", // replace with your test public key
      productIdentity: selectedItems.join(","), // e.g., "1,2"
      productName: "Cart Order",
      productUrl: "http://localhost", // your site/product URL
      eventHandler: {
        onSuccess(payload: any) {
          console.log("Khalti Payment Success:", payload);

          // Send to backend for verification
          fetch("http://localhost/verify_khalti.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: payload.token,
              amount: amountInPaisa,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Backend Verification:", data);
              if (data.status === "success") {
                alert("Payment verified and order completed!");
                setSelectedItems([]);
              } else {
                alert("Payment verification failed.");
              }
            });
        },
        onError(error: any) {
          console.error("Payment Error:", error);
          alert("Payment failed. Check console.");
        },
        onClose() {
          console.log("Payment widget closed");
        },
      },
    };

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: amountInPaisa });
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between mb-2 p-2 border rounded"
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />
            <span>
              {item.name} - NPR {item.price}
            </span>
          </label>
        </div>
      ))}

      <div className="mt-4 font-semibold">Total: NPR {totalAmount}</div>

      <button
        onClick={handlePayment}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default KhaltiPayment;