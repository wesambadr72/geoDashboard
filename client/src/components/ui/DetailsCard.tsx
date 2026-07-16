import { Country } from "shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { 
  Users, 
  Globe, 
  Landmark, 
  Map, 
  Compass, 
  Car, 
  Clock, 
  Phone,
  Info
} from 'lucide-react';

export default function DetailsCard({ country, className }: { country: Country; className?: string }) {
  const details = [
    {
      title: "القارة",
      value: country.region,
      icon: Compass,
    },
    {
      title: "المنطقة الفرعية",
      value: country.subregion || "غير متوفرة",
      icon: Map,
    },
    {
      title: "المساحة",
      value: `${country.area.kilometers.toLocaleString()} كم²`,
      icon: Globe,
    },
    {
      title: "عدد السكان",
      value: `${country.population.toLocaleString()} نسمة`,
      icon: Users,
    },
    {
      title: "العاصمة",
      value: country.capitals[0]?.name || "غير متوفرة",
      icon: Landmark,
    },
    {
      title: "إتجاه السير",
      value: country.cars?.driving_side === "left" ? "اليسار" : country.cars?.driving_side === "right" ? "اليمين" : country.cars?.driving_side || "غير متوفر",
      icon: Car,
    },
    {
      title: "المناطق الزمنية",
      value: country.timezones.join(", "),
      icon: Clock,
      className: "col-span-2 md:col-span-1"
    },
    {
      title: "الرمز الهاتفي",
      value: country.calling_codes[0] ? `+${country.calling_codes[0]}` : "غير متوفر",
      icon: Phone,
    },
  ];

  return (
    <Card dir="rtl" className={`p-6 border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 font-tajawal ${className ?? ''}`}>
      <CardHeader className="p-0 pb-3">
        <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" /> تفاصيل جغرافية وإحصائية
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          معلومات أساسية حول المساحة، السكان، والموقع الجغرافي للدولة
        </CardDescription>
        <div className="h-[2px] w-[85%] mx-auto bg-linear-to-r from-transparent via-border to-transparent mt-2" />
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`flex flex-col gap-1 p-3 border-orange-200/50 bg-orange-100/20 hover:bg-orange-100/40 transition-colors duration-200 ${item.className ?? ''}`}
              >
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Icon className="w-4 h-4 text-orange-600" />
                  <span>{item.title}</span>
                </div>
                <span className="text-sm font-semibold text-foreground wrap-break-words leading-relaxed">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
