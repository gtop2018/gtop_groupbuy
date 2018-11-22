import React from 'react';
import ReactDOM from 'react-dom';
import "./style/gtshop.css";
import "./style/animate.css";
import "./style/gtwater.css"
import App from './pages/app';
import { Provider, connect } from 'react-redux';
import { mapStateToProps , mapDispatchToProps , store } from "./redux/store.js";
import registerServiceWorker from './registerServiceWorker';

const AppRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
ReactDOM.render(
    <Provider store={store}>
        <AppRedux />
    </Provider>,
    document.getElementById("root")
);
// registerServiceWorker();

