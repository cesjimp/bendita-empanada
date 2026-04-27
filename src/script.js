// Variables globales
let allProducts = [], currentCategory = 'todos', currentPage = 1;
const ITEMS_DESKTOP = 8, ITEMS_MOBILE = 6;

// Detectar si es mobile
function isMobile() {
  return window.innerWidth < 768;
}

// Obtener items por página según viewport
function getItemsPerPage() {
  return isMobile() ? ITEMS_MOBILE : ITEMS_DESKTOP;
}

// Carousel setup
function setupCarousel(id, autoSpeed = 0.4) {
  const slider = document.getElementById(id);
  let isDown = false, startX, scrollLeft, isAutoScrolling = true, preciseScroll = 0;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    isAutoScrolling = false;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => { isDown = false; isAutoScrolling = true; });
  slider.addEventListener('mouseup', () => { isDown = false; isAutoScrolling = true; });

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = 2 * (x - startX);
    slider.scrollLeft = scrollLeft - walk;
    preciseScroll = slider.scrollLeft;
  });

  slider.addEventListener('scroll', () => {
    if (slider.scrollLeft <= 5) {
      slider.scrollLeft = slider.scrollWidth / 3;
      preciseScroll = slider.scrollLeft;
    } else if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) {
      slider.scrollLeft = slider.scrollWidth / 3;
      preciseScroll = slider.scrollLeft;
    }
  });

  function animate() {
    if (isAutoScrolling && !isDown) {
      preciseScroll += autoSpeed;
      slider.scrollLeft = preciseScroll;
      if (Math.abs(slider.scrollLeft - preciseScroll) > 10) {
        preciseScroll = slider.scrollLeft;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
  setTimeout(() => {
    slider.scrollLeft = slider.scrollWidth / 3;
    preciseScroll = slider.scrollLeft;
  }, 1000);

  return { pause: () => { isAutoScrolling = false; setTimeout(() => { isAutoScrolling = true; }, 5000); } };
}

let comboCarousel, reviewCarousel;

// Hero slider
const slides = document.querySelectorAll('.slider-img');
const indicators = document.querySelectorAll('.slider-indicator');
let currentSlide = 0;

function updateSlide(newSlide) {
  slides[currentSlide].classList.replace('active-slider', 'hidden-slider');
  indicators[currentSlide].classList.remove('active');
  indicators[currentSlide].setAttribute('aria-selected', 'false');
  currentSlide = newSlide % slides.length;
  slides[currentSlide].classList.replace('hidden-slider', 'active-slider');
  indicators[currentSlide].classList.add('active');
  indicators[currentSlide].setAttribute('aria-selected', 'true');
}

if (slides.length > 0) {
  setInterval(() => { updateSlide(currentSlide + 1); }, 5000);
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => { updateSlide(index); });
  });
}

// Cargar datos
function loadBenditaData() {
  const benditaData = {
    products: [
      { Nombre: "Pollo Champiñón-Queso", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de pollo, queso, champiñón y especias.", Precio: "2.800", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/hero.png", Activo: "Sí" },
      { Nombre: "Pollo Trigo", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de pollo desmechado y especias naturales.", Precio: "2.700", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/pollo-real.jpg", Activo: "Sí" },
      { Nombre: "Ranchera Gourmet", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de carne de res molida, cabano, jamón y maíz tierno.", Precio: "2.500", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/carne-real.jpg", Activo: "Sí" },
      { Nombre: "Hawaiana Gourmet", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de jamón premium, queso y piña.", Precio: "2.700", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/hero_2.png", Activo: "Sí" },
      { Nombre: "Casera", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de arroz, res, pollo y especias.", Precio: "2.400", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/hero.png", Activo: "Sí" },
      { Nombre: "Argentina", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de carne de res molida premium y uvas pasas.", Precio: "2.500", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/carne-real.jpg", Activo: "Sí" },
      { Nombre: "Vegetariana Gourmet", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de espinaca, zuquini, pimentón y maíz tierno.", Precio: "2.600", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/hero_3.png", Activo: "Sí" },
      { Nombre: "Ricotta con Espinaca", Descripción: "Empanada HORNEADA en masa fina de trigo de color dorado delicioso, rellena de espinaca fresca y queso ricotta.", Precio: "2.600", Categoría: "Horneadas - Trigo Gourmet", Imagen_URL: "assets/queso-real.jpg", Activo: "Sí" },
      { Nombre: "Carne Clásica", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de carne de res molida.", Precio: "2.300", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/carne-real.jpg", Activo: "Sí" },
      { Nombre: "Pollo Clásico", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de pollo desmechado criollo.", Precio: "2.300", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/pollo-real.jpg", Activo: "Sí" },
      { Nombre: "Mixta Pollo Carne", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de res y pollo seleccionados.", Precio: "2.500", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/hero.png", Activo: "Sí" },
      { Nombre: "Ranchera Clásica", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de chorizo parrillero, maíz y queso.", Precio: "2.600", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/carne-real.jpg", Activo: "Sí" },
      { Nombre: "Suiza", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de queso suizo y champiñones.", Precio: "2.600", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/queso-real.jpg", Activo: "Sí" },
      { Nombre: "Vegetariana Clásica", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de mix de vegetales frescos.", Precio: "2.300", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/hero_3.png", Activo: "Sí" },
      { Nombre: "Hawaiana Clásica", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de jamón premium y piña calada.", Precio: "2.400", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/hero_2.png", Activo: "Sí" },
      { Nombre: "Pollo Champiñón Clásico", Descripción: "Empanada en masa de harina de trigo FRITA en su punto para dar suavidad y textura, con generoso relleno de pollo y champiñones frescos.", Precio: "2.500", Categoría: "Fritas - Trigo Clásicas", Imagen_URL: "assets/pollo-real.jpg", Activo: "Sí" },
      { Nombre: "Carne Maíz (100g)", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de carne de res molida y papa.", Precio: "2.500", Categoría: "Fritas - Maíz", Imagen_URL: "assets/carne-real.jpg", Activo: "Sí" },
      { Nombre: "Pollo Maíz (100g)", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de pollo desmechado y papa.", Precio: "2.600", Categoría: "Fritas - Maíz", Imagen_URL: "assets/pollo-real.jpg", Activo: "Sí" },
      { Nombre: "Arepa de Huevo", Descripción: "Masa de maíz recién molido FRITA para dar el crunch bendito, con un huevo frito entero perfecto en su interior.", Precio: "2.800", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero_2.png", Activo: "Sí" },
      { Nombre: "Criolla", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de res, papa y huevo cocido.", Precio: "2.600", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero.png", Activo: "Sí" },
      { Nombre: "Papa-Pollo (140g)", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de abundante puré de papa y pollo.", Precio: "2.400", Categoría: "Fritas - Maíz", Imagen_URL: "assets/pollo-real.jpg", Activo: "Sí" },
      { Nombre: "Papa-Carne (140g)", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de abundante puré de papa y carne.", Precio: "2.400", Categoría: "Fritas - Maíz", Imagen_URL: "assets/carne-real.jpg", Activo: "Sí" },
      { Nombre: "Queso Maíz", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de queso doble crema fundido.", Precio: "2.600", Categoría: "Fritas - Maíz", Imagen_URL: "assets/queso-real.jpg", Activo: "Sí" },
      { Nombre: "Queso y Bocadillo", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de queso y dulce de guayaba.", Precio: "2.600", Categoría: "Fritas - Maíz", Imagen_URL: "assets/queso-real.jpg", Activo: "Sí" },
      { Nombre: "Hawaiana Maíz", Descripción: "Empanada en masa de maíz recién molido FRITA para dar el crunch bendito, rellena de jamón, queso y piña.", Precio: "2.600", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero_2.png", Activo: "Sí" },
      { Nombre: "Coctelera Papa Pollo/Carne (30g)", Descripción: "Mini empanada de maíz FRITA con el crunch bendito, ideal para eventos (30g), rellena de papa y pollo o carne.", Precio: "1.300", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero_3.png", Activo: "Sí" },
      { Nombre: "Coctelera Papa Pollo/Carne (50g)", Descripción: "Mini empanada de maíz FRITA con el crunch bendito, ideal para eventos (50g), rellena de papa y pollo o carne.", Precio: "1.900", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero_3.png", Activo: "Sí" },
      { Nombre: "Coctelera Queso (30g)", Descripción: "Mini empanada de maíz FRITA de queso con el crunch bendito, ideal para eventos (30g).", Precio: "1.500", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero_3.png", Activo: "Sí" },
      { Nombre: "Coctelera Queso (50g)", Descripción: "Mini empanada de maíz FRITA de queso con el crunch bendito, ideal para eventos (50g).", Precio: "2.000", Categoría: "Fritas - Maíz", Imagen_URL: "assets/hero_3.png", Activo: "Sí" },
      { Nombre: "Salsa Bendita (8 Oz)", Descripción: "Nuestra salsa secreta artesanal de la casa, en presentación de 8 onzas.", Precio: "5.000", Categoría: "Salsas", Imagen_URL: "assets/hero_2.png", Activo: "Sí" },
      { Nombre: "Salsa Bendita (12 Oz)", Descripción: "Nuestra salsa secreta artesanal de la casa, en presentación de 12 onzas.", Precio: "5.500", Categoría: "Salsas", Imagen_URL: "assets/hero_2.png", Activo: "Sí" }
    ],
    combos: [
      { Nombre: "BENDITO DUO", Descripción: "12 Empanadas Clásicas + 2 Bebidas", Precio_Oferta: "42.000", Precio_Original: "48.000", Imagen_URL: "assets/combo_duo.png", Activo: "Sí" },
      { Nombre: "BENDITA FAMILIA", Descripción: "24 Empanadas Variadas + Bebida 1.5L", Precio_Oferta: "79.000", Precio_Original: "90.000", Imagen_URL: "assets/combo_familiar.png", Activo: "Sí" },
      { Nombre: "BENDITO EVENTO", Descripción: "50 Empanadas Mixtas para reuniones", Precio_Oferta: "145.000", Precio_Original: "165.000", Imagen_URL: "assets/combo_fiesta.png", Activo: "Sí" }
    ],
    reviews: [
      { text: "La masa es de otro mundo, se nota la diferencia artesanal.", user: "Camila R." },
      { text: "El combo familiar nos salvó la cena. Calidad premium.", user: "Andrés M." },
      { text: "La de manzana es una bendición literal. Muy recomendadas.", user: "Sofía G." }
    ]
  };

  allProducts = benditaData.products || [];
  renderCategories(allProducts);
  renderProducts(allProducts);
  renderCombos(benditaData.combos || []);
  renderReviews(benditaData.reviews || []);
  comboCarousel = setupCarousel('combo-grid', 0.4);
  reviewCarousel = setupCarousel('review-grid', 0.3);
}

// Render categories
function renderCategories(products) {
  const categories = ['todos', ...new Set(products.map(p => p.Categoría))];
  document.getElementById('category-filters').innerHTML = categories
    .map(cat => `<button onclick="filterCategory('${cat}')" class="px-4 md:px-8 py-2 md:py-3 rounded-full font-brand-bold text-[8px] md:text-[10px] tracking-widest uppercase transition-all ${currentCategory === cat ? 'bg-primary text-white shadow-xl' : 'bg-white text-zinc-400 hover:text-primary border border-zinc-100'}">${cat}</button>`)
    .join('');
}

// Filter by category
function filterCategory(cat) {
  currentCategory = cat;
  currentPage = 1; // Reset to page 1
  renderCategories(allProducts);
  const filtered = cat === 'todos' ? allProducts : allProducts.filter(p => p.Categoría === cat);
  renderProducts(filtered);
}

// Search products
function searchProducts(query) {
  const q = query.toLowerCase();
  currentPage = 1; // Reset to page 1
  const filtered = allProducts.filter(p =>
    (p.Nombre.toLowerCase().includes(q) || p.Descripción.toLowerCase().includes(q)) &&
    (currentCategory === 'todos' || p.Categoría === currentCategory)
  );
  renderProducts(filtered);
}

document.getElementById('product-search').addEventListener('input', e => searchProducts(e.target.value));

// Render products with pagination
function renderProducts(items) {
  const active = items.filter(i => i.Activo === 'Sí');
  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(active.length / itemsPerPage);

  // Ensure current page is valid
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  // Calculate slice
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageItems = active.slice(startIdx, endIdx);

  // Render grid
  const grid = document.getElementById('product-grid');
  grid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10';
  grid.innerHTML = pageItems
    .map(p => `<div class="flex flex-col items-center text-center space-y-4 group"><div class="relative w-full aspect-square image-rounded bg-zinc-50 overflow-hidden mb-2"><img src="${p.Imagen_URL || 'assets/carne.png'}" alt="Empanada de ${p.Nombre} - Bendita Artesanal" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"></div><h3 class="font-brand-bold text-lg md:text-xl text-primary uppercase leading-tight px-2">${p.Nombre}</h3><p class="text-zinc-400 text-[10px] md:text-xs leading-relaxed max-w-[200px] hidden md:block">${p.Descripción}</p><p class="text-zinc-600 font-brand-bold text-sm md:text-md tracking-tighter">$${p.Precio} C/U</p></div>`)
    .join('');

  // Render pagination
  renderPagination(totalPages, active.length, itemsPerPage);
}

// Render pagination controls
function renderPagination(totalPages, totalItems, itemsPerPage) {
  const paginationContainer = document.getElementById('pagination-controls');
  if (!paginationContainer) return;

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  const prevBtn = currentPage > 1
    ? `<button onclick="goToPage(${currentPage - 1})" class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-full font-brand-bold text-sm md:text-base hover:shadow-lg hover:scale-110 transition-all" aria-label="Página anterior">&lt;</button>`
    : `<button disabled class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-zinc-200 text-zinc-400 rounded-full font-brand-bold text-sm md:text-base cursor-not-allowed" aria-label="Página anterior deshabilitada">&lt;</button>`;

  const nextBtn = currentPage < totalPages
    ? `<button onclick="goToPage(${currentPage + 1})" class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-full font-brand-bold text-sm md:text-base hover:shadow-lg hover:scale-110 transition-all" aria-label="Página siguiente">&gt;</button>`
    : `<button disabled class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-zinc-200 text-zinc-400 rounded-full font-brand-bold text-sm md:text-base cursor-not-allowed" aria-label="Página siguiente deshabilitada">&gt;</button>`;

  paginationContainer.innerHTML = `<div class="flex items-center justify-center gap-4 md:gap-6 py-8 md:py-12">${prevBtn}<span class="text-zinc-500 font-brand-bold text-xs md:text-sm">Página ${currentPage} de ${totalPages}</span>${nextBtn}</div>`;
}

// Go to page
function goToPage(page) {
  currentPage = page;
  document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });

  // Re-render with current filter
  const filtered = currentCategory === 'todos' ? allProducts : allProducts.filter(p => p.Categoría === currentCategory);
  renderProducts(filtered);
}

// Handle window resize to update pagination on viewport change
window.addEventListener('resize', () => {
  const filtered = currentCategory === 'todos' ? allProducts : allProducts.filter(p => p.Categoría === currentCategory);
  renderProducts(filtered);
});

// Render combos
function renderCombos(items) {
  const grid = document.getElementById('combo-grid');
  const fallbackMap = {
    duo: 'assets/combo_duo.png',
    familia: 'assets/combo_familiar.png',
    fiesta: 'assets/combo_fiesta.png',
    evento: 'assets/combo_fiesta.png',
    individual: 'assets/combo_individual.png',
    bocado: 'assets/combo_individual.png',
    ronda: 'assets/combo_ronda.png',
    degusta: 'assets/combo_ronda.png'
  };

  const itemsTriplicated = [...items, ...items, ...items];
  grid.innerHTML = itemsTriplicated
    .filter(i => i.Activo === 'Sí')
    .map(c => {
      const nameLower = (c.Nombre || '').toLowerCase();
      let fallbackImg = 'assets/combo_duo.png';
      for (const key in fallbackMap) {
        if (nameLower.includes(key)) {
          fallbackImg = fallbackMap[key];
          break;
        }
      }
      return `<div class="shrink-0 w-[260px] md:w-[330px] bg-white image-rounded overflow-hidden border border-zinc-100 hover:shadow-2xl transition-all group/combo"><div class="relative h-40 md:h-52 overflow-hidden"><img src="${c.Imagen_URL || fallbackImg}" alt="${c.Nombre} - Combo Bendita Empanada" loading="lazy" class="w-full h-full object-cover group-hover/combo:scale-105 transition-transform duration-1000"><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div></div><div class="p-6 md:p-8 space-y-4 md:space-y-6 flex flex-col items-center"><h3 class="font-brand-bold text-lg md:text-2xl text-primary uppercase text-center leading-none">${c.Nombre}</h3><p class="text-zinc-400 text-[9px] md:text-xs text-center min-h-[30px] md:min-h-[36px] leading-relaxed">${c.Descripción}</p><div class="text-center bg-orange-50/50 px-6 md:px-8 py-3 md:py-4 rounded-3xl border border-orange-100/50 w-full max-w-[200px]"><p class="text-zinc-500 line-through text-[9px] md:text-xs font-brand-bold tracking-widest mb-1">$${c.Precio_Original}</p><p class="text-primary font-brand-bold text-3xl md:text-5xl tracking-tighter leading-none">$${c.Precio_Oferta}</p></div><button class="btn-primary w-full py-4 md:py-5" aria-label="Pedir este combo de empanadas">PEDIR COMBO</button></div></div>`;
    })
    .join('');
}

// Render reviews
function renderReviews(items) {
  const grid = document.getElementById('review-grid');
  const itemsTriplicated = [...items, ...items, ...items];
  grid.innerHTML = itemsTriplicated
    .map((r, index) => {
      const isOrange = index % 2 !== 0;
      return `<div class="shrink-0 w-[300px] md:w-[350px] p-8 md:p-12 image-rounded space-y-4 md:space-y-6 transition-all duration-500 hover:scale-105 ${isOrange ? 'bg-primary text-white shadow-2xl shadow-orange-500/20' : 'bg-white text-zinc-900 border border-zinc-100 shadow-xl shadow-black/5'}"><div class="flex gap-1 mb-2 md:mb-4 ${isOrange ? 'text-white' : 'text-primary'}"><span class="material-symbols-outlined text-xs">star</span><span class="material-symbols-outlined text-xs">star</span><span class="material-symbols-outlined text-xs">star</span><span class="material-symbols-outlined text-xs">star</span><span class="material-symbols-outlined text-xs">star</span></div><p class="text-lg md:text-xl italic leading-relaxed font-brand-regular">"${r.text}"</p><div class="pt-6 md:pt-8 border-t ${isOrange ? 'border-white/20' : 'border-zinc-100'} not-italic"><p class="font-brand-bold text-xs md:text-sm tracking-[0.3em] uppercase">${r.user}</p><p class="text-[8px] md:text-[9px] uppercase opacity-50 tracking-widest">Bendito Cliente</p></div></div>`;
    })
    .join('');
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const menuBtn = document.querySelector('[aria-controls="mobile-menu"]');

  if (menu && overlay) {
    const isOpen = menu.classList.toggle('mobile-menu-active');
    overlay.classList.toggle('overlay-active');
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        setTimeout(() => {
          const firstLink = menu.querySelector('a[href]');
          if (firstLink) firstLink.focus();
        }, 100);
      } else {
        menuBtn.focus();
      }
    }
  }
}

// Escape key closes menu
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (menu && menu.classList.contains('mobile-menu-active')) {
      toggleMobileMenu();
    }
  }
});

// Navigate and toggle menu
function navigateAndToggle(e, target) {
  e.preventDefault();
  const element = document.querySelector(target);
  if (element) {
    toggleMobileMenu();
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
}

// Scroll grid
function scrollGrid(val) {
  comboCarousel.pause();
  document.getElementById('combo-grid').scrollBy({ left: val, behavior: 'smooth' });
}

// Init
window.addEventListener('load', loadBenditaData);
