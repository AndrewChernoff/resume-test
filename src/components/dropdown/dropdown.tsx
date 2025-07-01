import { type FC, type ReactNode } from "react";
import { DropdownMenu } from "radix-ui";

import s from "./dropdown.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setParam } from "../../redux/sections-slice";

type PropsType = {
    children: ReactNode
}


export const Dropdown: FC<PropsType> = ({children}) => {
    const dispatch = useAppDispatch();
    const param = useAppSelector(state => state.section.param);

    const onChooseParam = (value: string) => dispatch(setParam(value))

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
                {children}
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
                <DropdownMenu.Content className={s.Content} sideOffset={5}>
                <DropdownMenu.RadioGroup value={param} onValueChange={onChooseParam}>
						<DropdownMenu.RadioItem className={s.RadioItem} value="experience">
							Опыт
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem className={s.RadioItem} value="education">
							Образование
						</DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem className={s.RadioItem} value="skills">
							Навыки
						</DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem className={s.RadioItem} value="certificates">
							Сертификаты
						</DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem className={s.RadioItem} value="aboutMe">
							О себе
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
                    </DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
