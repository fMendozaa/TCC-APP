import { Home, MapPin, Bot, Users, ShoppingBag, User, Settings, Heart, Bell } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Mapa", url: "/map", icon: MapPin },
  { title: "IA", url: "/ai", icon: Bot },
  { title: "Social", url: "/social", icon: Users },
  { title: "Market", url: "/market", icon: ShoppingBag },
  { title: "Perfil", url: "/account", icon: User },
];

const settingsItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Favoritos", url: "/favorites", icon: Heart },
  { title: "Notificações", url: "/notifications", icon: Bell },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  const getNavClass = (url: string) => {
    const isActive = location.pathname === url || (url === "/" && location.pathname === "/");
    return isActive 
      ? "bg-gradient-primary text-white shadow-glow" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
  };

  return (
    <Sidebar className="border-r border-border bg-gradient-card">
      <SidebarContent className="bg-gradient-card">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TRENDFY
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground/70">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`${getNavClass(item.url)} flex items-center gap-3 p-3 rounded-lg transition-all duration-200`}>
                      <item.icon className="w-5 h-5" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground/70">Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`${getNavClass(item.url)} flex items-center gap-3 p-3 rounded-lg transition-all duration-200`}>
                      <item.icon className="w-5 h-5" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}