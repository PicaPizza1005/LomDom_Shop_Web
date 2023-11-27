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


function checkIfEmpty() {
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
        console.log('Chưa thể cập nhật đơn hàng');
        return false;
    }
    else{
        dathang();
        return true;
    }
}

function veTrangChu(){
    window.href.location = "index.html";
}

async function dathang() {
    if(token !== ''){
        const res = await fetch('http://localhost:8081/api/v1/orders', {
            method: "POST",
            headers: {
                ...defaultHeader
            },
            body: JSON.stringify({
                address: document.getElementById('diachi').value,
                firstName: document.getElementById("ho").value,
                lastName: document.getElementById('ten').value,
                status: 1
            })
        })
        console.log(res);
        console.log("Đặt hàng thành công");
        alert("Đơn hàng đã được đặt thành công");
        window.location.href = "order.html";
    }
    else {
        alert("Vui lòng đăng nhập trước khi đặt hàng");
        console.error("người dùng chưa đăng nhập, yêu cầu đăng nhập trước khi đặt hàng");
    }
}