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
  const copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = [];
  if (sort === Sort.PRICE_ASCENDING) {
    sortedList = sortList("Price", copiedList);
    sortedList.reverse();
  } else if (sort === Sort.PRICE_DECENDING) {
    sortedList = sortList("Price", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC) {
    sortedList = sortList("Name", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
    sortedList = sortList("Name", copiedList);
    sortedList.reverse();
  }

  return sortedList;
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (whichAttribute === "Price") {
      if (p1.price < p2.price) {
        return 1;
      } else if (p1.price > p2.price) {
        return -1;
      }
      return 0;
    } else {
      if (p1.name < p2.name) {
        return 1;
      } else if (p1.name > p2.name) {
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
  addToCart(i: number) {}
}
export const cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export const productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  updateFloatingCart();
  createProductElement();
  saveUpdatedList();
}

function createProductElement() {
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

    const name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogProduct.appendChild(name);

    const price: HTMLParagraphElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogProduct.appendChild(price);

    const info: HTMLParagraphElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogProduct.appendChild(info);

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
  const typeConvertedProducts = JSON.stringify(productList);
  localStorage.setItem("savedList", typeConvertedProducts);
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

function getfromstorage() {
  const container = document.getElementById("checkout-table");

  const fromstorage: string = localStorage.getItem("cartArray") || "";
  const astext: CartProduct[] = JSON.parse(fromstorage);

  const productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  const amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  const amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  const titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  const productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  const qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  const checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  const totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i = 0; i < astext.length; i++) {
    const productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    const amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    const amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    const amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    const icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    const icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    const amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  const totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
