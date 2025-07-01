
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setParam, updateCertificates } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import s from "./certificates-modal.module.scss";
import { Input } from "../../shared/input/input";
import { useState, type ChangeEvent } from "react";
import clsx from "clsx";

export const CertificatesModal = () => {
    const dispatch = useAppDispatch();
    const certificates = useAppSelector(state => state.section.sectionItems.certificates)
    const param = useAppSelector(state => state.section.param);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isExists = certificates.includes(e.currentTarget.value.trim()); 

        if(isExists) {
            setErrorMessage('Этот сертификат уже указан');
        } else if (e.currentTarget.value.trim().length >= 30) {
            setErrorMessage('Максимальное количество символов 30');
        } else {
            setErrorMessage(null);
        }

        setValue(e.currentTarget.value);
    };

    const clearValue = () => {
        if(errorMessage) setErrorMessage(null);
        setValue('');
    };

    const onClose = () => {
        clearValue();
        dispatch(setParam('none'));
    }

    const onSubmit = () => {
        const isExists = certificates.includes(value.trim().toLowerCase()); 

        if (isExists) {
            setErrorMessage('Этот сертификат уже указан');
        } else {
            setErrorMessage(null);
            dispatch(updateCertificates(value.trim().toLocaleLowerCase()));
            onClose();
        }
    }

    const disableBtn = value.trim().length === 0;
    const disabledConfirm = Boolean(errorMessage) || disableBtn;
    
    return <DialogWindow isOpen={param === 'certificates'} onCloseHandler={onClose}>
          <div>
            <Dialog.Title className={s.title}>Сертификаты</Dialog.Title>
            <Dialog.Close asChild>
                <button onClick={onClose} className={s.close__button}>
                  X
                </button>
              </Dialog.Close>          
              <Input
                value={value}
                onChange={onValueChange}
                label={"Название"} id={"certificate"}
                placeholder="Введите название сертификата"
                error={Boolean(errorMessage)}
                errorMessage={errorMessage || undefined}
                />
    
        
            <div className={s.btns}>
                <button  onClick={clearValue} disabled={disableBtn} className={clsx(disableBtn ? s.disabled : s.btns__cancel)}>
                    Отмена
                </button>
                <button onClick={onSubmit} disabled={disabledConfirm}  className={clsx(disabledConfirm ? s.disabled : s.btns__submit)}>
                    Сохранить
                </button>
            </div>
        </div> 
      </DialogWindow>;
}