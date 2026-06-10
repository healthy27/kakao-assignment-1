import { useState } from 'react'

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
    <form className="rounded-3xl bg-[#202217] p-4" onSubmit={handleSubmit}>
      <label
        htmlFor="todo-input"
        className="mb-3 block text-sm font-bold text-[#f4ddb1]"
      >
        {selectedDate}에 추가할 Todo
      </label>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          id="todo-input"
          type="text"
          className="min-h-12 rounded-2xl border border-transparent bg-[#fffaf0] px-4 text-base font-semibold text-[#202217] outline-none transition placeholder:text-[#a09379] focus:border-[#f4ddb1] focus:ring-2 focus:ring-[#f4ddb1]"
          placeholder="예: React 컴포넌트 분리하기"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            setErrorMessage('')
          }}
        />
        <button
          type="submit"
          className="min-h-12 rounded-2xl bg-[#f0b84b] px-6 text-base font-black text-[#202217] transition hover:-translate-y-0.5 hover:bg-[#ffc95a] focus:outline-none focus:ring-2 focus:ring-[#fff0ba]"
        >
          추가
        </button>
      </div>
      {errorMessage && (
        <p className="mt-3 rounded-2xl bg-[#fff0ba] px-4 py-3 text-sm font-bold text-[#7b3d22]">
          {errorMessage}
        </p>
      )}
    </form>
  )
}

export default TodoForm
