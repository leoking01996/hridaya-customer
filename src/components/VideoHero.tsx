// import { useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import heroImage from "@/assets/hero-image.jpg";

// const VideoHero = () => {
//   const videoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (videoRef.current) {
//       observer.observe(videoRef.current);
//     }

//     return () => {
//       if (videoRef.current) {
//         observer.unobserve(videoRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div ref={videoRef} className="relative h-screen w-full overflow-hidden">
//       {/* Video/Image Background */}
//       <div className="absolute inset-0">
//         <img
//           src={heroImage}
//           alt="Handmade candles being lit in a cozy setting"
//           className="w-full h-full object-cover"
//         />
//         <div
//           className="absolute inset-0"
//           style={{ background: "var(--gradient-overlay)" }}
//         />
//       </div>

//       {/* Content Overlay */}
//       <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
//         <div className="max-w-4xl space-y-6 animate-slide-up">
//           <p className="text-sm md:text-base tracking-[0.3em] text-white/90 uppercase">
//             Handcrafted with Love
//           </p>
//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
//             Illuminate Your
//             <br />
//             Sacred Space
//           </h1>
//           <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
//             Premium handmade candles crafted from natural soy wax and essential oils,
//             designed to bring warmth and tranquility to your home.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//             <Button
//               size="lg"
//               className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base tracking-wider"
//             >
//               EXPLORE COLLECTION
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-base tracking-wider"
//             >
//               LEARN MORE
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
//           <div className="w-1.5 h-3 bg-white/50 rounded-full" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoHero;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/candle-1.jpg";
import heroImage2 from "@/assets/candle-2.jpg";
import heroImage3 from "@/assets/candle-3.jpg";
import heroImage4 from "@/assets/candle-4.jpg";

const slides = [
  {
    image: heroImage1,
    subtitle: "Handcrafted with Love",
    title: "Illuminate Your\nSacred Space",
    description: "Premium handmade candles crafted from natural soy wax and essential oils, designed to bring warmth and tranquility to your home.",
  },
  {
    image: heroImage2,
    subtitle: "Natural & Organic",
    title: "Pure Essence\nof Serenity",
    description: "Thoughtfully curated botanical blends and sustainable materials create an atmosphere of pure relaxation and comfort.",
  },
  {
    image: heroImage3,
    subtitle: "Artisan Quality",
    title: "Moments of\nPure Bliss",
    description: "Each candle is a masterpiece, hand-poured with intention to transform your space into a sanctuary of peace.",
  },
  {
    image: heroImage4,
    subtitle: "Aromatic Journey",
    title: "Scents That\nInspire",
    description: "Discover our collection of carefully crafted fragrances, each designed to evoke emotion and elevate your everyday rituals.",
  },
];

const VideoHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("forward");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? "forward" : "backward");
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection("backward");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection("forward");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={`Handmade candles - ${slide.title.replace("\n", " ")}`}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "var(--gradient-overlay)" }}
            />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
            <div
              className={`max-w-4xl space-y-6 ${index === currentSlide ? "animate-slide-up" : ""
                }`}
            >
              <p className="text-sm md:text-base tracking-[0.3em] text-white/90 uppercase">
                {slide.subtitle}
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base tracking-wider shadow-[var(--shadow-glow)]"
                >
                  EXPLORE COLLECTION
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-base tracking-wider backdrop-blur-sm bg-white/10"
                >
                  LEARN MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${index === currentSlide
              ? "w-12 h-3 bg-white rounded-full"
              : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default VideoHero;

