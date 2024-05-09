import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "../utils/types";

interface HomeProps {
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const fetchProducts = async () => {
  const response = await axios.get(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC"
  );
  return response.data.products;
};

const Home: React.FC<HomeProps> = ({ setSelectedProducts }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>("products", fetchProducts);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product: Product) => {
    setSelectedProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevProducts];
        updatedCart[existingProductIndex].quantity++;
        return updatedCart;
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="home">
      <div className="card__container">
        {products?.map((product) => (
          <div key={product.id} className="card">
            <img src={product.photo} alt={product.name} />
            <div className="card__content">
              <h2>{`${product.brand} ${product.name}`}</h2>
              <h3>R${Number(product.price).toFixed(0)}</h3>
            </div>
            <p>{product.description}</p>
            {/* Adicionar produto ao carrinho */}
            <button onClick={() => addToCart(product)} data-testid="buy-button">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.737212"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 1L1 3.7V13.15C1 13.8956 1.59695 14.5 2.33333 14.5H11.6667C12.403 14.5 13 13.8956 13 13.15V3.7L11 1H3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.737212"
                    d="M1 4.375H13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.737212"
                    d="M10 7C10 8.24264 8.82475 9.25 7.375 9.25C5.92525 9.25 4.75 8.24264 4.75 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </svg>
              COMPRAR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
