import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-600 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center space-y-8">
        <div className="relative">
          <h1 className="text-6xl md:text-7xl font-light tracking-[0.3em] text-foreground animate-fade-in">
            HRIDAYA
          </h1>
          <p className="text-sm tracking-[0.4em] text-muted-foreground mt-4 animate-fade-in">
            HANDMADE CANDLES
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin" 
               style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
