import 'babel-polyfill';
import React, { Component } from 'react';
import { render as NativeRender, View, Text, AsyncStorage } from 'react-native';
import { AppContainer } from 'react-hot-loader';
import app from './example/next';
import configureStore from './example/legacy/store';
import * as appActions from './example/legacy/store/action/app';

const store = configureStore();
const render = (AppComponent) => {
	const rootEl = document.getElementById('root');

	NativeRender(
		<AppContainer>
			<AppComponent store={store}/>
		</AppContainer>,
		rootEl
	);
};

render(app);

if (module.hot) {
	module.hot.accept('./example/legacy', () => {
		const App = require('./example/legacy').default; //eslint-disable-line
		render(App);

		/* Beautiful workaround:
		 Force update unrelated modules in the next execution loop.*/
		setTimeout(() => store.dispatch(appActions.increaseCounter()), 0);
	});
}