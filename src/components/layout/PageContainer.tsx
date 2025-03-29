
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface PageContainerProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showBottomNav?: boolean;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  showBackButton = false,
  showBottomNav = true,
  className,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <Header showBackButton={showBackButton} />
      <main className={`flex-1 container mx-auto px-4 py-6 pb-24 ${className}`}>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Subtle gradient accent at top of the page */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-bellboy-gold via-bellboy to-bellboy-navy z-20 opacity-80"></div>
      
      {/* Gradient bottom fade for visual polish */}
      <div className="absolute bottom-16 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-0"></div>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default PageContainer;
