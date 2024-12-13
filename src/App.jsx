import Header from "./components/Header/Header";
import "./App.css";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { Provider } from "react-redux";
import rootStore from "./store";

function App() {
  return (
    <>
      <Provider store={rootStore}>
          <Header />
          <ProductList />
          <Cart />
          <Checkout />
      </Provider>
    </>
  );
}

export default App;
