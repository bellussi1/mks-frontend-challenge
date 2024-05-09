import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "../components/Home";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
jest.mock("axios");

test("clicking buy button adds product to cart", async () => {
  const setSelectedProducts = jest.fn();

  // Mock the axios.get call
  const products = [
    {
      id: 1,
      name: "Product 1",
      brand: "Brand",
      price: 100,
      photo: "photo.jpg",
      description: "description",
    },
  ];
  const resp = { data: { products } };

  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve(resp));

  // Configurando o QueryClient
  const queryClient = new QueryClient();

  const { findByText } = render(
    <QueryClientProvider client={queryClient}>
      <Home setSelectedProducts={setSelectedProducts} />
    </QueryClientProvider>
  );

  // Aguarde até que o botão "COMPRAR" seja exibido
  const comprarButton = await waitFor(() => findByText("COMPRAR"));
  expect(comprarButton).toBeInTheDocument();

  fireEvent.click(comprarButton);
  expect(setSelectedProducts).toHaveBeenCalled();
});
