import React, { useContext, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { ItemCard } from '../components/Card';

const Vehicles = () => {
  const { vehicles, loading, fetchVehicles } = useContext(AppContext);

  useEffect(() => {
    if (vehicles.length === 0) {
      fetchVehicles();
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
      <h2 className="mb-4">Star Wars Vehicles</h2>
      <Row>
        {vehicles.map((vehicle) => (
          <Col key={vehicle.uid} xs={12} sm={6} md={4} lg={3}>
            <ItemCard item={vehicle} type="vehicle" />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Vehicles;
