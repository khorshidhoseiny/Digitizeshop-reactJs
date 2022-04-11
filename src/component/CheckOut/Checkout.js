import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import "./checkout.css";
const Checkout = () => {
  const Auth = useAuth();
  const { cart, total } = useCart();

  return (
    <div className="container">
      <div className="cart-center">
        <div className="cart-detail">
          <h4>Your Orders</h4>
          <div>
            {cart.map((item) => (
              <div className="cartItem">
                <p>{item.name}</p> <p>{item.price}</p>
              </div>
            ))}
          </div>
          <div className="total">
            <h5>Total :</h5>
            <p>${total}</p>
          </div>
          </div>
          
          <div className="user-detail">
            <h4>Costumer Detail</h4>
            <div>
              <p className="Detail"> <span>Name:</span> {Auth.name}</p>
              <p className="Detail"> <span>Email:</span> {Auth.email}</p>
              <p className="Detail"> <span>phoneNumber:</span>{Auth.phoneNumber}</p>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
