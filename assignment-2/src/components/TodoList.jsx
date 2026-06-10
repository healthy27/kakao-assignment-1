import { TODO_FILTER_LABELS } from '../constants/todo'
import TodoItem from './TodoItem'

function TodoList({ todos, filter, onToggleTodo, onUpdateTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-[#c7b489] bg-[#f8f0dc] px-5 py-12 text-center">
        <p className="text-xl font-black text-[#4b412e]">
          표시할 Todo가 없습니다.
        </p>
        <p className="mt-2 text-sm font-semibold text-[#77694f]">
          현재 필터: {TODO_FILTER_LABELS[filter]}
        </p>
      </section>
    )
  }

  return (
    <ul className="grid gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList
