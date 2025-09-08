import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/hooks/useCurrency";

const regions = [
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', currency: 'BRL' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', currency: 'USD' },
  { code: 'EU', name: 'União Europeia', flag: '🇪🇺', currency: 'EUR' },
  { code: 'UK', name: 'Reino Unido', flag: '🇬🇧', currency: 'GBP' },
  { code: 'JP', name: 'Japão', flag: '🇯🇵', currency: 'JPY' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦', currency: 'CAD' },
];

export function CurrencySelector() {
  const { currency, changeRegion } = useCurrency();
  
  const currentRegion = regions.find(r => r.currency === currency.code) || regions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Globe className="w-4 h-4 mr-2" />
          <span className="mr-1">{currentRegion.flag}</span>
          <span className="hidden sm:inline">{currency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          Região (Demo)
        </div>
        {regions.map((region) => (
          <DropdownMenuItem
            key={region.code}
            onClick={() => changeRegion(region.code)}
            className="cursor-pointer"
          >
            <span className="mr-2">{region.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{region.name}</span>
              <span className="text-xs text-muted-foreground">{region.currency}</span>
            </div>
            {currency.code === region.currency && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
        <div className="px-2 py-1.5 text-xs text-muted-foreground border-t">
          * Preços simulados para demonstração
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}