import { Country } from "shared";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "./card";
import { ShieldCheck } from "lucide-react";

const MEMBERSHIP_NAMES: Record<string, string> = {
    african_union: "الاتحاد الأفريقي",
    arab_league: "جامعة الدول العربية",
    asean: "رابطة دول جنوب شرق آسيا (ASEAN)",
    brics: "مجموعة بريكس (BRICS)",
    commonwealth: "دول الكومنولث",
    eu: "الاتحاد الأوروبي (EU)",
    eurozone: "منطقة اليورو",
    g20: "مجموعة العشرين (G20)",
    g7: "مجموعة السبع (G7)",
    nato: "حلف شمال الأطلسي (NATO)",
    oecd: "منظمة التعاون الاقتصادي والتنمية (OECD)",
    opec: "منظمة الدول المصدرة للنفط (OPEC)",
    schengen: "منطقة شنغن",
    un: "الأمم المتحدة (UN)"
};

export default function MembershipsCard({ country }: { country: Country }) {
    // Get memberships from country object (which is a key-value record of booleans)
    const apiMemberships: string[] = [];
    
    if (country.memberships) {
        Object.entries(country.memberships).forEach(([key, isMember]) => {
            if (isMember) {
                const name = MEMBERSHIP_NAMES[key] || key.replace(/_/g, ' ').toUpperCase();
                apiMemberships.push(name);
            }
        });
    }

    return (
        <Card dir="rtl" className="p-6 flex flex-col justify-between border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 font-tajawal">
            <CardHeader className="p-0 pb-3">
                <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> المنظمات الدولية
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    قائمة بالمنظمات الدولية التي تنتمي إليها الدولة
                </CardDescription>
        <div className="h-[2px] w-[85%] mx-auto bg-linear-to-r from-transparent via-border to-transparent mt-2" />
            </CardHeader>
            <CardContent className="p-0 pt-4 flex flex-wrap gap-2">
                {apiMemberships.length > 0 ? (
                  apiMemberships.map((name, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-xl text-sm font-medium border border-blue-300 bg-blue-100/50 text-blue-950 shadow-sm hover:bg-blue-200/50 transition-colors duration-200"
                    >
                      {name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">لا تتوفر بيانات عن المنظمات الدولية</span>
                )}
            </CardContent>
        </Card>
    );
}
