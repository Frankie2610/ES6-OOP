function validatePerson() {
  let isValid = true;
  // kiểm tra loại người dùng
  let userType = getElement("#userTypeForm").value;
  if (userType === "Đối tượng") {
    isValid = false;
    getElement("#notiCategoryForm").innerHTML =
      "Vui lòng chọn cho biết bạn là ai";
  } else {
    getElement("#notiCategoryForm").innerHTML = "";
  }

  // kiểm tra họ tên
  let fullName = getElement("#fullName").value;
  if (!fullName) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiFullName").innerHTML = "";
  }

  // kiểm tra email
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
    getElement("#notiAddres").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiAddres").innerHTML = "";
  }

  return isValid;
}

function validateStudent() {
  let isValid = true;
  const GRADE_RANGE = "Điểm phải nằm trong phạm vi từ 0 ~ 10";

  // kiểm tra điểm toán
  let math = getElement("#math").value;
  if (!math) {
    isValid = false;
    getElement("#notiMath").innerHTML = "Thông tin không hợp lệ";
  } else if (Number(math) > 10 || Number(math) < 0) {
    isValid = false;
    getElement("#notiMath").innerHTML = GRADE_RANGE;
  } else {
    getElement("#notiMath").innerHTML = "";
  }

  // kiểm tra điểm lý
  let physics = getElement("#physics").value;
  if (!physics) {
    isValid = false;
    getElement("#notiPhysics").innerHTML = "Thông tin không hợp lệ";
  } else if (Number(physics) > 10 || Number(physics) < 0) {
    isValid = false;
    getElement("#notiPhysics").innerHTML = GRADE_RANGE;
  } else {
    getElement("#notiPhysics").innerHTML = "";
  }

  // kiểm tra điểm hóa
  let chemistry = getElement("#chemistry").value;
  if (!chemistry) {
    isValid = false;
    getElement("#notiChemistry").innerHTML = "Thông tin không hợp lệ";
  } else if (Number(chemistry) > 10 || Number(chemistry) < 0) {
    isValid = false;
    getElement("#notiChemistry").innerHTML = GRADE_RANGE;
  } else {
    getElement("#notiChemistry").innerHTML = "";
  }

  return isValid;
}

function validateEmployee() {
  let isValid = true;

  // kiểm tra số ngày làm việc
  let days = getElement("#days").value;

  if (!days) {
    isValid = false;
    getElement("#notiDays").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiDays").innerHTML = "";
  }

  // kiểm tra lương ngày
  let baseSalary = getElement("#baseSalary").value;

  if (!baseSalary.trim()) {
    isValid = false;
    getElement("#notiBaseSalary").innerHTML = "Thông tin không hợp lệ";
  } else if (!baseSalary.match(/^[0-9]*$/)) {
    isValid = false;
    getElement("#notiBaseSalary").innerHTML = "Chỉ nhập số ở đây";
  } else {
    getElement("#notiBaseSalary").innerHTML = "";
  }

  return isValid;
}

function validateCustomer() {
  let isValid = true;

  // kiểm tra tên công ty
  let company = getElement("#company").value;

  if (!company) {
    isValid = false;
    getElement("#notiCompany").innerHTML = "Thông tin không hợp lệ";
  } else {
    getElement("#notiCompany").innerHTML = "";
  }

  // kiểm tra trị giá hóa đơn
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

  // kiểm tra đánh giá của khách hàng
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
