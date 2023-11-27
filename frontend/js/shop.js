const product_div = document.getElementById("product");
const product__pagination = document.getElementById("product__pagination");
const shop__product__option__left = document.getElementById("shop__option__left");
const shop__product__option__right = document.getElementById("shop__option__right");

let pageNo = 1;
let pageSize = 18;
let totalPages = 0;
let products = [];

async function getProduct() {
    try {
        const response = await fetch(`${api}/api/v1/products`);
        products = await response.json();
        sortProduct("asc");
    }
    catch (error) {
        console.error("Error fetching product:", error);
    }
}
getProduct();

function getProductByCategory(category) {
    console.log(products);
    productByCategory = products.filter(product => product.category.id == category);
    product_div.innerHTML = "";
    console.log(productByCategory);
    loadProduct(productByCategory);
    loadPageList(productByCategory);
}

function getProductByPrice(pricelow, pricehigh) {
    productByPrice = products.filter(product => product.price >= pricelow && product.price <= pricehigh);
    product_div.innerHTML = "";
    loadProduct(productByPrice);
    loadPageList(productByPrice);
}

function getProductBySize(size) {
    productBySize = products.filter(product => (product.listSizes).some(listSize => listSize.sizeId == size));
    product_div.innerHTML = "";
    loadProduct(productBySize);
    loadPageList(productBySize);
}

function getProductByColor(color) {
    productByColor = products.filter(product => product.color.id == color);
    product_div.innerHTML = "";
    loadProduct(productByColor);
    loadPageList(productByColor);
}

function sortProduct(sort) {
    if (sort == "asc") {
        products.sort((a, b) => (a.price > b.price) ? 1 : -1);
    }
    else if (sort == "desc") {
        products.sort((a, b) => (a.price < b.price) ? 1 : -1);
    }
    product_div.innerHTML = "";
    loadProduct(products);
    loadPageList(products);
}

function loadProduct(products) {
    try {
        console.log(products);
        for (let i = pageNo*pageSize-pageSize; i<pageNo*pageSize; i++) {
            if (!products[i]) 
                break; 
            product_div.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="product__item">
                    <div products-setbg="${products[i].image}" class="product__item__pic set-bg" products width="260" height="260">
                        <ul class="product__hover">
                            <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6>${products[i].name}</h6>
                        <a href="#" class="add-cart">+ Add To Cart</a>
                        <h5>${products[i].price}<i class="fa fa-money"></i></h5>
                    </div>
                </div>
            </div>
            
            `;
        }
    }
    catch (error) {
        console.error("Error rendering product products:", error);
    }
    $('.set-bg').each(function() {
        var bg = $(this).attr('products-setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });
}

function changePage(page) {
    if (page<1)
        page = 1;
    if (page>totalPages+1)
        page = totalPages+1;
    if(pageNo === page) {
    }
    else {
        pageNo = page;
        product_div.innerHTML = "";
        loadProduct(products);
    }
}
function loadPageList(products) {
    product__pagination.innerHTML = "";
    console.log(products);
    totalPages = Math.ceil(products.length/pageSize - 1);
    shop__product__option__left.innerHTML = `
        <p>Hiển thị ${pageSize} trên ${products.length} kết quả</p>
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