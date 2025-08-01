import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectExperience, setParam, updateExperience } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import s from "./experience-modal.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../shared/input/input";
import { TextArea } from "../../shared/text-area/text-area";
import { clsx } from 'clsx';


const experienceFormSchema = z.object({
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

type FormData = z.infer<typeof experienceFormSchema>;

export const ExperienceModal = () => {
    const dispatch = useAppDispatch();
    const fields = useAppSelector(selectExperience);
    const param = useAppSelector(state => state.section.param);

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: { isDirty, isValid, errors, isSubmitting }
      } = useForm<FormData>({
        defaultValues: {
          position: fields.position || '',
          company: fields.company || '',
          period: fields.period || '',
          description: fields.description || ''
        },
          resolver: zodResolver(experienceFormSchema),
          mode: "onChange"
      });

    const onClose = () => {
      dispatch(setParam('none'));
      reset();
    }

    const onSubmit = (data: FormData) => {
        dispatch(updateExperience({id: 'exp-1', data}))
        reset(getValues())
        dispatch(setParam('none'))
    };

    const disabledSubmit = isSubmitting || !isDirty || !isValid;
    const disabledCancel = !isDirty;

    return <DialogWindow isOpen={param === 'experience'} onCloseHandler={onClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title className={s.title}>Опыт</Dialog.Title>
            <Dialog.Close asChild>
                <button onClick={onClose} className={s.close__button}>
                  X
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
          <button type="button" onClick={() => reset()} disabled={disabledCancel} className={clsx(!isDirty ? s.disabled : s.btns__cancel)}>
            Cancel
          </button>
          <button type="submit" disabled={disabledSubmit} className={clsx(disabledSubmit ? s.disabled : s.btns__submit)}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          </div>
        </form>
      </DialogWindow>;
};
