import s from './Digital.module.scss';
import {FC, memo} from "react";
import {ClockProps} from "../../../types/types";

const Digital: FC<ClockProps> = memo(({time}) => {
    return (
        <div className={s.digital}>
            <span>{time}</span>
        </div>
    );
});

export default Digital;
