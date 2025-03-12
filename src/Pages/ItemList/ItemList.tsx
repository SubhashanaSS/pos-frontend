import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './ItemList.css';

const ItemList = ({ addToCart }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/items'); 
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <Row>
            {items.length > 0 ? (
                items.map(item => (
                    <Col key={item.id} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.itemName}</Card.Title>
                                <Card.Text>
                                    Price: ${typeof item.unitPrice === 'number' ? item.unitPrice.toFixed(2) : 'N/A'}
                                </Card.Text>
                                <Button variant="primary" type="button" onClick={() => addToCart(item)}>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            ) : (
                <p>Loading items...</p>
            )}
        </Row>
    );
};

export default ItemList;
