import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const DetailView = ({ item, type }) => {
  const navigate = useNavigate();

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

  const formatPropertyName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderPropertyValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  };

  return (
    <Card className="border-0 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <Card.Img
            src={getImageUrl(item.uid)}
            className="img-fluid rounded"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
            }}
          />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className="h2 mb-0">{item.properties.name}</Card.Title>
              <Button variant="outline-primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
            <ListGroup variant="flush">
              {Object.entries(item.properties).map(([key, value]) => (
                key !== 'name' && value && (
                  <ListGroup.Item key={key} className="px-0">
                    <strong>{formatPropertyName(key)}:</strong>{' '}
                    {renderPropertyValue(value)}
                  </ListGroup.Item>
                )
              ))}
            </ListGroup>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default DetailView;