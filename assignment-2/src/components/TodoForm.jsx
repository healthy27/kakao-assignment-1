import { useState } from 'react'
import Button from './ui/Button'

function TodoForm({ onAddTodo, selectedDate }) {
  const [text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedText = text.trim()

    if (!trimmedText) {
      setErrorMessage('할 일을 입력한 뒤 추가해주세요.')
      return
    }

    onAddTodo(trimmedText)
    setText('')
    setErrorMessage('')
  }

  return (
    <form className="rounded-card bg-brand p-4" onSubmit={handleSubmit}>
      <label
        htmlFor="todo-input"
        className="mb-3 block text-sm font-bold text-surface"
      >
        {selectedDate}에 추가할 Todo
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="todo-input"
          type="text"
          className="min-h-12 flex-1 rounded-control border border-transparent bg-surface px-4 text-base font-semibold text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-brand focus:ring-4 focus:ring-brand/20"
          placeholder="예: React 컴포넌트 분리하기"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            setErrorMessage('')
          }}
        />
        <Button size="lg" type="submit" variant="primary">
          추가
        </Button>
      </div>
      {errorMessage && (
        <p className="mt-3 rounded-control bg-danger-light px-4 py-3 text-sm font-bold text-danger">
          {errorMessage}
        </p>
      )}
    </form>
  )
}

export default TodoForm
