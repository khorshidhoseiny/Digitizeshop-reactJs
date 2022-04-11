import Checkout from "../component/CheckOut/Checkout";
import { useAuth } from "../Context/AuthProvider";
import Layout from "../Layout/Layout";

const CheckOut = () => {
  return (
    <Layout>
      <Checkout />
    </Layout>
  );
};

export default CheckOut;
