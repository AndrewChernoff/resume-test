
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setParam, addSkill, selectSkills } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import s from "./skills-modal.module.scss";
import { Input } from "../../shared/input/input";
import { useState, type ChangeEvent } from "react";
import clsx from "clsx";

export const SkillsModal = () => {
    const dispatch = useAppDispatch();
    const skills = useAppSelector(selectSkills)
    const param = useAppSelector(state => state.section.param);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isExists = skills.includes(e.currentTarget.value.trim()); 

        if(isExists) {
            setErrorMessage('Этот навык уже указан');
        } else if (e.currentTarget.value.trim().length >= 20) {
            setErrorMessage('Максимальное количество символов 20');
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
        const isExists = skills.includes(value.trim().toLowerCase()); 

        if (isExists) {
            setErrorMessage('Этот навык уже указан');
        } else {
            setErrorMessage(null);
            dispatch(addSkill({sectionId: 'skills-1', skill: value.trim().toLocaleLowerCase()}));
            onClose();
        }
    }

    const disableBtn = value.trim().length === 0;
    const disabledConfirm = Boolean(errorMessage) || disableBtn;
    
    return <DialogWindow isOpen={param === 'skills'} onCloseHandler={onClose}>
          <div>
            <Dialog.Close asChild>
                <button onClick={onClose} className={s.close__button}>
                  X
                </button>
              </Dialog.Close>          
              <Input
                value={value}
                onChange={onValueChange}
                label={"Название"} id={"skill"}
                placeholder="Введите навык"
                error={Boolean(errorMessage)}
                errorMessage={errorMessage || undefined}
                />
    
        
            <div className={s.btns}>
            <button  onClick={clearValue} disabled={disableBtn} className={clsx(disableBtn ? s.disabled : s.btns__cancel)}>
                Cancel
            </button>
            <button onClick={onSubmit} disabled={disabledConfirm}  className={clsx(disabledConfirm ? s.disabled : s.btns__submit)}>
                Submit
            </button>
            </div>
        </div> 
      </DialogWindow>;
}