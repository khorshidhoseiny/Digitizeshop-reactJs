import Layout from "../Layout/Layout";
import * as data from "../Data/data";
import { useCart, useCartAction } from "../Context/CartProvider";
import { toast } from "react-toastify";

function CheckInCart(cart, product) {
	return cart.find((c) => c.id === product.id);
}
const HomePage = () => {
	const { cart } = useCart();
	const dispatch = useCartAction();

	
	const addToCartHandler = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
		toast.success(`${product.name} Added to Cart 😀`);
		// console.log(product);
	};
	return (
		<Layout>
			<main className="container">
				<section className="ProductList">
					{data.products.map((product) => {
						return (
							<section className="Product" key={product.id}>
								<div className="productImg">
									<img alt={product.name} src={product.image} />
								</div>
								<div className="ProductDesc">
									<p className="p-name">{product.name}</p>
									<p className="p-price">${product.price}</p>
									<button
										className="btn"
										onClick={() => addToCartHandler(product)}
									>
										{CheckInCart(cart,product) ? "InCart" : "Add To Cart"}
									</button>
								</div>
							</section>
						);
					})}
				</section>
			</main>
		</Layout>
	);
};

export default HomePage;
