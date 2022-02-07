import Navbar from '../Components/Navbar';
import Slider from '../Components/Slider';
import Categories from '../Components/Categories';
import Products from '../Components/Products';
import Footer from '../Components/Footer';

function Home(){
    return(
        <div>
            <Navbar/>
            <Slider />
            <Categories />
            <Products />
            <Footer />
        </div>
    )
}

export default Home;