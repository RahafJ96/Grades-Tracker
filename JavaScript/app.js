'use strict'

/***************** Global Values ******************/
let gradesForm = document.getElementById('gradesForm');
let headingTable = ['Student Name', 'Student Grade', 'Course', 'Status'];
let gradeTable = document.getElementById('gradeTable');
let studentInfo = [];

/***************** Functions ******************/


function Student(name, course) {
    this.name = name;
    this.grade =getRandomNumber();
    this.course = course;
    this.status = 0;

    studentInfo.push(this);
}

function getRandomNumber() {
    return  Math.floor(Math.random() * (100 - 0 + 1) ) + 0;

}


function handelSubmit(event) {
    event.preventDefault();
    // console.log('test button');

    //inputs *3 studentName,studentGrade,course
    let studentName = event.target.studentName.value;
    // let studentGrade = event.target.studentGrade.value;
    let course = event.target.course.value;

    let newStudent = new Student(studentName, course);

    localStorage.setItem('student', JSON.stringify(studentInfo));

    newStudent.renderStudent();
}

Student.prototype.renderStudent = function () {
    let trData = document.createElement('tr');

    let tdName = document.createElement('td');
    tdName.textContent = this.name;
    trData.appendChild(tdName);

    let tdGrade = document.createElement('td');
    tdGrade.textContent = this.grade;
    trData.appendChild(tdGrade);

    let tdCourse = document.createElement('td');
    tdCourse.textContent = this.course;
    trData.appendChild(tdCourse);

    let tdStatus = document.createElement('td');
    if(this.grade>='50'){
    tdStatus.textContent = 'PASS';}
    else{
        tdStatus.textContent = 'FAIL';
    }
    trData.appendChild(tdStatus);
    gradeTable.appendChild(trData);

    

}

function getFromLocalStorage() {
    if (localStorage.getItem('student')) {
        studentInfo = JSON.parse(localStorage.getItem('student'));
        renderAgain();
    }
}

//we need to render Again 
function renderAgain() {
    let trData = document.createElement('tr');

    for (let i = 0; i < studentInfo.length; i++) {   
    let tdName = document.createElement('td');
    tdName.textContent = studentInfo[i].name;
    trData.appendChild(tdName);

    let tdGrade = document.createElement('td');
    tdGrade.textContent =  studentInfo[i].grade;
    trData.appendChild(tdGrade);

    let tdCourse = document.createElement('td');
    tdCourse.textContent =  studentInfo[i].course;
    trData.appendChild(tdCourse);

    let tdStatus = document.createElement('td');
    if(studentInfo[i].grade>='50'){
    tdStatus.textContent = 'PASS';}
    else{
        tdStatus.textContent = 'FAIL';
    }
    trData.appendChild(tdStatus);
    }
    gradeTable.appendChild(trData);
}


//Create Heading
function headingFunction() {
    let rowTable = document.createElement('tr');
    let thElement;

    for (let i = 0; i < headingTable.length; i++) {
        thElement = document.createElement('th');
        thElement.textContent = headingTable[i];
        rowTable.appendChild(thElement);

    }

    gradeTable.appendChild(rowTable);
}




/***************** Events & Call Functions ******************/
gradesForm.addEventListener('submit', handelSubmit);
headingFunction();
renderAgain();
getFromLocalStorage();