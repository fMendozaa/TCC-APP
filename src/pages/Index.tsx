import { useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Home } from "./Home";
import { MapPage } from "./MapPage";
import { AI } from "./AI";
import { Social } from "./Social";
import { Market } from "./Market";
import { Account } from "./Account";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'map':
        return <MapPage />;
      case 'ai':
        return <AI />;
      case 'social':
        return <Social />;
      case 'market':
        return <Market />;
      case 'account':
        return <Account />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
