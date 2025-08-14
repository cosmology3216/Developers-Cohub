// JS to enhance the UI

document.addEventListener("DOMContentLoaded", () => {
  // Scroll to top when clicking the ↑ in the footer flag
  const scrollTopBtn = document.querySelector(".footer-flag span");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Clickable footer headers
  document.querySelectorAll(".layout-footer h3").forEach(link => {
    link.addEventListener("click", () => {
      alert(`You clicked on: ${link.textContent}`);
    });
  });

  // Country flag clicks
  document.querySelectorAll(".country-service .country").forEach(flag => {
    flag.addEventListener("click", () => {
      alert(`Redirecting to: ${flag.querySelector("p").textContent}`);
    });
  });

  // Category product box clicks
  document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
      window.location.href = 'automobile.html';
    });
  });

  // Toggle view button (Grid/List icon)
  const toggleBtn = document.getElementById('toggleViewBtn');
  const productList = document.getElementById("productList");
  let gridOn = true;

  if (toggleBtn && productList) {
    toggleBtn.addEventListener('click', function () {
      gridOn = !gridOn;
      productList.classList.toggle("horizontal-view");
      productList.classList.toggle("vertical-view");

      this.innerHTML = gridOn
        ? '<i class="fa fa-th-large"></i>'
        : '<i class="fa fa-bars"></i>';
    });
  }

  // Newsletter Subscribe
  const subscribeBtn = document.getElementById("subscribeBtn");
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
      const email = document.getElementById("newsletterEmail").value;
      if (email) {
        alert(`Subscribed with ${email}!`);
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  // Breadcrumb clickable
  document.querySelectorAll('.crumb').forEach(item => {
    item.style.cursor = 'pointer';
    item.style.color = '#0073e6';
    item.addEventListener('click', function () {
      const link = item.getAttribute('data-link');
      if (link) window.location.href = link;
    });
  });

  // Search products
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const products = document.querySelectorAll("#productList .product");
      products.forEach(product => {
        const title = product.querySelector("h4").textContent.toLowerCase();
        product.style.display = title.includes(query) ? "flex" : "none";
      });
    });
  }

  // Filter apply button
  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", function () {
      const conditionBoxes = document.querySelectorAll(".condition:checked");
      const selectedConditions = Array.from(conditionBoxes).map(cb => cb.value);

      const ratingBoxes = document.querySelectorAll(".rating:checked");
      const selectedRatings = Array.from(ratingBoxes).map(cb => cb.value);

      const outputDiv = document.getElementById("output");
      outputDiv.innerHTML = `
        <p><strong>Selected Conditions:</strong> ${selectedConditions.join(", ") || "None"}</p>
        <p><strong>Selected Ratings:</strong> ${selectedRatings.join(", ") || "None"}</p>
      `;
    });
  }

  // Price Range Slider live update
  const priceSlider = document.getElementById('priceSlider');
  const selectedPrice = document.getElementById('selectedPrice');

  if (priceSlider && selectedPrice) {
    priceSlider.oninput = function () {
      selectedPrice.textContent = this.value;
    };
  }

  // Countdown Timer (4 hours)
  const timerDisplay = document.querySelector("#deal-timer");
  if (timerDisplay) {
    startCountdown(4 * 60 * 60, timerDisplay);
  }

  // Product render logic
  const products = [
    {
      name: "Canon Camera EOS 200D",
      price: 998,
      image: "https://via.placeholder.com/150",
      featured: true,
      verified: true,
    },
    {
      name: "GoPro HERO6 Action Camera",
      price: 899,
      image: "https://via.placeholder.com/150",
      featured: false,
      verified: true,
    },
    {
      name: "Smart Watch Black Edition",
      price: 299,
      image: "https://via.placeholder.com/150",
      featured: true,
      verified: false,
    },
    {
      name: "Wireless Headphones",
      price: 199,
      image: "https://via.placeholder.com/150",
      featured: false,
      verified: true,
    },
  ];

  function renderProducts(data) {
    const productContainer = document.querySelector(".products");
    if (!productContainer) return;

    // Remove old cards
    const allCards = document.querySelectorAll(".product-card");
    allCards.forEach(card => card.remove());

    data.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h4>${product.name}</h4>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p class="desc">Lorem ipsum dolor sit amet.</p>
          <a href="#">View details</a>
        </div>
      `;
      productContainer.appendChild(card);
    });
  }

  renderProducts(products);

  const applyBtn = document.querySelector(".apply-btn");
  const sortButtons = document.querySelectorAll(".sort-buttons button");

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const maxPrice = parseInt(priceSlider.value);
      const filtered = products.filter(p => p.price <= maxPrice);
      renderProducts(filtered);
    });
  }

  sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "Verified only") {
        const filtered = products.filter(p => p.verified);
        renderProducts(filtered);
      } else if (btn.textContent === "Featured") {
        const filtered = products.filter(p => p.featured);
        renderProducts(filtered);
      }
    });
  });

  // Horizontal category scroll
  const scrollCategories = (direction) => {
    const container = document.getElementById('categoryScroll');
    const scrollAmount = 150;
    if (container) {
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Assign scroll to buttons if needed
  const leftBtn = document.getElementById("scrollLeft");
  const rightBtn = document.getElementById("scrollRight");

  if (leftBtn) leftBtn.addEventListener("click", () => scrollCategories("left"));
  if (rightBtn) rightBtn.addEventListener("click", () => scrollCategories("right"));
});

// Countdown Timer function
function startCountdown(duration, display) {
  let timer = duration, hours, minutes, seconds;
  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
    if (--timer < 0) timer = duration;
  }, 1000);
}
document.addEventListener("DOMContentLoaded", () => {
  const heartIcons = document.querySelectorAll(".wishlist-icon");

  heartIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("fa-regular"); // outline
      icon.classList.toggle("fa-solid");   // filled
    });
  });
});
document.querySelectorAll('.wishlist-icon i').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  });
const gridBtn = document.getElementById("gridBtn"); // ya 'gridViewBtn'
const listBtn = document.getElementById("listBtn"); // ya 'listViewBtn'
const productContainer = document.getElementById("productContainer");

gridBtn.addEventListener("click", () => {
  productContainer.classList.add("grid-view");
  productContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  productContainer.classList.add("list-view");
  productContainer.classList.remove("grid-view");
});

  listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });
  
  document.querySelectorAll('.filter-header').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    parent.classList.toggle('active');
  });
});
document.querySelectorAll(".filter-header").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("active");
  });
});
// Accordion toggle for mobile
document.querySelectorAll(".collapsible").forEach(header => {
    header.addEventListener("click", () => {
        const section = header.parentElement;
        const arrow = header.querySelector(".arrow");
        section.classList.toggle("open");
        arrow.classList.toggle("rotate");
    });
});
// Toggle sidebar on mobile
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');

  // Create a mobile filter toggle button
  const filterBtn = document.createElement('button');
  filterBtn.textContent = 'Filter Categories';
  filterBtn.style.margin = '10px 0';
  filterBtn.style.padding = '8px 12px';
  filterBtn.style.background = '#0073e6';
  filterBtn.style.color = '#fff';
  filterBtn.style.border = 'none';
  filterBtn.style.cursor = 'pointer';
  filterBtn.style.display = 'none';

  document.querySelector('.container').insertBefore(filterBtn, document.querySelector('main'));

  // Show button only on mobile
  function handleResize() {
    if (window.innerWidth <= 992) {
      filterBtn.style.display = 'block';
    } else {
      filterBtn.style.display = 'none';
      sidebar.style.display = 'block';
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // Toggle sidebar visibility
  filterBtn.addEventListener('click', () => {
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
  });
});
function changeImage(imgElement) {
  document.getElementById("mainImage").src = imgElement.src;
}

function openTab(evt, tabName) {
  let i, tabcontent, tabbuttons;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  tabbuttons = document.getElementsByClassName("tab-btn");
  for (i = 0; i < tabbuttons.length; i++) {
    tabbuttons[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}
// Thumbnail click -> swap main image
document.querySelectorAll('.thumb').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const big = t.getAttribute('data-large');
    document.getElementById('mainImg').src = big;
  });
});

// Simple quantity controls
const inc = document.getElementById('inc');
const dec = document.getElementById('dec');
const qtyInput = document.getElementById('qty');

inc.addEventListener('click', () => qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1') + 1));
dec.addEventListener('click', () => qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1') - 1));

document.getElementById('addCart').addEventListener('click', () => {
  const q = qtyInput.value;
  alert(`Added ${q} item(s) to cart (demo).`);
});


// Tabs functionality
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
    const id = tab.getAttribute('data-tab');
    document.getElementById(id).classList.remove('hidden');
  });
});
// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Thumbnail click to change main image
document.querySelectorAll('.thumbnails img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('mainImage').src = img.src;
  });
});
// helpers
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const debounce = (fn, t=120)=>{ let to; return (...a)=>{ clearTimeout(to); to=setTimeout(()=>fn(...a),t) } };

// TABS
$$('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    $$('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    $$('.tab-content').forEach(tc=>tc.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
    // redraw charts if specs tab visible
    setTimeout(()=>{ if(document.getElementById('specs').classList.contains('active')) drawAllCharts(); }, 120);
  });
});

// THUMBNAILS → main image
$$('.thumb').forEach(t=>{
  t.addEventListener('click', ()=>{
    $$('.thumb').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    $('#mainImage').src = t.src;
  });
});

// SAMPLE DATA - you can replace these arrays with real data
const priceLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];
const priceData = [120,115,110,105,99,95,105,110,108,100,78];

const ratingCounts = [5,12,8,3,2]; // 5-star to 1-star
const shareLabels = ['Direct','Search','Ads'];
const shareData = [45,35,20];

// Chart instances
let priceChart = null, ratingChart = null, shareChart = null;

function createPriceChart(){
  const ctx = document.getElementById('priceChart').getContext('2d');
  if(priceChart) priceChart.destroy();
  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: priceLabels,
      datasets: [{
        label: 'Price $',
        data: priceData,
        borderColor: '#0b74de',
        backgroundColor: 'rgba(11,116,222,0.12)',
        fill: true,
        tension: 0.25,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {legend:{display:false}},
      scales: {
        x:{grid:{display:false}, ticks:{color:'#6b7280'}},
        y:{grid:{color:'#f0f2f5'}, ticks:{color:'#6b7280'}}
      }
    }
  });
}

function createRatingChart(){
  const ctx = document.getElementById('ratingChart').getContext('2d');
  if(ratingChart) ratingChart.destroy();
  ratingChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['5★','4★','3★','2★','1★'],
      datasets: [{
        label: 'Count',
        data: ratingCounts,
        backgroundColor: '#0b74de',
        borderRadius: 6,
        barThickness: '18'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{display:false}, ticks:{color:'#6b7280'}},
        y:{grid:{color:'#f0f2f5'}, ticks:{color:'#6b7280'}}
      }
    }
  });
}

function createShareChart(){
  const ctx = document.getElementById('shareChart').getContext('2d');
  if(shareChart) shareChart.destroy();
  shareChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: shareLabels,
      datasets: [{
        data: shareData,
        backgroundColor: ['#0b74de','#34bfa3','#ffb547']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins:{legend:{position:'bottom',labels:{color:'#6b7280'}}}
    }
  });
}

function drawAllCharts(){
  // draw only when canvas elements exist and visible
  if(!document.getElementById('specs')) return;
  if(!document.getElementById('specs').classList.contains('active')) return;
  createPriceChart();
  createRatingChart();
  createShareChart();
}

window.addEventListener('load', ()=>{
  // draw charts initially only if specs tab active
  drawAllCharts();
  window.addEventListener('resize', debounce(drawAllCharts, 200));
});
// Thumbnail click to change main image
const mainImage = document.getElementById('mainImage');
document.querySelectorAll('.thumbnails img').forEach(img => {
  img.addEventListener('click', () => {
    mainImage.src = img.src;
  });
});

// Tabs switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active classes
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    // Add active to clicked
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

function updateTotals() {
    let subtotal = 0;
    document.querySelectorAll('.qty').forEach(input => {
        let price = parseFloat(input.dataset.price);
        let qty = parseInt(input.value);
        subtotal += price * qty;
    });
    function updateTotals() {
  let subtotal = 200; // Example value
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  
  let discount = 60;
  let tax = 14;
  let total = subtotal - discount + tax;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Quantity change par update call
document.querySelectorAll('.qty').forEach(input => {
  input.addEventListener('change', updateTotals);
});


// Example initial total
let cartTotal = 100;

function applyDiscount(percent) {
  cartTotal = cartTotal - (cartTotal * (percent / 100));
  updateTotals();
}

updateTotals();

document.getElementById('couponForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const code = document.getElementById('couponCode').value.trim();
  const msg = document.getElementById('message');

  if (!code) {
    msg.textContent = 'Please enter a coupon code.';
    msg.style.color = 'red';
    return;
  }

  if (code.toUpperCase() === 'DISCOUNT10') {
    msg.textContent = 'Coupon applied! 10% discount added.';
    msg.style.color = 'green';
    applyDiscount(10);
  } else {
    msg.textContent = 'Invalid coupon code.';
    msg.style.color = 'red';
  }
});

   document.getElementById('couponForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const code = document.getElementById('couponCode').value.trim();
  const msg = document.getElementById('message');

  // Example validation logic
  if (code.toLowerCase() === 'discount10') {
    msg.textContent = 'Coupon applied! You got 10% off.';
    msg.style.color = 'green';
  } else {
    msg.textContent = 'Invalid coupon code.';
    msg.style.color = 'red';
  }
});

    // script.js
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cartItems');
  const savedGrid = document.getElementById('savedGrid');
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  const couponInput = document.getElementById('coupon');
  const applyCouponBtn = document.getElementById('applyCoupon');
  const couponMsg = document.getElementById('couponMsg');
  const removeAllBtn = document.getElementById('removeAll');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // state
  let coupon = { code: null, amount: 0 };
  const TAX_RATE = 0.05; // 5% tax

  /* helpers */
  function parsePrice(str){
    return parseFloat(str.toString().replace('$','')) || 0;
  }

  function formatPrice(num){
    return `$${num.toFixed(2)}`;
  }

  function recalcTotals(){
    let subtotal = 0;
    const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
      const priceEl = item.querySelector('.price');
      const base = parseFloat(priceEl.dataset.price);
      const id = item.dataset.id;
      const qtySel = item.querySelector('.qty-select');
      const qty = qtySel ? parseInt(qtySel.value) : 1;
      subtotal += base * qty;
    });

    // discount (coupon.amount is either fixed dollar or percent stored as negative number)
    let discount = 0;
    if(coupon.code){
      // support percent codes like SAVE10 => 10% off, or FIX10 => $10 off
      if(coupon.type === 'percent'){
        discount = subtotal * (coupon.value/100);
      } else if(coupon.type === 'fixed'){
        discount = coupon.value;
      }
    }

    if(discount > subtotal) discount = subtotal;

    const taxable = subtotal - discount;
    const tax = taxable * TAX_RATE;
    const total = taxable + tax;

    subtotalEl.textContent = formatPrice(subtotal);
    discountEl.textContent = `-${formatPrice(discount)}`;
    taxEl.textContent = `+${formatPrice(tax)}`;
    totalEl.textContent = formatPrice(total);
  }

  /* initialize qty listeners */
  function attachQtyListeners(container){
    container.querySelectorAll('.qty-select').forEach(sel => {
      sel.addEventListener('change', () => {
        recalcTotals();
      });
    });
  }

  /* Remove item */
  function attachRemoveListeners(){
    cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        const item = cartItemsContainer.querySelector(`.cart-item[data-id="${id}"]`);
        if(item) item.remove();
        updateCount();
        recalcTotals();
      });
    });
  }

  /* Save for later */
  function attachSaveListeners(){
    cartItemsContainer.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = cartItemsContainer.querySelector(`.cart-item[data-id="${id}"]`);
        if(!item) return;
        // clone minimal info to saved grid
        const title = item.querySelector('.item-title').textContent;
        const imgSrc = item.querySelector('.item-thumb img').src;
        const priceVal = item.querySelector('.price').dataset.price;

        const card = document.createElement('div');
        card.className = 'saved-card';
        card.innerHTML = `
          <img src="${imgSrc}" alt="">
          <p class="saved-title">${title}</p>
          <div class="saved-price" data-price="${priceVal}">${formatPrice(parseFloat(priceVal))}</div>
          <button class="move-to-cart">Move to cart</button>
        `;
        savedGrid.appendChild(card);
        item.remove();
        attachMoveToCartListeners();
        updateCount();
        recalcTotals();
      });
    });
  }

  /* Move to cart from saved */
  function attachMoveToCartListeners(){
    savedGrid.querySelectorAll('.move-to-cart').forEach(btn => {
      // remove existing handlers before adding to avoid duplicates
      btn.replaceWith(btn.cloneNode(true));
    });

    savedGrid.querySelectorAll('.move-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.saved-card');
        if(!card) return;
        const title = card.querySelector('.saved-title').textContent;
        const imgSrc = card.querySelector('img').src;
        const priceVal = card.querySelector('.saved-price').dataset.price;

        // create cart item with new unique id
        const newId = Date.now();
        const article = document.createElement('article');
        article.className = 'cart-item';
        article.dataset.id = newId;
        article.innerHTML = `
          <div class="item-thumb"><img src="${imgSrc}" alt=""></div>
          <div class="item-body">
            <h2 class="item-title">${title}</h2>
            <p class="item-meta"><span class="seller">Seller</span></p>
            <div class="item-actions">
              <button class="remove-btn" data-id="${newId}">Remove</button>
              <button class="save-btn" data-id="${newId}">Save for later</button>
            </div>
          </div>
          <div class="item-price-col">
            <div class="price" data-price="${priceVal}">${formatPrice(parseFloat(priceVal))}</div>
            <div class="qty">Qty:
              <select class="qty-select" data-id="${newId}">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(article);
        // remove saved card
        card.remove();
        // reattach listeners
        attachQtyListeners(cartItemsContainer);
        attachRemoveListeners();
        attachSaveListeners();
        updateCount();
        recalcTotals();
      });
    });
  }

  /* Coupon apply */
  applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if(!code){
      coupon = { code: null, amount:0 };
      couponMsg.textContent = '';
      recalcTotals();
      return;
    }

    // sample coupon rules:
    // SAVE10 => 10% off
    // FIX20 => $20 off
    if(code === 'SAVE10'){
      coupon = { code:'SAVE10', type:'percent', value:10 };
      couponMsg.textContent = '10% applied';
      couponMsg.style.color = 'green';
    } else if(code === 'FIX20'){
      coupon = { code:'FIX20', type:'fixed', value:20 };
      couponMsg.textContent = '$20 off applied';
      couponMsg.style.color = 'green';
    } else {
      coupon = { code:null, amount:0 };
      couponMsg.textContent = 'Invalid coupon';
      couponMsg.style.color = '#ef4444';
    }
    recalcTotals();
  });

  /* Remove all */
  removeAllBtn.addEventListener('click', () => {
    if(confirm('Remove all items from cart?')){
      cartItemsContainer.innerHTML = '';
      updateCount();
      recalcTotals();
    }
  });

  /* Checkout */
  checkoutBtn.addEventListener('click', () => {
    const totalText = totalEl.textContent;
    alert(`Proceeding to checkout. ${totalText}`);
  });

  /* update cart count in header */
  function updateCount(){
    const count = cartItemsContainer.querySelectorAll('.cart-item').length;
    const countSpan = document.querySelector('.page-header .count');
    if(countSpan) countSpan.textContent = `(${count})`;
  }

  /* initialize listeners */
  attachQtyListeners(cartItemsContainer);
  attachRemoveListeners();
  attachSaveListeners();
  attachMoveToCartListeners();
  updateCount();
  recalcTotals();

  // also: delegate for dynamic remove/save buttons (for items added later)
  // (re-run attach functions are used after adding nodes)
});
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const sidebar = document.getElementById("sidebar");

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});
}