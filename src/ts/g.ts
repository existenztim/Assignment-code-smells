/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from "./models/Product";
import { Student } from "./models/Student";
import { Temperature } from "./models/Temperature";
import { User } from "./models/User";
/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {
  let totalNumber = 0;

  totalNumber = jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

  return totalNumber;
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

function getStudentStatus(student: Student): string {
  student.passed =
    student.name == "Sebastian"
      ? student.handedInOnTime
        ? true
        : false
      : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

function averageWeeklyTemperature(temperatures: Temperature[]) {
  let averageTemperature = 0;
  const secondsInWeek = 604800000;
  
  for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i].location === "Stockholm") {
      if (temperatures[i].date.getTime() > Date.now() - secondsInWeek) {
        averageTemperature += temperatures[i].value;
      }
    }
  }

  return averageTemperature / 7;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(products: Product) {
  const container = document.createElement("div");
  container.innerHTML = /*html */`
    <h4>${products.name}</h4>
    <strong>${products.price.toString}</strong> 
    <img src = ${products.image}>
  `
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
  function presentStudents(students: Student[]) {
    for (const student of students) {
        const container = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if (student.handedInOnTime) {
        checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
        container.appendChild(checkbox);
        const listOfStudents = document.querySelector("ul#passedstudents");
        listOfStudents?.appendChild(container);
    }
  }

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
  function concatenateStrings() {

    const texts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"]
    const sumOfTexts = texts.join(" ");
    
    return sumOfTexts;
    }

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(users: User) {
  // Validation

  const ageDiff = Date.now() - users.birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}