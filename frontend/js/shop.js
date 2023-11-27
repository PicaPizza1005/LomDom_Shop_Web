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
        // sortProduct("asc");
        loadProduct(products);
        loadPageList(products);
    }
    catch (error) {
        console.error("Error fetching product:", error);
    }
}
getProduct();

function getProductByCategory(category) {
    let productByCategory = products.filter(product => product.category.id == category);
    loadProduct(productByCategory);
    loadPageList(productByCategory);
}

function getProductByPrice(pricelowRq, pricehighRq) {
    priceLow = pricelowRq;
    priceHigh = pricehighRq;
    pageNo = 1;
    sortProduct();
}

function getProductBySize(sizeRq) {
    size = sizeRq;
    pageNo = 1;
    sortProduct();
}

function getProductByColor(colorRq) {
    color = colorRq;
    pageNo = 1;
    sortProduct();
}
function changeDirectionSort() {
    directionSort = select_sort.value;
    sortProduct();
}

// sort.forEach((sort) => {
//     sort.addEventListener("click", () => {
//         sortProduct(sort.value);
//     });
// });

// function sortProduct(sort) {
//     console.log(sort);
//     if (sort == "asc") {
//         products.sort((a, b) => (a.price > b.price) ? 1 : -1);
//     }
//     else if (sort == "desc") {
//         products.sort((a, b) => (a.price < b.price) ? 1 : -1);
//     }
//     product_div.innerHTML = "";
//     loadProduct(products);
//     loadPageList(products);
// }

function sortProduct(){
    let productAfterSort = products;
    if(priceLow!==null && priceHigh!==null){
        productAfterSort = productAfterSort.filter(product => product.price >= priceLow && product.price <= priceHigh);
    }
    if(size!==null){
        productAfterSort = productAfterSort.filter(product => (product.listSizes).some(listSize => listSize.sizeId == size));
    }
    if(color!==null){
        productAfterSort = productAfterSort.filter(product => product.color.id == color);
    }
    loadProduct(productAfterSort);
    loadPageList(productAfterSort);
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
                        <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>${product.name}</h6>
                    <a href="#" class="add-cart">+ Add To Cart</a>
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
        sortProduct();
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

