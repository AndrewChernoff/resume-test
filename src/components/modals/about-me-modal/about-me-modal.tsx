import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setParam, updateAboutMe } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import s from "./about-me-modal.module.scss";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { TextArea } from "../../shared/text-area/text-area";


const aboutMeSchema = z.object({
  aboutMe: z.string()
    .max(150, "Максимальное количество символов 150")
});

type FormValues = z.infer<typeof aboutMeSchema>;

export const AboutMeModal = () => {
    const dispatch = useAppDispatch();
    const param = useAppSelector(state => state.section.param);
    const aboutMeValue = useAppSelector(state => state.section.sectionItems.aboutMe);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid, isDirty }
    } = useForm<FormValues>({
        resolver: zodResolver(aboutMeSchema),
        defaultValues: {
            aboutMe: aboutMeValue || ''
        },
    });

    const onClose = () => {
        reset();
        dispatch(setParam('none'));
    };

    const onSubmit = (data: FormValues) => {
        dispatch(updateAboutMe(data.aboutMe.trim()));
        onClose();
    };

    const clearValue = () => {
        reset({ aboutMe: '' });
    };

    const isFormEmpty = !isDirty;
    
    return (
        <DialogWindow isOpen={param === 'aboutMe'} onCloseHandler={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Dialog.Title className={s.title}>Обо мне</Dialog.Title>
                    <Dialog.Close asChild>
                        <button onClick={onClose} className={s.close__button}>
                            X
                        </button>
                    </Dialog.Close>          
                    <Controller
                        name="aboutMe"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextArea
                                value={value || aboutMeValue || ''}
                                onChange={onChange}
                                id="aboutMe"
                                placeholder="Расскажите о себе"
                                error={!!errors.aboutMe}
                                errorMessage={errors.aboutMe?.message}
                            />
                        )}
                    />
            
                    <div className={s.btns}>
                        <button 
                            type="button"
                            onClick={clearValue} 
                            disabled={isFormEmpty} 
                            className={clsx(isFormEmpty ? s.disabled : s.btns__cancel)}
                        >
                            Отмена
                        </button>
                        <button 
                            type="submit"
                            disabled={!isValid || isFormEmpty}  
                            className={clsx(!isValid || isFormEmpty ? s.disabled : s.btns__submit)}
                        >
                            Сохранить
                        </button>
                    </div>
                </div> 
            </form>
        </DialogWindow>
    );
};