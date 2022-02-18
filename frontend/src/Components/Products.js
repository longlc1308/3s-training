import styled from 'styled-components';
import Product from './Product'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
`;
function Products({brand, filters, sort}){
    console.log(brand, filters, sort);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
       const getProducts = async () => {
        try {
            const res = await axios.get(brand ? `http://localhost:5000/api/products?brand=${brand}` : "http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (error) {
            
        }
       }
       getProducts();
    }, [brand])
    useEffect(() => {
        brand && setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
    }, [products, brand, filters])
    useEffect(() => {
        if (sort === "newest"){
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            )
        }
        else if (sort === "asc"){
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.price - b.price)
            )
        }
        else {
            setFilteredProducts((prev) =>
              [...prev].sort((a, b) => b.price - a.price)
            )
        }
    }, [sort])
    return(
        <Container>
            { brand ? filteredProducts.map(item =>(
                <Product item={item} key={item._id} />))
                : products.slice(0,12).map(item =>(
                <Product item={item} key={item._id} />))
            }
        </Container>
    )
}

export default Products;