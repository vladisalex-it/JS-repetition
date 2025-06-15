

// expensesApp
let LIMIT = 1000;
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';
const CURRENCY = ' руб.'

const expensesInputNode = document.getElementById('expensesInput');
const expensesButtonNode = document.getElementById('expensesButton');
const expensesHisoryListNode = document.getElementById('hisoryList');
const limitValueNode = document.getElementById('limitValue');
const totalValueNode = document.getElementById('totalValue');
const statusValueNode = document.getElementById('statusValue');
const expensesResetBtn = document.getElementById('expensesResetBtn');
const expensesCategory = document.getElementById('expensesCategory');
const validationNote = document.getElementById('validationNote');

const limitChangeBtnNode = document.getElementById('limitChangeBtn');
const popupNode = document.getElementById('popup');
const popupCloseButtonNode = document.getElementById('popupCloseButton');
const popupInputNode = document.getElementById('popupInput');
const setLimitButtonNode = document.getElementById('setLimitButton');
const popupContent = document.getElementById('popupContent');
const bodyNode = document.querySelector('body');
const setLimitButton = document.getElementById('setLimitButton');

let expenses = [];

const init = () => {
  limitValueNode.innerText = LIMIT;
  statusValueNode.innerText = STATUS_IN_LIMIT;
  statusValueNode.classList.add('status__green');
  totalValueNode.innerText = 0;
  expensesHisoryListNode.innerText = 'История пуста...'
}

init();

const getExpensesTotal = () => {
  let sum = 0;
  expenses.forEach(expense => {
    sum += expense.amount;
  });
  return sum;
}

const getExpenseFromUser = () => {
  const currentAmount = parseInt(expensesInputNode.value);
  if (!currentAmount || isNaN(currentAmount)) {
    validationNote.classList.remove('validation_hidden');
    validationNote.innerText = 'Введите сумму';
    return;
  }
  const currentCategory = expensesCategory.value;
  if (!currentCategory || currentCategory === 'Категория') {
    validationNote.classList.remove('validation_hidden');
    validationNote.innerText = 'Выберите категорию!';
    return;
  }
  validationNote.classList.add('validation_hidden');
  validationNote.innerText = '';

  return { amount: currentAmount, category: currentCategory};
}

const clearExpensesInputs = () => {
  expensesInputNode.value = '';
  expensesCategory.value = '';
}

const categoryChange = () => {
  if (expensesCategory.value !== 'Выберите категорию') {
    validationNote.classList.add('validation_hidden');
    validationNote.innerText = '';
  } else {
    validationNote.classList.remove('validation_hidden');
    validationNote.innerText = 'Выберите категорию!';
  }
}

const trackExpense = (newExpense) => {
  expenses.push(newExpense);
}

const renderStatus = () => {
  const total = getExpensesTotal();
  totalValueNode.innerText = total;

  statusValueNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  if (total <= LIMIT) {
    statusValueNode.innerText = STATUS_IN_LIMIT;
    statusValueNode.classList.add('status__green');
  } else {
    statusValueNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - total} руб)`;
    statusValueNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
  
  statusValueNode.classList.add('status__green');
}

const renderHistory = () => {
  expensesHisoryListNode.innerHTML = '';
  expenses.forEach(expense => {
    const historyItem = document.createElement('li');
    historyItem.className = 'rub';
    historyItem.innerText = `${expense.category} - ${expense.amount}`;
    expensesHisoryListNode.appendChild(historyItem);
  });
}

const renderExpensesStats = () => {
  renderStatus();
  renderHistory();
}

function addButtonHandler() {
  const newExpense = getExpenseFromUser();
  if (newExpense) {
    trackExpense(newExpense);
    renderExpensesStats();
    clearExpensesInputs();
  }
}

function resetButtonHandler() {
  expenses = [];
  renderExpensesStats();
  expensesHisoryListNode.innerHTML = 'История пуста...';
  LIMIT = 1000;
  limitValueNode.innerText = LIMIT;
}


// popup
function popupOpenHandler() {
  document.body.classList.add('modal-open');
  popupNode.classList.add('active');
}

function popupCloseHandler() {
  document.body.classList.remove('modal-open');
  popupNode.classList.remove('active');
}

popupNode.addEventListener('click', function(event) {
  const isClickOutsideContent = !popupContent.contains(event.target);
  if (isClickOutsideContent) {
    popupCloseHandler();
  }
});

function setLimitHandler() {
  const newLimit = parseInt(popupInputNode.value);
  limitValueNode.innerText = newLimit;
  LIMIT = newLimit;
  popupCloseHandler();
  renderExpensesStats();
}

expensesButtonNode.addEventListener('click', addButtonHandler);
expensesResetBtn.addEventListener('click', resetButtonHandler);
expensesCategory.addEventListener('change', categoryChange);
limitChangeBtnNode.addEventListener('click', popupOpenHandler);
popupCloseButtonNode.addEventListener('click', popupCloseHandler);
setLimitButton.addEventListener('click', setLimitHandler);




