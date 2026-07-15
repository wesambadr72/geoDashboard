import { Country } from "shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartSpline } from 'lucide-react';


export default function StaticCard({ country }: { country: Country }) {
  // تحضير البيانات وترتيبها حسب السنة تصاعدياً
  const giniData = country.economy?.gini_coefficient
    ? Object.entries(country.economy.gini_coefficient)
      .map(([year, value]) => ({
        year: year,
        value: Number(value)
      }))
      .sort((a, b) => a.year.localeCompare(b.year))
    : [];

  const hasGiniData = giniData.length > 0;

  return (
    <Card className="w-full bg-card border border-border shadow-md rounded-2xl overflow-hidden font-tajawal transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2 border-b border-border bg-orange-100/50">
        <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
          <ChartSpline className="w-5 h-5" /> معامل جيني (مقياس توزيع الدخل)
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          يوضح معامل جيني الفوارق الاقتصادية وتوزيع الدخل القومي (0 = مساواة كاملة، 100 = عدم مساواة كاملة)
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 h-72 flex flex-col justify-center">
        {hasGiniData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={giniData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-orange-200)" opacity={0.3} />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-orange-700)" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                dataKey="value"
                stroke="var(--color-orange-700)" 
                fontSize={12}
                domain={[0, 100]}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--color-card)", 
                  borderColor: "var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-foreground)",
                  fontFamily: "var(--font-tajawal)"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-orange-500)" 
                strokeWidth={3}
                activeDot={{ r: 8, stroke: "var(--color-orange-500)", strokeWidth: 2, fill: "#fff" }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <ChartSpline className="w-5 h-5" />
            <p className="text-sm font-semibold text-muted-foreground">بيانات معامل جيني غير متوفرة لهذه الدولة</p>
            <p className="text-xs text-muted-foreground/80 mt-1 max-w-xs">
              لم  يتوفير إحصائيات معامل جيني الخاصة بـ {country.names.translations.ara?.common || country.names.common}.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
