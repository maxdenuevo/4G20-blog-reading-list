import React, { useContext, useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const ItemCard = ({ item, type }) => {
  const { toggleFavorite, favorites } = useContext(AppContext);
  const [imageError, setImageError] = useState(false);
  const isFavorite = favorites.some(fav => fav.uid === item.uid);
  
  const getImageUrl = (id) => {
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    switch(type) {
      case 'character':
      case 'people':
        return `${baseUrl}/characters/${id}.jpg`;
      case 'vehicle':
      case 'vehicles':
        return `${baseUrl}/vehicles/${id}.jpg`;
      case 'planet':
      case 'planets':
        return `${baseUrl}/planets/${id}.jpg`;
      default:
        return '';
    }
  };

  const getHighlightInfo = () => {
    const props = item.properties || {};
    switch(type) {
      case 'character':
      case 'people':
        return {
          main: props.birth_year,
          sub: props.species?.[0] || 'Unknown Species'
        };
      case 'vehicle':
      case 'vehicles':
        return {
          main: props.model,
          sub: props.manufacturer
        };
      case 'planet':
      case 'planets':
        return {
          main: props.terrain,
          sub: `Population: ${props.population}`
        };
      default:
        return { main: '', sub: '' };
    }
  };

  const { main, sub } = getHighlightInfo();

  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={!imageError ? getImageUrl(item.uid) : '/placeholder.jpg'}
          onError={() => setImageError(true)}
          className="object-fit-cover"
          style={{ height: '200px' }}
        />
        <Badge 
          bg="dark" 
          className="position-absolute top-0 end-0 m-2 text-capitalize"
        >
          {type}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">{item.name || item.properties?.name}</Card.Title>
        <Card.Text className="text-muted small mb-1">{main}</Card.Text>
        <Card.Text className="text-muted small mb-3">{sub}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button 
            as={Link}
            to={`/${type}/${item.uid}`}
            variant="outline-primary"
            size="sm"
            className="flex-grow-1"
          >
            View Details
          </Button>
          <Button 
            variant={isFavorite ? "danger" : "outline-danger"}
            size="sm"
            onClick={() => toggleFavorite(item)}
            className="flex-shrink-0"
          >
            {isFavorite ? "★" : "☆"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
