import { useCart, useCartAction } from "../Context/CartProvider";
import Layout from "../Layout/Layout";
import "../Pages/cart.css";

const CartPage = () => {
	const dispatch = useCartAction();
	const { cart,total } = useCart();

	if (!cart.length) {
		return (
			<Layout>
				<h2>cart is Empty</h2>
			</Layout>
		);
	}
	const incHandler = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};
	const decHandler = (product) => {
		dispatch({ type: "REMOVE_PRODUCT", payload: product });
	};

	return (
		<Layout>
			{cart.length && (
				<main className="container">
					<div className="cartCenter">
						<section className="cartItems">
							{cart.map((item) => (
								<div className="item" key={item.id}>
									<div className="cartimg">
										<img src={item.image} alt={item.name} />
									</div>
									<h3>{item.name}</h3>
									<div>Price: {item.price * item.quantity}</div>
									<div>
										<button onClick={() => incHandler(item)}>+</button>
										<button>{item.quantity}</button>
										<button onClick={() => decHandler(item)}>-</button>
									</div>
								</div>
							))}
						</section>
						<section className="cartSummary"><div>
							<h2>Cart Summary</h2>
							<h5>Total :${total}</h5>
							</div></section>
					</div>
				</main>
			)}
		</Layout>
	);
};

export default CartPage;
