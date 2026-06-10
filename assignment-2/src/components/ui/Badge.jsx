const VARIANT_CLASSES = {
  brand: 'bg-brand-light text-brand',
  solid: 'bg-brand text-white',
  success: 'bg-success-light text-success',
  danger: 'bg-danger-light text-danger',
}

function Badge({ children, className = '', variant = 'brand' }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-bold ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
