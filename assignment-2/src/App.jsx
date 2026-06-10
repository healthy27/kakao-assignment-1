import { useState } from 'react'
import DateNavigator from './components/DateNavigator'
import FilterTabs from './components/FilterTabs'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Badge from './components/ui/Badge'
import { TODO_FILTERS, TODO_STORAGE_KEY } from './constants/todo'
import useLocalStorage from './hooks/useLocalStorage'
import { addDays, getToday } from './utils/date'

function createTodo(text, date) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    date,
    createdAt: Date.now(),
  }
}

function getFilteredTodos(todos, filter) {
  if (filter === TODO_FILTERS.ACTIVE) {
    return todos.filter((todo) => !todo.completed)
  }

  if (filter === TODO_FILTERS.COMPLETED) {
    return todos.filter((todo) => todo.completed)
  }

  return todos
}

function App() {
  const [todos, setTodos] = useLocalStorage(TODO_STORAGE_KEY, [])
  const [filter, setFilter] = useState(TODO_FILTERS.ALL)
  const [selectedDate, setSelectedDate] = useState(() => getToday())

  const dailyTodos = todos.filter((todo) => todo.date === selectedDate)
  const visibleTodos = getFilteredTodos(dailyTodos, filter)
  const counts = {
    [TODO_FILTERS.ALL]: dailyTodos.length,
    [TODO_FILTERS.ACTIVE]: dailyTodos.filter((todo) => !todo.completed).length,
    [TODO_FILTERS.COMPLETED]: dailyTodos.filter((todo) => todo.completed).length,
  }

  const handleAddTodo = (text) => {
    setTodos((currentTodos) => [createTodo(text, selectedDate), ...currentTodos])
  }

  const handleToggleTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleUpdateTodo = (todoId, nextText) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: nextText } : todo,
      ),
    )
  }

  const handleDeleteTodo = (todoId) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId))
  }

  const handleMoveDate = (amount) => {
    setSelectedDate((currentDate) => addDays(currentDate, amount))
  }

  return (
    <main className="min-h-screen bg-app-bg px-4 py-6 text-text-primary sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-card border border-border bg-surface p-5 shadow-floating sm:p-8">
        <header className="flex flex-col gap-3 border-b border-border pb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
                오늘 할 일 정리
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                날짜를 이동하며 Todo를 추가하고, 상태 필터와 인라인 수정으로
                하루의 작업을 관리합니다.
              </p>
            </div>
            <Badge className="self-start md:self-auto" variant="solid">
              {counts[TODO_FILTERS.ACTIVE]}개 진행 중
            </Badge>
          </div>
        </header>

        <DateNavigator
          selectedDate={selectedDate}
          onMoveDate={handleMoveDate}
          onToday={() => setSelectedDate(getToday())}
        />

        <TodoForm onAddTodo={handleAddTodo} selectedDate={selectedDate} />

        <FilterTabs filter={filter} counts={counts} onChangeFilter={setFilter} />

        <TodoList
          todos={visibleTodos}
          filter={filter}
          onToggleTodo={handleToggleTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </section>
    </main>
  )
}

export default App
