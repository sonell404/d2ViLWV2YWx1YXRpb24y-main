import { html, fixture, expect, waitUntil } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client.js";
import View from "./shopping-cart";

describe("View", () => {
  // Restore fetchMock after each test
  afterEach(() => {
    fetchMock.restore();
  });

  it("should populate the table with product IDs and names from API data", async () => {
    // Mock cart and products data
    const cartData = [{ id: 101 }, { id: 102 }];
    const productsData = [
      { id: 101, name: "Product A" },
      { id: 102, name: "Product B" },
    ];

    // Mock API responses
    fetchMock.getOnce("http://localhost:4002/cart", { body: cartData });
    fetchMock.getOnce("http://localhost:4002/products", { body: productsData });

    // Create a new div element with a table and tbody
    const el = await fixture(
      html`<div>
        <table id="shopping-cart-tbl">
          <tbody></tbody>
        </table>
      </div>`
    );
    // Initialize the view
    await View.init();

    // Wait for the table to be populated
    await waitUntil(() => el.querySelector("tbody").children.length === 2);

    // Construct expected HTML dynamically
    const expectedHTML = productsData
      .map(
        (product) =>
          `<tr><td aria-label="${product.id}">${product.id}</td><td aria-label="${product.name}">${product.name}</td></tr>`
      )
      .join("");

    // Check if the table is populated with the correct data
    expect(el.querySelector("tbody").innerHTML).to.equal(expectedHTML);
  });

  it("should handle missing product details gracefully", async () => {
    // Mock cart and products data
    const cartData = [{ id: 101 }, { id: 102 }];
    const productsData = [{ id: 101, name: "Product A" }];

    // Mock API responses
    fetchMock.getOnce("http://localhost:4002/cart", { body: cartData });
    fetchMock.getOnce("http://localhost:4002/products", { body: productsData });

    // Create a new div element with a table and tbody
    const el = await fixture(
      html`<div>
        <table id="shopping-cart-tbl">
          <tbody></tbody>
        </table>
      </div>`
    );
    // Initialize the view
    await View.init();

    // Wait for the table to be populated
    await waitUntil(() => el.querySelector("tbody").children.length === 1);

    // Construct expected HTML dynamically
    const expectedHTML = productsData
      .map(
        (product) =>
          `<tr><td aria-label="${product.id}">${product.id}</td><td aria-label="${product.name}">${product.name}</td></tr>`
      )
      .join("");

    // Check if the table is populated with the correct data
    expect(el.querySelector("tbody").innerHTML).to.equal(expectedHTML);

    // Check if the table does not contain a row for missing product details
    expect(el.querySelector("tbody").innerHTML).to.not.contain(
      "<tr><td>102</td><td></td></tr>"
    );
  });

  // HANDLES EMPTY CART GRACEFULLY
  it("should handle empty cart gracefully", async () => {
    // Mock empty cart and products data
    const cartData = [];
    const productsData = []; // Mock empty products data for this test

    // Mock API responses
    fetchMock.getOnce("http://localhost:4002/cart", { body: cartData });
    fetchMock.getOnce("http://localhost:4002/products", { body: productsData });

    // Create a new div element with a table and tbody
    const el = await fixture(
      html`<div>
        <table id="shopping-cart-tbl">
          <tbody></tbody>
        </table>
      </div>`
    );
    // Initialize the view
    await View.init();

    // Wait for the table to be populated
    expect(el.querySelector("tbody").innerHTML).to.be.empty;
  });
});
