import React, { useState, useEffect } from "react";
import { Product } from "../utils/types";
import { motion } from "framer-motion";

interface ShoppingCartProps {
  selectedProducts: Product[]; // Lista de produtos selecionados
  onClose: () => void; // Função para fechar o carrinho
  onProductRemove: (productId: number) => void; // Função para remover um produto do carrinho
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  selectedProducts,
  onClose,
  onProductRemove,
}) => {
  const [cart, setCart] = useState<Product[]>(selectedProducts);

  // Atualizar o estado do carrinho sempre que a prop selectedProducts mudar
  useEffect(() => {
    setCart(selectedProducts);
  }, [selectedProducts]);

  // Função para aumentar a quantidade de um produto no carrinho
  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(updatedCart);
  };

  // Função para diminuir a quantidade de um produto no carrinho
  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((product) =>
      product.id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCart(updatedCart);
  };

  // Função para calcular o total da compra
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <motion.div
      className="cart__container"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%", transition: { duration: 0.4 } }}
      transition={{ duration: 0.4 }}
    >
      <div className="cart__header">
        <h1>Carrinho de compras</h1>
        {/* Fechar carrinho */}
        <button className="cart__close-button" onClick={onClose}>
          X
        </button>
      </div>

      <div className="cart__product-container">
        {cart.map((product) => (
          <motion.div
            key={product.id}
            className="cart__product"
            initial={{ scale: 0 }} // Escala inicial: zero
            animate={{ scale: 1 }} // Animação para a escala final: 1 (normal)
            transition={{ duration: 0.3 }} // Duração da transição
          >
            <img
              className="cart__product-image"
              src={product.photo}
              alt={product.name}
            />
            <h2>{`${product.brand} ${product.name}`}</h2>

            <div className="cart__product-info">
              <div className="cart__quantity">
                {/* Diminuir a quantidade do produto */}
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                {/* Mostrar a quantidade do produto */}
                <p>{product.quantity}</p>
                {/* Aumentar a quantidade do produto */}
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </div>
              <p className="cart__product-price">
                R${Number(product.price * product.quantity).toFixed(0)}
              </p>
              {/* Remover produto do carrinho */}
              <button
                className="cart__remove"
                onClick={() => onProductRemove(product.id)}
              >
                X
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div>
        <div className="cart__price">
          <p>Total: </p>
          {/* Valor total do carrinho */}
          <p>R${calculateTotal().toFixed(0)}</p>
        </div>

        <button className="cart__purchase">Finalizar compra</button>
      </div>
    </motion.div>
  );
};

export default ShoppingCart;
