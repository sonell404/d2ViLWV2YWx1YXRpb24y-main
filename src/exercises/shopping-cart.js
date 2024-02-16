/*
 * Shopping Cart Requirements:
 * - Before you start, please run `npm run start:api` to start mock API server
 * - data for mock APIs come from ./db/db.json
 * - There are 2 APIs you need to call:
 *     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
 *     - http://localhost:4002/products : this will provide a list of products with full details
 *
 * We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
 * product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
 * inside table#shopping-cart-tbl as below:
 * ID     Item
 * 1001   TV
 * 1002   iPad
 *
 * */

const View = {
  init: async () => {
    // Get the table body element
    const tbodyElem = document
      .getElementById("shopping-cart-tbl")
      .querySelector("tbody");

    // Check if there's an existing cart in local storage
    let productIds = [];
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      productIds = JSON.parse(storedCart);
    } else {
      // Fetch product IDs from cart API if not found in local storage
      const cartResponse = await fetch("http://localhost:4002/cart");
      const cartData = await cartResponse.json();
      productIds = cartData.map((item) => item.id);
    }

    // Fetch product details from products API
    const productsResponse = await fetch("http://localhost:4002/products");
    const productsData = await productsResponse.json();

    // Populate the table with product IDs and names
    productIds.forEach((productId) => {
      // Find the product with the given ID
      const product = productsData.find((product) => product.id === productId);
      // If the product is found, add it to the table
      if (product) {
        // Create a new row and cells for the product ID and name
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        // Add relevant aria attributes to the cells
        idCell.setAttribute("aria-label", product.id);
        nameCell.setAttribute("aria-label", product.name);

        // Set the text content of the cells
        idCell.textContent = productId;
        nameCell.textContent = product.name;

        // Append the cells to the row and the row to the table body
        row.appendChild(idCell);
        row.appendChild(nameCell);
        tbodyElem.appendChild(row);
      }
    });

    // Save cart to local storage
    localStorage.setItem("cart", JSON.stringify(productIds));
  },
};

document.addEventListener("DOMContentLoaded", View.init);

// default export
export default View;
