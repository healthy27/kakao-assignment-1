import { useState } from 'react'
import Button from './ui/Button'

function TodoItem({ todo, onToggleTodo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [errorMessage, setErrorMessage] = useState('')

  const handleStartEdit = () => {
    setEditText(todo.text)
    setErrorMessage('')
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditText(todo.text)
    setErrorMessage('')
    setIsEditing(false)
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault()

    const trimmedText = editText.trim()

    if (!trimmedText) {
      setErrorMessage('수정할 내용을 입력해주세요.')
      return
    }

    onUpdateTodo(todo.id, trimmedText)
    setIsEditing(false)
    setErrorMessage('')
  }

  const handleToggleByItem = () => {
    if (!isEditing) {
      onToggleTodo(todo.id)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggleByItem()
    }
  }

  return (
    <li
      className={`rounded-card border border-border bg-surface p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-floating ${
        isEditing ? '' : 'cursor-pointer'
      }`}
      role={isEditing ? undefined : 'button'}
      tabIndex={isEditing ? undefined : 0}
      aria-pressed={isEditing ? undefined : todo.completed}
      onClick={handleToggleByItem}
      onKeyDown={isEditing ? undefined : handleKeyDown}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2 text-sm font-black transition ${
            todo.completed
              ? 'border-success bg-success text-white'
              : 'border-border-strong bg-surface text-transparent hover:border-brand'
          }`}
          aria-hidden="true"
        >
          ✓
        </span>

        <div className="min-w-0 flex-1 text-left">
          {isEditing ? (
            <form
              className="grid gap-3"
              onClick={(event) => event.stopPropagation()}
              onSubmit={handleSubmitEdit}
            >
              <input
                type="text"
                className="min-h-12 rounded-control border border-border bg-surface px-4 text-base font-semibold text-text-primary outline-none focus:border-brand focus:ring-4 focus:ring-brand/20"
                value={editText}
                onChange={(event) => {
                  setEditText(event.target.value)
                  setErrorMessage('')
                }}
                autoFocus
              />
              {errorMessage && (
                <p className="rounded-control bg-danger-light px-4 py-2 text-sm font-bold text-danger">
                  {errorMessage}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" type="submit" variant="primary">
                  저장
                </Button>
                <Button size="sm" onClick={handleCancelEdit}>
                  취소
                </Button>
              </div>
            </form>
          ) : (
            <p
              className={`break-words text-lg font-bold leading-7 ${
                todo.completed
                  ? 'text-text-tertiary line-through decoration-2'
                  : 'text-text-primary'
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>

        {!isEditing && (
          <div
            className="flex shrink-0 flex-wrap gap-2"
            onClick={(event) => event.stopPropagation()}
          >
            <Button size="sm" onClick={handleStartEdit}>
              수정
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDeleteTodo(todo.id)}
            >
              삭제
            </Button>
          </div>
        )}
      </div>
    </li>
  )
}

export default TodoItem
