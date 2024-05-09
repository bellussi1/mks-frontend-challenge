import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ShoppingCart from "./components/ShoppingCart";
import { Product } from "./utils/types";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const cartItemCount = selectedProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleRemoveFromCart = (productId: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <>
      {/* Passando a prop cartItemCount para o Header */}
      <Header
        onCartButtonClick={handleCartButtonClick}
        cartItemCount={cartItemCount}
      />
      <Home setSelectedProducts={setSelectedProducts} />
      {showCart && (
        <ShoppingCart
          selectedProducts={selectedProducts}
          onClose={handleCloseCart}
          onProductRemove={handleRemoveFromCart}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
