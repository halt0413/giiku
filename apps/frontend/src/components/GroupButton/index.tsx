"use client";

import styles from "./index.module.css";

type GroupButtonProps = {
  variant: "cancel" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function GroupButton({
  variant,
  children,
  onClick,
  type = "button",
}: GroupButtonProps) {
  const buttonClass =
    variant === "cancel" ? styles.cancel : styles.submit;

  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${buttonClass}`}>
      {children}
    </button>
  );
}
