import { Country } from "shared";
import { Card,CardDescription, CardContent, CardHeader, CardTitle } from "./card";
import { Banknote } from 'lucide-react';




export default function CurrenciesCard({country}: {country: Country}) {
    return (
        <Card dir="rtl" className="p-6 flex flex-col justify-between border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 font-tajawal">
            <CardHeader className="p-0 pb-3">
                <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                 <Banknote className="w-5 h-5 text-primary" /> العملات
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    قائمة بالعملات التي تستخدم في الدولة
                </CardDescription>
        <div className="h-[2px] w-[85%] mx-auto bg-linear-to-r from-transparent via-border to-transparent mt-2" />
            </CardHeader>
            <CardContent className="p-0 pt-4 flex flex-wrap gap-2">
                {country.currencies && country.currencies.length > 0 ? (
                  country.currencies.map((currency, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-xl text-sm font-medium border border-green-300 bg-green-100/50 text-green-950 shadow-sm hover:bg-green-200/50 transition-colors duration-200"
                    >
                      {currency.name} {currency.symbol}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">لا تتوفر بيانات عن العملات</span>
                )}
            </CardContent>
        </Card>
    );
}