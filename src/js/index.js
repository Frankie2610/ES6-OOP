import { ListPerson, Person, Student, Employee, Customer } from "./Person.js";
import {
  validateCustomer,
  validateEmployee,
  validatePerson,
  validateStudent,
} from "./validation.js";
import {
  getPersonAPI,
  deletePersonAPI,
  createPersonAPI,
  getPersonAPIByID,
  updatePersonAPI,
} from "./personAPI.js";

let personList = []; //Mảng chứa tất cả đối tượng người dùng
let studentList = []; //Mảng chứa đối tượng Học sinh
let employeeList = []; //Mảng chứa đối tượng Nhân viên
let customerList = []; //Mảng chứa đối tượng Khách hàng

// Lấy toàn bộ thông tin của người dùng từ server xuống và hiển thị
getPerson();

//Hàm tạo mới người dùng lên server
window.createPerson = async function createPerson() {
  let userType = getElement("#userTypeForm").value;
  const person = {
    personalCode: getElement("#personalCode").value,
    userType: getElement("#userTypeForm").value,
    fullName: getElement("#fullName").value,
    email: getElement("#email").value,
    address: getElement("#address").value,
  };

  let isValidPerson = validatePerson();
  let isValidStudent = validateStudent();
  let isValidEmployee = validateEmployee();
  let isValidCustomer = validateCustomer();

  if (!isValidPerson) {
    return;
  }
  //Trường hợp Học sinh
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
      await createPersonAPI(student); //Tạo học sinh mới trên server
      getElement("#choosePersonTable").value = "Học sinh"; //Cho dropdown hiển thị đối tượng học sinh
      displayStudentTable(); //Tạo form bảng của học sinh
      getStudent(student); //render lại bảng sau khi thêm học sinh
      alertSuccess("Thêm thông tin học sinh thành công"); //Alert báo thêm thành công
    } catch (error) {
      alertFail("Thêm thông tin học sinh thất bại");
    }
    //Trường hợp Nhân viên
  } else if (userType === "Nhân viên") {
    try {
      if (!isValidEmployee) {
        return;
      }
      const employee = {
        ...person,
        workingDays: getElement("#days").value,
        dailySalary: getElement("#dailySalary").value,
      };
      await createPersonAPI(employee);
      getElement("#choosePersonTable").value = "Nhân viên";
      displayEmployeeTable();
      getEmployee(employee);
      alertSuccess("Thêm thông tin nhân viên thành công");
    } catch (error) {
      alertFail("Thêm thông tin nhân viên thất bại");
    }
    //Trường hợp Khách hàng
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
      await createPersonAPI(customer);
      getElement("#choosePersonTable").value = "Khách hàng";
      displayCustomerTable();
      getCustomer(customer);
      alertSuccess("Thêm thông tin khách hàng thành công");
    } catch (error) {
      alertFail("Thêm thông tin khách hàng thất bại");
    }
  } else {
    alertFail("Chưa điền đầy đủ thông tin đối tượng");
  }
  $("#personModal").modal("hide"); //Đóng modal sau khi tạo các đối tượng thành công
};

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
  // debugger;
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
                  <td class="text-center">${employee.totalIncome()}</td>
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
window.selectPerson = async function selectPerson(personId) {
  getElement("#btnAdd").style.display = "none";
  getElement("#btnUpdate").style.display = "inline-block";

  let userTypeDropdown = getElement("#choosePersonTable").value; //Người dùng ở ô Dropdown.

  const selectedPerson = await getPersonAPIByID(personId);
  try {
    const person = selectedPerson.data;
    let userType = person.userType; //Người dùng ở ô Phân loại.
    if (userTypeDropdown === "Đối tượng") {
      getElement("#userTypeForm").value = userType;
      getElement("#personalCode").value = person.personalCode;
      getElement("#fullName").value = person.fullName;
      getElement("#email").value = person.email;
      getElement("#address").value = person.address;
    } else {
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
        getElement("#dailySalary").value = person.dailySalary;
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
    }
    getElement("#btnUpdate").setAttribute(
      "onclick",
      `window.updatePerson(${person.id})`
    );
  } catch (error) {
    alertFail("Lấy thông tin người dùng thất bại");
  }
};

// Hàm cập nhật thông tin user
window.updatePerson = function updatePerson(personId) {
  // debugger;
  let userTypeDropdown = getElement("#choosePersonTable").value; //Người dùng ở ô Dropdown.
  let userType = getElement("#userTypeForm").value; //Người dùng ở ô phân loại
  const person = {
    userType: getElement("#userTypeForm").value,
    personalCode: getElement("#personalCode").value,
    fullName: getElement("#fullName").value,
    email: getElement("#email").value,
    address: getElement("#address").value,
  };
  // Kiểm tra các thông tin cơ bản
  let isValidPerson = validatePerson();
  if (!isValidPerson) {
    alertFail("Cập nhật thông tin người dùng thất bại");
    return;
  } //TH1: Nếu ô Dropdown là "Đối tượng"
  if (userTypeDropdown === "Đối tượng") {
    updatePersonAPI(person, personId)
      .then((response) => {
        alertSuccess("Cập nhật thông tin người dùng thành công");
        getPerson();
      })
      .catch((error) => {
        alertFail("Cập nhật thông tin người dùng thất bại");
      });
    //TH2: Nếu ô Dropdown là: Học sinh, Nhân viên và khách hàng. TH này sẽ render lại bảng theo renderStudent, renderEmployee, renderCustomer. Sỡ dĩ cần thêm biến này để render bảng trong trường hợp user chọn Chỉnh sửa ở khi ở displayPersonTable (Tức chỉ chỉnh sửa các thông tin cơ bản như: Tên, địa chỉ, địa chỉ email). Ko xét trường hợp này thì sẽ render bảng theo user ở ô phân loại
  } else {
    if (userType === "Học sinh") {
      const student = {
        ...person,
        mathScore: +getElement("#math").value,
        physicsScore: +getElement("#physics").value,
        chemistryScore: +getElement("#chemistry").value,
      };
      let isValidStudent = validateStudent();
      if (!isValidStudent) {
        alertFail("Cập nhật thông tin học sinh thất bại");
        return;
      }
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
        dailySalary: getElement("#dailySalary").value,
      };
      let isValidEmployee = validateEmployee();
      if (!isValidEmployee) {
        alertFail("Cập nhật thông tin nhân viên thất bại");
        return;
      }
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
      let isValidCustomer = validateCustomer();
      if (!isValidCustomer) {
        alertFail("Cập nhật thông tin khách hàng thất bại");
        return;
      }
      updatePersonAPI(customer, personId)
        .then((response) => {
          alertSuccess("Cập nhật thông tin khách hàng thành công");
          getCustomer();
        })
        .catch((error) => {
          alertFail("Cập nhật thông tin khách hàng thất bại");
        });
    }
  }
  resetForm();
  $("#personModal").modal("hide");
};

//Hàm lấy thông tin của đối tượng bất kỳ
async function getPerson(value) {
  try {
    const { data: personData } = await getPersonAPI(value);
    const person = personData.map((person) => {
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
    personList = new ListPerson(person).array;
    renderPerson(person);
  } catch (error) {
    alertFail("Lấy thông tin người dùng thất bại");
  }
}

//Hàm lấy thông tin của đối tượng học sinh
async function getStudent() {
  try {
    const { data: studentData } = await getPersonAPI("Học sinh");
    const student = studentData.map((student) => {
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
    studentList = new ListPerson(student).array;
    renderStudent(student);
  } catch (error) {
    alertFail("Lấy thông tin học sinh thất bại");
  }
}

//Hàm lấy thông tin của đối tượng nhân viên
async function getEmployee() {
  try {
    const { data: employeeData } = await getPersonAPI("Nhân viên");
    const employee = employeeData.map((employee) => {
      return new Employee(
        employee.id,
        employee.userType,
        employee.personalCode,
        employee.fullName,
        employee.address,
        employee.email,
        employee.workingDays,
        employee.dailySalary
      );
    });
    employeeList = new ListPerson(employee).array;
    renderEmployee(employee);
  } catch (error) {
    alertFail("Lấy thông tin học sinh thất bại");
  }
}

//Hàm lấy thông tin của đối tượng khách hàng
async function getCustomer() {
  try {
    const { data: customerData } = await getPersonAPI("Khách hàng");
    const customer = customerData.map((customer) => {
      return new Customer(
        customer.id,
        customer.userType,
        customer.personalCode,
        customer.fullName,
        customer.address,
        customer.email,
        customer.company,
        customer.invoice,
        customer.assessment
      );
    });
    customerList = new ListPerson(customer).array;
    renderCustomer(customer);
  } catch (error) {
    alertFail("Lấy thông tin khách hàng thất bại");
  }
}

//Hàm xóa thông tin của đối tượng bất kì khỏi server
window.deletePerson = async function deletePerson(personId) {
  try {
    let userTypeDropdown = getElement("#choosePersonTable").value; //Người dùng ở ô Dropdown.
    const deletedPerson = await deletePersonAPI(personId);
    let userType = deletedPerson.data.userType; //Ô phân loại của người bị xóa
    if (userTypeDropdown === "Đối tượng") {
      await getPerson();
    } else {
      if (userType === "Học sinh") {
        await getStudent();
      } else if (userType === "Nhân viên") {
        await getEmployee();
      } else if (userType === "Khách hàng") {
        await getCustomer();
      }
    }
    alertSuccess("Xóa thông tin người dùng thành công");
  } catch (error) {
    alertFail("Xóa thông tin người dùng thất bại");
  }
};

// ========DOM===========
getElement("#choosePersonTable").addEventListener("change", () => {
  getElement("#sortOption").value = "Sắp xếp";
  resetDisplayTable();
  let userTypeTable = getElement("#choosePersonTable").value;
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
  // debugger;
  getElement("#btnUpdate").style.display = "none";
  getElement("#btnAdd").style.display = "inline-block";
  resetForm();
});

getElement("#btnClose").addEventListener("click", () => {
  resetForm();
  displayPersonForm();
});

//Hàm hiển thị bảng thông tin tất cả đối tượng
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

//Hàm hiển thị bảng thông tin đối tượng Học sinh
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

//Hàm hiển thị bảng thông tin đối tượng Nhân viên
function displayEmployeeTable() {
  // debugger;
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageScore").classList.add("d-none");
  getElement("#thWorkingDays").classList.remove("d-none");
  getElement("#thIncome").classList.remove("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thAssessment").classList.add("d-none");
}

//Hàm hiển thị bảng thông tin đối tượng Khách hàng
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

//Hàm reset bảng thông tin đối tượng
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

//Hàm reset form fill thông tin đối tượng
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
  getElement("#dailySalary").value = "";
  getElement("#company").value = "";
  getElement("#invoice").value = "";
  getElement("#comment").value = "";

  getElement("#notiFullName").innerHTML = "";
  getElement("#notiPersonalCode").innerHTML = "";
  getElement("#notiEmail").innerHTML = "";
  getElement("#notiAddress").innerHTML = "";
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

//Hàm hiển thị form theo tất cả đối tượng
function displayPersonForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.add("d-none");
}

//Hàm hiển thị form theo đối tượng học sinh
function displayStudentForm() {
  getElement(".student-info").classList.remove("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.add("d-none");
}

//Hàm hiển thị form theo đối tượng nhân viên
function displayEmployeeForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.remove("d-none");
  getElement(".company-info").classList.add("d-none");
}

//Hàm hiển thị form theo đối tượng khách hàng
function displayCustomerForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.remove("d-none");
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}

export {
  personList,
  studentList,
  employeeList,
  customerList,
  renderPerson,
  renderStudent,
  renderEmployee,
  renderCustomer,
};
