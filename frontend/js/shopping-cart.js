async function getCartItemsService() {
  const response = await fetch(`${api}/api/v1/cart-items`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const cartItems = response.json();
  return cartItems;
}

async function removeCartItemService(cartItemId) {
  const cartItems = await fetch(`${api}/api/v1/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return cartItems;
}

async function updateCartItemService(cartItemId, quantity, size) {
  const cartItems = await fetch(`${api}/api/v1/cart-items/${cartItemId}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
      mode: "no-cors"
    },
    body: JSON.stringify({
      quantity: quantity,
      size: size
    }),
  }).then((res) => res.json());
  return cartItems;
}

let listCart = getCartItem();

async function getCartItem() {
    const carts = await getCartItemsService();
    listCart = carts;
    return carts;
}

getCartItem();

function cartItem(cart) {
  return `
  <tr >
    <td class="product__cart__item">
        <div class="product__cart__item__pic">
            <img src="${cart?.product?.image}" alt="" width = "100px" height="100px" object-fit="cover">
        </div>
        <div class="product__cart__item__text">
            <h6>${cart?.product?.name}</h6>
            <div id="size__product">
              ${generateSizeButtons(cart)}
            </div>
        </div>
    </td>
    <td class="quantity__item">
        <div class="quantity">
            <div class="pro-qty-2">
              <button onclick="updateSL(${cart.id},${-1})">-</button>
              <input class = "${cart.id}" onchange="textChange(${cart.id})" type="text" value="${cart.quantity}">
              <button onclick="updateSL(${cart.id},${1})">+</button>
            </div>
        </div>
    </td>
    <td class="cart__price">
      <span class="text-xs font-medium cart__price${cart.id}">
      ${numberToVnd(cart?.quantity * cart?.product?.price)}
      </span>
    </td>
    <td class="cart__close"><button onclick="removeItem(${cart.id})" class="fa fa-close"></button></td>
  </tr>
    `;
}

function SizeItem(size) {
  return `
  <label for="${size.sizeId}">
        ${size.name}
        <input type="text" id="${size.sizeId}" name="${size.name}">
  </label>
  `;
}

async function generateSizeButtons(cart) {
  let sizeButtons = "";
  const sizes = cart?.product?.listSizes;
  sizes.forEach(size => {
    sizeButtons += SizeItem(size);
  });
  console.log(sizeButtons);
  return sizeButtons;
}

async function loadCart() {
  document.getElementById("cart-items").innerHTML = "";
  await getCartItem();
  let total = 0;
  const carts = listCart;
  if (Array.isArray(carts)) {
    carts.forEach((c) => {
      $("#cart-items").append(cartItem(c));
      total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
    });
  }
  updateTotal();
}
loadCart();

async function updateTotal() {
  let total = 0;
  if (Array.isArray(listCart)) {
    listCart.forEach((c) => {
      $(`.cart__total${c?.id}`).html(numberToVnd(c?.quantity * c?.product?.price));
      total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
    });
  }
  document.querySelector(".total_money").innerHTML = numberToVnd(total);
}


async function updateSL(id,dau,size) {
  let quantity = Number($(`.${id}`).val());
  if (quantity > 1 && dau <0)
  {
    quantity = quantity+dau;
    const res = await updateCartItemService(id, quantity, size);
    console.log(res);
    $(`.${id}`).val(quantity);
    $(`.${id}`).html(quantity);
    loadCart();
  }
  else 
  if (quantity<999 && dau >0)
  {
    quantity = quantity +dau;
    const res = await updateCartItemService(id, quantity, size);
    console.log(res);
    $(`.${id}`).val(quantity);
    $(`.${id}`).html(quantity);
    
    loadCart();
  }
  else if (dau ==0)
  {
    const res = await updateCartItemService(id, quantity, size);
    console.log(res);
    $(`.${id}`).val(quantity);
    $(`.${id}`).html(quantity);
  }

  for (let i =0;i<listCart.length;i++)
    if (listCart[i].id == id && listCart[i].size == size) listCart[i].quantity = quantity;
    updateTotal();
    
}


async function textChange(id) {
  console.log({id});
  quantity = $(`.${id}`).val();
  $(`.${id}`).html(quantity);
  await updateSL(id,0);
}

async function removeItem(id) {
  const res = await removeCartItemService(id);
  loadCart();
  updateTotal();
}

const refreshButton = document.querySelector('.update-cart');

const refreshPage = () => {
  location.reload();
}

refreshButton.addEventListener('click', refreshPage)
