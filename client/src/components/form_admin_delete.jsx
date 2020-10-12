import React, { useEffect, useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';
import NavAdmin from './nav_admin';

const FormAdminDelete = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({ searchInput: "" })
    let clickedOption;

    const getProducts = () => {
        axios.get(`http://localhost:3000/products/`)
            .then(response => {
                setProducts(response.data);
            })
    }

    useEffect(() => {
        getProducts();
        setLoading(false);
    }, [loading]);

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });

    };

    const handleSelectChange = (event) => {
        
        let selector = document.getElementById("productList");
        clickedOption = selector.options[selector.selectedIndex].id;

    }

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:3000/products/${id}`)
    }

    let showProducts = products.filter(product => product.name.toLowerCase().includes(input.searchInput.toLowerCase()))

    return (
        <div>

            <NavAdmin />

            <Form >
                <FormControl
                    type="text"
                    placeholder="Search your game"
                    className="mr-sm-2"
                    name="searchInput"
                    onChange={(event) => handleInputChange(event)} />
            </Form>

            <Form.Group>
                <Form.Control as="select" multiple id="productList" onClick={(e) => handleSelectChange(e)}>
                    {
                        showProducts.map(product => (
                            <option id={product.id} >
                                {product.name}
                            </option>
                        ))
                    }



                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="danger" onClick={() => deleteProduct(clickedOption)} >Borrar</Button>


        </div>
    )

}

export default FormAdminDelete;