const COUNTER_INITIAL_VALUE = 0;
const firstBtnNode = document.getElementById('firstBtn');
const secondBtnNode = document.getElementById('secondBtn');
const counterNode =  document.querySelector('[data-find="counterValue"]')

let poolCount = COUNTER_INITIAL_VALUE;

function updateCounter() {
  counterNode.innerText = poolCount;
  }

const addPulls = (ButtonNode) => {
  poolCount += parseInt(ButtonNode.dataset.pools);
  updateCounter();
}


const resetCounter = () => {
  poolCount = COUNTER_INITIAL_VALUE;
  updateCounter();
}


firstBtnNode.addEventListener('click', () => addPulls(firstBtnNode));
secondBtnNode.addEventListener('click', () => addPulls(secondBtnNode));
resetBtn.addEventListener('click', resetCounter);



// blogApp

const inputTitleNode = document.getElementById('inputTitle');
const inputTextNode = document.getElementById('inputText');
const addPostBtnNode = document.getElementById('addPostBtn');
const postListNode = document.getElementById('postList');
const errorMsgnode = document.getElementById('errorMsg');

const posts = [];

const getPostFromUser = () => {
  const title = inputTitleNode.value;
  const text = inputTextNode.value;

  return {
    title,
    text,
  }
}


const clearPostInput = () => {
  inputTitleNode.value = '';
  inputTextNode.value = '';
}

const trackPost = ({ title, text }) => {
  posts.push({
    title,
    text,
    date: new Date().toLocaleString()
  })
}

const getPosts = () => {
  return posts;
}

const renderPosts = () => {
  const posts = getPosts();
  postHTML = '';
  posts.forEach(post => {
    postHTML += `<li class="post__item">
        <small class="post__timestamp">${post.date}</small>
        <h4 class="li-post__title">${post.title}</h4>
        <p class="li-post__text">${post.text}</p>
      </li>
      `
  });

  postListNode.innerHTML = postHTML;
}

const validateInputs = (checkEmpty = false) => {
  const titleValue = inputTitleNode.value.trim();
  const textValue = inputTextNode.value.trim();

  if (checkEmpty) {
    if (!titleValue || !textValue) {
      errorMsgnode.classList.remove('errorMsg_hidden');
      errorMsgnode.innerText = "Пожалуйста, заполните все поля.";
      return false;
    }
  }

  if (titleValue.length > 10) {
    errorMsgnode.classList.remove('errorMsg_hidden');
    errorMsgnode.innerText = 'Заголовок превышает 10 символов!'
    return false;
  }

  if (textValue.length > 20) {
    errorMsgnode.classList.remove('errorMsg_hidden');
    errorMsgnode.innerText = 'Текст превышает 20 символов!'
    return false;
  }

  errorMsgnode.classList.add('errorMsg_hidden');
  return true;
}


const validationHandler = () => {
  validateInputs();
}


const addPostHandler = () => {
  const postFromUser = getPostFromUser();
  if (!validateInputs(true)) {
    return;
  }
  trackPost(postFromUser);
  renderPosts();
  clearPostInput();
}
 

addPostBtnNode.addEventListener('click', addPostHandler);
inputTitleNode.addEventListener('input', validationHandler);
inputTextNode.addEventListener('input', validationHandler);






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












// let expenses = [];

// init(expenses);

// expensesButtonNode.addEventListener('click', function() {
//   const newExpense = getExpenseFromUser();

//   if (newExpense) {
//     trackExpense(newExpense);
//     render(expenses);
//     clearExpenseInput();
//   }

// });

// expensesResetBtn.addEventListener('click', function() {
//   expenses = [];
//   render(expenses);
// })


// // popup

// function openPopup() {
//   document.body.classList.add('modal-open');
//   popupNode.classList.add('active');
// }

// function closePopup() {
//   document.body.classList.remove('modal-open');
//   popupNode.classList.remove('active');
// }

// limitChangeBtnNode.addEventListener('click', openPopup);
// popupCloseButtonNode.addEventListener('click', closePopup);

// popupNode.addEventListener('click', function(event) {
//   const isClickOutsideContent = !popupContent.contains(event.target);
//   if (isClickOutsideContent) {
//     closePopup();
//   }
// });

// setLimitButton.addEventListener('click', function() {
//   const newLimit = parseInt(popupInputNode.value);
//   if (isNaN(newLimit) || newLimit < 0) {
//     alert('Пожалуйста, введите корректное значение лимита.');
//     return;
//   }
//   LIMIT = newLimit;
//   limitValueNode.innerText = LIMIT;

//   const totalExpenses = calculateExpenses(expenses);
//   renderStatus(totalExpenses);
  
//   closePopup();
//   document.body.classList.remove('modal-open');
//  });

// //  EndPopup


// function init(expenses) {
//   limitValueNode.innerText = LIMIT;
//   statusValueNode.innerText = STATUS_IN_LIMIT;
//   totalValueNode.innerText = calculateExpenses(expenses);
//   expensesHisoryListNode.innerText = 'История пуста...'
// }

// function getExpenseFromUser() {
//   const newAmount = getAmountFromUser();
//   if (!newAmount) {
//     validationNote.classList.remove('validation_hidden');
//     validationNote.innerText = 'введите сумму!'
//     return;
//   }
//   const newCategory = getSelectedCategory();
//   if (!newCategory) {
//     validationNote.classList.remove('validation_hidden');
//     validationNote.innerText = 'категория не выбрана!'
//     return;
//   }

//   validationNote.classList.add('validation_hidden');
//   validationNote.innerText = '';

//   return {
//     amount: newAmount,
//     category: newCategory,
//   }

// }

// const categoryChange = () => {
//   if (expensesCategory.value !== 'Выберите категорию') {
//     validationNote.classList.add('validation_hidden');
//     validationNote.innerText = 'категория не выбрана!'
//   } else {
//     validationNote.classList.remove('validation_hidden');
//     validationNote.innerText = ''
//   }
// }

// expensesCategory.addEventListener('change', categoryChange);

// function getAmountFromUser() {
//   const amount = parseInt(expensesInputNode.value, 10);
//   return !isNaN(amount) ? amount : null; // Возвращаем null, если amount NaN
// }

// function getSelectedCategory() {
//   const category = expensesCategory.value;
//   if (!category || category === 'Выберите категорию') {
//     return null;
//   }
//   return category;
// }

// function clearExpenseInput() {
//   expensesInputNode.value = '';
// }

// function trackExpense(newExpense) {
//   expenses.push(newExpense);
// }

// function calculateExpenses(expenses) {
//    let sum = 0;
//   expenses.forEach(expense => {
//     // Проверяем, что expense определен и у него есть свойство amount
//     if (expense && typeof expense.amount === 'number') {
//       sum += expense.amount;
//     }
//   });
//   return sum;
// }

// function render(expenses) {
//   const sum = calculateExpenses(expenses);
//   renderTotal(sum);
//   renderStatus(sum);
//   renderHistory(expenses);
// }

// function renderTotal(sum) {
//   totalValueNode.innerText = sum;
// }

// function renderStatus(sum) {
//   statusValueNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   if (sum <= LIMIT) {
//     statusValueNode.innerText = STATUS_IN_LIMIT;
//   } else {
//     statusValueNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} руб.)`;
//     statusValueNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
//   }
// }

// function renderHistory(expenses) {
//   let expensesListHTML = '';
//   if (expenses.length === 0) {
//     expensesListHTML = 'История пуста...'
//   } else {
//     expenses.forEach(expense => {
//       expensesListHTML += `<li class="history__item">${expense.category}: ${expense.amount} ${CURRENCY}</li>`
//     });
//   }
 

//   expensesHisoryListNode.innerHTML = expensesListHTML;
// }

