"use client";

import type { InputHTMLAttributes } from "react";
import styles from "./index.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextInput = ({ label, id, ...inputProps }: Props) => {
  const inputId = id ?? label;

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        id={inputId}
        className={styles.input}
        {...inputProps}
      />
    </div>
  );
};