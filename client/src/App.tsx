import { useState, useMemo } from 'react'
import type { Country } from 'shared'
import Header from '@/lib/layout/Header'
import CountrySidebar from '@/lib/layout/countrySidebar'
import StaticCard from './lib/layout/StaticCard'
import Footer from '@/lib/layout/Footer'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  // Dynamic theme styling based on the selected country's flag colors
  const themeStyles = useMemo(() => {
    if (!selectedCountry?.flag?.colors) return {};
    
    const colors = selectedCountry.flag.colors;
    
    // Select prominent/vibrant color as primary
    const primary = colors.swatches.muted || colors.swatches.dark_muted || colors.prominent || colors.swatches?.dark_vibrant || colors.swatches?.vibrant;
    
    // Choose light/muted options for background and card to maintain clean layout legibility
    const bg = `${colors.dominant}40` || `${colors.swatches?.light_muted}40`;
    const card = colors.swatches?.light_muted 
      ? `${colors.swatches.light_muted}50` 
      : `${colors.dominant}18`;
      
    const border = colors.swatches?.muted 
      ? `${colors.swatches.muted}80` 
      : `${primary}35`;
      
    const foreground = colors.swatches?.dark_muted || primary || '#1a1a1a';
    
    return {
      '--color-background': bg,
      '--color-foreground': foreground,
      '--color-card': card,
      '--color-primary': primary,
      '--color-border': border,
      // Map back to the custom Tailwind orange theme variables for full backward compatibility
      '--color-orange-50': bg,
      '--color-orange-100': card,
      '--color-orange-200': border,
      '--color-orange-300': border,
      '--color-orange-700': foreground,
      '--color-orange-900': primary,
    } as React.CSSProperties;
  }, [selectedCountry]);

  return (
    <div 
      style={themeStyles} 
      className="min-h-screen bg-background text-foreground font-tajawal flex flex-col justify-between transition-colors duration-500 ease-in-out relative overflow-hidden"
    >
      {/* Full-screen Shine Sweep Transition Effect */}
      <div key={selectedCountry?.codes?.alpha_2 || 'default'} className="shine-overlay">
        <div className="shine-sweep" />
      </div>

      <div>
        <Header />
        
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto items-stretch w-full">
            <CountrySidebar onSelectCountry={setSelectedCountry} />
            
            <div className="flex-1 w-full min-w-0">
              {selectedCountry ? (
                <StaticCard country={selectedCountry} />
              ) : (
                <div className="w-full h-72 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground bg-card/50 gap-2 p-6 text-center">
                  <p className="font-bold text-lg text-primary">الرجاء اختيار دولة من القائمة الجانبية</p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    اختر أي دولة لعرض إحصائيات والرسوم البيانية التفاعلية الخاصة بها
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
