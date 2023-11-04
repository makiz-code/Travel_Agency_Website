let signupBtn = document.getElementById("signup-btn");
let loginBtn = document.getElementById("login-btn");
let logoutBtn = document.getElementById("logout-btn");
let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navbar");
let id = document.body.dataset.id;

loginBtn.addEventListener("click", () => {
  window.location.href = `../authentification/index.php?link=${
    window.location.origin + window.location.pathname
  }?id=${id}`;
});
logoutBtn.addEventListener("click", () => {
  window.location.href = `./index.php?id=${id}&logout=1`;
});

signupBtn.addEventListener("click", () => {
  window.location.href = `../authentification/index.php?register=true&link=${
    window.location.origin + window.location.pathname
  }?id=${id}`;
});

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

let searchForm = document.querySelector(".search");
document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.add("active");
};
document.querySelector("#close-btn").onclick = () => {
  searchForm.classList.remove("active");
};

const departureDateInput = document.getElementById('departure_date');
const returnDateInput = document.getElementById('return_date');

departureDateInput.addEventListener('change', () => {
  const selectedDate = new Date(departureDateInput.value);
  const nextDay = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
  const formattedNextDay = nextDay.toISOString().split('T')[0];
  returnDateInput.value = formattedNextDay;
  returnDateInput.min = returnDateInput.value;
});

const orders = document.querySelectorAll(".submit-search .order");
const hiddenInput = document.getElementById("order");

orders.forEach((order) => {
  order.addEventListener("click", () => {
    orders.forEach((otherOrder) => {
      if (order !== otherOrder) {
        otherOrder.classList.remove("active");
      }
    });
    order.classList.add("active");
    hiddenInput.value = order.classList.contains("up") ? "ASC" : "DESC";
    console.log(hiddenInput.value);
  });
});

let cart = document.querySelector(".cart");

document.querySelector("#cart-btn").onclick = () => {
  cart.classList.add("active");
};
window.onclick = (e) => {
  if (e.target == searchForm) {
    searchForm.classList.remove("active");
  } else if (e.target == cart) {
    cart.classList.remove("active");
  } else if (e.target == navbar) {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
  }
};

let plus = [...document.querySelectorAll(".fa-plus")];
let minus = [...document.querySelectorAll(".fa-minus")];
let nbr = [...document.querySelectorAll(".nbr")];
let price = [...document.querySelectorAll(".product .price")];
let sub_Total = document.querySelector(".sub-total");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");

function calcul() {
  let count = 0;
  let nbrs = 0;
  for (let i = 0; i < price.length; i++) {
    count += parseInt(price[i].textContent) * parseInt(nbr[i].textContent);
    nbrs += parseInt(nbr[i].textContent);
  }
  sub_Total.innerHTML = count;
  nbrs *= 50;
  discount.innerHTML = nbrs;
  total.innerHTML = count - nbrs;
}
calcul();

for (let i = 0; i < plus.length; i++) {
  plus[i].addEventListener("click", () => {
    calcul();
  });
  minus[i].addEventListener("click", () => {
    calcul();
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function color(element, delay) {
  await wait(delay);
  element.classList.add("color");
  await wait(5000);
  element.classList.remove("color");
}

async function runColors() {
  while (true) {
    let i = 0;
    const icons = [...document.querySelectorAll(".service-icon  i")];
    for (i = 0; i < icons.length; i++) {
      color(icons[i], i * 1000);
    }
    await wait(5000 + icons.length * 1000);
  }
}

runColors();

async function showNext() {
  const images = document.querySelectorAll(".image .offer-image");
  let current = 0;
  while (true) {
    images[current].classList.add("show");
    await wait(3000);
    images[current].classList.remove("show");
    current = (current + 1) % images.length;
  }
}

showNext();
