import { Person, Student, Employee, Customer } from "./Person.js";
import {
  getPersonAPI,
  deletePersonAPI,
  createPersonAPI,
  getPersonAPIByID,
  updatePersonAPI,
} from "./personAPI.js";
import {
  validateCustomer,
  validateEmployee,
  validatePerson,
  validateStudent,
} from "./validation.js";
// Lấy toàn bộ thông tin của người dùng từ server xuống và hiển thị
getPerson();

//Hàm tạo mới người dùng lên server
getElement("#btnAdd").addEventListener("click", () => {
  // debugger;
  let userType = getElement("#userTypeForm").value;
  console.log(userType);
  let isValidPerson = validatePerson();
  let isValidStudent = validateStudent();
  let isValidEmployee = validateEmployee();
  let isValidCustomer = validateCustomer();

  const person = {
    personalCode: getElement("#personalCode").value,
    userType: getElement("#userTypeForm").value,
    fullName: getElement("#fullName").value,
    email: getElement("#email").value,
    address: getElement("#address").value,
  };
  if (!isValidPerson) {
    return;
  }

  if (userType === "Học sinh") {
    try {
      if (!isValidStudent) {
        return;
      }
      const student = {
        ...person,
        mathScore: getElement("#math").value,
        physicsScore: getElement("#physics").value,
        chemistryScore: getElement("#chemistry").value,
      };
      createPersonAPI(student);
      console.log(student);
      alertSuccess("Thêm thông tin học sinh thành công");
      getStudent(student);
      // renderStudent(student);
    } catch (error) {
      alertFail("Thêm thông tin học sinh thất bại");
    }
    resetForm();
    displayStudentForm();
  } else if (userType === "Nhân viên") {
    try {
      if (!isValidEmployee) {
        return;
      }
      const employee = {
        ...person,
        workingDays: getElement("#days").value,
        baseSalary: getElement("#baseSalary").value,
      };
      createPersonAPI(employee);
      getEmployee(employee);
      console.log(employee);
      alertSuccess("Thêm thông tin nhân viên thành công");
    } catch (error) {
      console.log(error);
      alertFail("Thêm thông tin nhân viên thất bại");
    }
    // resetForm();
    // displayEmployeeForm();
  } else if (userType === "Khách hàng") {
    try {
      if (!isValidCustomer) {
        return;
      }
      const customer = {
        ...person,
        company: getElement("#company").value,
        invoice: getElement("#invoice").value,
        assessment: getElement("#comment").value,
      };
      createPersonAPI(customer);
      getPerson(customer);
      alertSuccess("Thêm thông tin khách hàng thành công");
    } catch (error) {
      console.log(error);
      alertFail("Thêm thông tin khách hàng thất bại");
    }
    // resetForm();
    // displayCustomerForm();
  } else {
    alertFail("Chưa điền đầy đủ thông tin đối tượng");
  }
  // resetForm();
  // displayPersonForm();
  // getElement("#personModal").classList.add("close");
  // getPerson(person);
});

// selectPerson(personID);

// Hàm hiển thị danh sách toàn bộ đối tượng trung tâm quản lý
function renderPerson(person) {
  let html = person.reduce((result, person) => {
    return (
      result +
      `
              <tr>
                  <td class="text-center">${person.personalCode}</td>
                  <td class="text-center">${person.userType}</td>
                  <td class="text-center">${person.fullName}</td>
                  <td class="text-center">${person.address}</td>
                  <td class="text-center">${person.email}</td>
                  <td class="text-center">
                      <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal"  data-id='${person.id}' onclick="selectPerson('${person.id}')">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                      <button class="btn btn-danger my-1" onclick="deletePerson('${person.id}')">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                  </td>
              </tr>
              `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

//Hàm filter danh sách Học sinh
function renderStudent(student) {
  let html = student.reduce((result, student) => {
    return (
      result +
      `
              <tr>
                  <td class="text-center">${student.personalCode}</td>
                  <td class="text-center">${student.userType}</td>
                  <td class="text-center">${student.fullName}</td>
                  <td class="text-center">${student.address}</td>
                  <td class="text-center">${student.email}</td>
                  <td class="text-center">${student.mathScore}</td>
                  <td class="text-center">${student.physicsScore}</td>
                  <td class="text-center">${student.chemistryScore}</td>
                  <td class="text-center">${student.averageScore()}</td>
                  <td class="text-center">
                      <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${
                        student.id
                      }" onclick="selectPerson('${
        student.id
      }')">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                      <button class="btn btn-danger my-1" onclick="deletePerson('${
                        student.id
                      }')">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                  </td>
              </tr>
              `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

//Hàm filter danh sách Nhân viên
function renderEmployee(employee) {
  let html = employee.reduce((result, employee) => {
    return (
      result +
      `
              <tr>
                  <td class="text-center">${employee.personalCode}</td>
                  <td class="text-center">${employee.userType}</td>
                  <td class="text-center">${employee.fullName}</td>
                  <td class="text-center">${employee.address}</td>
                  <td class="text-center">${employee.email}</td>
                  <td class="text-center">${employee.workingDays}</td>
                  <td class="text-center">${employee.totalSalary()}</td>
                  <td class="text-center">
                      <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${
                        employee.id
                      }" onclick="selectPerson('${
        employee.id
      }')">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                      <button class="btn btn-danger my-1" onclick="deletePerson('${
                        employee.id
                      }')">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                  </td>
              </tr>
              `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

//Hàm filter danh sách Khách hàng
function renderCustomer(customer) {
  let html = customer.reduce((result, customer) => {
    return (
      result +
      `
              <tr>
                  <td class="text-center">${customer.personalCode}</td>
                  <td class="text-center">${customer.userType}</td>
                  <td class="text-center">${customer.fullName}</td>
                  <td class="text-center">${customer.address}</td>
                  <td class="text-center">${customer.email}</td>
                  <td class="text-center">${customer.company}</td>
                  <td class="text-center">${customer.invoice}</td>
                  <td class="text-center">${customer.assessment}</td>
                  <td class="text-center">
                      <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${customer.id}" onclick="selectPerson('${customer.id}')">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                      <button class="btn btn-danger my-1" onclick="deletePerson('${customer.id}')">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                  </td>
              </tr>
              `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

//Hàm hiển thị thông tin của 1 đối tượng bất kì lên form để chuẩn bị update
window.selectPerson = function selectPerson(personId) {
  getElement("#btnAdd").style.display = "none";
  getElement("#btnUpdate").style.display = "inline-block";
  getPersonAPIByID(personId)
    .then((response) => {
      //   console.log(person);
      const person = response.data;
      console.log(response.data);
      let userType = person.userType;
      if (userType === "Học sinh") {
        getElement("#userTypeForm").value = userType;
        getElement("#personalCode").value = person.personalCode;
        getElement("#fullName").value = person.fullName;
        getElement("#email").value = person.email;
        getElement("#address").value = person.address;
        getElement("#math").value = person.mathScore;
        getElement("#physics").value = person.physicsScore;
        getElement("#chemistry").value = person.chemistryScore;
        displayStudentForm();
      } else if (userType === "Nhân viên") {
        getElement("#userTypeForm").value = userType;
        getElement("#personalCode").value = person.personalCode;
        getElement("#fullName").value = person.fullName;
        getElement("#email").value = person.email;
        getElement("#address").value = person.address;
        getElement("#days").value = person.workingDays;
        getElement("#baseSalary").value = person.baseSalary;
        displayEmployeeForm();
      } else if (userType === "Khách hàng") {
        getElement("#userTypeForm").value = userType;
        getElement("#personalCode").value = person.personalCode;
        getElement("#fullName").value = person.fullName;
        getElement("#email").value = person.email;
        getElement("#address").value = person.address;
        getElement("#company").value = person.company;
        getElement("#invoice").value = person.invoice;
        getElement("#comment").value = person.assessment;
        displayCustomerForm();
      }
      getElement("#btnUpdate").setAttribute(
        "onclick",
        `window.updatePerson(${person.id})`
      );
    })
    .catch((error) => {
      console.log(error);
      alertFail("Lấy thông tin bằng ID thất bại");
    });
};

// Hàm cập nhật thông tin user
window.updatePerson = function updatePerson(personId) {
  debugger;
  let userType = getElement("#userTypeForm").value;
  const person = {
    userType: getElement("#userTypeForm").value,
    personalCode: getElement("#personalCode").value,
    fullName: getElement("#fullName").value,
    email: getElement("#email").value,
    address: getElement("#address").value,
  };

  if (userType === "Học sinh") {
    const student = {
      ...person,
      mathScore: +getElement("#math").value,
      physicsScore: +getElement("#physics").value,
      chemistryScore: +getElement("#chemistry").value,
    };
    updatePersonAPI(student, personId)
      .then((response) => {
        alertSuccess("Cập nhật thông tin học sinh thành công");
        getStudent();
      })
      .catch((error) => {
        alertFail("Cập nhật thông tin học sinh thất bại");
      });
  } else if (userType === "Nhân viên") {
    const employee = {
      ...person,
      workingDays: getElement("#days").value,
      baseSalary: getElement("#baseSalary").value,
    };

    updatePersonAPI(employee, personId)
      .then((response) => {
        alertSuccess("Cập nhật thông tin nhân viên thành công");
        getEmployee();
      })
      .catch((error) => {
        alertFail("Cập nhật thông tin nhân viên thất bại");
      });
  } else if (userType === "Khách hàng") {
    const customer = {
      ...person,
      company: getElement("#company").value,
      invoice: getElement("#invoice").value,
      assessment: getElement("#comment").value,
    };
    updatePersonAPI(customer, personId)
      .then((response) => {
        alertSuccess("Cập nhật thông tin khách hàng thành công");
        getCustomer();
      })
      .catch((error) => {
        alertFail("Cập nhật thông tin khách hàng thất bại");
      });
  }
  resetForm();
};

//Hàm lấy thông tin của đối tượng bất kỳ
function getPerson() {
  getPersonAPI()
    .then((response) => {
      const person = response.data.map((person) => {
        return new Person(
          person.id,
          person.userType,
          person.personalCode,
          person.fullName,
          person.address,
          person.email,
          person.id
        );
      });
      console.log(response.data);
      renderPerson(person);
    })
    .catch((error) => {
      console.log(error);
      alertFail("Lấy thông tin người dùng thất bại");
    });
}

//Hàm lấy thông tin của đối tượng học sinh
function getStudent() {
  getPersonAPI("Học sinh")
    .then((response) => {
      console.log(response.data);
      const student = response.data.map((student) => {
        return new Student(
          student.id,
          student.userType,
          student.personalCode,
          student.fullName,
          student.address,
          student.email,
          student.mathScore,
          student.physicsScore,
          student.chemistryScore
        );
      });
      renderStudent(student);
    })
    .catch((error) => {
      console.log(error);
      alertFail("Lấy thông tin học sinh thất bại");
    });
}

//Hàm lấy thông tin của đối tượng nhân viên
function getEmployee() {
  getPersonAPI("Nhân viên")
    .then((response) => {
      const employee = response.data.map((employee) => {
        return new Employee(
          employee.id,
          employee.userType,
          employee.personalCode,
          employee.fullName,
          employee.address,
          employee.email,
          employee.workingDays,
          employee.baseSalary
        );
      });
      renderEmployee(employee);
    })
    .catch((error) => {
      console.log(error);
      alertFail("Lấy thông tin nhân viên thất bại");
    });
}

//Hàm lấy thông tin của đối tượng khách hàng
function getCustomer() {
  getPersonAPI("Khách hàng")
    .then((response) => {
      const customer = response.data.map((customer) => {
        return new Customer(
          customer.id,
          customer.userType,
          customer.personalCode,
          customer.fullName,
          customer.address,
          customer.email,
          customer.company,
          customer.invoice,
          customer.assessment,
          customer.id
        );
      });
      console.log(customer);
      renderCustomer(customer);
    })
    .catch((error) => {
      console.log(error);
      alertFail("Lấy thông tin khách hàng thất bại");
    });
}

//Hàm xóa thông tin của đối tượng bất kì khỏi server
window.deletePerson = function deletePerson(personId) {
  deletePersonAPI(personId)
    .then((response) => {
      alertSuccess("Xóa thông tin người dùng thành công");
      getPerson();
    })
    .catch((error) => {
      alertFail("Xóa thông tin người dùng thất bại");
    });
};

/* DOM */
getElement("#choosePersonTable").addEventListener("change", () => {
  resetDisplayTable();
  let userTypeTable = getElement("#choosePersonTable").value;
  console.log(userTypeTable);
  if (userTypeTable === "Học sinh") {
    getStudent();
    displayStudentTable();
  } else if (userTypeTable === "Nhân viên") {
    getEmployee();
    displayEmployeeTable();
  } else if (userTypeTable === "Khách hàng") {
    getCustomer();
    displayCustomerTable();
  } else {
    getPerson();
    displayPersonTable();
  }
});

getElement("#userTypeForm").addEventListener("change", () => {
  let userType = getElement("#userTypeForm").value;
  if (userType === "Học sinh") {
    displayStudentForm();
  } else if (userType === "Nhân viên") {
    displayEmployeeForm();
  } else if (userType === "Khách hàng") {
    displayCustomerForm();
  } else {
    displayPersonForm();
  }
});

getElement("#btnOpenModal").addEventListener("click", () => {
  debugger;
  getElement("#btnUpdate").style.display = "none";
  getElement("#btnAdd").style.display = "inline-block";
  resetForm();
});

getElement("#btnClose").addEventListener("click", () => {
  resetForm();
  displayPersonForm();
});

function displayPersonTable() {
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageScore").classList.add("d-none");
  getElement("#thWorkingDays").classList.add("d-none");
  getElement("#thIncome").classList.add("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thAssessment").classList.add("d-none");
}

function displayStudentTable() {
  getElement("#thMath").classList.remove("d-none");
  getElement("#thPhysics").classList.remove("d-none");
  getElement("#thChemistry").classList.remove("d-none");
  getElement("#thAverageScore").classList.remove("d-none");
  getElement("#thWorkingDays").classList.add("d-none");
  getElement("#thIncome").classList.add("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thAssessment").classList.add("d-none");
}

function displayEmployeeTable() {
  debugger;
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageScore").classList.add("d-none");
  getElement("#thIncome").classList.remove("d-none");
  getElement("#thCompany").classList.remove("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thAssessment").classList.add("d-none");
}

function displayCustomerTable() {
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageScore").classList.add("d-none");
  getElement("#thWorkingDays").classList.add("d-none");
  getElement("#thIncome").classList.add("d-none");
  getElement("#thCompany").classList.remove("d-none");
  getElement("#thInvoice").classList.remove("d-none");
  getElement("#thAssessment").classList.remove("d-none");
}

function resetDisplayTable() {
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageScore").classList.add("d-none");
  getElement("#thWorkingDays").classList.add("d-none");
  getElement("#thIncome").classList.add("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thAssessment").classList.add("d-none");
}

window.resetForm = function resetForm() {
  getElement("#userTypeForm").value = "Bạn là ai?";
  getElement("#personalCode").value = "";
  getElement("#fullName").value = "";
  getElement("#email").value = "";
  getElement("#address").value = "";
  getElement("#math").value = "";
  getElement("#physics").value = "";
  getElement("#chemistry").value = "";
  getElement("#days").value = "";
  getElement("#baseSalary").value = "";
  getElement("#company").value = "";
  getElement("#invoice").value = "";
  getElement("#comment").value = "";

  getElement("#notiFullName").innerHTML = "";
  getElement("#notiPersonalCode").innerHTML = "";
  getElement("#notiEmail").innerHTML = "";
  getElement("#notiAddres").innerHTML = "";
  getElement("#notiMath").innerHTML = "";
  getElement("#notiPhysics").innerHTML = "";
  getElement("#notiChemistry").innerHTML = "";
  getElement("#notiDays").innerHTML = "";
  getElement("#notiBaseSalary").innerHTML = "";
  getElement("#notiCompany").innerHTML = "";
  getElement("#notiInvoice").innerHTML = "";
  getElement("#notiComment").innerHTML = "";
  displayPersonForm();
};

function displayPersonForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.add("d-none");
}

function displayStudentForm() {
  getElement(".student-info").classList.remove("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.add("d-none");
}

function displayEmployeeForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.remove("d-none");
  getElement(".company-info").classList.add("d-none");
}

function displayCustomerForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.remove("d-none");
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
