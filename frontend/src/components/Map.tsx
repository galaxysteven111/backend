import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default marker icon issue with bundlers
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Hong Kong center coordinates
const HK_CENTER: [number, number] = [22.3193, 114.1694];
const HK_ZOOM = 11;

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  district?: string;
  quantity?: number;
}

// --- LocationPicker: click map to set location ---
interface LocationPickerProps {
  value: { lat: number; lng: number } | null;
  onChange: (lat: number, lng: number) => void;
  height?: string;
}

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
}

export function LocationPicker({ value, onChange, height = '300px' }: LocationPickerProps) {
  const center = value ? [value.lat, value.lng] as [number, number] : HK_CENTER;
  const zoom = value ? 15 : HK_ZOOM;

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onChange={onChange} />
        {value && (
          <>
            <Marker position={[value.lat, value.lng]}>
              <Popup>取餐地點</Popup>
            </Marker>
            <RecenterMap lat={value.lat} lng={value.lng} />
          </>
        )}
      </MapContainer>
    </div>
  );
}

// --- StaticMap: show a single location ---
interface StaticMapProps {
  lat: number;
  lng: number;
  title?: string;
  height?: string;
}

export function StaticMap({ lat, lng, title, height = '250px' }: StaticMapProps) {
  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border-2 border-gray-100">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          {title && <Popup>{title}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}

// --- FoodBoxMap: show multiple markers ---
interface FoodBoxMapProps {
  markers: MapMarker[];
  onMarkerClick?: (id: string) => void;
  height?: string;
}

function MarkerList({ markers, onMarkerClick }: { markers: MapMarker[]; onMarkerClick?: (id: string) => void }) {
  return (
    <>
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup>
            <div className="min-w-[150px]">
              <div className="font-bold text-sm mb-1">{m.title}</div>
              {m.district && <div className="text-xs text-gray-600">{m.district}</div>}
              {m.quantity && <div className="text-xs text-gray-600">{m.quantity} 盒</div>}
              {onMarkerClick && (
                <button
                  onClick={() => onMarkerClick(m.id)}
                  className="mt-2 text-xs text-orange-600 font-semibold hover:underline"
                >
                  查看詳情 &rarr;
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [markers, map]);
  return null;
}

export function FoodBoxMap({ markers, onMarkerClick, height = '400px' }: FoodBoxMapProps) {
  const center = markers.length > 0
    ? [markers[0].lat, markers[0].lng] as [number, number]
    : HK_CENTER;

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={center}
        zoom={HK_ZOOM}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerList markers={markers} onMarkerClick={onMarkerClick} />
        {markers.length > 1 && <FitBounds markers={markers} />}
      </MapContainer>
    </div>
  );
}
