const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const message = document.querySelector('#message');
const filterButtons = document.querySelectorAll('.filter-button');
const selectedDateText = document.querySelector('#selected-date-text');
const prevDateButton = document.querySelector('#prev-date-button');
const nextDateButton = document.querySelector('#next-date-button');

const TODO_STORAGE_KEY = 'vanillaTodoList';

let todos = loadTodos();
let currentFilter = 'all';
let selectedDate = getDateString(new Date());

// Date 객체를 Todo에서 비교하기 쉬운 YYYY-MM-DD 문자열로 바꿉니다.
function getDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// localStorage에 저장된 문자열을 다시 배열 데이터로 변환합니다.
function loadTodos() {
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  return JSON.parse(savedTodos);
}

// todos 배열을 JSON 문자열로 바꿔 localStorage에 저장합니다.
function saveTodos() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// 입력된 문자열을 Todo 목록에서 사용할 객체 형태로 바꿉니다.
function createTodo(text) {
  return {
    id: Date.now(),
    text: text,
    completed: false,
    date: selectedDate
  };
}

// 선택된 날짜와 필터에 따라 화면에 보여줄 Todo만 골라냅니다.
function getFilteredTodos() {
  const todosByDate = todos.filter(function(todo) {
    return todo.date === selectedDate;
  });

  if (currentFilter === 'completed') {
    return todosByDate.filter(function(todo) {
      return todo.completed;
    });
  }

  if (currentFilter === 'active') {
    return todosByDate.filter(function(todo) {
      return !todo.completed;
    });
  }

  return todosByDate;
}

// 현재 선택된 필터 버튼에 active 클래스를 적용합니다.
function updateFilterButtonStyle() {
  filterButtons.forEach(function(button) {
    const isSelected = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isSelected);
  });
}

// 선택된 날짜를 사용자가 읽기 쉬운 형식으로 화면에 표시합니다.
function updateSelectedDateText() {
  const date = new Date(`${selectedDate}T00:00:00`);
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }).format(date);

  selectedDateText.textContent = formattedDate;
}

// 현재 todos 배열을 기준으로 화면 목록을 다시 그립니다.
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos();
  const todosBySelectedDate = todos.filter(function(todo) {
    return todo.date === selectedDate;
  });

  if (todosBySelectedDate.length === 0) {
    todoList.innerHTML = '<li class="empty-message">선택한 날짜에 등록된 할 일이 없습니다.</li>';
    return;
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<li class="empty-message">현재 필터에 해당하는 할 일이 없습니다.</li>';
    return;
  }

  filteredTodos.forEach(function(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = todo.completed ? 'todo-item completed' : 'todo-item';

    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todo.text;

    const actionArea = document.createElement('div');
    actionArea.className = 'todo-actions';

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = '수정';
    editButton.addEventListener('click', function() {
      editTodo(todo.id);
    });

    const completeButton = document.createElement('button');
    completeButton.type = 'button';
    completeButton.className = 'complete-button';
    completeButton.textContent = todo.completed ? '취소' : '완료';
    completeButton.addEventListener('click', function() {
      toggleTodoComplete(todo.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function() {
      deleteTodo(todo.id);
    });

    actionArea.appendChild(editButton);
    actionArea.appendChild(completeButton);
    actionArea.appendChild(deleteButton);

    todoItem.appendChild(todoText);
    todoItem.appendChild(actionArea);

    todoList.appendChild(todoItem);
  });
}

// form의 기본 새로고침 동작을 막고, 입력값으로 Todo를 추가합니다.
function handleTodoSubmit(event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === '') {
    message.textContent = '할 일을 입력한 뒤 추가해주세요.';
    return;
  }

  const newTodo = createTodo(todoText);
  todos.push(newTodo);
  saveTodos();

  todoInput.value = '';
  message.textContent = '';

  renderTodos();
}

function editTodo(todoId) {
  const targetTodo = todos.find(function(todo) {
    return todo.id === todoId;
  });

  if (!targetTodo) {
    return;
  }

  const editedText = prompt('수정할 내용을 입력하세요.', targetTodo.text);

  if (editedText === null) {
    return;
  }

  const trimmedText = editedText.trim();

  if (trimmedText === '') {
    message.textContent = '수정할 내용은 비워둘 수 없습니다.';
    return;
  }

  targetTodo.text = trimmedText;
  saveTodos();
  message.textContent = '';

  renderTodos();
}

function toggleTodoComplete(todoId) {
  todos = todos.map(function(todo) {
    if (todo.id !== todoId) {
      return todo;
    }

    return {
      id: todo.id,
      text: todo.text,
      completed: !todo.completed,
      date: todo.date
    };
  });

  saveTodos();
  message.textContent = '';
  renderTodos();
}

function deleteTodo(todoId) {
  todos = todos.filter(function(todo) {
    return todo.id !== todoId;
  });

  saveTodos();
  message.textContent = '';
  renderTodos();
}

function handleFilterClick(event) {
  currentFilter = event.target.dataset.filter;
  updateFilterButtonStyle();
  renderTodos();
}

function changeSelectedDate(dayAmount) {
  const currentDate = new Date(`${selectedDate}T00:00:00`);
  currentDate.setDate(currentDate.getDate() + dayAmount);

  selectedDate = getDateString(currentDate);
  updateSelectedDateText();
  renderTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);
filterButtons.forEach(function(button) {
  button.addEventListener('click', handleFilterClick);
});
prevDateButton.addEventListener('click', function() {
  changeSelectedDate(-1);
});
nextDateButton.addEventListener('click', function() {
  changeSelectedDate(1);
});

updateSelectedDateText();
updateFilterButtonStyle();
renderTodos();
