// import React, { useState } from 'react'
// import { IoLocation } from "react-icons/io5";
// import { BsPlusCircleFill } from "react-icons/bs";


// function LocationInput({onCalculate}) {
//     const [origin, setOrigin] = useState('');
//     const [destination, setDestination] = useState('');
//     const [stop, setStop] = useState('');
//     const [showStopInput, setShowStopInput] = useState(false);
    


//     const handleOriginChange = (e) => {
//         setOrigin(e.target.value);
//     };

//     const handleDestinationChange = (e) => {
//         setDestination(e.target.value);
//     };

//     const handleStopChange = () => {
//         setStop(e.target.value);
//     };

//     const handleAddStopClick = () => {
//         setShowStopInput(true);
//     };

//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         onCalculate({origin, stop, destination});
//     }



//   return (
//     <div className='flex flex-row gap-10'>

//         <div className='flex flex-col gap-5'>
//             <div className='flex flex-col gap-2'>
//                 <span className='text-black'>Origin</span>
//                 <div className='flex items-center border border-gray-300 rounded-md p-2 bg-white gap-1'>
//                 <IoLocation />
//                 <input 
//                     type='text'
//                     placeholder='Enter Origin'
//                     value={origin}
//                     onChange={handleOriginChange}
//                     className='bg-white border-none focus:outline-none focus:ring-0'
//                 />
//                 </div>
//             </div>

//             {showStopInput && (
//                 <div className='flex flex-col gap-2'>
//                     <span className='text-black'>Stop</span>
//                     <div className='flex items-center border border-gray-300 rounded-md p-2 bg-white gap-1'>
//                         <IoLocation />
//                         <input 
//                             type='text'
//                             placeholder='Enter Stop'
//                             value={stop}
//                             onClick={handleStopChange}
//                             className='bg-white border-none focus:outline-none focus:ring-0 '
//                         />
//                     </div>
//             </div>
//             )}
            

            
//             {!showStopInput && (
//                 <div className='flex flex-row-reverse'>
//                     <div className='flex flex-row items-center gap-1'>
//                         <BsPlusCircleFill onClick={handleAddStopClick} />
//                         <span className='text-black'>Add another Stop</span>
//                     </div>
//                 </div>
//             )}

//             <div className='flex flex-col gap-2'>
//                 <span className='text-black'>Destination</span>
//                 <div className='flex items-center border border-gray-300 rounded-md p-2 bg-white gap-1'>
//                 <IoLocation />
//                 <input 
//                     type='text'
//                     placeholder='Enter Destination'
//                     value={destination}
//                     onChange={handleDestinationChange}
//                     className='bg-white border-none focus:outline-none focus:ring-0'
//                 />
//                 </div>
//             </div>
//         </div>
        

//         <div className='flex items-center justify-center ml-10'>
//             <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl" onClick={handleSubmit}>Calculate</button>
//         </div>
//     </div>

    
    

    
//   )
// }

// export default LocationInput


import React, { useState, useEffect, useRef } from 'react';
import { IoLocation } from "react-icons/io5";
import { BsPlusCircleFill, BsXCircle } from "react-icons/bs";
import loader from '../Loader/Loader.jsx';

function LocationInput({ onCalculate }) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [stop, setStop] = useState('');
    const [showStopInput, setShowStopInput] = useState(false);
    const autocompleteOrigin = useRef(null);
    const autocompleteStop = useRef(null);
    const autocompleteDestination = useRef(null);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

    useEffect(() => {

        loader.load().then(() => {
            setIsGoogleMapsLoaded(true);
        }).catch(error => {
            console.error('Error loading Google Maps API:', error);
        });
    }, []);

    useEffect(() => {
        if (isGoogleMapsLoaded) {
            autocompleteOrigin.current = new google.maps.places.Autocomplete(
                document.getElementById('origin-input'),
                { types: ['geocode'] }
            );
            
            autocompleteStop.current = new google.maps.places.Autocomplete(
                document.getElementById('stop-input'),
                { types: ['geocode'] }
            );

            autocompleteDestination.current = new google.maps.places.Autocomplete(
                document.getElementById('destination-input'),
                { types: ['geocode'] }
            );

            autocompleteOrigin.current.addListener('place_changed', () => {
                const place = autocompleteOrigin.current.getPlace();
                setOrigin(place.formatted_address);
            });

            autocompleteStop.current.addListener('place_changed', () => {
                const place = autocompleteStop.current.getPlace();
                setStop(place.formatted_address);
            });

            autocompleteDestination.current.addListener('place_changed', () => {
                const place = autocompleteDestination.current.getPlace();
                setDestination(place.formatted_address);
            });
        }
    }, [isGoogleMapsLoaded]);

    const handleOriginChange = (e) => {
        setOrigin(e.target.value);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleStopChange = (e) => {
        setStop(e.target.value);
    };

    const handleAddStopClick = () => {
        setShowStopInput(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate({ origin, stop, destination });
    };

    const handleHideStopClick = () => {
        setShowStopInput(false);
        setStop(''); // Clear the stop input value when hiding
    };

    return (
        <div className='flex flex-col md:flex-row gap-10'>

            <div className='flex flex-col gap-5 max-w-md'>
                <div className='flex flex-col gap-2'>
                    <span className='text-black'>Origin</span>
                    <div className='flex items-center border border-gray-300 rounded-md p-2 bg-white gap-1'>
                        <IoLocation />
                        <input
                            type='text'
                            id='origin-input'
                            placeholder='Enter Origin'
                            value={origin}
                            onChange={handleOriginChange}
                            className='bg-white border-none focus:outline-none focus:ring-0'
                        />
                    </div>
                </div>

                {showStopInput && (
                    <div className='flex flex-col gap-2'>
                        <span className='text-black'>Stop</span>
                        <div className='flex items-center border border-gray-300 rounded-md p-2 bg-white gap-1'>
                            <IoLocation />
                            <input
                                type='text'
                                id='stop-input'
                                placeholder='Enter Stop'
                                value={stop}
                                onChange={handleStopChange}
                                className='bg-white border-none focus:outline-none focus:ring-0'
                            />
                            <BsXCircle onClick={handleHideStopClick} className='ml-2 text-red-600 cursor-pointer' title='Hide Stop' />
                        </div>
                    </div>
                )}

                {!showStopInput && (
                    <div className='flex flex-row-reverse'>
                        <div className='flex flex-row items-center gap-1'>
                            <BsPlusCircleFill onClick={handleAddStopClick} className='cursor-pointer' />
                            <span className='text-black cursor-pointer' onClick={handleAddStopClick}>Add another Stop</span>
                        </div>
                    </div>
                )}

                <div className='flex flex-col gap-2'>
                    <span className='text-black'>Destination</span>
                    <div className='flex items-center border border-gray-300 rounded-md p-2 bg-white gap-1'>
                        <IoLocation />
                        <input
                            type='text'
                            id='destination-input'
                            placeholder='Enter Destination'
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-white border-none focus:outline-none focus:ring-0'
                        />
                    </div>
                </div>
            </div>


            <div className='md:flex items-center justify-center md:ml-10'>
                <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl" onClick={handleSubmit}>Calculate</button>
            </div>
        </div>
    )
}

export default LocationInput;
