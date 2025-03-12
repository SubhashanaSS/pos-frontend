import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import './Stock.css';

const Stock = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    id: '',
    itemCode: '',
    itemName: '',
    qty: '',
    unitPrice: '',
  });
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/items'); 
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setQuantity(item.qty); 
  };

  const handleUpdateStock = async (event) => {
    event.preventDefault();
    try {
      const stockUpdateData = {
        id: selectedItem.id,
        quantity: quantity,
        itemId: selectedItem.id,
      };

      await axios.post(`http://localhost:8080/stock`, stockUpdateData);
      alert('Stock updated successfully!');
      fetchItems(); 
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div className='stock'>
      <h1>Stock Management</h1>

      <div className="table-section">
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} onClick={() => handleRowClick(item)}>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td>{item.qty}</td>
                <td>{item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {selectedItem.id && (
        <div className="form-section">
          <div className="mt-4">
            <h3>Update Stock for {selectedItem.itemName}</h3>
            <Form onSubmit={handleUpdateStock}>
              <Form.Group controlId="itemCode">
                <Form.Label>Item Code</Form.Label>
                <Form.Control type="text" value={selectedItem.itemCode} readOnly />
              </Form.Group>

              <Form.Group controlId="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" value={selectedItem.itemName} readOnly />
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label>Add Stock</Form.Label>
                <Form.Control
                  type="number"
                  
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>

              <Button className='btn' variant="primary" type="submit">
                Update Stock
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
