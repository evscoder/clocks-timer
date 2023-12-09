import {FC, useCallback, useEffect} from 'react';
import {Select} from "antd";
import s from './SelectTimeZone.module.scss';
import {useSelector} from "react-redux";
import getTimezonesRequest from "../../../api/timezones/getTimezonesRequest";
import {clearSelect, getSelectValue, selectTimeZone, unSelectTimeZone} from "../../../redux/clocksSlice";
import {RootState} from "../../../store";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

const { Option } = Select;

const SelectTimeZone: FC = () => {
    const { items, selectValueDefault, timezones } = useSelector((state: RootState) => state.clocksSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTimezonesRequest());
    }, [dispatch]);

    const onChangeSelect = useCallback((value: string): void => {
        dispatch(getSelectValue(value));
    }, [dispatch]);

    const onSelectTimeZone = useCallback((value: string, index: any): void => {
        if (items.length < 24) {
            dispatch(selectTimeZone({
                city: value,
                timezone: index['data-timezone']
            }));
        }
    }, [items, dispatch]);

    const onUnselectChange = useCallback((value: string): void => {
        dispatch(unSelectTimeZone(value));

        if (items.length === 1) {
            dispatch(clearSelect());
        }
    }, [items, dispatch]);

    const onClearSelect = useCallback((): void => {
        dispatch(clearSelect());
    }, [dispatch]);

    return (
        <Select
            mode="multiple"
            allowClear
            onChange={onChangeSelect}
            onSelect={onSelectTimeZone}
            onDeselect={onUnselectChange}
            onClear={onClearSelect}
            className={s.select}
            value={selectValueDefault}
        >
            {timezones.map((item) => (
                <Option value={item.name} data-timezone={item.timezone} key={`timezone-${item.name}`}>{item.name}</Option>
            ))}
        </Select>
    );
};

export default SelectTimeZone;
