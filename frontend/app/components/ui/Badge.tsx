// 디자인 토큰 기반 공통 배지 (2차 과제 Badge.jsx 승계).
import type { ReactNode } from "react";

type Variant = "brand" | "solid" | "success" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  brand: "bg-brand-light text-brand",
  solid: "bg-brand text-white",
  success: "bg-success-light text-success",
  danger: "bg-danger-light text-danger",
};

type BadgeProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Badge({
  children,
  variant = "brand",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-bold ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
