import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const TitleBrand = styled.h1`
  margin: 20px;
  text-transform: uppercase;
`;

const ImgContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const Image = styled.img`
  width: 600px;
  height: 600px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const TitleName = styled.h1`
  font-weight: 600;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 70%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 10px
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 1px solid #141414;
  &.active{
    transform: scale(1.5);
  }
`;

const FilterROM = styled.select`
  padding: 5px;
`;

const FilterROMOption = styled.option``;

const FilterRAM = styled.span`
  margin-left: 5px;
  font-size: 20px;
  font-weight: 200;
`

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [oldId, setOldId] = useState('');
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [rom, setRom] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
     try {
         const res = await axios.get("http://localhost:5000/api/products/find/" + id);
         setProduct(res.data);
     } catch (error) {
         
     }
    }
    getProduct();
  }, [id])
  const handleClick = () => {
    if((color === '') || (rom === '')){
      console.log('loi roi')
    }
    else {
      dispatch(
        addProduct({ ...product, quantity, color, rom })
      );
    }
  };
  const handleFilterColor = (index, color) => {
    setColor(color);
    if(oldId){
      const UnFilterColor = document.getElementById(oldId);
      UnFilterColor.classList.remove("active")
    }
    setOldId(index);
    let FilterColor = document.getElementById(index);
    FilterColor.classList.add('active');
  }
  const HandleQuantity = () => {
    if(quantity > 0) {
      setQuantity(quantity - 1)
    }
    else {
      return;
    }
  }
  return (
    <Container>
      <Navbar />
      <TitleBrand>{product.brand}</TitleBrand>
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <TitleName>{product.name}</TitleName>
          <Desc>
            {product.desc}
          </Desc>
          <Price><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((color, index) => (
                <FilterColor id={index} color={color} key={index} onClick={() => handleFilterColor(index.toString(), color)}/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Bộ nhớ</FilterTitle>
              <FilterROM onChange={(e) => setRom(e.target.value)}>
                {product.rom?.map((s, index) => (
                  <FilterROMOption key={index}>{s}</FilterROMOption>
                ))}
              </FilterROM>
            </Filter>
            <Filter>
              <FilterTitle>RAM</FilterTitle>:
              <FilterRAM>{product.ram}</FilterRAM>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon style={{cursor: 'pointer'}} onClick={() => HandleQuantity()} />
              <Amount>{quantity}</Amount>
              <AddIcon style={{cursor: 'pointer'}} onClick={() => setQuantity(quantity + 1)} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;