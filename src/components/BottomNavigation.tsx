import { Home, MapPin, Bot, Users, ShoppingBag, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'map', icon: MapPin, label: 'Map', path: '/map' },
  { id: 'ai', icon: Bot, label: 'AI', path: '/ai' },
  { id: 'social', icon: Users, label: 'Social', path: '/social' },
  { id: 'market', icon: ShoppingBag, label: 'Market', path: '/market' },
  { id: 'account', icon: User, label: 'Account', path: '/account' },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const navigate = useNavigate();

  const handleTabClick = (tab: typeof tabs[0]) => {
    onTabChange(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 active:scale-95",
                isActive && "text-primary"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-all duration-200",
                isActive && "bg-gradient-primary shadow-glow"
              )}>
                <Icon 
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-white" : "text-muted-foreground"
                  )} 
                />
              </div>
              <span className={cn(
                "text-xs mt-1 transition-colors",
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}