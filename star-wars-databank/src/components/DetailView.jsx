import React, { useState, useContext } from 'react';
import { Card, ListGroup, Button, Badge, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const DetailView = ({ item, type }) => {
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useContext(AppContext);
  const [imageError, setImageError] = useState(false);
  const isFavorite = favorites.some(fav => fav.uid === item.uid);
  const [activeTab, setActiveTab] = useState('details');

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

  const groupProperties = () => {
    const props = item.properties;
    switch(type) {
      case 'character':
      case 'people':
        return {
          physical: ['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'],
          biographical: ['homeworld', 'species'],
          related: ['films', 'vehicles', 'starships']
        };
      case 'vehicle':
      case 'vehicles':
        return {
          specifications: ['model', 'manufacturer', 'vehicle_class', 'length', 'cost_in_credits'],
          capabilities: ['max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity', 'consumables'],
          related: ['pilots', 'films']
        };
      case 'planet':
      case 'planets':
        return {
          physical: ['climate', 'terrain', 'surface_water', 'diameter'],
          orbital: ['rotation_period', 'orbital_period', 'gravity'],
          population: ['population', 'residents'],
          related: ['films']
        };
      default:
        return {};
    }
  };

  const renderPropertyValue = (key, value) => {
    if (!value || value === 'n/a' || value === 'unknown') {
      return <span className="text-muted">Unknown</span>;
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? (
        <Badge bg="secondary" className="me-1">
          {value.length} {key.replace('_', ' ')}
        </Badge>
      ) : (
        <span className="text-muted">None</span>
      );
    }

    return value;
  };

  const propertyGroups = groupProperties();

  return (
    <Card className="border-0 shadow">
      <div className="row g-0">
        <div className="col-md-4">
          <div className="position-relative h-100">
            <Card.Img
              src={!imageError ? getImageUrl(item.uid) : '/placeholder.jpg'}
              className="img-fluid rounded-start h-100 object-fit-cover"
              onError={() => setImageError(true)}
            />
            <div className="position-absolute bottom-0 start-0 p-3 w-100 bg-gradient-dark">
              <Button
                variant={isFavorite ? "danger" : "outline-light"}
                size="sm"
                onClick={() => toggleFavorite(item)}
                className="w-100"
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <Card.Title className="h2 mb-1">
                  {item.properties.name}
                </Card.Title>
                <Badge bg="dark" className="text-capitalize">
                  {type}
                </Badge>
              </div>
              <Button variant="outline-primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>

            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              {Object.entries(propertyGroups).map(([group, properties]) => (
                <Tab
                  key={group}
                  eventKey={group}
                  title={formatPropertyName(group)}
                >
                  <ListGroup variant="flush">
                    {properties.map(key => (
                      item.properties[key] && (
                        <ListGroup.Item key={key} className="px-0">
                          <strong>{formatPropertyName(key)}:</strong>{' '}
                          {renderPropertyValue(key, item.properties[key])}
                        </ListGroup.Item>
                      )
                    ))}
                  </ListGroup>
                </Tab>
              ))}
            </Tabs>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default DetailView;