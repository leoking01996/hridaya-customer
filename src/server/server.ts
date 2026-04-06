import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Cart, ICartItem } from "./models/cart.model";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI!;
mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Add to cart
app.post("/cart/add", async (req: Request, res: Response) => {
  const { userId, product }: { userId: string; product: ICartItem } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, cartItems: [product] });
  } else {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.id === product.id,
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].qty += product.qty;
    } else {
      cart.cartItems.push(product);
    }
  }

  await cart.save();
  res.json(cart);
});

// Remove from cart
app.post("/cart/remove", async (req: Request, res: Response) => {
  const { userId, productId }: { userId: string; productId: number | string } =
    req.body;

  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.cartItems = cart.cartItems.filter((item) => item.id !== productId);
    await cart.save();
  }

  res.json(cart);
});

// Get cart
app.get("/cart/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId });
  res.json(cart || { userId, cartItems: [] });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
