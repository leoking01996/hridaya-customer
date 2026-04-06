import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/nav/Navigation";
import Footer_ from "@/components/footer/footer_";
import { Outlet } from "react-router-dom";

const Index = () => {
  const [showContent, setShowContent] = useState(false);


  return (
    <>
      {!showContent && <Preloader onComplete={() => setShowContent(true)} />}

      {showContent && (
        <div className="min-h-screen">
          <Navigation />
          <Outlet />
          <Footer_ />
        </div>
      )}
    </>
  );
};

export default Index;
