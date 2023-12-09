import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import timezones from "../data/timezones";

const useMockAdapter = () => {
    const mock = new MockAdapter(axios, {delayResponse: 1000});

    mock.onGet("/api/timezones").reply(200, timezones);
};

export default useMockAdapter;
