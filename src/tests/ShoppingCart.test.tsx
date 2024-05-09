import "@testing-library/jest-dom";
import React from "react";

import { render, fireEvent } from "@testing-library/react";
import ShoppingCart from "../components/ShoppingCart";
import { Product } from "../utils/types";
test("renders ShoppingCart component correctly", () => {
  const selectedProducts: Product[] = [
    {
      id: 1,
      name: "Product 1",
      quantity: 1,
      price: 10,
      photo: "",
      brand: "Brand",
      description: "Description",
    },
  ];

  const onClose = jest.fn();
  const onProductRemove = jest.fn();

  const { getByText } = render(
    <ShoppingCart
      selectedProducts={selectedProducts}
      onClose={onClose}
      onProductRemove={onProductRemove}
    />
  );

  expect(getByText("Carrinho de compras")).toBeInTheDocument();
});

test("clicking close button calls onClose function", () => {
  const selectedProducts: Product[] = [];
  const onClose = jest.fn();
  const onProductRemove = jest.fn();

  const { getByText } = render(
    <ShoppingCart
      selectedProducts={selectedProducts}
      onClose={onClose}
      onProductRemove={onProductRemove}
    />
  );

  fireEvent.click(getByText("X"));
  expect(onClose).toHaveBeenCalled();
});
