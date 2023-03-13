/* Tạo CLASS Person, Student, Employ, Customer */

// export { Person, Student, Employee, Customer };
// class ListPerson {
//   constructor(studentList, employeeList, customerList) {
//     this.studentList = studentList;
//     this.employeeList = employeeList;
//     this.customerList = customerList;
//   }
// }
// const studentList = new ListPerson([]);

class Person {
  constructor(id, userType, personalCode, fullName, address, email) {
    this.id = id;
    this.userType = userType;
    this.personalCode = personalCode;
    this.fullName = fullName;
    this.address = address;
    this.email = email;
  }
}

class Student extends Person {
  constructor(
    id,
    userType,
    personalCode,
    fullName,
    address,
    email,
    mathScore,
    physicsScore,
    chemistryScore
  ) {
    super(id, userType, personalCode, fullName, address, email);
    this.mathScore = +mathScore;
    this.physicsScore = +physicsScore;
    this.chemistryScore = +chemistryScore;
  }

  averageScore() {
    let averageScore =
      (this.mathScore + this.physicsScore + this.chemistryScore) / 3;
    return averageScore.toFixed(2);
  }
}

class Employee extends Person {
  constructor(
    id,
    userType,
    personalCode,
    fullName,
    address,
    email,
    workingDays,
    baseSalary
  ) {
    super(id, userType, personalCode, fullName, address, email);
    this.workingDays = Number(workingDays);
    this.baseSalary = Number(baseSalary);
  }

  totalSalary() {
    let income = this.workingDays * this.baseSalary;
    return income.toLocaleString();
  }
}

class Customer extends Person {
  constructor(
    id,
    userType,
    personalCode,
    fullName,
    address,
    email,
    company,
    invoice,
    assessment
  ) {
    super(id, userType, personalCode, fullName, address, email);
    this.company = company;
    this.invoice = Number(invoice).toLocaleString();
    this.assessment = assessment;
  }
}

export { Person, Student, Employee, Customer };
