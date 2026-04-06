import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/nav/Navigation";
import VideoHero from "@/components/VideoHero";
import ProductCarousel from "@/components/ProductCarousel";
import candle1 from "@/assets/candle-1.jpg";
import candle2 from "@/assets/candle-2.jpg";
import candle3 from "@/assets/candle-3.jpg";
import candle4 from "@/assets/candle-4.jpg";

function Main_body() {
    const featuredProducts = [
        {
            id: 1,
            name: "Midnight Noir",
            price: "$32.00",
            image: candle1,
            description: "Rich sandalwood & amber",
        },
        {
            id: 2,
            name: "Terra Cotta",
            price: "$28.00",
            image: candle2,
            description: "Warm clay & cedarwood",
        },
        {
            id: 3,
            name: "Ivory Dreams",
            price: "$30.00",
            image: candle3,
            description: "Vanilla & white musk",
        },
        {
            id: 4,
            name: "Amber Glow",
            price: "$34.00",
            image: candle4,
            description: "Honey & tobacco leaf",
        },
    ];

    const bestSellers = [
        {
            id: 5,
            name: "Forest Serenity",
            price: "$30.00",
            image: candle3,
            description: "Pine & eucalyptus",
        },
        {
            id: 6,
            name: "Ocean Mist",
            price: "$28.00",
            image: candle2,
            description: "Sea salt & sage",
        },
        {
            id: 7,
            name: "Lavender Fields",
            price: "$32.00",
            image: candle4,
            description: "French lavender",
        },
        {
            id: 8,
            name: "Citrus Grove",
            price: "$30.00",
            image: candle1,
            description: "Bergamot & orange",
        },
    ];

    const seasonalCollection = [
        {
            id: 9,
            name: "Winter Spice",
            price: "$34.00",
            image: candle4,
            description: "Cinnamon & clove",
        },
        {
            id: 10,
            name: "Autumn Leaves",
            price: "$32.00",
            image: candle2,
            description: "Maple & oak",
        },
        {
            id: 11,
            name: "Spring Bloom",
            price: "$30.00",
            image: candle3,
            description: "Jasmine & rose",
        },
        {
            id: 12,
            name: "Summer Breeze",
            price: "$28.00",
            image: candle1,
            description: "Coconut & lime",
        },
    ];

    return (
        <main>
            <VideoHero />

            {/* Featured Collection */}
            <ProductCarousel
                title="Featured Collection"
                subtitle="Handpicked Favorites"
                products={featuredProducts}
            />

            {/* About Section */}
            <section className="py-20 px-4 bg-secondary/30">
                <div className="container mx-auto max-w-4xl text-center space-y-6 animate-slide-up">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                        Crafted with Intention
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Each Hridaya candle is hand-poured using premium soy wax, natural essential oils,
                        and cotton wicks. We believe in sustainable practices and creating products that
                        honor both the earth and your sacred space.
                    </p>
                </div>
            </section>

            {/* Best Sellers */}
            <ProductCarousel
                title="Best Sellers"
                subtitle="Customer Favorites"
                products={bestSellers}
            />

            {/* Seasonal Collection */}
            <section className="bg-accent/5">
                <ProductCarousel
                    title="Seasonal Collection"
                    subtitle="Limited Edition"
                    products={seasonalCollection}
                />
            </section>


        </main>
    )
}

export default Main_body