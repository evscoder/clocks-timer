import s from './ClockFace.module.scss';
import cn from 'clsx';
import {FC, memo} from "react";
import {ClockProps} from "../../../types/types";

const ClockFace: FC<ClockProps> = memo(({time}) => {
    return (
        <div className={s.clockFace}>
            <div className={s.clockFace__ticks}>
                <div className={s.clockFace__tick}></div>
                <div className={s.clockFace__tick}></div>
                <div className={s.clockFace__tick}></div>
            </div>
            <div className={cn(s.clockFace__arrow, s.clockFace__arrowHour)} style={{transform: `rotate(${+time.slice(0, 2) * 30}deg)`}}></div>
            <div className={cn(s.clockFace__arrow, s.clockFace__arrowMinute)} style={{transform: `rotate(${+time.slice(3, 5) * 6}deg)`}}></div>
            <div className={cn(s.clockFace__arrow, s.clockFace__arrowSecond)} style={{transform: `rotate(${+time.slice(6, 8) * 6}deg)`}}></div>
        </div>
    );
});

export default ClockFace;
