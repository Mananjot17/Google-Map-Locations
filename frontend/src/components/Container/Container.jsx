import React, { useState, useEffect, useRef } from 'react';
import LocationInput from './LocationInput';
import Distance from './Distance';
import loader from '../Loader/Loader.jsx';

function Container() {
    const [distance, setDistance] = useState('');
    const [origin, setOrigin] = useState('');
    const [stop, setStop] = useState('');
    const [destination, setDestination] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const mapRef = useRef(null);
    const directionsServiceRef = useRef(null);
    const directionsRendererRef = useRef(null);

    useEffect(() => {
        loader.load().then(() => {

            const { google } = window;
            const { Map, DirectionsService, DirectionsRenderer } = google.maps;

            directionsServiceRef.current = new DirectionsService();
            directionsRendererRef.current = new DirectionsRenderer();

            const map = new Map(mapRef.current, {
                center: { lat: 19.0760, lng: 72.8777 }, // Centered to Mumbai
                zoom: 2, 
            });

            directionsRendererRef.current.setMap(map);

            setIsLoaded(true);
        }).catch(error => {
            console.error('Error loading Google Maps API:', error);
        });
    }, []);



    const calculateDistance = async ({ origin, stop, destination }) => {
        if (!origin || !destination) {
            console.error('Origin and Destination must be specified');
            return;
        }

        const request = {
            origin,
            destination,
            travelMode: 'DRIVING',
        };

        directionsServiceRef.current.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRendererRef.current.setDirections(result);
                const calculatedDistance = result.routes[0].legs[0].distance.text;
                setDistance(calculatedDistance);
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });

        setOrigin(origin);
        setDestination(destination);
    };

    return (
        <div className='flex flex-col'>
            <div className='py-7 text-center text-blue-700 text-xl'>
                Let's calculate <span className='text-blue-800 font-bold'>distance</span> from Google maps
            </div>

            <div className='md:flex '>

                <div className=' p-4 mt-4 md:mt-0 md:ml-4 flex-1 md:order-1 border '  style={{ height: '400px' }}>
                    <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
                    {!isLoaded && <div>Loading Maps...</div>}
                </div>

                <div className=' py-2 px-10 flex flex-col gap-10 '>
                    <LocationInput onCalculate={calculateDistance} />

                    {distance && <Distance origin={origin} destination={destination} distance={distance} />}
                    
                </div>

            </div>
        </div>
    );
}

export default Container;