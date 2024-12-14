(function ($) {
	"use strict";

	/*----------------------------
	 jQuery MeanMenu
	------------------------------ */
	jQuery('nav#dropdown').meanmenu();
	/*----------------------------
	 jQuery myTab
	------------------------------ */
	$('#myTab a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	$('#myTab3 a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	$('#myTab4 a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});

	$('#single-product-tab a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');

	});
	// Collapse ibox function
	$('#sidebar ul li').on('click', function () {
		var button = $(this).find('i.fa.indicator-mn');
		button.toggleClass('fa-plus').toggleClass('fa-minus');

	});
	/*-----------------------------
			Menu Stick
		---------------------------------*/
	$(".sicker-menu").sticky({ topSpacing: 0 });

	$('#sidebarCollapse').on('click', function () {
		$("body").toggleClass("mini-navbar");
		SmoothlyMenu();
	});
	$(document).on('click', '.header-right-menu .dropdown-menu', function (e) {
		e.stopPropagation();
	});


	/*----------------------------
	 wow js active
	------------------------------ */
	new WOW().init();

	/*----------------------------
	 owl active
	------------------------------ */
	$("#owl-demo").owlCarousel({
		autoPlay: false,
		slideSpeed: 2000,
		pagination: false,
		navigation: true,
		items: 4,
		/* transitionStyle : "fade", */    /* [This code for animation ] */
		navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		itemsDesktop: [1199, 4],
		itemsDesktopSmall: [980, 3],
		itemsTablet: [768, 2],
		itemsMobile: [479, 1],
	});

	/*----------------------------
	 price-slider active
	------------------------------ */
	$("#slider-range").slider({
		range: true,
		min: 40,
		max: 600,
		values: [60, 570],
		slide: function (event, ui) {
			$("#amount").val("£" + ui.values[0] + " - £" + ui.values[1]);
		}
	});
	$("#amount").val("£" + $("#slider-range").slider("values", 0) +
		" - £" + $("#slider-range").slider("values", 1));

	/*--------------------------
	 scrollUp
	---------------------------- */
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});

})(jQuery);

// Phóng to hình khi hover và di chuyển chuột
document.querySelectorAll('.zoom-image').forEach((img) => {
	img.addEventListener('mousemove', (event) => {
		const rect = img.getBoundingClientRect();
		const x = event.clientX - rect.left; // Tọa độ X của chuột trên ảnh
		const y = event.clientY - rect.top;  // Tọa độ Y của chuột trên ảnh
		const xPercent = (x / rect.width) * 100; // Tính phần trăm X
		const yPercent = (y / rect.height) * 100; // Tính phần trăm Y

		img.style.transformOrigin = `${xPercent}% ${yPercent}%`; // Thiết lập gốc zoom
		img.style.transform = 'scale(2)'; // Phóng to 2 lần
	});

	img.addEventListener('mouseleave', () => {
		img.style.transformOrigin = 'center'; // Reset gốc
		img.style.transform = 'scale(1)'; // Trở về kích thước ban đầu
	});
});

// Tải lên và hiển thị hình ảnh
function replaceSingleImage() {
	var fileInput = document.getElementById('single-image-input');
	var file = fileInput.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function (e) {
			var imgWrap = document.getElementById('single-image-wrap');
			var img = document.getElementById('single-product-image');
			img.src = e.target.result; // Kết quả base64 từ FileReader
			imgWrap.style.display = 'block';
			img.style.width = '100px'; // Đặt chiều rộng cho thẻ img
			img.style.height = '100px'; // Đặt chiều cao cho thẻ img
		};
		reader.readAsDataURL(file); // Chuyển đổi file sang base64
	}
}

// Xóa hình ảnh được hiển thị
function removeSingleImage() {
	var imgWrap = document.getElementById('single-image-wrap');// Lấy phần tử chứa hình ảnh
	imgWrap.style.display = 'none'; // Ẩn ảnh và nút xóa
	document.getElementById('single-product-image').value = ''; // Đặt lại giá trị của input file
}

// Lưu dữ liệu sản phẩm vào localStorage khi trang được tải lần đầu
document.addEventListener('DOMContentLoaded', function () {
	// Gọi hàm để tải và hiển thị sản phẩm
	loadProducts();
});
// Hàm tải lại danh sách sản phẩm từ localStorage và hiển thị trên bảng
function loadProducts() {
	var productList = JSON.parse(localStorage.getItem('productList')) || [];
	var tbody = document.getElementById('product-list');
	tbody.innerHTML = '';  // Xóa tất cả các sản phẩm hiện tại trong bảng
	// Duyệt qua danh sách sản phẩm và thêm vào bảng
	productList.forEach(product => {
		var row = document.createElement('tr');
		row.innerHTML = `
            <td><img src="${product.img}" alt="" /></td>
            <td>${product.productName}</td>
            <td>${product.sku}</td>
            <td><button class="pd-setting">${product.status}</button></td>
            <td>${product.price}</td>
            <td>${product.cat}</td>
            <td>${product.desc}</td>
            <td>
                <button data-toggle="tooltip" title="Sửa" class="pd-setting-ed" onclick="editProduct(this)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                <button data-toggle="tooltip" title="Xóa" class="pd-setting-ed" onclick="xoaDongNay(this)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </td>
        `;
		tbody.appendChild(row);
	});
}
// Kiểm tra và thêm sản phẩm vào localStorage khi form được submit
function validateFieldsAndAdd() {
	var productName = document.getElementById('product-name').value;
	var status = document.getElementById('status').value;
	var cat = document.getElementById('cat').value;
	var desc = document.getElementById('desc').value;
	var sku = document.getElementById('sku').value;
	var price = document.getElementById('price').value;
	var img = document.getElementById('single-product-image').src;
	// Kiểm tra xem các trường có rỗng không
	if (!productName || !status || !cat || !desc || !sku || !price || img === '' || img === window.location.href) {
		alert('Vui lòng điền đầy đủ thông tin');
		return; // Ngăn không cho thêm sản phẩm nếu thông tin không đầy đủ
	}
	// Chuyển đến trang danh sách sản phẩm
	window.location.href = 'product-list.html';
	// Thêm sản phẩm vào localStorage
	addProductToTable(productName, status, cat, desc, sku, price, img);
}
// Hàm thêm sản phẩm vào bảng và localStorage
function addProductToTable(productName, status, cat, desc, sku, price, img) {
	var product = {
		img: img,
		productName: productName,
		sku: sku,
		status: status,
		price: price,
		cat: cat,
		desc: desc
	};
	// Lấy danh sách sản phẩm từ localStorage
	var productList = JSON.parse(localStorage.getItem('productList')) || [];
	// Thêm sản phẩm mới vào danh sách
	productList.push(product);
	// Lưu lại vào localStorage
	localStorage.setItem('productList', JSON.stringify(productList));
	// Cập nhật lại bảng sản phẩm
	loadProducts();
	// Reset form sau khi thêm sản phẩm
	resetForm();
}
// Hiển thị danh sách sản phẩm từ localStorage khi trang được tải lại
window.onload = function () {
	if (window.location.pathname.includes('product-list.html')) {
		loadProducts(); // Tải danh sách sản phẩm
	} else if (window.location.pathname.includes('product-edit.html')) {
		loadEditForm(); // Điền thông tin vào form chỉnh sửa
	}
};

// Sửa sản phẩm
function editProduct(element) {
	const row = element.closest('tr');
	const sku = row.cells[2].innerText;
	const productName = row.cells[1].innerText;
	const status = row.cells[3].innerText;
	const price = row.cells[4].innerText;
	const cat = row.cells[5].innerText;
	const desc = row.cells[6].innerText;
	const img = row.cells[0].children[0].src;
	const editUrl = `product-edit.html?sku=${encodeURIComponent(sku)}&productName=${encodeURIComponent(productName)}&status=${encodeURIComponent(status)}&price=${encodeURIComponent(price)}&cat=${encodeURIComponent(cat)}&desc=${encodeURIComponent(desc)}&img=${encodeURIComponent(img)}`;
	window.location.href = editUrl;
}

// Hàm xóa sản phẩm vĩnh viễn
function xoaDongNay(element) {
	var dongCanXoa = element.closest('tr');
	var sku = dongCanXoa.cells[2].innerText;  // Lấy mã SKU của sản phẩm cần xóa
	// Lấy danh sách sản phẩm từ localStorage
	var productList = JSON.parse(localStorage.getItem('productList')) || [];
	// Loại bỏ sản phẩm khỏi danh sách
	productList = productList.filter(product => product.sku !== sku);
	// Lưu lại danh sách sản phẩm đã cập nhật vào localStorage
	localStorage.setItem('productList', JSON.stringify(productList));
	// Cập nhật lại bảng sản phẩm
	loadProducts();
}
// Reset form sau khi thêm sản phẩm
function resetForm() {
	document.getElementById('product-name').value = '';
	document.getElementById('status').value = 'Tình Trạng';
	document.getElementById('cat').value = '';
	document.getElementById('desc').value = '';
	document.getElementById('sku').value = '';
	document.getElementById('price').value = '';
	document.getElementById('single-image-input').value = '';
}
// Hàm điền thông tin vào form chỉnh sửa sản phẩm
function loadEditForm() {
	const params = new URLSearchParams(window.location.search);
	const sku = decodeURIComponent(params.get('sku'));
	const productName = decodeURIComponent(params.get('productName'));
	const status = decodeURIComponent(params.get('status'));
	const price = decodeURIComponent(params.get('price'));
	const cat = decodeURIComponent(params.get('cat'));
	const desc = decodeURIComponent(params.get('desc'));
	const img = decodeURIComponent(params.get('img'));
	document.getElementById('product-name').value = productName || '';
	document.getElementById('status').value = status || '';
	document.getElementById('price').value = price || '';
	document.getElementById('cat').value = cat || '';
	document.getElementById('desc').value = desc || '';
	document.getElementById('sku').value = sku || '';
	if (img) {
		document.getElementById('single-product-image').src = img;
	}
}
// Hàm lưu thông tin sản phẩm sau khi chỉnh sửa
function saveProduct() {
	const sku = document.getElementById('sku').value;
	const productName = document.getElementById('product-name').value;
	const status = document.getElementById('status').value;
	const price = document.getElementById('price').value;
	const cat = document.getElementById('cat').value;
	const desc = document.getElementById('desc').value;
	const img = document.getElementById('single-product-image').src;
	if (!productName || !status || !price || !cat || !desc || !sku) {
		alert('Vui lòng điền đầy đủ thông tin');
		return;
	}
	let productList = JSON.parse(localStorage.getItem('productList')) || [];
	const index = productList.findIndex(product => product.sku === sku);
	if (index !== -1) {
		productList[index] = { productName, status, price, cat, desc, sku, img };
		localStorage.setItem('productList', JSON.stringify(productList));
		window.location.href = 'product-list.html';
	} else {
		alert('Không tìm thấy sản phẩm để cập nhật');
	}
}

// Kiểm tra trường thông tin danh mục
function validateFieldsAndRedirectC() {
	var catName = document.getElementById('category-name').value;
	var desc = document.getElementById('desc').value;
	var idc = document.getElementById('idc').value;
	// Kiểm tra xem các trường có rỗng không
	if (!catName || !desc || !idc) {
		alert('Vui lòng điền đầy đủ thông tin các trường');
		return; // Ngăn không cho chuyển trang nếu thông tin không đầy đủ
	}
	// Kiểm tra tên danh mục
	if (catName === "") {
		alert('Vui lòng điền tên sản phẩm.');
		return;
	}
	// Kiểm tra mô tả
	if (desc === "") {
		alert('Vui lòng điền mô tả sản phẩm.');
		return;
	}
	// Kiểm tra mã danh mục
	if (idc === "") {
		alert('Vui lòng điền mã sản phẩm.');
		return;
	}
	// Nếu tất cả các điều kiện kiểm tra đều hợp lệ, chuyển đến trang mục tiêu
	window.location.href = 'product-category.html';
}

// Kiểm tra trường thông tin mã giảm giá
function validateFieldsAndRedirectV() {
	var voucherName = document.getElementById('voucher-name').value;
	var status = document.getElementById('status').value;
	var voucher = document.getElementById('voucher').value;
	var desc = document.getElementById('desc').value;
	var idv = document.getElementById('idv').value;
	var cat = document.getElementById('cat').value;
	var begin = document.getElementById('begin').value;
	var end = document.getElementById('end').value;
	// Kiểm tra xem các trường có rỗng không
	if (!voucherName || !status || !voucher || !desc || !idv || !cat || !begin || !end) {
		alert('Vui lòng điền đầy đủ thông tin các trường');
		return; // Ngăn không cho chuyển trang nếu thông tin không đầy đủ
	}
	// Kiểm tra tên chương trình
	if (voucherName === "") {
		alert('Vui lòng điền tên chương trình.');
		return;
	}
	// Kiểm tra tình trạng
	if (status === "") {
		alert('Vui lòng chọn tình trạng mã giảm giá.');
		return;
	}
	// Kiểm tra mã sản phẩm
	if (voucher === "") {
		alert('Vui lòng điền mã giảm giá.');
		return;
	}
	// Kiểm tra mô tả
	if (desc === "") {
		alert('Vui lòng điền mô tả chương trình giảm giá.');
		return;
	}
	// Kiểm tra mã chương trình
	if (idv === "") {
		alert('Vui lòng điền mã chương trình giảm giá.');
		return;
	}
	// Kiểm tra mã loại
	if (cat === "") {
		alert('Vui lòng điền loại chương trình giảm giá.');
		return;
	}
	// Kiểm tra ngày bắt đầu
	if (begin === "") {
		alert('Vui lòng điền ngày bắt đầu giảm giá.');
		return;
	}
	// Kiểm tra ngày kết thúc
	if (end === "") {
		alert('Vui lòng điền ngày kết thúc giảm giá.');
		return;
	}
	// Nếu tất cả các điều kiện kiểm tra đều hợp lệ, chuyển đến trang mục tiêu
	window.location.href = 'voucher-list.html';
}