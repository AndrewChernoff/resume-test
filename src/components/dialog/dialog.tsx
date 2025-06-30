import { Dialog } from "radix-ui";
import s from './dialog.module.scss'
import type { FC, ReactNode } from "react";

type PropsType = {
    isOpen: boolean;
    children: ReactNode;
    onCloseHandler: () => void;
}

export const DialogWindow: FC<PropsType> = ({isOpen, children}) => {
    return <Dialog.Root open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className={s.Overlay} />
                <Dialog.Content className={s.Content}>
                    {children}
                    
                </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
}