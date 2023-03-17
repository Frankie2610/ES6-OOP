class ListPerson {
  constructor(array) {
    this.array = array;
  }
}

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
    dailySalary
  ) {
    super(id, userType, personalCode, fullName, address, email);
    this.workingDays = Number(workingDays);
    this.dailySalary = Number(dailySalary);
  }

  totalSalary() {
    let income = this.workingDays * this.dailySalary;
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

export { ListPerson, Person, Student, Employee, Customer };
