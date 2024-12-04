import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

export const ItemCard = ({ item, type }) => {
  const { toggleFavorite, favorites } = useContext(AppContext);
  const isFavorite = favorites.some(fav => fav.uid === item.uid);
  
  const getImageUrl = (id) => {
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    switch(type) {
      case 'character':
        return `${baseUrl}/characters/${id}.jpg`;
      case 'vehicle':
        return `${baseUrl}/vehicles/${id}.jpg`;
      case 'planet':
        return `${baseUrl}/planets/${id}.jpg`;
      default:
        return '';
    }
  };

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Card.Img variant="top" src={getImageUrl(item.uid)} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Button 
          variant={isFavorite ? "danger" : "primary"}
          onClick={() => toggleFavorite(item)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};
