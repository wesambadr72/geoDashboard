import { useEffect, useState } from 'react'
import type { Country } from 'shared'
const SERVER_URL = import.meta.env.VITE_SERVER_URL || `http://${window.location.hostname}:3000`

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/countries`)
        const data = await response.json()
        setCountries(data)
      } catch (error) {
        console.error("Error fetching countries:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  const filteredCountries = countries.filter(country => 
    country.names.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.names.official.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.names.translations.ara?.common.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-background text-foreground font-tajawal p-6 md:p-12">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-primary text-4xl md:text-6xl font-bold font-michroma text-center mb-8 tracking-tighter">
          GEODASHBOARD
        </h1>
        
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="بحث عن دولة... (Search by name, official name, or Arabic)"
            className="w-full p-4 pl-6 rounded-full border-2 border-primary/20 bg-card text-card-foreground focus:border-primary focus:outline-none shadow-lg transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground animate-pulse">جاري تحميل البيانات...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <div 
                  key={country.codes.alpha_2} 
                  className="group bg-card hover:bg-orange-100/50 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-border transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <img
                      src={country.flag.url_png}
                      alt={country.names.common}
                      className="w-auto h-15"
                    />
                    <span className="text-xs font-michroma bg-primary/10 text-primary px-2 py-1 rounded">
                      {country.codes.alpha_2}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors font-michroma">
                    {country.names.common}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 font-tajawal">
                    {country.names.translations.ara?.common || country.names.official}
                  </p>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">📍 العاصمة</span>
                      <span className="font-medium">{country.capitals[0]?.name || '---'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">👥 السكان</span>
                      <span className="font-medium">{country.population.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">🌍 المنطقة</span>
                      <span className="font-medium">{country.region}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCountries.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground">لم يتم العثور على نتائج للبحث 🔍</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
