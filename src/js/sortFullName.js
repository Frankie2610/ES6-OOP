//Sort người dùng theo tên
import {
  personList,
  studentList,
  employeeList,
  customerList,
  renderPerson,
  renderStudent,
  renderEmployee,
  renderCustomer,
} from "./index.js";
function sortJSON(arr, key, asc = true) {
  return arr.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    if (asc) {
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}

//Hàm Sort người dùng theo tên
window.sortFullName = function sortFullName() {
  let userTypeDropdown = getElement("#choosePersonTable").value;
  let sortOption = getElement("#sortOption").value;
  let logicValue;
  if (sortOption === "Từ A-Z") {
    logicValue = true;
  } else if (sortOption === "Từ Z-A") {
    logicValue = false;
  } else {
    alertFail("Vui lòng chọn lại");
    return;
  }
  if (userTypeDropdown === "Học sinh") {
    let html = sortJSON(studentList, "fullName", logicValue);
    // console.log(studentList);
    renderStudent(html);
  } else if (userTypeDropdown === "Nhân viên") {
    let html = sortJSON(employeeList, "fullName", logicValue);
    // console.log(employeeList);
    renderEmployee(html);
  } else if (userTypeDropdown === "Khách hàng") {
    let html = sortJSON(customerList, "fullName", logicValue);
    renderCustomer(html);
    // console.log(customerList);
  } else {
    let html = sortJSON(personList, "fullName", logicValue);
    renderPerson(html);
  }
};

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
