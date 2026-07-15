import { useState } from 'react'
import type { Country } from 'shared'
import Header from '@/lib/layout/Header'
import CountrySidebar from '@/lib/layout/countrySidebar'
import StaticCard from './lib/layout/StaticCard'
import Footer from '@/lib/layout/Footer'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground font-tajawal p-6 md:p-12 flex flex-col justify-between gap-6">
      <div>
        <Header />
        
        <div className="flex flex-col md:flex-row gap-6 mt-6 max-w-7xl mx-auto items-start w-full">
          <CountrySidebar onSelectCountry={setSelectedCountry} />
          
          <div className="flex-1 w-full min-w-0">
            {selectedCountry ? (
              <StaticCard country={selectedCountry} />
            ) : (
              <div className="w-full h-72 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground bg-card/50 gap-2 p-6 text-center">
                <p className="font-bold text-lg text-primary">الرجاء اختيار دولة من القائمة الجانبية</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  اختر أي دولة لعرض إحصائيات معامل جيني (Gini Coefficient) والرسوم البيانية التفاعلية الخاصة بها.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
