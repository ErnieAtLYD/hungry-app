import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const callOurYelpAPI = async () => {
      const resp = await axios.get('/api/yelp');
      setPlaces(resp.data);
      setLoading(false);
    };
    callOurYelpAPI();
  }, []);

  return (
    <div id="app">
      <h1>WYNCODE DOES LUNCH</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul>
          {places.map(place => (
            <li key={place.id}>{place.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
