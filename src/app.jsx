import React from 'react';
import {render} from 'react-dom';
import { ipcRenderer } from 'electron';
//import { createStore } from 'redux'

import InstallSteps from './installsteps';
import Success from './success';

class App {
	constructor() {
		this.progress = 0;
		this.message = 'Initialising';
		this.current_screen = 'installing';
		//this._store = createStore();
		console.log('beginning listening');
		ipcRenderer.on('progress',
			function (event, store) {
			    this.progress = store;
			    this._render();
			}.bind( this )
		);
		ipcRenderer.on('progress-message',
			function (event, store) {
			    this.message = store;
			    this._render();
			}.bind( this )
		);
		ipcRenderer.on('app-status',
			function (event, store) {
			    this.current_screen = store;
			    this._render();
			}.bind( this )
		);
		/*ipcRenderer.on('progress',
			function (event, store) {
			    this.progress = store;
			    this._render();
			}.bind( this )
		);*/
	}

	_render() {
		//{this._store.getState()}progress={this.progress} />,
		render(
			<div className={ "app-container current-screen-" + this.current_screen }>
			  	<InstallSteps progress={this.progress} message={this.message}/>
			  	<Success />
			</div>,
			document.getElementById('root')
		);
	}
}


export default App;