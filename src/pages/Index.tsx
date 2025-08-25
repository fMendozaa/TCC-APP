import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Home } from "./Home";
import { MapPage } from "./MapPage";
import { AI } from "./AI";
import { Social } from "./Social";
import { Market } from "./Market";
import { EnhancedAccount } from "./EnhancedAccount";

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path === '/map') setActiveTab('map');
    else if (path === '/ai') setActiveTab('ai');
    else if (path === '/social') setActiveTab('social');
    else if (path === '/market') setActiveTab('market');
    else if (path === '/account') setActiveTab('account');
  }, [location.pathname]);

  const renderPage = () => {
    const path = location.pathname;
    if (path === '/map') return <MapPage />;
    if (path === '/ai') return <AI />;
    if (path === '/social') return <Social />;
    if (path === '/market') return <Market />;
    if (path === '/account') return <EnhancedAccount />;
    return <Home />; // default home page
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
