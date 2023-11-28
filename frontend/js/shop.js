const product_div = document.getElementById("product");
const product__pagination = document.getElementById("product__pagination");
const shop__product__option__left = document.getElementById("shop__option__left");
const shop__product__option__right = document.getElementById("shop__option__right");
const sort = document.querySelectorAll(".sort__product");
const select_sort = document.getElementsByClassName("shop__product__option__select")[0]

let pageNo = 1;
let pageSize = 18;
let totalPages = 0;
let products = [];

let priceLow = null;
let priceHigh = null;
let size = null;
let color = null;
let directionSort = "asc";

async function getProduct() {
    try {
        const response = await fetch(`${api}/api/v1/products`);
        products = await response.json();
        loadProduct(products);
        loadPageList(products);
    }
    catch (error) {
        console.error("Error fetching product:", error);
    }
}
getProduct();

function getProductByChoose() {
    const categoryId = document.getElementsByClassName("category__checkbox");
    const categoryTick =[];
    for(let i=0; i<categoryId.length; i++) {
        if(categoryId[i].checked) categoryTick.push(categoryId[i].value);
    }
    const priceId = document.getElementsByClassName("price__checkbox");
    const priceTick =[];
    for(let i=0; i<priceId.length; i++) {
        if(priceId[i].checked) priceTick.push(priceId[i].value);
    }
    const sizeId = document.getElementsByClassName("size__checkbox");
    const sizeTick =[];
    for(let i=0; i<sizeId.length; i++) {
        if(sizeId[i].checked) sizeTick.push(sizeId[i].value);
    }
    const colorId = document.getElementsByClassName("color__checkbox");
    const colorTick =[];
    for(let i=0; i<colorId.length; i++) {
        if(colorId[i].checked) colorTick.push(colorId[i].value);
    }
    $(".shop__sidebar__color label").on('click', function () {
        $(".shop__sidebar__color label").removeClass('active');
        $(this).addClass('active');
    });
    FilterProduct(categoryTick, priceTick, sizeTick, colorTick);
}

function FilterProduct(categoryTick=[], priceTick=[], sizeTick=[], colorTick=[]) {
    let productAfterFilter = [];
    for(let i=0; i< products.length; i++) {
        if(categoryTick.length>0) {
            if(categoryTick.includes(products[i].category.id.toString()) == false) {
                continue;
            }
        }
        if(priceTick.length>0) {
            if(priceTick.includes("1") == false && products[i].price < 200000) {
                continue;
            }
            if(priceTick.includes("2") == false && products[i].price >= 200000 && products[i].price < 400000) {
                continue;
            }
            if(priceTick.includes("3") == false && products[i].price >= 400000 && products[i].price < 600000) {
                continue;
            }
            if(priceTick.includes("4") == false && products[i].price >= 600000 && products[i].price < 800000) {
                continue;
            }
            if(priceTick.includes("5") == false && products[i].price >= 800000) {
                continue;
            }
        }
        if(sizeTick.length>0) {
            if((products[i].listSizes).some(listSize => sizeTick.includes(listSize.sizeId.toString())) == false) {
                continue;
            }
        }
        if(colorTick.length>0) {
            if(colorTick.includes(products[i].color.id.toString()) == false) {
                continue;
            }
        }
        productAfterFilter.push(products[i]);
    }
    // sortProduct(productAfterFilter);
    loadProduct(productAfterFilter);
}

function changeDirectionSort() {    
    directionSort = select_sort.value;
    sortProduct();
}

function sortProduct(product){
    loadProduct(product);
    loadPageList(product);
}

async function addCartItemService(productId) {
    const cartItems = await fetch(`${api}/api/v1/cart-items`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
        size: 4
      }),
    }).then((res) => res.json());
    return cartItems;
}

function addToCart(productId) {
    const cartItems = addCartItemService(productId);
    cartItems.then((data) => {
        if(data === null) {
            alert("Đã có lỗi xảy ra");
        }
        else {
            alert("Thêm vào giỏ hàng thành công");
        }
    }
    );
    window.location.reload();
}   

function showProductDetail(productId) {
    localStorage.setItem("product_id", productId.toString());
    window.location.href = "shop-details.html";
}

function loadProduct(product) {
    console.log(product);
    product_div.innerHTML = "";
    productAfterSlice = product.slice(pageNo*pageSize-pageSize, pageNo*pageSize);
    if(directionSort == "asc") productAfterSlice.sort((a, b) => (a.price > b.price) ? 1 : -1);
    else productAfterSlice.sort((a, b) => (a.price < b.price) ? 1 : -1);
    productAfterSlice.forEach((product) => { 
        product_div.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
                <div products-setbg="${product.image}" class="product__item__pic set-bg" products width="260" height="260">
                    <ul class="product__hover">
                        <li><a href="#"><img src="img/icon/search.png" alt="" onclick="showProductDetail(${product.id})"></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>${product.name}</h6>
                    <a href="#" class="add-cart" onclick="addToCart(${product.id})">+ Add To Cart</a>
                    <h5>${product.price}<i class="fa fa-money"></i></h5>
                </div>
            </div>
        </div>
        `;
    });
   
    $('.set-bg').each(function() {
        var bg = $(this).attr('products-setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });
}

function changePage(page) {
    if (page<1) page = 1;
    if (page>totalPages+1) page = totalPages+1;
    if(pageNo === page) return;
    else{
        pageNo = page;
        loadProduct(products);
        console.log(pageNo);
    }
}

function loadPageList(product) {
    product__pagination.innerHTML = "";
   
    totalPages = Math.ceil(product.length/pageSize - 1);
    shop__product__option__left.innerHTML = `
        <p>Hiển thị ${pageSize<product.length?pageSize:product.length} trên ${product.length} kết quả</p>
    `;
    for (let i=1; i<=totalPages+1; i++) {
        if (i==pageNo) {
            product__pagination.innerHTML += `
            <a href="#" onclick="changePage(${i})" class="active">${i}</a>
            `;
            continue;
        }
        product__pagination.innerHTML += `
        <a href="#" onclick="changePage(${i})">${i}</a>
        `;
    }
    $('.product__pagination a').on('click', function(e) {
        e.preventDefault();
        $('.product__pagination a').removeClass('active');
        $(this).addClass('active');
    });
}

