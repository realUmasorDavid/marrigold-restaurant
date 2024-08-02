import '../App.css'
import Dish from '../assets/dish (1).png'
import Drink from '../assets/drink (1).png'
import Snack from '../assets/snack (1).png'

export default function Categories() {
    return (
        <>
            <div className="storeFace font-Poppins">
                <h1>Explore Categories</h1>
                <div className="categories">
                    <div className="cat">
                        <img src={Dish} alt="" />
                        <p>Meals</p>
                    </div>
                    <div className="cat">
                        <img src={Drink} alt="" />
                        <p>Protein</p>
                    </div>
                    <div className="cat">
                        <img src={Snack} alt="" />
                        <p>Drinks</p>
                    </div>
                </div>
            </div>
        </>
    )
}
