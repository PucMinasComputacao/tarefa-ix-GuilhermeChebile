const data = {
  produtos: [

    {
      id: 1,

      nome: "iPhone 14",

      preco: 5999.90,

      categoria: "Celulares",

      imagem: "../images/iphone14.jpg",

      descricao: "Smartphone Apple com excelente desempenho e câmera avançada.",

      emEstoque: true
    },

    {
      id: 2,

      nome: "Samsung Galaxy S23",

      preco: 4299.90,

      categoria: "Celulares",

      imagem: "../images/s23.png",

      descricao: "Celular Samsung com tela AMOLED e alta performance.",

      emEstoque: true
    },

    {
      id: 3,

      nome: "Notebook Dell Inspiron",

      preco: 3899.90,

      categoria: "Notebooks",

      imagem: "../images/dell-inspiron.jpg",

      descricao: "Notebook ideal para estudos, trabalho e uso diário.",

      emEstoque: true
    },

    {
      id: 4,

      nome: "MacBook Air M2",

      preco: 8999.90,

      categoria: "Notebooks",

      imagem: "../images/macbook-m2.webp",

      descricao: "Notebook Apple leve, rápido e com bateria de longa duração.",

      emEstoque: false
    },

    {
      id: 5,

      nome: "Mouse Gamer RGB",

      preco: 149.90,

      categoria: "Acessórios",

      imagem: "../images/mousergb.jpeg",

      descricao: "Mouse gamer com iluminação RGB e alta precisão.",

      emEstoque: true
    },

    {
      id: 6,

      nome: "Teclado Mecânico",

      preco: 299.90,

      categoria: "Acessórios",

      imagem: "../images/teclado-mecanico.webp",

      descricao: "Teclado mecânico resistente com switches rápidos.",

      emEstoque: false
    },

    {
      id: 7,

      nome: "PlayStation 5",

      preco: 4499.90,

      categoria: "Games",

      imagem: "../images/ps5.webp",

      descricao: "Console da Sony com gráficos de nova geração.",

      emEstoque: true
    },

    {
      id: 8,

      nome: "Xbox Series X",

      preco: 4399.90,

      categoria: "Games",

      imagem: "../images/xbox.webp",

      descricao: "Console Microsoft com alto desempenho e SSD ultrarrápido.",

      emEstoque: true
    }

  ]
};

const productListElement = document.getElementById("product-list");
const productDetailsElement = document.getElementById("product-details");

const searchInputElement = document.querySelector("#search");
const categorySelectElement = document.querySelector("#category");
const renderButtonElement = document.querySelector("#btnRender");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
  const productCardElement = document.createElement("div");
  productCardElement.classList.add("card");
  productCardElement.setAttribute("data-id", produto.id);

  productCardElement.style.transition = "0.3s";

  const productImageElement = document.createElement("img");
  productImageElement.setAttribute("src", produto.imagem);
  productImageElement.setAttribute("alt", produto.nome);

  const productNameElement = document.createElement("h2");
  productNameElement.classList.add("card-title");
  productNameElement.innerText = produto.nome;

  const productPriceElement = document.createElement("p");
  productPriceElement.classList.add("card-price");
  productPriceElement.innerText = formatPrice(produto.preco);

  const productCategoryElement = document.createElement("p");
  productCategoryElement.classList.add("card-category");
  productCategoryElement.innerText = `Categoria: ${produto.categoria}`;

  const detailsButtonElement = document.createElement("button");
  detailsButtonElement.innerText = "Ver detalhes";

  detailsButtonElement.addEventListener("click", function () {
    showProductDetails(produto);
  });

  const highlightButtonElement = document.createElement("button");
  highlightButtonElement.innerText = "Destacar";

  highlightButtonElement.addEventListener("click", function () {
    productCardElement.classList.toggle("highlight");
  });

  productCardElement.appendChild(productImageElement);
  productCardElement.appendChild(productNameElement);
  productCardElement.appendChild(productPriceElement);
  productCardElement.appendChild(productCategoryElement);
  productCardElement.appendChild(detailsButtonElement);
  productCardElement.appendChild(highlightButtonElement);

  return productCardElement;
}

function renderProducts(produtos) {
  productListElement.innerHTML = "";

  produtos.forEach(function (produto) {
    const productCardElement = createProductCard(produto);
    productListElement.appendChild(productCardElement);
  });

  const allProductCards = document.querySelectorAll(".card");

  allProductCards.forEach(function (card) {
    console.log("Card renderizado com ID:", card.getAttribute("data-id"));
    card.style.cursor = "default";
  });
}

function renderCategories() {
  categorySelectElement.innerHTML = "";

  const allOptionElement = document.createElement("option");
  allOptionElement.value = "Todas";
  allOptionElement.innerText = "Todas";

  categorySelectElement.appendChild(allOptionElement);

  const productCategories = data.produtos.map(function (produto) {
    return produto.categoria;
  });

  const uniqueCategories = [...new Set(productCategories)];

  uniqueCategories.forEach(function (categoria) {
    const categoryOptionElement = document.createElement("option");

    categoryOptionElement.value = categoria;
    categoryOptionElement.innerText = categoria;

    categorySelectElement.appendChild(categoryOptionElement);
  });
}

function showProductDetails(produto) {
  const stockStatus = produto.emEstoque ? "Em estoque" : "Fora de estoque";

  productDetailsElement.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${stockStatus}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const searchedText = searchInputElement.value.toLowerCase();
  const selectedCategory = categorySelectElement.value;

  const filteredProducts = data.produtos.filter(function (produto) {
    const productNameMatchesSearch = produto.nome.toLowerCase().includes(searchedText);

    const productCategoryMatchesSelection =
      selectedCategory === "Todas" || produto.categoria === selectedCategory;

    return productNameMatchesSearch && productCategoryMatchesSelection;
  });

  return filteredProducts;
}

searchInputElement.addEventListener("input", function () {
  const filteredProducts = filterProducts();
  renderProducts(filteredProducts);
});

categorySelectElement.addEventListener("change", function () {
  const filteredProducts = filterProducts();
  renderProducts(filteredProducts);
});

renderButtonElement.addEventListener("click", function () {
  const filteredProducts = filterProducts();
  renderProducts(filteredProducts);
});

renderCategories();
renderProducts(data.produtos);