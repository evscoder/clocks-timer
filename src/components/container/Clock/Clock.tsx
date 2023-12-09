import s from './Clock.module.scss';
import {memo, useEffect, useRef, useState} from "react";
import ClockFace from "../../layout/ClockFace/ClockFace";
import Digital from "../../layout/Digital/Digital";

type Props = {
    title: string,
    timeZone: string
}

const Clock = memo<Props>(({ title, timeZone }) => {
    const [time, setTime] = useState(new Date());
    const timeID = useRef<any>(null);

    useEffect(() => {
        timeID.current = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timeID.current);
    }, []);

    const convertToDigit = time.toLocaleTimeString('ru', {
        timeZone: timeZone
    });

    return (
        <div className={s.clock}>
            <h3>{title}</h3>
            <ClockFace time={convertToDigit} />
            <Digital time={convertToDigit} />
        </div>
    );
});

export default Clock;
