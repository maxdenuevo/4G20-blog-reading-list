import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Spinner } from 'react-bootstrap';

const Details = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const data = await response.json();
        setItem(data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  const getImageUrl = () => {
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    switch(type) {
      case 'people':
        return `${baseUrl}/characters/${id}.jpg`;
      case 'vehicles':
        return `${baseUrl}/vehicles/${id}.jpg`;
      case 'planets':
        return `${baseUrl}/planets/${id}.jpg`;
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <Card className="border-0">
      <div className="row g-0">
        <div className="col-md-4">
          <Card.Img src={getImageUrl()} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title className="h2">{item.properties.name}</Card.Title>
            <ListGroup variant="flush">
              {Object.entries(item.properties).map(([key, value]) => (
                key !== 'name' && (
                  <ListGroup.Item key={key}>
                    <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
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

export default Details;
