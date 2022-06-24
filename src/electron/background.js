'use strict';

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

import { keyGen, encrypt, decrypt } from './symmetric.js';
import { genKeyPair, encryptAsymmetric } from './asymmetric.js';

import * as fs from 'fs';
import * as path from 'path';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 600,
		height: 800,
		autoHideMenuBar: true,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
		},
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		//if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app');
		// Load the index.html when not in development
		win.loadURL('app://./index.html');
	}
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS_DEVTOOLS);
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString());
		}
	}
	createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}

ipcMain.handle('gen-symmetric-key', async (event, password) => {
	let key = null;
	let error = null;

	try {
		key = await keyGen(password);
	} catch (err) {
		console.log(err);
		error = err;
	}

	return [key, error];
});

ipcMain.handle('encrypt-symmetric', async (event, message, key) => {
	let encryptedData = null;
	let error = null;

	try {
		encryptedData = await encrypt(message, key);
	} catch (err) {
		console.log(err);
		error = err;
	}

	return [encryptedData, error];
});

ipcMain.handle('decrypt-symmetric', async (event, data, key) => {
	let decryptedData = null;
	let error = null;

	try {
		decryptedData = await decrypt(data, key);
	} catch (err) {
		console.log(err);
		error = err;
	}

	return [decryptedData, error];
});

ipcMain.handle('gen-key-pair', async (event) => {
	try {
		const data = await genKeyPair();

		const options = {
			title: 'Save keys',
			defaultPath: app.getPath('documents'),
			buttonLabel: 'Save',
			filters: [
				{ name: 'pem', extensions: ['pem'] },
				{ name: 'All Files', extensions: ['*'] },
			],
			properties: ['openDirectory'],
		};

		dialog.showOpenDialog(null, options).then((result) => {
			if (result.canceled) return;

			const savePath = result.filePaths[0];

			for (const key of Object.keys(data)) {
				fs.writeFile(path.join(savePath, `${key}.pem`), data[key], (err) => {
					if (err) throw err;
				});
			}
		});
	} catch (err) {
		console.log(err);
	}
});

ipcMain.handle('open-pub-key', async (event) => {
	let data = null;
	let error = null;

	try {
		const options = {
			title: 'Select public key',
			defaultPath: app.getPath('documents'),
			buttonLabel: 'Open',
			filters: [
				{ name: 'pem', extensions: ['pem'] },
				{ name: 'All Files', extensions: ['*'] },
			],
			properties: ['openFile'],
		};

		const result = await dialog.showOpenDialog(null, options);

		if (result.canceled) return;

		const loadPath = result.filePaths[0];
		let buffer = fs.readFileSync(loadPath);

		data = {
			pubkey: buffer.toString(),
			filename: path.basename(loadPath),
		};
	} catch (err) {
		error = err;
	}

	return [data, error];
});

ipcMain.handle('encrypt-asymmetric', async (event,message, key) => {
	let data = null;
	let error = null;

	try {
		const result = await encryptAsymmetric(message, key);
		data = result;
	} catch (err) {
		error = err;
	}

	return [data, error];
});
