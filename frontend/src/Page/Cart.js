import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { removeProduct, increaseQuantity, decreaseQuantity } from "../redux/cartRedux";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import './Cart.css'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.h3`
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const ActionDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    font-size: 24px;
`
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleQuantity = (product, color, rom) => {
    dispatch(
      increaseQuantity({ ...product, color, rom })
    );
  };
  const handleRemoveQuantity = (product, color, rom, index) => {
    if(product.quantity > 1) {
      dispatch(
        decreaseQuantity({ ...product, color, rom})
      )
    }
    else {
      dispatch(
        removeProduct({...product, color, rom, index})
      )
    }
  };
  const handleDelProduct = (product, color, rom, index) => {
    dispatch(
      removeProduct({...product, color, rom, index})
    )
  }
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton><Link to="/" style={{textDecoration: "none", color: "black"}}>CONTINUE SHOPPING</Link></TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) =>(
              <Product key={product._id}>
              <ProductDetail>
                <Image src={product.image} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Bộ nhớ:</b> {product.rom}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <RemoveIcon style={{cursor: 'pointer'}} onClick={() => handleRemoveQuantity(product, product.color, product.rom, index)}  />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <AddIcon style={{cursor: 'pointer'}} onClick={() => handleQuantity(product, product.color, product.rom)} />
                </ProductAmountContainer>
                <ProductPrice><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></ProductPrice>
              </PriceDetail>
              <ActionDetail>
                <Link to={`/product/${product._id}`} style={{color: 'black'}}><EyeFilled className="detail" /></Link>
                <DeleteFilled className="delete" onClick={() => handleDelProduct(product, product.color, product.rom, index)} />
              </ActionDetail>
            </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice><NumberFormat value={cart.total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice><NumberFormat value={cart.total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;