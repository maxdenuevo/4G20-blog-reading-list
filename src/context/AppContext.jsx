import React, { createContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((item) => {
    setFavorites(currentFavorites => {
      const isFavorite = currentFavorites.some(fav => fav.uid === item.uid);
      if (isFavorite) {
        return currentFavorites.filter(fav => fav.uid !== item.uid);
      } else {
        const itemWithType = {
          ...item,
          type: item.type || 
                (item.url?.includes('/people/') ? 'people' : 
                 item.url?.includes('/vehicles/') ? 'vehicles' : 
                 item.url?.includes('/planets/') ? 'planets' : 'unknown')
        };
        return [...currentFavorites, itemWithType];
      }
    });
  }, []);

  const searchItems = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = [
      ...characters.map(item => ({ ...item, type: 'people' })),
      ...vehicles.map(item => ({ ...item, type: 'vehicles' })),
      ...planets.map(item => ({ ...item, type: 'planets' }))
    ].filter(item => 
      item.name?.toLowerCase().includes(searchTerm) || 
      item.properties?.name?.toLowerCase().includes(searchTerm)
    ).slice(0, 5);

    setSearchResults(results);
  }, [characters, vehicles, planets]);

  const fetchDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching details:', error);
      throw error;
    }
  };

  const fetchCharacters = useCallback(async () => {
    if (characters.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://www.swapi.tech/api/people');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const detailedCharacters = await Promise.all(
        data.results.map(async (char) => {
          try {
            const detailData = await fetchDetails(char.url);
            return {
              ...char,
              type: 'people',
              properties: detailData.result.properties
            };
          } catch (detailError) {
            console.error(`Error fetching details for ${char.name}:`, detailError);
            return {
              ...char,
              type: 'people',
              properties: { name: char.name }
            };
          }
        })
      );
      
      setCharacters(detailedCharacters);
      
    } catch (error) {
      console.error('Error in fetchCharacters:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVehicles = useCallback(async () => {
    if (vehicles.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://www.swapi.tech/api/vehicles');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const detailedVehicles = await Promise.all(
        data.results.map(async (vehicle) => {
          try {
            const detailData = await fetchDetails(vehicle.url);
            return {
              ...vehicle,
              type: 'vehicles',
              properties: detailData.result.properties
            };
          } catch (detailError) {
            return {
              ...vehicle,
              type: 'vehicles',
              properties: { name: vehicle.name }
            };
          }
        })
      );
      
      setVehicles(detailedVehicles);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlanets = useCallback(async () => {
    if (planets.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://www.swapi.tech/api/planets');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const detailedPlanets = await Promise.all(
        data.results.map(async (planet) => {
          try {
            const detailData = await fetchDetails(planet.url);
            return {
              ...planet,
              type: 'planets',
              properties: detailData.result.properties
            };
          } catch (detailError) {
            return {
              ...planet,
              type: 'planets',
              properties: { name: planet.name }
            };
          }
        })
      );
      
      setPlanets(detailedPlanets);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{
      favorites,
      characters,
      vehicles,
      planets,
      loading,
      error,
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

export { AppContext, AppProvider };
