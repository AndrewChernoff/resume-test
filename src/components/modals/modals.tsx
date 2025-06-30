import { useAppDispatch, useAppSelector } from "../../app/hooks"
import s from "./modals.module.scss";
import { setParam } from "../../redux/sections-slice";
import { DialogWindow } from "../dialog/dialog";

export const Modals = () => {
    const dispatch = useAppDispatch();
    const param = useAppSelector(state => state.section.param);

    const onClose = () => {
        dispatch(setParam('none'))
    }


    if (param === 'experience') {
        return <DialogWindow isOpen={param === 'experience'} onCloseHandler={onClose}>
            <fieldset className={s.Fieldset}>
                        <label className={s.Label} htmlFor="name">
                            Name
                        </label>
                        <input
                            className={s.Input}
                            id="name"
                            defaultValue="Pedro Duarte"
                        />
                    </fieldset>
                    <fieldset className={s.Fieldset}>
                        <label className={s.Label} htmlFor="username">
                            Username
                        </label>
                        <input
                            className={s.Input}
                            id="username"
                            defaultValue="@peduarte"
                        />
                    </fieldset>
        </DialogWindow>
    } else {
        return <div>yooo</div>
    }
}