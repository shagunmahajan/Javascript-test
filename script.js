//variable defination and declaration
var monthlyIncomeModal = document.querySelector("#monthlyIncomeModal");
var modifyBudgetModal = document.querySelector("#modifyBudgetModal");
var addExpensesModal = document.querySelector('#addExpensesModal');
var showAllExpensesModal = document.querySelector('#showAllExpensesModal');
var dateInput = document.querySelector('#dateInput');
var modifyBudgetBtn = document.querySelector('#modifyBudget-btn');
var modifyBudgetInput = document.querySelector('#modifyBudgetInput');
var submitBudgetBtn = document.querySelector('#submitBudget-btn');
var addExpenseBtn = document.querySelector('#addExpenses-btn');
var mainWindow = document.getElementById('section');
var budgetValueDisplay = document.querySelector('#budgetValueDisplay');
var addFixedExpenseBtn = document.querySelector('#addFixedExpense-btn');
var addVariableExpenseBtn = document.querySelector('#addVariousExpense-btn');
var selectExpenseType = document.querySelector('#select-expense-type');
var expenseName = document.querySelector('#expenseName');
var expenseAmount = document.querySelector('#expenseAmount');
var expenseDate = document.querySelector('#dateOfExpense');
var expenseTable = document.querySelector('#addExpenseTable').getElementsByTagName('tbody')[0];
var showExpenseTable;
var viewAllExpenseBtn = document.querySelector('#viewAllExpenses-btn');
var fixedExpenseTyp = document.querySelector('#select-fixed-expense-type');

var submitBtn = document.getElementById("submit-btn");
var budgetValue = document.querySelectorAll('span')[0];
var totalExpenses = document.querySelectorAll('span')[1];
var balance = document.querySelectorAll('span')[2];
var savings = document.querySelectorAll('span')[3];
var totalExpensesValue = 0;
var rentValue = 0;
var billsValue = 0;
var emiValue = 0;
var groceryValue = 0;
var otherExpenseValue = 0;
var count = 1;
var retainExpenseType;
var today = new Date();
var rowCount;
var date;
var index;
var modifiedBudgetValue = 0;

// Get the <span> element that closes the modal
var closeModalBudget = document.getElementsByClassName("close")[0];
var closeModalExpense = document.getElementsByClassName("close")[1];

var monthlyIncome = document.getElementById('monthlyIncome');
var budgetTextValue;
var savingsValue, balanceValue;

// When the user loads the application, open the modal 
window.onload = function () {
  monthlyIncomeModal.style.display = "block";
  mainWindow.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
closeModalBudget.onclick = function () {
  modifyBudgetModal.style.display = "none";
  mainWindow.style.display = "block";
}

//close add expense modal
closeModalExpense.onclick = function () {
  if (getExpenses() <= 0 || getExpenses >= balanceValue) {
    alert("Expenses cannot be zero, Please add fixed/variable expenses");
  }
  else
    addExpensesModal.style.display = "none";
  mainWindow.style.display = "block";
}

//function to verify the input value for budget and close modal accordingly
function closeModifyBudgetModal() {
  if (isNaN(modifyBudgetInput.value) || modifyBudgetInput.value < 1) {
    document.getElementById("modifyBudgetErr").innerHTML = "Provided Budget is invalid";
  }
  else if (modifyBudgetInput.value > monthlyIncome.value || modifyBudgetInput.value < totalExpensesValue) {
    alert("Budget cannot be greater than monthly income and less than expenses till now");
  }
  else {
    document.getElementById("modifyBudgetErr").innerHTML = "";
    modifiedBudgetValue = modifyBudgetInput.value;
    showBudget();

    // allow form to reset before the modal disappears
    setTimeout(function () {
      modifyBudgetModal.style.display = "none";
    });
    mainWindow.style.display = "block";
    modifyBudgetBtn.focus();
  }

}

//function to display modify budget modal
function showModifyBudgetModal(event) {
  modifyBudgetModal.style.display = "block";
  mainWindow.style.display = "none";
}

//function to display add expenses moda;
function showAddExpensesModal(event) {
  addExpensesModal.style.display = "block";
  budgetValueDisplay.innerText = "Available budget is Rs. " + (getBudget() - getExpenses());
  showCountdown();
  mainWindow.style.display = "none";
}


//function to prevent browser refresh upon form submission
function handleForm(event) {
  event.preventDefault();
}

//function to verify closure of monthly income modal
function closeMonthlyIncomeModal(event) {
  if (!verifyMonthlyIncome()) {
    document.getElementById("monthlyIncomeErr").innerHTML = "Provided Monthly Income is invalid";
  }
  else if (!verifyDate()) {
    document.getElementById("dateInputErr").innerHTML = "Provided date and time is invalid. Date cannot be current or previous dates"
  }
  else {
    showBudget();
    monthlyIncomeModal.style.display = "none";
    mainWindow.style.display = "block";
  }
}

//function to close all expense modal when user hit escape key
function closeShowExpenseModal(event) {
  var eventCode = event.keyCode || event.which || event.key;
  if ((eventCode === "Escape" || eventCode === 'Esc' || eventCode == 27) && (showAllExpensesModal.style.display == "block")) {
    showAllExpensesModal.style.display = "none";
    addExpensesModal.style.display = "block";
    viewAllExpenseBtn.focus();
  }
}

//function to show data in main screen
function showBudget(event) {
  budgetValue.innerText = "Rs. " + getBudget();
  totalExpenses.innerText = "Rs. " + getExpenses();
  balance.innerText = "Rs. " + getBalance(modifyBudgetInput.value);
  savings.innerText = "Rs. " + getSavings();
}

//fucntion for expense error
function expenseErrorFunction() {
  document.getElementById("ExpenseErr").innerHTML = "Please Provide valid data in all fields";
  return false;
}

//function to verify provided expense date
function verifyExpenseDate() {
  date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
  var dateInputValue = dateInput.value;
  if (expenseDate.value < date || expenseDate.value >= dateInputValue) {
    alert("Expense date cannot be before today's date or after budget ending date");
    return false;
  }
  else
    return true;
}

//verify expense amount value
function expenseAmountValidation(amount) {
  if (isNaN(amount.value) || amount.value < 1) {
    return false;
  }
  else if (amount.value > ((getBudget() - getExpenses()))) {
    alert("Available budget is less than provided expense value");
  }
  else
    return true;
}

//add and create table for expenses
function createExpenseTable() {

  if (selectExpenseType.value == "fixed" && (fixedExpenseTyp.value == "" || (!expenseAmountValidation(expenseAmount)) || (!verifyExpenseDate(expenseAmount)))) {
    expenseErrorFunction();
  }
  else if (selectExpenseType.value == "variable" && (!isNaN(expenseName.value) || (!expenseAmountValidation(expenseAmount)) || (!verifyExpenseDate(expenseAmount)))) {
    expenseErrorFunction();
  }
  else if (expenseAmount.value > getBalance()) {
    alert("Expenses cannot be greater than Budget");
  }
  else {
    document.querySelector('#noRecords').style.display = "none";
    var insertRowIndex;
    var row = expenseTable.insertRow(filterData(expenseDate));
    var countCol = row.insertCell(0);
    var col1 = row.insertCell(1);
    var col2 = row.insertCell(2);
    var col3 = row.insertCell(3);
    var col4 = row.insertCell(4);
    var col5 = row.insertCell(5);

    if (selectExpenseType.value == "fixed") {
      countCol.innerHTML = "";
      col1.innerText = fixedExpenseTyp.value;
      col4.innerHTML = "";
      removeFixedTyp(fixedExpenseTyp.value);
    }
    else {
      countCol.innerHTML = ('<input class="checkbox"  onclick="showDeleteButton(this)" type="checkbox">');
      col1.innerText = expenseName.value;
      col4.innerHTML = ('<input type="button" value = "X" onClick="deleteExpenseRow(this)">');
    }
    col2.innerText = expenseAmount.value;
    col3.innerText = expenseDate.value;
    col5.innerHTML = ('<input type="button" value = "Edit" onClick="editExpenseRow(this)">');
    addExpensesModal.reset();
    selectExpenseType.value = retainExpenseType;
    document.getElementById("ExpenseErr").innerHTML = "";
    showViewAllBtn();
    budgetValueDisplay.innerText = "Available budget is Rs. " + (getBudget() - getExpenses());
    showBudget();
  }
}

//remove fixedtype option
function removeFixedTyp(value) {
  for (var i = 1; i < fixedExpenseTyp.length; i++) {
    if (fixedExpenseTyp[i].value == value) {
      // fixedExpenseTyp[i].disabled = true;
      fixedExpenseTyp[i].remove();
    }
  }
}

//function to filter the data added by user
function filterData(val) {
  rowCount = expenseTable.rows.length;
  insertRowIndex = 0;
  for (var i = 0; i < rowCount; i++) {
    if (val.value >= expenseTable.rows[i].cells[3].innerText) {
      insertRowIndex = 0;
    }
    else
      insertRowIndex = i - 1;
  }
  return insertRowIndex;
}

function showViewAllBtn() {
  rowCount = expenseTable.rows.length;
  if (rowCount > 5) {
    viewAllExpenseBtn.style.display = "block";
  }
  else
    viewAllExpenseBtn.style.display = "none";
}

//function to show list of expenses
function showAllExpenses() {
  showAllExpensesModal.style.display = "block";
  showExpenseTable = document.querySelector('#listAllExpenseTbl');
  var cloneTableData = document.getElementById('addExpenseTable').cloneNode(true);
  cloneTableData.setAttribute('id', 'listAllExpenseTbl');
  showExpenseTable.parentNode.replaceChild(cloneTableData, showExpenseTable);
}

// function to calculate expenses value
function getExpenses() {
  totalExpensesValue = 0;
  rowCount = expenseTable.rows.length;
  for (var i = 0; i < rowCount; i++) {
    totalExpensesValue += parseInt(expenseTable.rows[i].cells[2].innerText, 10);
  }
  return totalExpensesValue;
}

function editExpenseRow(val) {
  showExpenseTable = document.querySelector('#listAllExpenseTbl');
  index = val.parentNode.parentNode.rowIndex;
  var amountVal = showExpenseTable.rows[index].cells[2].innerText;
  if (amountVal) {
    showExpenseTable.rows[index].cells[2].innerText = "";
    showExpenseTable.rows[index].cells[2].innerHTML = '<input id="updateAmountValue" type="text"  class="col-xs-6" value="' + amountVal + '">';
    document.querySelector('#saveExpenseAmount-btn').style.display = "block";
  }
  else {
    document.querySelector('#saveExpenseAmount-btn').style.display = "block";

  }
}

//function to update expense
function updateExpense() {
  showExpenseTable = document.querySelector('#listAllExpenseTbl');
  index = showExpenseTable.querySelector('#updateAmountValue').parentElement.parentElement.rowIndex;
  var inputValueElement = showExpenseTable.querySelector('#updateAmountValue');
  if (!expenseAmountValidation(inputValueElement)) {
    document.querySelector('#updateAmountErr').innerText = "Provide Valid Amount";
    return false;
  }
  else {
    var value1 = showExpenseTable.querySelector('#updateAmountValue').value;
    showExpenseTable.rows[index].cells[2].innerText = value1;
    expenseTable.rows[index - 1].cells[2].innerText = value1;
    document.querySelector('#saveExpenseAmount-btn').style.display = "none";
    budgetValueDisplay.innerText = "Available budget is Rs. " + (getBudget() - getExpenses());
    document.querySelector('#updateAmountErr').style.display = "none";
  }
}

//function to delete single expense row
function deleteExpenseRow(val) {
  showExpenseTable = document.querySelector('#listAllExpenseTbl');
  index = val.parentNode.parentNode.rowIndex;
  if (showAllExpensesModal.style.display == "block") {
    showExpenseTable.deleteRow(index);
    expenseTable.deleteRow(index - 1);
  }
  else
    expenseTable.deleteRow(index - 1);
  showViewAllBtn();
  showBudget();
  budgetValueDisplay.innerText = "Available budget is Rs. " + (getBudget() - getExpenses());
}

//show delete button when checked any checkbox on all expense table
function showDeleteButton(val) {
  showExpenseTable = document.querySelector('#listAllExpenseTbl');
  if (val.checked) {
    document.querySelector('#deleteExpense-btn').style.display = "block";
  }
}


//remove multiple expense
function deleteMultipleExpense() {
  showExpenseTable = document.querySelector('#listAllExpenseTbl');
  rowCount = showExpenseTable.rows.length;
  for (var i = 1; i < rowCount; i++) {
    // row = showExpenseTable.rows[i];
    if (showExpenseTable.rows[i].cells[0].innerHTML == "") {
      continue;
    }
    else {
      var checkboxValue = showExpenseTable.rows[i].cells[0].childNodes[0];
      if (checkboxValue.checked == true) {
        showExpenseTable.deleteRow(i);
        expenseTable.deleteRow(i - 1);
        showViewAllBtn();
        rowCount--;
        i--;
      }
    }
  }
  budgetValueDisplay.innerText = "Available budget is Rs. " + (getBudget() - getExpenses());
}


//function to get budget value;
function getBudget() {

  if (!modifiedBudgetValue == 0) {
    budgetTextValue = modifiedBudgetValue;
  }
  else
    budgetTextValue = (monthlyIncome.value - (monthlyIncome.value * 20 / 100));
  return budgetTextValue;
}

//function to calculate balance
function getBalance(value) {
  balanceValue = getBudget(value) - getExpenses();
  return balanceValue;
}


//function to calculate savings
function getSavings() {
  savingsValue = monthlyIncome.value - getExpenses();
  return savingsValue;
}


//function to verify provided budget date
function verifyDate() {
  date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2) + '-' + today.getMinutes() + '-' + today.getSeconds();
  var dateInputValue = dateInput.value;
  if (dateInputValue <= date) {
    return false;
  }
  else
    return true;
}

//function to verify provided monthly income
function verifyMonthlyIncome() {
  if (isNaN(monthlyIncome.value) || monthlyIncome.value < 1) {
    return false;
  }
  else
    return true;
}

//function to show expense content based on selection
function showExpenseContent() {
  retainExpenseType = selectExpenseType.value;
  if (selectExpenseType.value == "fixed") {
    document.querySelector('#fixedExpenseData').style.display = "block";
    document.querySelector('#variableExpenseData').style.display = "none";
    addExpensesModal.reset();
    selectExpenseType.value = retainExpenseType;
  }
  else {
    document.querySelector('#fixedExpenseData').style.display = "none";
    document.querySelector('#variableExpenseData').style.display = "block";
    addExpensesModal.reset();
    selectExpenseType.value = retainExpenseType;
  }
  document.querySelector('#expenseData').style.display = "block";
  addVariableExpenseBtn.style.display = "block";
  document.getElementById("ExpenseErr").innerHTML = "";
}

//countdown function
function showCountdown() {
  var timeInterval = setInterval(function () {
    dateInputValue = new Date(dateInput.value).getTime();
    var currentDate = Date.now();
    var timeLeft = dateInputValue - currentDate;
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      document.getElementById("countdown").innerHTML = "Please reset the Budget Date";
    }
  }, 1000);
}

//click button events
submitBtn.addEventListener('click', closeMonthlyIncomeModal);
submitBudgetBtn.addEventListener('click', closeModifyBudgetModal);
modifyBudgetBtn.addEventListener('click', showModifyBudgetModal);
addExpenseBtn.addEventListener('click', showAddExpensesModal);

//submit button events to handle form 
monthlyIncomeModal.addEventListener('submit', handleForm);
modifyBudgetModal.addEventListener('submit', handleForm);
addExpensesModal.addEventListener('submit', handleForm);

//keyboard event for closing view all expenses modal
document.addEventListener('keyup', closeShowExpenseModal);

