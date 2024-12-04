import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const [characters, setCharacters] = useState(() => {
    const savedCharacters = localStorage.getItem('characters');
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });
  
  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem('vehicles');
    return savedVehicles ? JSON.parse(savedVehicles) : [];
  });
  
  const [planets, setPlanets] = useState(() => {
    const savedPlanets = localStorage.getItem('planets');
    return savedPlanets ? JSON.parse(savedPlanets) : [];
  });

  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    localStorage.setItem('planets', JSON.stringify(planets));
  }, [characters, vehicles, planets]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.uid === item.uid);
      if (exists) {
        return prev.filter(fav => fav.uid !== item.uid);
      }
      return [...prev, item];
    });
  };

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      if (characters.length === 0) {
        const response = await fetch('https://www.swapi.tech/api/people');
        const data = await response.json();
        const detailedCharacters = await Promise.all(
          data.results.map(async (char) => {
            const detailResponse = await fetch(char.url);
            const detailData = await detailResponse.json();
            return {
              ...char,
              type: 'people',
              properties: detailData.result.properties
            };
          })
        );
        setCharacters(detailedCharacters);
        localStorage.setItem('characters', JSON.stringify(detailedCharacters));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      if (vehicles.length === 0) {
        const response = await fetch('https://www.swapi.tech/api/vehicles');
        const data = await response.json();
        const detailedVehicles = await Promise.all(
          data.results.map(async (vehicle) => {
            const detailResponse = await fetch(vehicle.url);
            const detailData = await detailResponse.json();
            return {
              ...vehicle,
              type: 'vehicles',
              properties: detailData.result.properties
            };
          })
        );
        setVehicles(detailedVehicles);
        localStorage.setItem('vehicles', JSON.stringify(detailedVehicles));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setLoading(false);
    }
  };

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      if (planets.length === 0) {
        const response = await fetch('https://www.swapi.tech/api/planets');
        const data = await response.json();
        const detailedPlanets = await Promise.all(
          data.results.map(async (planet) => {
            const detailResponse = await fetch(planet.url);
            const detailData = await detailResponse.json();
            return {
              ...planet,
              type: 'planets',
              properties: detailData.result.properties
            };
          })
        );
        setPlanets(detailedPlanets);
        localStorage.setItem('planets', JSON.stringify(detailedPlanets));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching planets:', error);
      setLoading(false);
    }
  };

  const searchItems = (query) => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    const allItems = [
      ...characters.map(item => ({ ...item, type: 'people' })),
      ...vehicles.map(item => ({ ...item, type: 'vehicles' })),
      ...planets.map(item => ({ ...item, type: 'planets' }))
    ];

    const results = allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results.slice(0, 5)); 
  };

  return (
    <AppContext.Provider value={{
      favorites,
      characters,
      vehicles,
      planets,
      loading,
      searchResults,
      toggleFavorite,
      searchItems,
      fetchCharacters,
      fetchVehicles,
      fetchPlanets
    }}>
      {children}
    </AppContext.Provider>
  );
};