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

// Xóa sản phẩm
function xoaDongNay(element) {
	console.log("Hàm được gọi");
	var dongCanXoa = element.closest('tr');
	// Xóa dòng hiện tại
	console.log("Xóa dòng hiện tại:", dongCanXoa);
	var dongTren = dongCanXoa.previousElementSibling;
	dongCanXoa.remove();
}

// Tải lên và hiển thị hình ảnh
function replaceSingleImage() {
	var fileInput = document.getElementById('single-image-input'); // Lấy phần tử input file
	var file = fileInput.files[0]; // Lấy file đầu tiên từ input file
	if (file) { // Kiểm tra xem có file nào được chọn không
		var reader = new FileReader(); // Tạo một FileReader mới
		reader.onload = function (e) { // Định nghĩa hàm sẽ được gọi khi FileReader hoàn thành việc đọc file
			var imgWrap = document.getElementById('single-image-wrap'); // Lấy phần tử chứa hình ảnh
			var img = document.getElementById('single-product-image'); // Lấy phần tử hình ảnh
			img.src = e.target.result; // Đặt src cho thẻ img bằng kết quả của FileReader
			imgWrap.style.display = 'block'; // Hiển thị lại ảnh và nút xóa
			img.style.width = '100px';// Đặt chiều rộng cho thẻ img
            img.style.height = '100px';// Đặt chiều cao cho thẻ img
		};
		reader.readAsDataURL(file); // Bắt đầu đọc file dưới dạng URL dữ liệu
	}
}

// Xóa hình ảnh được hiển thị
function removeSingleImage() {
	var imgWrap = document.getElementById('single-image-wrap');// Lấy phần tử chứa hình ảnh
	imgWrap.style.display = 'none'; // Ẩn ảnh và nút xóa
	document.getElementById('single-image-input').value = ''; // Đặt lại giá trị của input file
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

// Kiểm tra trường thông tin sản phẩm
function validateFieldsAndRedirect() {
	var productName = document.getElementById('product-name').value;
	var status = document.getElementById('status').value;
	var cat = document.getElementById('cat').value;
	var desc = document.getElementById('desc').value;
	var sku = document.getElementById('sku').value;
	var price = document.getElementById('price').value;
	var img = document.getElementById('single-image-input').value;
	// Kiểm tra xem các trường có rỗng không
	if (!productName || !status || !cat || !desc || !sku || !price || !img) {
		alert('Vui lòng điền đầy đủ thông tin các trường');
		return; // Ngăn không cho chuyển trang nếu thông tin không đầy đủ
	}
	// Kiểm tra tên sản phẩm
	if (productName === "") {
		alert('Vui lòng điền tên sản phẩm.');
		return;
	}
	// Kiểm tra tình trạng
	if (status === "") {
		alert('Vui lòng chọn tình trạng sản phẩm.');
		return;
	}
	// Kiểm tra mã danh mục
	if (cat === "") {
		alert('Vui lòng điền mã danh mục.');
		return;
	}
	// Kiểm tra mô tả
	if (desc === "") {
		alert('Vui lòng điền mô tả sản phẩm.');
		return;
	}
	// Kiểm tra mã sản phẩm
	if (sku === "") {
		alert('Vui lòng điền mã sản phẩm.');
		return;
	}
	// Kiểm tra giá
	if (price === "") {
		alert('Vui lòng điền giá sản phẩm.');
		return;
	}
	// Kiểm tra hình
	if (img === "") {
		alert('Vui lòng tải hình sản phẩm.');
		return;
	}
	// Nếu tất cả các điều kiện kiểm tra đều hợp lệ, chuyển đến trang mục tiêu
	window.location.href = 'product-list.html';
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
