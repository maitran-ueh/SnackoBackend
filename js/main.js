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
	loadCategories();
	loadVouchers();
});
// Hiển thị danh sách từ localStorage khi trang được tải lại
window.onload = function () {
	// Kiểm tra và tải danh sách sản phẩm nếu trang là 'product-list.html'
	if (window.location.pathname.includes('product-list.html')) {
		loadProducts(); // Tải danh sách sản phẩm
	}
	// Kiểm tra và điền thông tin vào form chỉnh sửa nếu trang là 'product-edit.html'
	else if (window.location.pathname.includes('product-edit.html')) {
		loadEditFormP(); // Điền thông tin vào form chỉnh sửa
	}
	// Kiểm tra và tải danh mục sản phẩm nếu trang là 'product-category.html'
	else if (window.location.pathname.includes('product-category.html')) {
		loadCategories(); // Tải danh mục sản phẩm
	}
	// Kiểm tra và điền thông tin vào form chỉnh sửa nếu trang là 'product-category-edit.html'
	else if (window.location.pathname.includes('product-category-edit.html')) {
		loadEditFormC(); // Điền thông tin vào form chỉnh sửa
	}
	// Kiểm tra và tải danh sách mã giảm giá nếu trang là 'voucher-list.html'
	else if (window.location.pathname.includes('voucher-list.html')) {
		loadVouchers(); // Tải danh sách mã giảm giá
	}
	// Kiểm tra và điền thông tin vào form chỉnh sửa nếu trang là 'voucher-edit.html'
	else if (window.location.pathname.includes('voucher-edit.html')) {
		loadEditFormV(); // Điền thông tin vào form chỉnh sửa
	}
};

// Hàm tải lại danh sách sản phẩm từ localStorage và hiển thị trên bảng
function loadProducts() {
	const productList = JSON.parse(localStorage.getItem('productList')) || []; // Lấy danh sách sản phẩm hoặc mảng rỗng nếu không có
	const tbody = document.getElementById('product-list');
	tbody.innerHTML = '';  // Xóa tất cả các sản phẩm hiện tại trong bảng
	// Duyệt qua danh sách sản phẩm và thêm vào bảng
	productList.forEach(product => {
		const row = document.createElement('tr');
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
// Hàm thêm sản phẩm vào bảng và localStorage
function addProductToTable(productName, status, cat, desc, sku, price, img) {
	const product = {
		img: img,
		productName: productName,
		sku: sku,
		status: status,
		price: price,
		cat: cat,
		desc: desc
	};
	// Lấy danh sách sản phẩm từ localStorage
	const productList = JSON.parse(localStorage.getItem('productList')) || [];
	// Thêm sản phẩm mới vào danh sách
	productList.push(product);
	// Lưu lại vào localStorage
	localStorage.setItem('productList', JSON.stringify(productList));
	// Cập nhật lại bảng sản phẩm
	loadProducts();
	// Reset form sau khi thêm sản phẩm
	resetForm();
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
// Sửa sản phẩm
function editProduct(element) {
	const row = element.closest('tr');
	const img = row.cells[0].children[0].src;
	const productName = row.cells[1].innerText;
	const sku = row.cells[2].innerText;
	const status = row.cells[3].innerText;
	const price = row.cells[4].innerText;
	const cat = row.cells[5].innerText;
	const desc = row.cells[6].innerText;
	const editUrl = `product-edit.html?sku=${encodeURIComponent(sku)}&productName=${encodeURIComponent(productName)}&status=${encodeURIComponent(status)}&price=${encodeURIComponent(price)}&cat=${encodeURIComponent(cat)}&desc=${encodeURIComponent(desc)}&img=${encodeURIComponent(img)}`;
	window.location.href = editUrl;
}
// Hàm xóa sản phẩm vĩnh viễn
function xoaDongNay(element) {
	const dongCanXoa = element.closest('tr');
	const sku = dongCanXoa.cells[2].innerText;  // Lấy mã SKU của sản phẩm cần xóa
	// Lấy danh sách sản phẩm từ localStorage
	let productList = JSON.parse(localStorage.getItem('productList')) || [];
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
function loadEditFormP() {
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

// Hàm tải danh sách danh mục từ localStorage và hiển thị trên bảng
function loadCategories() {
	const categoryList = JSON.parse(localStorage.getItem('categoryList')) || []; // Lấy danh sách danh mục hoặc mảng rỗng nếu không có
	const tbody = document.getElementById('product-category');
	tbody.innerHTML = '';  // Xóa tất cả các danh mục hiện tại trong bảng
	categoryList.forEach(category => {
		const row = document.createElement('tr');
		row.innerHTML = `
	<td>${category.catName}</td>
	<td>${category.idc}</td>
	<td>${category.desc}</td>
	<td>
		<button data-toggle="tooltip" title="Sửa" class="pd-setting-ed" onclick="editCategory(this)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
		<button data-toggle="tooltip" title="Xóa" class="pd-setting-ed" onclick="deleteCategory(this)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
	</td>
`;
		tbody.appendChild(row);
	});
}
// Hàm thêm danh mục vào bảng và localStorage
function addCategoryToTable(catName, idc, desc) {
	const category = {
		catName: catName,
		idc: idc,
		desc: desc
	};
	// Lấy danh sách danh mục từ localStorage
	const categoryList = JSON.parse(localStorage.getItem('categoryList')) || [];
	// Thêm danh mục mới vào danh sách
	categoryList.push(category);
	// Lưu lại vào localStorage
	localStorage.setItem('categoryList', JSON.stringify(categoryList));
	// Cập nhật lại bảng danh mục
	loadCategories();
	// Reset form sau khi thêm danh mục
	resetForm();
}
// Thêm danh mục mới vào localStorage khi form được submit
function addCategory() {
	const catName = document.getElementById('category-name').value;
	const idc = document.getElementById('idc').value;
	const desc = document.getElementById('desc').value;
	// Kiểm tra xem các trường có rỗng không
	if (!catName || !idc || !desc) {
		alert('Vui lòng điền đầy đủ thông tin');
		return;
	}
	window.location.href = 'product-category.html';
	// Thêm danh mục mới vào localStorage
	addCategoryToTable(catName, idc, desc);
}
// Hàm xóa danh mục
function deleteCategory(element) {
	const rowToDelete = element.closest('tr');
	const idc = rowToDelete.cells[1].innerText; // Lấy mã danh mục cần xóa
	// Lấy danh sách danh mục từ localStorage
	let categoryList = JSON.parse(localStorage.getItem('categoryList')) || [];
	// Loại bỏ danh mục khỏi danh sách
	categoryList = categoryList.filter(category => category.idc !== idc);
	// Lưu lại danh sách danh mục đã cập nhật vào localStorage
	localStorage.setItem('categoryList', JSON.stringify(categoryList));
	// Cập nhật lại bảng danh mục
	loadCategories();
}
// Hàm sửa danh mục
function editCategory(element) {
	const row = element.closest('tr');
	const catName = row.cells[0].innerText;
	const idc = row.cells[1].innerText;
	const desc = row.cells[2].innerText;
	// Lưu thông tin chỉnh sửa vào URL
	const editUrl = `product-category-edit.html?catName=${encodeURIComponent(catName)}&idc=${encodeURIComponent(idc)}&desc=${encodeURIComponent(desc)}`;
	window.location.href = editUrl;
}
// Hàm load thông tin chỉnh sửa danh mục vào form
function loadEditFormC() {
	const params = new URLSearchParams(window.location.search);
	const catName = decodeURIComponent(params.get('catName'));
	const idc = decodeURIComponent(params.get('idc'));
	const desc = decodeURIComponent(params.get('desc'));
	document.getElementById('category-name').value = catName || '';
	document.getElementById('idc').value = idc || '';
	document.getElementById('desc').value = desc || '';
}
// Hàm lưu thông tin danh mục sau khi chỉnh sửa
function saveCategory() {
	const catName = document.getElementById('category-name').value;
	const idc = document.getElementById('idc').value;
	const desc = document.getElementById('desc').value;
	if (!catName || !idc || !desc) {
		alert('Vui lòng điền đầy đủ thông tin');
		return;
	}
	let categoryList = JSON.parse(localStorage.getItem('categoryList')) || [];
	const index = categoryList.findIndex(category => category.idc === idc);
	if (index !== -1) {
		categoryList[index] = { catName, idc, desc };
		localStorage.setItem('categoryList', JSON.stringify(categoryList));
		window.location.href = 'product-category.html';
	} else {
		alert('Không tìm thấy danh mục để cập nhật');
	}
}
// Hàm reset form sau khi thêm hoặc chỉnh sửa danh mục
function resetForm() {
	document.getElementById('category-name').value = '';
	document.getElementById('idc').value = '';
	document.getElementById('desc').value = '';
}

// Hàm tải danh sách mã giảm giá từ localStorage và hiển thị trên bảng
function loadVouchers() {
	const voucherList = JSON.parse(localStorage.getItem('voucherList')) || []; // Lấy danh sách mã giảm giá
	const tbody = document.getElementById('voucher-list');
	tbody.innerHTML = ''; // Xóa danh sách hiện tại
	voucherList.forEach(v => {
		const row = document.createElement('tr');
		row.innerHTML = `
	<td>${v.idv}</td>
	<td>${v.voucherName}</td>
	<td>${v.cat}</td>
	<td><button class="pd-setting">${v.status}</button></td>
	<td>${v.voucher}</td>
	<td>${v.desc}</td>
	<td>${v.begin}</td>
	<td>${v.end}</td>
	<td>
		<button data-toggle="tooltip" title="Sửa" class="pd-setting-ed" onclick="editVoucher(this)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
		<button data-toggle="tooltip" title="Xóa" class="pd-setting-ed" onclick="deleteVoucher(this)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
	</td>
`;
		tbody.appendChild(row);
	});
}
// Hàm thêm mã giảm giá vào bảng và localStorage
function addVoucherToTable(idv, voucherName, status, cat, desc, voucher, begin, end) {
	const newVoucher = {
		idv: idv,
		voucherName: voucherName,
		status: status,
		cat: cat,
		desc: desc,
		voucher: voucher,
		begin: begin,
		end: end
	};
	const voucherList = JSON.parse(localStorage.getItem('voucherList')) || [];
	voucherList.push(newVoucher);
	localStorage.setItem('voucherList', JSON.stringify(voucherList));
	loadVouchers(); // Cập nhật lại danh sách
	resetVoucherForm(); // Reset form sau khi thêm
}
// Kiểm tra và thêm mã giảm giá mới
function validateFieldsAndRedirectV() {
	const idv = document.getElementById('idv').value;
	const voucherName = document.getElementById('voucher-name').value;
	const status = document.getElementById('status').value;
	const cat = document.getElementById('cat').value;
	const desc = document.getElementById('desc').value;
	const voucher = document.getElementById('voucher').value;
	const begin = document.getElementById('begin').value;
	const end = document.getElementById('end').value;
	// Kiểm tra các trường có rỗng không
	if (!idv || !voucherName || !status || !cat || !desc || !voucher || !begin || !end) {
		alert('Vui lòng điền đầy đủ thông tin');
		return;
	}
	window.location.href = 'voucher-list.html'; // Chuyển đến danh sách mã giảm giá
	addVoucherToTable(idv, voucherName, status, cat, desc, voucher, begin, end);
}
// Hàm sửa mã giảm giá
function editVoucher(element) {
	const row = element.closest('tr');
	const idv = row.cells[0].innerText;
	const voucherName = row.cells[1].innerText;
	const cat = row.cells[2].innerText;
	const status = row.cells[3].innerText;
	const voucher = row.cells[4].innerText;
	const desc = row.cells[5].innerText;
	const begin = row.cells[6].innerText;
	const end = row.cells[7].innerText;
	const editUrl = `voucher-edit.html?idv=${encodeURIComponent(idv)}&voucherName=${encodeURIComponent(voucherName)}&status=${encodeURIComponent(status)}&cat=${encodeURIComponent(cat)}&desc=${encodeURIComponent(desc)}&voucher=${encodeURIComponent(voucher)}&begin=${encodeURIComponent(begin)}&end=${encodeURIComponent(end)}`;
	window.location.href = editUrl;
}
// Hàm xóa mã giảm giá
function deleteVoucher(element) {
	const row = element.closest('tr');
	const idv = row.cells[0].innerText;
	let voucherList = JSON.parse(localStorage.getItem('voucherList')) || [];
	voucherList = voucherList.filter(v => v.idv !== idv);
	localStorage.setItem('voucherList', JSON.stringify(voucherList));
	loadVouchers();
}
// Hàm reset form
function resetVoucherForm() {
	document.getElementById('idv').value = '';
	document.getElementById('voucher-name').value = '';
	document.getElementById('status').value = 'Tình Trạng';
	document.getElementById('cat').value = '';
	document.getElementById('desc').value = '';
	document.getElementById('voucher').value = '';
	document.getElementById('begin').value = '';
	document.getElementById('end').value = '';
}
// Hàm tải thông tin chỉnh sửa vào form
function loadEditFormV() {
	const params = new URLSearchParams(window.location.search);
	const idv = decodeURIComponent(params.get('idv'));
	const voucherName = decodeURIComponent(params.get('voucherName'));
	const status = decodeURIComponent(params.get('status'));
	const cat = decodeURIComponent(params.get('cat'));
	const desc = decodeURIComponent(params.get('desc'));
	const voucher = decodeURIComponent(params.get('voucher'));
	const begin = decodeURIComponent(params.get('begin'));
	const end = decodeURIComponent(params.get('end'));
	document.getElementById('idv').value = idv || '';
	document.getElementById('voucher-name').value = voucherName || '';
	document.getElementById('status').value = status || '';
	document.getElementById('cat').value = cat || '';
	document.getElementById('desc').value = desc || '';
	document.getElementById('voucher').value = voucher || '';
	document.getElementById('begin').value = begin || '';
	document.getElementById('end').value = end || '';
}
// Hàm lưu chỉnh sửa
function saveVoucher() {
	const idv = document.getElementById('idv').value;
	const voucherName = document.getElementById('voucher-name').value;
	const cat = document.getElementById('cat').value;
	const status = document.getElementById('status').value;
	const voucher = document.getElementById('voucher').value;
	const desc = document.getElementById('desc').value;
	const begin = document.getElementById('begin').value;
	const end = document.getElementById('end').value;
	if (!idv || !voucherName || !status || !voucher || !cat || !desc || !begin || !end) {
		alert('Vui lòng điền đầy đủ thông tin');
		return;
	}
	let voucherList = JSON.parse(localStorage.getItem('voucherList')) || [];
	const index = voucherList.findIndex(v => v.idv === idv);
	if (index !== -1) {
		voucherList[index] = { idv, voucherName, cat, status, voucher, desc, begin, end };
		localStorage.setItem('voucherList', JSON.stringify(voucherList));
		window.location.href = 'voucher-list.html';
	} else {
		alert('Không tìm thấy mã giảm giá để cập nhật');
	}
}