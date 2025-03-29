
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface PageContainerProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showBottomNav?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  showBackButton = false,
  showBottomNav = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header showBackButton={showBackButton} />
      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default PageContainer;
