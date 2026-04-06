import mongoose, { Schema, Document } from "mongoose";

// Cart Item interface
export interface ICartItem {
    id: number | string;
    name: string;
    price: number;
    qty: number;
    image: string;
    description?: string;
    details?: { key: string; label: string; content: string }[];
    gallery?: string[];
}

// Cart document interface
export interface ICart extends Document {
    userId: string;
    cartItems: ICartItem[];
}

// Mongoose schema
const cartSchema = new Schema<ICart>({
    userId: { type: String, required: true },
    cartItems: [
        {
            id: { type: Schema.Types.Mixed, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            description: { type: String },
            details: [
                {
                    key: String,
                    label: String,
                    content: String
                }
            ],
            gallery: [String]
        }
    ]
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
