function validatePerson() {
  let isValid = true;
  // Kiểm tra loại người dùng
  let userType = getElement("#userTypeForm").value;
  if (userType === "Bạn là ai?") {
    isValid = false;
    getElement("#notiCategoryForm").innerHTML =
      "Vui lòng chọn cho biết bạn là ai";
  } else {
    getElement("#notiCategoryForm").innerHTML = "";
  }

  // Kiểm tra họ tên
  let fullName = getElement("#fullName").value;
  if (!fullName) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Thông tin không hợp lệ";
  } else if (!/\D/.test(fullName)) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Họ tên phải ở định dạng chữ";
  } else {
    getElement("#notiFullName").innerHTML = "";
  }

  //Kiểm tra Mã cá nhân
  let personalCode = getElement("#personalCode").value;
  if (!personalCode) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Thông tin không hợp lệ";
  } else if (!/([0-9])\w+/.test(personalCode)) {
    isValid = false;
    getElement("#notiPersonalCode").innerHTML =
      "Mã cá nhân phải ở định dạng số";
  } else {
    getElement("#notiPersonalCode").innerHTML = "";
  }

  // Kiểm tra email
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let email = getElement("#email").value;
  if (!email) {
    isValid = false;
    getElement("#notiEmail").innerHTML = "Thông tin không hợp lệ";
  } else if (!email.match(mailFormat)) {
    isValid = false;
    getElement("#notiEmail").innerHTML = "Email không hợp lệ";
  } else {
    getElement("#notiEmail").innerHTML = "";
  }

  // Kiểm tra địa chỉ
  let address = getElement("#address").value;
  if (!address) {
    isValid = false;
    getElement("#notiAddress").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiAddress").innerHTML = "";
  }

  return isValid;
}

function validateStudent() {
  let isValid = true;
  const GRADE_RANGE = "Điểm phải nằm trong phạm vi từ 0 - 10";

  // Kiểm tra điểm toán
  let mathScore = getElement("#math").value;
  if (!mathScore) {
    isValid = false;
    getElement("#notiMath").innerHTML = "Thông tin không hợp lệ";
  } else if (Number(mathScore) > 10 || Number(mathScore) < 0) {
    isValid = false;
    getElement("#notiMath").innerHTML = GRADE_RANGE;
  } else {
    getElement("#notiMath").innerHTML = "";
  }

  // Kiểm tra điểm lý
  let physicsScore = getElement("#physics").value;
  if (!physicsScore) {
    isValid = false;
    getElement("#notiPhysics").innerHTML = "Thông tin không hợp lệ";
  } else if (Number(physicsScore) > 10 || Number(physicsScore) < 0) {
    isValid = false;
    getElement("#notiPhysics").innerHTML = GRADE_RANGE;
  } else {
    getElement("#notiPhysics").innerHTML = "";
  }

  // Kiểm tra điểm hóa
  let chemistryScore = getElement("#chemistry").value;
  if (!chemistryScore) {
    isValid = false;
    getElement("#notiChemistry").innerHTML = "Thông tin không hợp lệ";
  } else if (Number(chemistryScore) > 10 || Number(chemistryScore) < 0) {
    isValid = false;
    getElement("#notiChemistry").innerHTML = GRADE_RANGE;
  } else {
    getElement("#notiChemistry").innerHTML = "";
  }

  return isValid;
}

function validateEmployee() {
  let isValid = true;

  // Kiểm tra số ngày làm việc
  let days = getElement("#days").value;

  if (!days) {
    isValid = false;
    getElement("#notiDays").innerHTML = "Thông tin không hợp lệ";
  } else if (days < 0 || days > 31) {
    isValid = false;
    getElement("#notiDays").innerHTML =
      "Số ngày làm việc không được âm hoặc nhiều hơn 31 ngày";
  } else {
    getElement("#notiDays").innerHTML = "";
  }

  // Kiểm tra lương ngày
  let dailySalary = getElement("#dailySalary").value;

  if (!dailySalary.trim()) {
    isValid = false;
    getElement("#notiBaseSalary").innerHTML = "Thông tin không hợp lệ";
  } else if (!dailySalary.match(/^[0-9]*$/)) {
    isValid = false;
    getElement("#notiBaseSalary").innerHTML = "Chỉ nhập số ở đây";
  } else if (dailySalary < 1000) {
    isValid = false;
    getElement("#notiBaseSalary").innerHTML =
      "Lương 1 ngày không bé hơn 1000 VNĐ";
  } else {
    getElement("#notiBaseSalary").innerHTML = "";
  }

  return isValid;
}

function validateCustomer() {
  let isValid = true;

  // Kiểm tra tên công ty
  let company = getElement("#company").value;

  if (!company) {
    isValid = false;
    getElement("#notiCompany").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiCompany").innerHTML = "";
  }

  // Kiểm tra trị giá hóa đơn
  let invoice = getElement("#invoice").value;

  if (!invoice.trim()) {
    isValid = false;
    getElement("#notiInvoice").innerHTML = "Thông tin không hợp lệ";
  } else if (!invoice.match(/^[0-9]*$/)) {
    isValid = false;
    getElement("#notiInvoice").innerHTML = "Chỉ nhập số ở đây";
  } else {
    getElement("#notiInvoice").innerHTML = "";
  }

  // Kiểm tra đánh giá của khách hàng
  let comment = getElement("#comment").value;

  if (!comment) {
    isValid = false;
    getElement("#notiComment").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiComment").innerHTML = "";
  }

  return isValid;
}

export { validatePerson, validateStudent, validateEmployee, validateCustomer };

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
