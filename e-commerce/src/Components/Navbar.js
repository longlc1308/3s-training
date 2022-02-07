import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
const Container = styled.div`
    height: 60px;
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`;

const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 5px;
    padding: 5px;
`;
const Input = styled.input`
    border:none;
    outline: none;
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content:flex-end;
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`;

function Navbar() {
    const quantity = useSelector(state => state.cart.quantity);
    const currentUser = useSelector(state => state.user.currentUser);
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN / VN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <AiOutlineSearch style={{color: 'red', fontSize: 16}}></AiOutlineSearch>
                    </SearchContainer>
                </Left>
                <Center><Link to="/" style={{cursor: 'pointer', textDecoration: "none", color: "black"}}><Logo>Minastik.</Logo></Link></Center>
                <Right>
                    <MenuItem><Link to="/register" style={{textDecoration: "none", color: "black"}}>REGISTER</Link></MenuItem>
                    <MenuItem><Link to="/login" style={{textDecoration: "none", color: "black"}}>SIGN IN</Link></MenuItem>
                    {currentUser && <MenuItem><Link to="/admin" style={{textDecoration: "none", color: "black"}}>ADMIN</Link></MenuItem>}
                    <MenuItem>
                        <Link to="/cart">
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )

}
export default Navbar;