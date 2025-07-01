
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setParam, updateCategory } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../shared/input/input";
import { clsx } from 'clsx';
import s from './education-modal.module.scss'

const educationFormSchema = z.object({
  collage: z.string()
    .max(30, { message: "Должность должна содержать не более 30 символов" })
    .optional(),
  major: z.string()
    .max(30, { message: "Название компании должно содержать не более 30 символов" })
    .optional(),
  period: z.string()
    .max(30, { message: "Период должен содержать не более 50 символов" })
    .optional()
});

type FormData = z.infer<typeof educationFormSchema>;


export const EducationModal = () => {
    const dispatch = useAppDispatch();
    const fields = useAppSelector(state => state.section.sectionItems).experience;
    const param = useAppSelector(state => state.section.param);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        formState: { isDirty, isValid }
    } = useForm<FormData>({
    defaultValues: {
        collage: fields.collage || '',
        major: fields.major || '',
        period: fields.period || '',
    },
        resolver: zodResolver(educationFormSchema)
    });

    const onClose = () => {
        dispatch(setParam('none'));
        reset();
        }
        
    const onSubmit = (data: FormData) => {
        dispatch(updateCategory({section: "education", data}))
        reset(getValues())
        dispatch(setParam('none'))
    };
        
    const disabledSubmit = isSubmitting || !isDirty || !isValid;
    const disabledCancel = !isDirty;


    return <DialogWindow isOpen={param === 'education'} onCloseHandler={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Title className={s.title}>Опыт</Dialog.Title>
                <Dialog.Close asChild>
                    <button onClick={onClose} className={s.iconButton}>
                    X
                    </button>
                </Dialog.Close>

                <Controller
                    control={control}
                    name="collage"
                    render={({ field: { onChange, value } }) => (
                    <Input
                        value={value || ''}
                        onChange={onChange}
                        label={"Учебное заведение"} id={"collage"}
                        placeholder="Введите учебное заведение"
                        error={Boolean(errors.collage?.message)}
                        errorMessage={errors.collage?.message}
                        />
                    )}
                />

            <Controller
                control={control}
                name="major"
                render={({ field: { onChange, value } }) => (
                <Input
                    value={value || ''}
                    onChange={onChange}
                    label={"Специальность"} id={"major"}
                    placeholder="Введите компанию"
                    error={Boolean(errors.major?.message)}
                    errorMessage={errors.major?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="period"
                render={({ field: { onChange, value } }) => (
                <Input
                    value={value || ''}
                    onChange={onChange}
                    label={"Период"} id={"period"}
                    placeholder="Введите период"
                    error={Boolean(errors.period?.message)}
                    errorMessage={errors.period?.message}
                    />
                )}
            />
            
            <div className={s.btns}>
            <button type="button" onClick={() => reset()} disabled={disabledCancel} className={clsx(!isDirty ? s.disabled : s.btns__cancel)}>
                Cancel
            </button>
            <button type="submit" disabled={disabledSubmit} className={clsx(disabledSubmit ? s.disabled : s.btns__submit)}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            </div>
            </form>
        </DialogWindow>;;
};
