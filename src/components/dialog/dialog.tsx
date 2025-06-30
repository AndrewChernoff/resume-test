import { Dialog } from "radix-ui";
import s from './dialog.module.scss'
import type { FC, ReactNode } from "react";

type PropsType = {
    isOpen: boolean;
    children: ReactNode;
    onCloseHandler: () => void;
}

export const DialogWindow: FC<PropsType> = ({isOpen, children, onCloseHandler}) => {
    return <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className={s.Overlay} />
                <Dialog.Content className={s.Content}>
                    {/* <Dialog.Title className={s.Title}>Edit profile</Dialog.Title> */}
                    {children}
                    {/* <Dialog.Close asChild>
                        <button onClick={onCloseHandler} className={s.IconButton} aria-label="Close">
                        </button>
                    </Dialog.Close> */}
                </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
}