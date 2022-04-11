import { Link } from "react-router-dom";
import { useCart, useCartAction } from "../Context/CartProvider";
import Layout from "../Layout/Layout";
import "../Pages/cart.css";

const CartPage = () => {
	const dispatch = useCartAction();
	const { cart, total } = useCart();

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
									<div className="btnGroup">
										<button onClick={() => incHandler(item)}>+</button>
										<button>{item.quantity}</button>
										<button onClick={() => decHandler(item)}>-</button>
									</div>
								</div>
							))}
						</section>
						<CartSummery total={total} cart={cart} />
					</div>
				</main>
			)}
		</Layout>
	);
};

export default CartPage;

const CartSummery = ({ total, cart }) => {
	const OriginalTotalPrice = cart.length
		? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
		: 0;

	return (
		<section className="cartSummary">
			<h2>Cart Summary</h2>
			<div className="SummeryItems">
				<div className="SummaryItem">
					<h5>Total Cart : </h5>
					<p> {OriginalTotalPrice}</p>
				</div>
				<div className="SummaryItem">
					<h5>discount Cart : </h5>
					<p> ${OriginalTotalPrice - total}</p>
				</div>
				<hr />
				<div className="SummaryItem">
					<h5>Net Price : </h5>
					<p> {total}</p>
					
				</div>
				<Link to={"/signup?redirect=checkout"}>
					<button className="btn" style={{margin:"20px 0",width:"100%",}}>Go to Checkout</button>
				</Link>
			</div>
			;
		</section>
	);
};
