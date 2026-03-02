// ============================================
// Data Loading
// ============================================

async function loadProducts() {
  const { data: products, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('display_order');

  if (error) {
    console.error('Failed to load products:', error);
    return;
  }

  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.innerHTML = products
      .map((p) => `<h3 class="menuItem">${p.menu_name}</h3>`)
      .join('');
  }

  const slider = document.getElementById('product-slider');
  if (slider) {
    slider.innerHTML = products
      .map(
        (p) => `
      <div class="sliderItem">
        <img src="./${p.image_url}" alt="${p.name}" class="sliderImg">
        <div class="slideBg"></div>
        <h1 class="sliderTitle"><br>${p.name}<br>${p.subtitle}</h1>
        <h1 class="sliderPrice">$${parseFloat(p.price)}</h1>
        <button class="buyButton">Buy Now!</button>
      </div>`
      )
      .join('');
  }

  initSlider();
}

async function loadOrganicProducts() {
  const { data: products, error } = await supabaseClient
    .from('organic_products')
    .select('*')
    .order('display_order');

  if (error) {
    console.error('Failed to load organic products:', error);
    return;
  }

  const grid = document.getElementById('organic-grid');
  if (grid) {
    grid.innerHTML = products
      .map(
        (p) => `
      <div class="product-itemDrinks">
        <div class="image-wrapper">
          <img src="${p.image_url}" alt="${p.name}" width="200" class="product-image">
        </div>
        <p class="product-name">${p.name}</p>
      </div>`
      )
      .join('');
  }
}

async function loadTestimonials() {
  const { data: testimonials, error } = await supabaseClient
    .from('testimonials')
    .select('*')
    .order('display_order');

  if (error) {
    console.error('Failed to load testimonials:', error);
    return;
  }

  const grid = document.getElementById('testimonials-grid');
  if (grid) {
    grid.innerHTML = testimonials
      .map(
        (t) => `
      <div class="product-item">
        <p class="image-wrapper">"${t.quote}"<br>— ${t.author_name}, ${t.author_age}</p>
      </div>
      <div class="product-item">
        <img src="${t.image_url}" alt="${t.author_name}" width="200" class="product-image">
      </div>`
      )
      .join('');
  }
}

// ============================================
// Slider
// ============================================

function initSlider() {
  const wrapper = document.querySelector('.sliderWrapper');
  const menuItems = document.querySelectorAll('.menuItem');
  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      wrapper.style.transform = `translateX(${-100 * index}vw)`;
    });
  });
}

// ============================================
// Scroll & Reveal Animation
// ============================================

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('transparent');
  } else {
    nav.classList.remove('transparent');
  }
});

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        } else {
          entry.target.classList.remove('reveal');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.image-wrapper').forEach((el) => {
    observer.observe(el);
  });
}

// ============================================
// Waitlist
// ============================================

function sendOrder() {
  const typedEmail = document.getElementById('userEmail').value;

  const myOrder = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: typedEmail,
      waitlist_id: 32285,
    }),
  };

  fetch('https://getwaitlist.com/api/v1/signup', myOrder)
    .then((response) => response.json())
    .then((data) => {
      alert('Success! Your referral link is: ' + data.referral_link);
    })
    .catch((error) => {
      console.log('Something went wrong', error);
    });
}

// ============================================
// Init
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([loadProducts(), loadOrganicProducts(), loadTestimonials()]);
  initRevealObserver();
});
