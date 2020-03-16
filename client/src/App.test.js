import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import React from "react";
import { render } from "react-dom";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";

import App from "./App";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  messages: {
    isFetching: false,
    didInvalidate: false,
    items: {},
    ids: [],
    number: "",
    numberErrors: {}
  }
};

// TODO: spec these
const fakeItems = {
  items: {
    "1234": [
      {
        id: "931f3746fc303c26a41a68fcdc1b006a",
        datetime: "2018-08-06 10:29:59",
        number: "1234",
        text: "Random text",
        incoming: true,
        sent: true,
        read: false
      }
    ]
  },
  ids: ["1234"]
};

let store;
let component;
let history;

beforeEach(() => {
  history = createMemoryHistory();
  store = mockStore(initialState);
  fetch.resetMocks();
  fetch.mockResponses([JSON.stringify(fakeItems), { status: 200 }]);
});

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.createElement("div")
  );
});

it("renders a menu and container", () => {
  component = create(
    <Provider store={store}>
      <App history={history} />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
