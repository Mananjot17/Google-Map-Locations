import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  version: 'weekly',
  libraries: ['places'], // Include the 'places' library for autocomplete
});

export default loader;