import { useState } from 'react'

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

  return (
    <li className="rounded-3xl border border-[#e5d7bd] bg-[#fffdf7] p-4 shadow-[0_12px_32px_rgba(80,65,35,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <button
          type="button"
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-[#94733a] ${
            todo.completed
              ? 'border-[#557153] bg-[#557153] text-white'
              : 'border-[#b8a57e] bg-white text-transparent hover:border-[#557153]'
          }`}
          aria-label={todo.completed ? '완료 취소' : '완료 처리'}
          onClick={() => onToggleTodo(todo.id)}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1 text-left">
          {isEditing ? (
            <form className="grid gap-3" onSubmit={handleSubmitEdit}>
              <input
                type="text"
                className="min-h-11 rounded-2xl border border-[#c7b489] bg-white px-4 text-base font-semibold text-[#202217] outline-none focus:ring-2 focus:ring-[#94733a]"
                value={editText}
                onChange={(event) => {
                  setEditText(event.target.value)
                  setErrorMessage('')
                }}
                autoFocus
              />
              {errorMessage && (
                <p className="rounded-2xl bg-[#fff0ba] px-4 py-2 text-sm font-bold text-[#7b3d22]">
                  {errorMessage}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="rounded-xl bg-[#202217] px-4 py-2 text-sm font-bold text-[#fff7dd] transition hover:bg-[#3d412d]"
                >
                  저장
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-[#c7b489] px-4 py-2 text-sm font-bold text-[#6f6248] transition hover:bg-[#f7efd9]"
                  onClick={handleCancelEdit}
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
            <p
              className={`break-words text-lg font-bold leading-7 ${
                todo.completed
                  ? 'text-[#8d856f] line-through decoration-2'
                  : 'text-[#202217]'
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>

        {!isEditing && (
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl border border-[#c7b489] px-4 py-2 text-sm font-bold text-[#6f6248] transition hover:bg-[#f7efd9]"
              onClick={handleStartEdit}
            >
              수정
            </button>
            <button
              type="button"
              className="rounded-xl bg-[#d95f43] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#bf4c32]"
              onClick={() => onDeleteTodo(todo.id)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default TodoItem
