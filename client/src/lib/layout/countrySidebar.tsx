import { useState, useEffect } from "react";
import { Country } from "shared";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCountries } from "@/lib/api";
import { Search } from 'lucide-react';

interface CountrySidebarProps{
  onSelectCountry : (country:Country) => void
}

function CountrySidebar({onSelectCountry}:CountrySidebarProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.names.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.names.official.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.names.translations.ara?.common.includes(searchTerm)
  );

  return (
    <aside className="w-80 h-[calc(100vh-64px)] border-r border-border bg-card flex flex-col font-tajawal">
      {/* Search Input Section */}
      <div className="p-4 border-b border-border space-y-2">
        <label className="text-sm font-semibold text-primary font-michroma">SEARCH COUNTRIES</label>
        <input
          type="text"
          placeholder="أبحث عن دولة..."
          className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Countries List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          // Loading Skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-transparent bg-background/50 animate-pulse">
              <Skeleton className="h-5 w-8 rounded" />
              <Skeleton className="h-5 w-28 rounded" />
            </div>
          ))
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <button
              key={country.codes.alpha_2}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:bg-orange-200/40 hover:border-orange-300 transition-all duration-200 cursor-pointer text-right group"
              onClick={()=>onSelectCountry(country)}
            >
              <img
                src={country.flag.url_png}
                alt={country.names.common}
                className="w-8 h-5 object-cover rounded shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {country.names.translations.ara?.common}
              </span>
              <span className="text-sm text-foreground font-michroma group-hover:text-primary transition-colors truncate`">
                {country.names.common}
              </span>
              <div className="text-xs bg-orange-500 p-1.5 rounded-xl text-foreground font-michroma group-hover:text-primary transition-colors truncate ml-auto px-1">{country.codes.alpha_2}</div>
            
            </button>
          ))
        ) : (
          <div className="text-center py-8 text-sm flex  flex-col items-center justify-center gap-2 text-muted-foreground">
           <Search className="w-12 h-12"/>
           <p className="text-lg">لا توجد نتائج</p>
           <p className="text-xs">حاول البحث باسم اخر</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default CountrySidebar;