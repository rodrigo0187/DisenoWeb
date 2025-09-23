// ================= DATOS =================
const categories = [
  { id: 'ALL', name: 'Todos' },
  { id: 'JM', name: 'Juegos de Mesa' },
  { id: 'AC', name: 'Accesorios' },
  { id: 'CO', name: 'Consolas' },
  { id: 'CG', name: 'Computadores Gamers' },
  { id: 'SG', name: 'Sillas Gamers' },
  { id: 'MS', name: 'Mouse' },
  { id: 'MP', name: 'Mousepad' },
  { id: 'PP', name: 'Poleras Personalizadas' }
];

const products = [
  { code: 'JM001', category: 'JM', name: 'Catan', price: 29990, img: '../img/productos/catan.webp', desc: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos', details: ['Jugadores: 3-4', 'Edad: 10+', 'Duración: 60-120 min', 'Juego de comercio y construcción'] },
  { code: 'JM002', category: 'JM', name: 'Carcassonne', price: 24990, img: '../img/productos/carcassonne.jpg', desc: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.', details: ['Jugadores: 2-5', 'Edad: 8+', 'Duración: 35-45 min', 'Juego de colocación de losetas'] },
  { code: 'AC001', category: 'AC', name: 'Control Xbox Series', price: 59990, img: '../img/productos/xboxcontrol.jpg', desc: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC', details: ['Conexión: Inalámbrica', 'Compatibilidad: Xbox y PC', 'Batería: Recargable'] },
  { code: 'AC002', category: 'AC', name: 'HyperX Cloud II', price: 79990, img: '../img/productos/audifonos.png', desc: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.', details: ['Conexión: 3.5mm y USB', 'Micrófono: Desmontable', 'Compatibilidad: PC y Consolas'] },
  { code: 'CO001', category: 'CO', name: 'PlayStation 5', price: 549990, img: '../img/productos/play5.webp', desc: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.', details: ['Almacenamiento: 825GB SSD', 'Resolución: Hasta 4K', 'Color: Blanco', 'Compatibilidad con juegos PS4'] },
  { code: 'CG001', category: 'CG', name: 'PC Gamer ROG Strix', price: 1299990, img: '../img/productos/pcgamer.webp', desc: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.', details: ['CPU: Intel i7', 'RAM: 16GB', 'GPU: RTX 3070', 'Almacenamiento: 1TB SSD'] },
  { code: 'SG001', category: 'SG', name: 'Silla Secretlab Titan', price: 349990, img: '../img/productos/sillagamer.jpg', desc: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.', details: ['Altura ajustable', 'Reposabrazos 4D', 'Reclinable hasta 165°', 'Material: Cuero PU premium'] },
  { code: 'MS001', category: 'MS', name: 'Logitech G502 HERO', price: 49990, img: '../img/productos/mouse.webp', desc: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización', details: ['DPI: 100-16000', 'Botones programables: 11', 'Peso ajustable', 'Iluminación RGB'] },
  { code: 'MP001', category: 'MP', name: 'Razer Goliathus Ext.', price: 29990, img: '../img/productos/mousepad.webp', desc: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.', details: ['Tamaño: XL', 'Base antideslizante', 'Superficie de microtextura', 'Iluminación Chroma RGB'] },
  { code: 'PP001', category: 'PP', name: "Polera 'Level-Up'", price: 14990, img: '../img/productos/Polera.jpg', desc: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito', details: ['Material: Algodón 100%', 'Tallas: S, M, L, XL', 'Personalizable con tu nombre', 'Color: Negro'] }
];

// ================= VARIABLES =================
let cart = [];

// ================= LOCALSTORAGE =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const stored = localStorage.getItem("cart");
  cart = stored ? JSON.parse(stored) : [];
}

// ================= RENDER =================
function renderCategories() {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = categories.map((cat, i) =>
    `<button class="btn btn-gamer ${i === 0 ? 'active' : ''}" 
             onclick="filterProducts('${cat.id}', this)">${cat.name}</button>`
  ).join('');
}

function renderProducts(filter = "ALL") {
  const container = document.getElementById("product-list");
  const filtered = filter === "ALL" ? products : products.filter(p => p.category === filter);
  container.innerHTML = filtered.map(p => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h2 class="card-title">${p.name}</h2>
          <p class="card-text">${p.desc}</p>
          <p class="fw-bold">$${p.price.toLocaleString()}</p>
          <button class="btn btn-gamer mt-auto" onclick="addToCart('${p.code}')">Agregar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = cart.map(item => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h6>${item.name}</h6>
        <small>$${item.price.toLocaleString()} x ${item.qty}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${item.code}')">❌</button>
      </div>
    </li>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = total.toLocaleString();
}

// ================= ACCIONES CARRITO =================
function addToCart(code) {
  const product = products.find(p => p.code === code);
  if (!product) return;
  const item = cart.find(i => i.code === code);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
}

function removeFromCart(code) {
  cart = cart.filter(item => item.code !== code);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío ❌");
    return;
  }
  // simular pago
  alert(`✅ Gracias por tu compra! Total: $${cart.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}`);
  clearCart();
}

// ================= FILTRADO =================
function filterProducts(category, btn) {
  document.querySelectorAll("#category-list .btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderProducts(category);
}

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderCategories();
  renderProducts();
  renderCart();

  // Registrar listeners de los botones (asegura que existan)
  const clearBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");

  if (clearBtn) clearBtn.addEventListener("click", clearCart);
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
});
