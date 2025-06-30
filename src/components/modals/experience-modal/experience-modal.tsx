
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setParam, updateCategory } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import s from "./experience-modal.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../shared/input/input";
import { TextArea } from "../../shared/text-area/text-area";
import { clsx } from 'clsx';


const formSchema = z.object({
  position: z.string()
    .max(50, { message: "Должность должна содержать не более 50 символов" })
    .optional(),
  company: z.string()
    .max(50, { message: "Название компании должно содержать не более 50 символов" })
    .optional(),
  period: z.string()
    .max(50, { message: "Период должен содержать не более 50 символов" })
    .optional(),
  description: z.string()
    .max(200, { message: "Раздел 'О себе' должен содержать не более 200 символов" })
    .optional()
});

type FormData = z.infer<typeof formSchema>;

export const ExperienceModal = () => {
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
          position: fields.position || '',
          company: fields.company || '',
          period: fields.period || '',
          description: fields.description || ''
        },
          resolver: zodResolver(formSchema)
      });

    const onClose = () => {
      dispatch(setParam('none'));
      reset();
    }

    const onSubmit = (data: FormData) => {
        dispatch(updateCategory({section: "experience", data}))
        reset(getValues())
        dispatch(setParam('none'))
    };

    const disabled = isSubmitting || !isDirty || !isValid;

    return <DialogWindow isOpen={param === 'experience'} onCloseHandler={onClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title className={s.Title}>Опыт</Dialog.Title>
            <Dialog.Close asChild>
                <button onClick={onClose} className={s.IconButton}>
                </button>
              </Dialog.Close>
          <Controller
            control={control}
            name="position"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value || ''}
                onChange={onChange}
                label={"Должность"} id={"position"}
                placeholder="Введите должность"
                error={Boolean(errors.position?.message)}
                errorMessage={errors.position?.message}
                />
            )}
          />

          <Controller
            control={control}
            name="company"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value || ''}
                onChange={onChange}
                label={"Компания"} id={"company"}
                placeholder="Введите компанию"
                error={Boolean(errors.company?.message)}
                errorMessage={errors.company?.message}
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

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                value={value || ''}
                onChange={onChange}
                label={"Описание"} id={"description"}
                placeholder="Введите описание"
                error={Boolean(errors.description?.message)}
                errorMessage={errors.description?.message}
                />
            )}
          />
        
        <div className={s.btns}>
          <button type="button" onClick={() => reset()} className={s.btns__cancel}>
            Cancel
          </button>
          <button type="submit" disabled={disabled} className={clsx(disabled ? s.disabled : s.btns__submit)}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          </div>
        </form>
        </DialogWindow>;
};
