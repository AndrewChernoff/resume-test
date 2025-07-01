import type { ChangeEvent, FC } from 'react';
import s from './text-area.module.scss';

type PropsType = {
  label?: string;
  id: string;
  value: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: FC<PropsType> = ({
  label,
  id,
  value,
  placeholder = "",
  error,
  errorMessage,
  onChange
}) => {
  return <div className={s.textArea}>
          {label && <label htmlFor={id}>{label}</label>}
          <textarea
            className={error ? s.error : undefined}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
          {error && errorMessage && (
            <p className={s.errorMessage}>{errorMessage}</p>
          )}
        </div>;
};
