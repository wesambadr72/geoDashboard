import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import { Country } from "shared";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// حل مشكلة أيقونة الماركر المكسورة في Leaflet مع Vite
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// مكون فرعي للتحكم بالخريطة وتحريكها بشكل سلس عند تغيير الدولة
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 5, {
      animate: true,
      duration: 1.5 // مدة الحركة بالثواني لجعل التغيير انسيابياً
    });
  }, [coords, map]);
  return null;
}

export default function CountryMap ({country, className}: {country: Country; className?: string}) {
    const [boundaryData, setBoundaryData] = useState<any>(null);
    const capital = country.capitals[0];

    useEffect (() => {
        const countryCode = country.codes.alpha_2.toLocaleLowerCase();
        fetch(`https://raw.githubusercontent.com/johan/world.geo.json/master/countries/${countryCode}.geo.json`)
        .then(res => res.json())
        .then(data => {
            setBoundaryData(data)
        })
    .catch(err => console.error(err))}
    ,[country]);

    
    return(
        <div className={`h-96 w-full rounded-2xl overflow-hidden border border-orange-500 shadow-md ${className ?? ''}`}>
        <MapContainer
            center={[country.coordinates.lat, country.coordinates.lng]}
            zoom={5}
            className="h-full w-full"
            scrollWheelZoom={true}
        >
            <ChangeMapView coords={[country.coordinates.lat, country.coordinates.lng]} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {boundaryData && (
                <GeoJSON 
                    data={boundaryData}
                    style={() => ({
                        color: "var(--color-orange-500)",
                        weight: 2,
                        fillOpacity: 0.1,
                    })}
                />
                
            )}
        {capital && (
          <Marker position={[capital.coordinates.lat, capital.coordinates.lng]}>
            <Popup>
              <div className="font-tajawal text-right">
                <strong>العاصمة:</strong> {capital.name}
              </div>
            </Popup>
          </Marker>
        )}
        </MapContainer>
        </div>
    );
}