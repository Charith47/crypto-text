<template>
	<v-container class="px-0 py-0">
		<p class="subtitle-1">
			Enter a strong password, or leave empty to generate a random key
		</p>
		<div class="d-flex">
			<v-text-field
				outlined
				dense
				clearable
				v-model="password"
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPassword ? 'text' : 'password'"
				name="input-10-1"
				label="Password"
				@click:append="showPassword = !showPassword"
			></v-text-field>
			<v-btn
				height="40"
				class="ml-4"
				elevation="0"
				color="primary"
				@click="generateKey"
			>
				Generate Key
			</v-btn>
		</div>
		<v-textarea
			v-model="key"
			outlined
			no-resize
			clearable
			label="Generated key"
			:append-icon="key ? 'mdi-content-copy' : ''"
			@click:append="copyToClipboard(key, $event)"
		>
		</v-textarea>
		<v-divider class="mb-8"></v-divider>
		<v-textarea
			v-model="message"
			outlined
			no-resize
			clearable
			label="Enter your message"
			:append-icon="message ? 'mdi-content-copy' : ''"
			@click:append="copyToClipboard(message)"
		>
		</v-textarea>
		<v-btn x-large color="primary" elevation="0" block @click="encryptData"
			>Encrypt!</v-btn
		>
		<v-btn class="my-4" block elevation="0" @click="clearFields">clear</v-btn>
		<v-snackbar
			bottom
			elevation="0"
			class=""
			v-model="snackbar"
			:timeout="3000"
		>
			Copied to clipboard
			<template v-slot:action="{ attrs }">
				<v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
import { clipboard, ipcRenderer } from 'electron';

export default {
	data() {
		return {
			showPassword: false,
			snackbar: false,
			password: '',
			key: '',
			message: '',
		};
	},
	mounted() {
		// load saved data
	},
	beforeDestroy() {
		// save fields in store
	},
	methods: {
		async generateKey() {
			try {
				const psw = this.password.trim();
				const result = await ipcRenderer.invoke('gen-symmetric-key', psw);
				this.key = result[0];
			} catch (err) {
				// display error
				console.log(err);
			}
		},
		async encryptData() {
			try {
				console.log(this.$data);
				const result = await ipcRenderer.invoke(
					'encrypt-symmetric',
					this.message,
					this.key
				);
				console.log(result);
				this.message = result[0].data;
			} catch (err) {
				// display error
				console.log(err);
			}
		},
		clearFields() {
			this.password = '';
			this.key = '';
			this.message = '';
		},
		copyToClipboard(data) {
			clipboard.writeText(data);
			this.snackbar = true;
		},
	},
};
</script>
