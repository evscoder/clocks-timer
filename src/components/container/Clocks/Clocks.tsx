import {FC} from "react";
import s from './Clocks.module.scss';
import Loader from "../../ui/Loader/Loader";
import Clock from "../Clock/Clock";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import SelectTimeZone from "../SelectTimeZone/SelectTimeZone";

const Clocks: FC = () => {
    const {items} = useSelector((state: RootState) => state.clocksSlice);
    const {loading} = useSelector((state: RootState) => state.clocksSlice);

    return (
        <div className={s.clocks}>
            <SelectTimeZone />

            {loading ? <Loader /> :
                <div className={s.clocks__items}>
                    {items.map((item, index) => (
                        <Clock title={item.city} timeZone={item.timezone} key={`clock-item${-index}`} />
                    ))}
                </div>
            }
        </div>
    );
};

export default Clocks;
