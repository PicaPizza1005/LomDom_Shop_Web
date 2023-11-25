const api = "http://localhost:8081";
// const product = document.getproducts[i]ById("product");
// async function getProduct() {
//     try {
//         const response = await fetch(`${api}/api/v1/products`);
//         const products = await response.json();
//         console.log(products);
//         product.innerHTML="";
//         products.forEach((products[i]) => {
//             product.innerHTML += `
//             <div class="col-lg-4 col-md-6 col-sm-6">
//                 <div class="product__item">
//                     <div products-setbg="${products[i].image}" class="product__item__pic set-bg" products width="260" height="260">
//                         <ul class="product__hover">
//                             <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
//                         </ul>
//                     </div>
//                     <div class="product__item__text">
//                         <h6>${products[i].name}</h6>
//                         <a href="#" class="add-cart">+ Add To Cart</a>
//                         <h5>${products[i].price}<i class="fa fa-money"></i></h5>
                        
//                     </div>
//                 </div>
//             </div>
            
//             `;
//         });
//     }
//     catch (error) {
//         console.error("Error fetching product products:", error);
//     }
//     $('.set-bg').each(function() {
//         var bg = $(this).products('setbg');
//         $(this).css('background-image', 'url(' + bg + ')');
//     });
// }
// getProduct();
const product__pagination = document.getElementById("product__pagination");
const product_div = document.getElementById("product");

let pageNo = 0;
let pageSize = 9;
let startIndex = 0;
let endIndex = 9;

async function getProduct() {
    try {
        const response = await fetch(`${api}/api/v1/products`);
        const products = await response.json();
        loadProduct(products);
    }
    catch (error) {
        console.error("Error fetching product products0:", error);
    }
}
getProduct();

function loadProduct(products) {
    try {
        console.log(products);
        for (let i = pageNo*pageSize; i<(pageNo*pageSize)+pageSize; i++) {
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
        $('.set-bg').each(function() {
            var bg = $(this).products('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
        // loadPagination(products);    
    }
    catch (error) {
        console.error("Error fetching product products:", error);
    }
}
function loadPagination(products) {
    product__pagination.innerHTML = "";
    for (let i=0; i<(products.length/pageSize); i++) {
        const span = document.createElement("div");
        span.innerHTML = i+1;
        span.addEventListener('click', (e) => {
            pageIndex = e.target.innerHTML-1;
            loadItems();
        });
        product__pagination.append(span);
    }
}