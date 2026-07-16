import { Country } from "shared";
import { Card } from "./card";
import { Globe2, ExternalLink, ShieldCheck, MapPin } from "lucide-react";

export default function CountryCard({ country, className }: { country: Country; className?: string }) {
    const arabName = country.names.translations.ara?.common || country.names.common;
    const englishName = country.names.common;
    const officialName = country.names.translations.ara?.official || country.names.official;

    return (
        <Card 
            onClick={() => window.open(country.links.wikipedia, "_blank", "noopener,noreferrer")} 
            dir="rtl" 
            className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 font-tajawal cursor-pointer group ${className ?? ''}`}
        >
            {/* Right Side: Flag and Core Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
                {/* Flag Image with standard flag aspect ratio */}
                <div className="relative w-32 h-20 rounded-xl overflow-hidden shadow-md border border-orange-200/50 shrink-0">
                    <img 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        src={country.flag.url_png} 
                        alt={country.names.common} 
                    />
                </div>
                
                {/* Titles and geographical hierarchy */}
                <div className="flex flex-col text-center sm:text-right gap-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                            {arabName}
                        </h2>
                        <span className="text-sm font-semibold text-muted-foreground font-michroma self-end pb-1">
                            ({englishName})
                        </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        الاسم الرسمي: {officialName}
                    </p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-orange-700/80 mt-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{country.region}</span>
                        <span>•</span>
                        <span>{country.subregion}</span>
                    </div>
                </div>
            </div>

            {/* Left Side: Badge Indicators and Link */}
            <div className="flex flex-wrap md:flex-col items-center md:items-end justify-center md:justify-between gap-3 w-full md:w-auto self-stretch">
                {/* Classification Badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    {country.classification?.un_member && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            عضو بالأمم المتحدة
                        </span>
                    )}
                    {country.classification?.sovereign && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Globe2 className="w-3.5 h-3.5" />
                            دولة مستقلة
                        </span>
                    )}
                </div>

                {/* Call-to-action button */}
                <div className="text-xs font-bold text-orange-600 group-hover:text-orange-700 flex items-center gap-1 mt-auto transition-colors">
                    <span>عرض التفاصيل على ويكيبيديا</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </div>
            </div>
        </Card>
    );
}