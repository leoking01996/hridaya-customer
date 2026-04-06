// productsData.ts
import candle1 from "@/assets/candle-1.jpg";
import candle2 from "@/assets/candle-2.jpg";
import candle3 from "@/assets/candle-3.jpg";
import candle4 from "@/assets/candle-4.jpg";

// Define a type for product items
export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    gallery: any;
    details: any
    
}

// 🕯️ SOY WAX PRODUCTS
export const soyWaxProducts: Product[] = [
    {
        id: 1,
        name: "Pure Serenity",
        price: "$30.00",
        image: candle1,
        description: "Unscented soy wax candle for calm spaces.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 2,
        name: "Vanilla Bliss",
        price: "$32.00",
        image: candle2,
        description: "Smooth vanilla with warm undertones.",
        gallery: [candle2, candle3, candle4, candle1],
        details: [
            { key: "description", label: "Description", content: "Each candle is hand-poured using premium soy wax and natural essential oils. Smooth vanilla aroma for a cozy home." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.6/5)\nBased on 90 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: Is it scented?\nA: Yes, with natural vanilla fragrance." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 3,
        name: "Coconut Harmony",
        price: "$29.00",
        image: candle3,
        description: "Coconut soy wax blend with gentle aroma.",
        gallery: [candle3, candle4, candle2, candle1],
        details: [
            { key: "description", label: "Description", content: "Hand-poured coconut soy wax candle with a subtle, soothing scent." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.4/5)\nBased on 80 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: Is it safe for kids?\nA: Yes, non-toxic ingredients." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 4,
        name: "Amber Woods",
        price: "$34.00",
        image: candle4,
        description: "Earthy amber and cedar for cozy vibes.",
        gallery: [candle4, candle1, candle2, candle2],
        details: [
            { key: "description", label: "Description", content: "Hand-poured soy wax with rich amber and cedar scent for warm ambiance." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐⭐ (5/5)\nBased on 150 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Up to 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
];

// 🕯️ PARAFFIN WAX PRODUCTS
export const paraffinWaxProducts: Product[] = [
    {
        id: 1,
        name: "Crystal Glow p",
        price: "$25.00",
        image: candle1,
        description: "Smooth paraffin wax for long-lasting burn.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 2,
        name: "Rose Essence p",
        price: "$28.00",
        image: candle2,
        description: "Romantic rose scent with elegant finish.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 3,
        name: "Evening Musk p",
        price: "$27.00",
        image: candle3,
        description: "Subtle musk fragrance ideal for relaxation.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 4,
        name: "Lavender Calm p",
        price: "$26.00",
        image: candle4,
        description: "Fresh lavender tones for peaceful evenings.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
];

// 🍰 EDIBLE CANDLES
export const edibleCandleProducts: Product[] = [
    {
        id: 1,
        name: "Chocolate Dream",
        price: "$35.00",
        image: candle1,
        description: "Rich chocolate aroma made with food-safe wax.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 2,
        name: "Vanilla Sugar",
        price: "$33.00",
        image: candle2,
        description: "Sweet vanilla scent you can safely enjoy.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 3,
        name: "Berry Delight",
        price: "$34.00",
        image: candle3,
        description: "Strawberry and blueberry scented edible candle.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 4,
        name: "Citrus Twist",
        price: "$31.00",
        image: candle4,
        description: "Zesty lemon-orange fusion for freshness.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
];

// 💎 GEL WAX PRODUCTS
export const gelWaxProducts: Product[] = [
    {
        id: 1,
        name: "Ocean Breeze",
        price: "$29.00",
        image: candle1,
        description: "Crystal-clear gel candle with marine scent.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 2,
        name: "Aqua Dream",
        price: "$31.00",
        image: candle2,
        description: "Blue gel wax with decorative shells.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 3,
        name: "Tropical Lagoon",
        price: "$33.00",
        image: candle3,
        description: "Vibrant gel candle inspired by beach vibes.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 4,
        name: "Glass Bloom",
        price: "$32.00",
        image: candle4,
        description: "Transparent gel candle with floral layers.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
];

// 🌟 OUR SPECIAL COLLECTION
export const specialProducts: Product[] = [
    {
        id: 1,
        name: "Royal Essence",
        price: "$45.00",
        image: candle1,
        description: "Luxury blend with sandalwood and amber base.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 2,
        name: "Midnight Rose",
        price: "$48.00",
        image: candle2,
        description: "Exclusive design with deep rose fragrance.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 3,
        name: "Golden Aura",
        price: "$50.00",
        image: candle3,
        description: "Handcrafted candle with 24k gold shimmer.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
    {
        id: 4,
        name: "Signature Bliss",
        price: "$42.00",
        image: candle4,
        description: "Our signature scent — soothing and timeless.",
        gallery: [candle1, candle2, candle3, candle4],
        details: [
            { key: "description", label: "Description", content: "Eachsss candle is hand-poured using premium soy wax and natural essential oils. Enjoy a long-lasting, clean burn for your sacred space." },
            { key: "rating", label: "Rating", content: "⭐⭐⭐⭐☆ (4.5/5)\nBased on 120 customer reviews." },
            { key: "size", label: "Size Guide", content: "Height: 10cm\nDiameter: 7cm\nWeight: 250g" },
            { key: "faq", label: "FAQ", content: "Q: How long does it burn?\nA: Approximately 40 hours." },
            { key: "shipping", label: "Shipping & Returns", content: "Free shipping on orders over $50.\nReturns accepted within 14 days of delivery." },
        ],
    },
];

// 🧭 Optional: Combine all categories into a single object for easier access
export const allProducts = {
    soyWax: soyWaxProducts,
    paraffinWax: paraffinWaxProducts,
    edibleCandles: edibleCandleProducts,
    gelWax: gelWaxProducts,
    special: specialProducts,
};
