const VARIANT_CLASSES = {
  primary:
    'bg-brand text-white hover:bg-brand-hover focus:ring-brand/25 shadow-card',
  secondary:
    'border border-border bg-surface text-text-secondary hover:bg-surface-alt focus:ring-brand/20',
  subtle:
    'bg-brand-light text-brand hover:bg-surface-blue focus:ring-brand/20',
  danger:
    'bg-danger text-white hover:bg-danger-hover focus:ring-danger/20 shadow-card',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-alt focus:ring-brand/20',
}

const SIZE_CLASSES = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

function Button({
  children,
  className = '',
  size = 'md',
  type = 'button',
  variant = 'secondary',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-control font-bold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
