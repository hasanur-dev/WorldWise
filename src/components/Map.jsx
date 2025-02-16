import { useSearchParams, useNavigate } from 'react-router-dom'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'

import Button from './Button'
const Map = () => {
    const { cities } = useCities()
    const [mapPosition, setMapPosition] = useState([40, 0])
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeolocation()

    const [mapLat, mapLng] = useUrlPosition()
    // const mapLat = searchParams.get('lat')
    // const mapLng = searchParams.get('lng')

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng])
        }
    }, [mapLat, mapLng])
    useEffect(() => {
        if (geoLocationPosition) {
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
        }
    }, [geoLocationPosition])

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? 'Loading...' : 'Use your position'}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                // center={[mapLat, mapLng]}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}
function ChangeCenter({ position }) {
    // console.log(position)
    const map = useMap()
    map.setView(position)
    return null
}
function DetectClick() {
    const navigate = useNavigate()

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    })
    return null
}
export default Map
