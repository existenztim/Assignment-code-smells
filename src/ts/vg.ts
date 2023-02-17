/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  const copiedList: Product[] = [...products];

  switch (sort) {
    case Sort.PRICE_ASCENDING:
      return sortList("Price", copiedList).reverse();
     
    case Sort.PRICE_DECENDING:
      return sortList("Price", copiedList);
      
    case Sort.NAME_ALPHABETIC:
      return sortList("Name", copiedList);
      
    case Sort.NAME_ALPHABETIC_REVERSE:
      return sortList("Name", copiedList).reverse();
      
  }
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (whichAttribute === "Price") {
      return p2.price - p1.price
    } else {
      if (p1.name > p2.name) {
        return 1;
      } else if (p1.name < p2.name) {
        return -1;
      }
      return 0;
    }
  });
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */

class Cart {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToCart(i: number) {}
}
export const cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export const productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProduct() {
  updateFloatingCart();
  createBaseHtml();
  saveUpdatedList();
}

function createBaseHtml() {
  for (let i = 0; i < productList.length; i++) {
    const dogProduct: HTMLDivElement = document.createElement("div");
    dogProduct.className = "dog-product";

    const dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dog-img-container";
    dogProduct.appendChild(dogImgContainer);

    const dogImg: HTMLImageElement = document.createElement("img");
    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;
    dogImgContainer.appendChild(dogImg);
    
    const cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cart-symbol-container";
    dogImgContainer.appendChild(cartSymbolContainer);

    const cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    createTitleAndParagraph(i, dogProduct);

    productList[i].productSpec = false;

    addHoverEventListeners(dogImg, cartSymbolContainer);
    addClickEventListeners(dogImg, i, cartSymbol);

    if (productList[i].category === "sassy") {
      const sassyCategory: HTMLElement = document.getElementById(productList[i].category) as HTMLElement;
      sassyCategory.appendChild(dogProduct);
    }
    if (productList[i].category === "kriminella") {
      const kriminellaCategory: HTMLElement = document.getElementById(productList[i].category) as HTMLElement;
      kriminellaCategory.appendChild(dogProduct);
    } 
    if (productList[i].category === "singlar") {
      const singlarCategory: HTMLElement = document.getElementById(productList[i].category) as HTMLElement;
      singlarCategory.appendChild(dogProduct);
    } 
    if (productList[i].category === "puppy") {
      const puppyCategory: HTMLElement = document.getElementById(productList[i].category) as HTMLElement;
      puppyCategory.appendChild(dogProduct);
    } 
    if (productList[i].category === "oldies") {
      const oldiesCategory:HTMLElement = document.getElementById(productList[i].category) as HTMLElement; 
      oldiesCategory.appendChild(dogProduct);
    }
  }
}

function createTitleAndParagraph(i: number, dogProduct: HTMLDivElement) {
  const name: HTMLHeadingElement = document.createElement("h5");
  name.innerHTML = productList[i].name;
  dogProduct.appendChild(name);

  const price: HTMLParagraphElement = document.createElement("p");
  price.innerHTML = "$" + productList[i].price;
  dogProduct.appendChild(price);

  const info: HTMLParagraphElement = document.createElement("p");
  info.innerHTML = productList[i].info;
  dogProduct.appendChild(info);
}

function addClickEventListeners(dogImg: HTMLImageElement, i: number, cartSymbol: HTMLElement) {
  dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      const typeConvertedProducts = JSON.stringify(productList);
      localStorage.setItem("savedList", typeConvertedProducts);
  });

  cartSymbol.addEventListener("click", () => {
      const cart = new Cart();
      cart.addToCart(i);
  });
}

function addHoverEventListeners(dogImg: HTMLImageElement, cartSymbolContainer: HTMLDivElement) {
  dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
  });

  dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
  });
}

function updateFloatingCart() {
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
      quantity += cartList[i].quantity;
  }
  const floatingCart = document.getElementById("floating-cart-number") as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
}

function saveUpdatedList() {
  const convertedProducts = JSON.stringify(productList);
  localStorage.setItem("savedList", convertedProducts);
  sessionStorage.clear();
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getFromStorage() {
  const fromStorage: string = localStorage.getItem("cartArray") || "";
  const cartProducts: CartProduct[] = JSON.parse(fromStorage);

  createCheckoutTable(cartProducts);
}

function createCheckoutTable(cartProducts: CartProduct[]) {
  const amountContainer = document.getElementById("amount-checkout-container") as HTMLDivElement;

  const amountText: HTMLTableCellElement = document.createElement("th");
  amountContainer.appendChild(amountText);
  amountText.innerHTML = "amount:";

  const titleContainer = document.getElementById("title-container") as HTMLTableRowElement;
  titleContainer.innerHTML = /*html*/ `
    <strong>products:</strong>`;

  const productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;

  const quantityHeader: HTMLTableCellElement = document.createElement("th");
  productQuantity.appendChild(quantityHeader);
  quantityHeader.innerHTML = "change quantity:";

  const checkoutTotal = document.getElementById("title-total") as HTMLTableCellElement;

  const totalText: HTMLTableCellElement = document.createElement("th");
  checkoutTotal.appendChild(totalText);
  totalText.innerHTML = "total:";

  createCartElements(cartProducts, titleContainer, amountContainer, productQuantity);
  calculateTotalPrice(cartProducts, checkoutTotal);
}

function createCartElements(cartProducts: CartProduct[], titleContainer: HTMLTableRowElement, amountContainer: HTMLDivElement, productQuantity: HTMLTableRowElement) {
  for (let i = 0; i < cartProducts.length; i++) {
    const productName: HTMLTableCellElement = document.createElement("th");
    titleContainer.appendChild(productName);
    productName.innerHTML = cartProducts[i].name;
    productName.className = "hej";

    const amountText: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(amountText);
    amountText.innerHTML = "x" + cartProducts[i].amount;
    amountText.className = "hej";

    const amountQuantity: HTMLTableCellElement = document.createElement("th");
    productQuantity.appendChild(amountQuantity);

    const amountPlusBtn: HTMLButtonElement = document.createElement("button");
    amountQuantity.appendChild(amountPlusBtn);
    amountQuantity.className = "hej";

    const minusIcon: HTMLSpanElement = document.createElement("i");
    amountPlusBtn.appendChild(minusIcon);

    minusIcon.className = "fas fa-minus";
    amountPlusBtn.className = "plus-btn";

    const plusIcon: HTMLSpanElement = document.createElement("i");
    plusIcon.className = "fas fa-plus";

    const amountMinusBtn: HTMLButtonElement = document.createElement("button");
    amountQuantity.appendChild(amountMinusBtn);
    amountMinusBtn.appendChild(plusIcon);
    amountMinusBtn.className = "minus-btn";
  }
}

function calculateTotalPrice(cartProducts: CartProduct[], checkoutTotal: HTMLTableCellElement) {
  const addition = cartProducts.reduce((accumulator, current) =>{
    return accumulator + current.price * current.amount;
  }, 0);

  const totalPrice: HTMLTableCellElement = document.createElement("th");
  checkoutTotal.appendChild( totalPrice);
  totalPrice.innerHTML = addition + "$";
  totalPrice.id = "total-in-center";
}

