import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { ItemCard } from '../components/Card';

const Favorites = () => {
  const { favorites } = useContext(AppContext);

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>No favorites added yet</h3>
        <p>Start exploring and add some items to your favorites!</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">My Favorites</h2>
      <Row>
        {favorites.map((item) => (
          <Col key={item.uid} xs={12} sm={6} md={4} lg={3}>
            <ItemCard item={item} type={item.type} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Favorites;
