import type { ChangeEvent, FC } from 'react';
import s from './input.module.scss';

type PropsType = {
  label: string;
  id: string;
  value: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<PropsType> = ({
  label,
  id,
  value,
  type = "text",
  placeholder = "",
  error,
  errorMessage,
  onChange
}) => {

  return <div className={s.input}>
          <label htmlFor={id}>{label}</label>
          <input
            className={error ? s.error : undefined}
            id={id}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
          />
          {error && errorMessage && (
            <p className={s.errorMessage}>{errorMessage}</p>
          )}
        </div>;
};
