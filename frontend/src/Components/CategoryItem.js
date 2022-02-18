import styled from 'styled-components';
import { Link } from 'react-router-dom'
const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 60vh;
    position: relative;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    text-transform: uppercase;
`;
const Button = styled.button`
    border: 2px solid red;
    border-radius: 10px;
    padding: 10px;
    background-color: white;
    color: red;
    cursor: pointer;
    font-weight: 600px;
`;

function CategoryItem({ item }) {
    return (
        <Container>
            <Link to={`/products/${item.brand}`}>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem;