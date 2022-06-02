// Your code here
function createEmployeeRecord(employee){
    let testEmployee = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return testEmployee;
}
function createEmployeeRecords(arrOfArray) {
   let employeeRecords = [];
   employeeRecords = arrOfArray.map(createEmployeeRecord);
    return employeeRecords;
}
function createTimeInEvent(employee, timestamp) {
    //arg = employeeObj, timestamp ('YYYY-MM-DD HHMM')
    let obj = {
        type: 'TimeIn',
        hour: parseInt(timestamp.slice(-4)),
        date: timestamp.slice(0, 10)
        }
   employee.timeInEvents.push(obj);
   return employee;
 }
 
function createTimeOutEvent(employee, timestamp) {
    //arg = employeeObj, timestamp ('YYYY-MM-DD HHMM')
    let obj = {
        type: 'TimeOut',
        hour: parseInt(timestamp.slice(-4)),
        date: timestamp.slice(0, 10)
    }
    employee.timeOutEvents.push(obj);
   return employee;
}
function hoursWorkedOnDate(employee, date) {
    //find specific date inside employeeObj
    let hours;
    for(let i = 0; i < employee.timeInEvents.length; i++){
        if(employee.timeInEvents[i].date === date) {
            if(employee.timeOutEvents[i].date === date){
                hours = employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour;
                }
            }
         }
    return hours/100;
}
function wagesEarnedOnDate(employee, date) {
    
   return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}
function allWagesFor(employee) {
   let allDates = [];
   let totalPay = [];
    for( let i = 0; i < employee.timeInEvents.length; i++){
        allDates.push(employee.timeInEvents[i].date)
    }
   allDates.forEach(date => totalPay.push(wagesEarnedOnDate(employee, date)));
   return totalPay.reduce((previousPay, currentPay) => previousPay + currentPay);
}
function calculatePayroll(array) {
    let amountDue;
    amountDue = array.map(allWagesFor);
    let grandTotalOwed = amountDue.reduce((total1, total2) => total1 + total2)
    return grandTotalOwed;
}