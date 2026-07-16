import { Country } from "shared";
import  GiniChart  from "@/components/ui/GiniChart";
import CountryMap from "@/components/ui/CountryMap";
import LanguageCard from "@/components/ui/LanguageCard";
import BordersCard from "@/components/ui/BordersCard";
import DetailsCard from "@/components/ui/DetailsCard";
import CurrenciesCard from "@/components/ui/Currencies";
import MembershipsCard from "@/components/ui/MembershipsCard";
import CountryCard from "@/components/ui/CountryCard";


export default function StaticCard({ country }: { country: Country }) {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <CountryCard country={country} className="lg:col-span-2" />
      <CountryMap country={country} className="lg:col-span-2" />
      <DetailsCard country={country} className="lg:col-span-2" />
      <LanguageCard country={country} />
      <BordersCard country={country} />
      <MembershipsCard country={country} />
      <CurrenciesCard country={country} />
      <GiniChart country={country} className="lg:col-span-2" />
    </div>
  );
}
