import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import allReducers from "./modules/reducers";


const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(allReducers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />  
    </Provider>
  </React.StrictMode>
);
