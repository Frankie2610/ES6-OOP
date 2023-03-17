// import { Swal } from "/node_modules/sweetalert2/dist/sweetalert2.min.js";

// Sử dụng thư viện SweetAlert2 để tạo các thông báo alert
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
});

// Thông báo thực hiện thao tác thành công
function alertSuccess(alert) {
  return Toast.fire({
    icon: "success",
    title: alert,
  });
}

// Thông báo thực hiện thao tác thất bại
function alertFail(alert) {
  return Toast.fire({
    icon: "error",
    title: alert,
  });
}

// // Thông báo xác nhận xóa data
// function warningDelete() {
//   return Swal.fire({
//     title: "Xác nhận Xóa?",
//     text: "Hành động sẽ không thể hoàn tác!",
//     icon: "Chú ý",
//     showCancelButton: true,
//     confirmButtonText: "Hãy xóa dữ liệu này",
//   });
// }

// export { alertFail, alertSuccess, warningDelete };
