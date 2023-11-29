// xử lý khung tính toán giá tiền
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

async function createOrderService() {
    const resOrder = await fetch(`${api}/api/v1/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
            address: document.getElementById('diachi').value,
            phoneNumber: document.getElementById('sdt').value,
            firstName: document.getElementById("ho").value,
            lastName: document.getElementById('ten').value,
            status: 1,
            phoneNumber: document.getElementById('sdt').value
        })
    }).then((res) => res.json());
    return resOrder;
}


function mathang(c) {
    return `
    <li>${c.product?.name}</li>
    <span>${numberToVnd(c?.quantity * c?.product?.price)}/span>
    `;
}

function cartItem(cart){
    return `
        <li>${cart?.product?.name}<span>${numberToVnd(cart?.quantity * cart?.product?.price)}</span></li>
    `
}

// let listCart = getCartItem();
let listCart;

async function initializeCart() {
    listCart = await getCartItem();
}

async function getCartItem() {
    const carts = await getCartItemsService();
    listCart = carts;
    return carts;
}

getCartItem();

//tính toán giá tiền + tải thông tin đơn hàng lên khung thanh toán
async function loadCart() {
    const carts = await getCartItemsService();
    console.log(carts);
    let total = 0;
    console.log('cartitem');
    if (Array.isArray(carts)) {
        carts.forEach((c) => {
          $("#total_checkout").append(cartItem(c));
          total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
        });
    }
    console.log(total);
    document.getElementById("total").innerHTML = numberToVnd(total);  
}
loadCart();

async function checkCoHang(event){
    await initializeCart();
    if(listCart === null || listCart.length === 0) {
        return false;
    }
    else {
        return true;
    }
}

function loi(id, message) {
    document.getElementById(id).innerHTML = message;
}

const kiemTraTenHo = (str) => {
    return str.match(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
    );
}

const kiemTraSdt = (sdt) => {
    return sdt.match(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
        );
    };

    //check không được để trống thông tin 
    function checkIfEmpty() {
    var ho = document.getElementById('ho'); // ô họ đệm
    var giatriho = document.getElementById('ho').value.trim(); //giá trị trong ô họ đệm
    // kiểm tra nếu ô nhập bị bỏ trống
    // ô họ
    if (giatriho == '') {
        ho.style.border = '1px solid red'; // nếu bỏ trống sẽ hiện 1 viền đỏ
        loi('loi_ho', 'Họ đệm không được phép bỏ trống');
    }
    else if(!kiemTraTenHo(giatriho)) {
        ho.style.border = '1px solid red';
        loi('loi_ho', 'Họ đệm không hợp lệ');
    }
    else {
        ho.style.border = '';
        loi('loi_ho', '');
    }

    //ô tên
    var ten = document.getElementById('ten'); 
    var giatriten = document.getElementById('ten').value.trim();
    if(giatriten == '') {
        ten.style.border = '1px solid red';
        loi('loi_ten', 'Tên không được phép bỏ trống');
    }
    else if(!kiemTraTenHo(giatriten)) {
        ten.style.border = '1px solid red';
        loi('loi_ten', 'Tên không hợp lệ');
    }
    else {
        ten.style.border = '';
        loi('loi_ten', '');
    }

    //ô địa chỉ
    var diachi = document.getElementById('diachi');
    var giatridiachi = document.getElementById('diachi').value.trim();
    if(giatridiachi == '') {
        diachi.style.border = '1px solid red';
        loi('loi_diachi', 'Địa chỉ không được phép bỏ trống');
    }
    else {
        diachi.style.border = '';
        loi('loi_diachi', '');
    }

    //ô số điện thoại
    var sdt = document.getElementById('sdt');
    var giatrisdt = document.getElementById('sdt').value.trim();
    if(giatrisdt == '') {
        sdt.style.border = '1px solid red';
        loi('loi_sdt', 'Số điện thoại không được phép bỏ trống');
    }
    else if(!kiemTraSdt(giatrisdt)) {
        sdt.style.border = '1px solid red';
        loi('loi_sdt', 'Số điện thoại không hợp lệ');
    }
    else {
        sdt.style.border = '';
        loi('loi_sdt', '');
    }
}

function kiemTraDaDienDu(event) {
    var ho = document.getElementById('ho'); // ô họ đệm
    var giatriho = document.getElementById('ho').value.trim(); //giá trị trong ô họ đệm
    // kiểm tra nếu ô nhập bị bỏ trống
    if (giatriho == '') {
        ho.style.border = '1px solid red'; // nếu bỏ trống sẽ hiện 1 viền đỏ
        loi('loi_ho', 'Họ đệm không được phép bỏ trống');
    }
    else if(!kiemTraTenHo(giatriho)) {
        ho.style.border = '1px solid red';
        loi('loi_ho', 'Họ đệm không hợp lệ');
    }
    else {
        ho.style.border = '';
        loi('loi_ho', '');
    }

    var ten = document.getElementById('ten'); 
    var giatriten = document.getElementById('ten').value.trim();
    if(giatriten == '') {
        ten.style.border = '1px solid red';
        loi('loi_ten', 'Tên không được phép bỏ trống');
    }
    else if(!kiemTraTenHo(giatriten)) {
        ten.style.border = '1px solid red';
        loi('loi_ten', 'Tên không hợp lệ');
    }
    else {
        ten.style.border = '';
        loi('loi_ten', '');
    }

    var diachi = document.getElementById('diachi');
    var giatridiachi = document.getElementById('diachi').value.trim();
    if(giatridiachi == '') {
        diachi.style.border = '1px solid red';
        loi('loi_diachi', 'Địa chỉ không được phép bỏ trống');
    }
    else {
        diachi.style.border = '';
        loi('loi_diachi', '');
    }

    var sdt = document.getElementById('sdt');
    var giatrisdt = document.getElementById('sdt').value.trim();
    if(giatrisdt == '') {
        sdt.style.border = '1px solid red';
        loi('loi_sdt', 'Số điện thoại không được phép bỏ trống');
    }
    else if(!kiemTraSdt(giatrisdt)) {
        sdt.style.border = '1px solid red';
        loi('loi_sdt', 'Số điện thoại không hợp lệ');
    }
    else {
        sdt.style.border = '';
        loi('loi_sdt', '');
    }

    if(
        giatridiachi == '' || 
        giatriho == '' || giatrisdt == '' || giatriten == '' ||
        !kiemTraSdt(giatrisdt) ||
        !kiemTraTenHo(giatriho) ||
        !kiemTraTenHo(giatriten) 
    ) {
        return false;
    }
    return true;
}

//kiểm tra đã điền đủ thông tin và có hàng thì mới thanh toán được
async function chotdon(event){
    if(token === '') {
        alert('Yêu cầu đăng nhập trước khi mua hàng');
        console.log('phai dang nhap');
        return false;
    }
    else{
        const carts = await getCartItemsService();
        console.log(carts);
        let total = 0;
        console.log('cartitem');
        if (Array.isArray(carts)) {
            carts.forEach((c) => {
            total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
            });
        }
        console.log(total);
        document.getElementById("total").innerHTML = numberToVnd(total);  
        if(!kiemTraDaDienDu(event)) {
            event.preventDefault();
            alert('Thông tin không được để trống');
            console.log('chưa điền đủ các ô trống');
        }
        if(total === 0) {
            alert('Đơn hàng phải có sản phẩm');
            console.log('không có sản phẩm đặt');
        }
        else {
            console.log('Thành công');
            dathang();
        }
    }
 }

//về trang chủ
function veTrangChu(){
    window.href.location = "index.html";
}

//đặt hàng, gửi data lên server
async function dathang() {
    if(token !== ''){
        const res = await createOrderService();
        console.log(res);
        console.log("Đặt hàng thành công");
        alert("Đơn hàng đã được đặt thành công");
    }
    else {
        alert("Vui lòng đăng nhập trước khi đặt hàng");
        console.error("người dùng chưa đăng nhập, yêu cầu đăng nhập trước khi đặt hàng");
    }
}
console.log(createOrderService());