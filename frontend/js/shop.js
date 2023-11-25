const api = "http://localhost:8081";
const product_div = document.getElementById("product");
const product__pagination = document.getElementById("product__pagination");

let pageNo = 1;
let pageSize = 18;
let totalPages = 0;
let categories = [];

getProduct().then(() => {
    loadProduct(products);
});

async function getProduct() {
    try {
        const response = await fetch(`${api}/api/v1/products`);
        products = await response.json();
    }
    catch (error) {
        console.error("Error fetching product:", error);
    }
}

async function getCategory() {
    try {
        const response = await fetch(`${api}/api/v1/categories`);
        categories = await response.json();
    }
    catch (error) {
        console.error("Error fetching category:", error);
    }
}

async function loadProductByCategory(category) {
    try {
        const response = await fetch(`${api}/api/v1/products/category/${category}`);
        productByCategory = await response.json();
        loadProduct(productByCategory);
    }
    catch (error) {
        console.error("Error fetching product by category:", error);
    }
}

function loadProduct(products) {
    try {
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
        loadPageList(products);
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
    pageNo = page;
    product_div.innerHTML = "";
    loadProduct(products);
}
function loadPageList(products) {
    product__pagination.innerHTML = "";
    console.log(products);
    totalPages = products.length/pageSize;
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