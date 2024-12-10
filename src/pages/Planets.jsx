import React, { useContext, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { ItemCard } from '../components/Card';

const Planets = () => {
  const { planets, loading, fetchPlanets } = useContext(AppContext);

  useEffect(() => {
    if (planets.length === 0) {
      fetchPlanets();
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Star Wars Planets</h2>
      <Row>
        {planets.map((planet) => (
          <Col key={planet.uid} xs={12} sm={6} md={4} lg={3}>
            <ItemCard item={planet} type="planet" />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Planets;
