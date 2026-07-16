import { Country } from "shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Globe } from "lucide-react";

export default function BordersCard ({country}: {country: Country}) {
    return (
        <Card dir="rtl" className="p-6 flex flex-col justify-between border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 font-tajawal">
            <CardHeader className="p-0 pb-3">
                <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> الحدود البرية لدولة {country.names.translations.ara?.common || country.names.common}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  قائمة بالدول المجاورة
                </CardDescription>
        <div className="h-[2px] w-[85%] mx-auto bg-linear-to-r from-transparent via-border to-transparent mt-2" />
            </CardHeader>
            
                        
            <CardContent className="p-0 pt-4 flex flex-wrap gap-2">
                {country.borders && country.borders.length > 0 ? (
                  country.borders.map((border, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-xl text-sm font-medium border border-blue-300 bg-blue-100/50 text-blue-950 shadow-sm hover:bg-blue-200/50 transition-colors duration-200"
                    >
                      {border}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">لا تتوفر بيانات للحدود البرية</span>
                )}
            </CardContent>
        </Card>
    );
}