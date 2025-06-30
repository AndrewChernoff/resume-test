
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setParam, updateCategory } from "../../../redux/sections-slice";
import { Dialog } from "radix-ui";
import { DialogWindow } from "../../dialog/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import s from "./experience-modal.module.scss";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const formSchema = z.object({
  position: z.string()
    .min(2, { message: "Должность должна содержать минимум 2 символа" })
    .max(50, { message: "Должность должна содержать не более 50 символов" })
    .optional(),
  company: z.string()
    .min(2, { message: "Название компании должно содержать минимум 2 символа" })
    .max(50, { message: "Название компании должно содержать не более 50 символов" })
    .optional(),
  period: z.string()
    .min(10, { message: "Период должен содержать минимум 10 символа" })
    .max(50, { message: "Период должен содержать не более 50 символов" })
    .optional(),
  description: z.string()
    .min(10, { message: "Раздел 'О себе' должен содержать минимум 10 символов" })
    .max(200, { message: "Раздел 'О себе' должен содержать не более 200 символов" })
    .optional()
});

type FormData = z.infer<typeof formSchema>;

export const ExperienceModal = () => {
    const dispatch = useAppDispatch();
    const fields = useAppSelector(state => state.section.sectionItems).experience;
    const param = useAppSelector(state => state.section.param);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
      } = useForm<FormData>({
        defaultValues: {
          position: fields.position,
          company: fields.company,
          period: fields.period,
          description: fields.description
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

  return <DialogWindow isOpen={param === 'experience'} onCloseHandler={onClose}>
    {/* <DevTool control={control} /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title className={s.Title}>Опыт</Dialog.Title>
          <Dialog.Close asChild>
                        <button onClick={onClose} className={s.IconButton} aria-label="Close">
                        </button>
            </Dialog.Close>
        <div className={s.input}>
          <label htmlFor="position">Должность</label>
          <input
            id="position"
            type="text"
            {...register("position")}
            placeholder="Введите должность"
          />
          {errors.position && (
            <p className={s.errorMessage}>{errors.position.message}</p>
          )}
        </div>

        <div className={s.input}>
          <label htmlFor="company">Компания</label>
          <input
            id="company"
            type="text"
            {...register("company")}
            placeholder="Введите компанию"
          />
          {errors.company && (
            <p className={s.errorMessage}>{errors.company.message}</p>
          )}
        </div>

        <div className={s.input}>
          <label htmlFor="period">Сертификаты</label>
          <input
            id="period"
            type="text"
            {...register("period")}
            placeholder="Введите сертификаты"
          />
          {errors.period && (
            <p className={s.errorMessage}>{errors.period.message}</p>
          )}
        </div>

        <div className={s.textArea}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="aboutMe"
            {...register("description")}
            placeholder="О себе"
          />
          {errors.description && (
            <p className={s.errorMessage}>{errors.description.message}</p>
          )}
        </div>

        <button type="button" onClick={() => reset()}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
        </DialogWindow>;
};
