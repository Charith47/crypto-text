<template>
	<v-container class="px-0 py-0">
		<v-container class="d-flex px-0 py-0 mb-8">
			<v-btn color="primary" elevation="0" @click="generateKeyPair"
				>Generate Key Pair</v-btn
			>
			<v-btn color="primary" class="ml-4" outlined>Select public key</v-btn>
		</v-container>
		<v-textarea
			v-model="message"
			outlined
			no-resize
			clearable
			label="Enter your message"
		>
		</v-textarea>
		<v-divider class="mb-8"></v-divider>
		<v-textarea
			v-model="encryptedMessage"
			outlined
			no-resize
			clearable
			label="Encrypted message"
			:append-icon="encryptedMessage ? 'mdi-content-copy' : ''"
			@click:append="copyToClipboard(encryptedMessage)"
		>
		</v-textarea>
		<v-btn x-large color="primary" block elevation="0">Encrypt!</v-btn>
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
			snackbar: false,
			message: '',
			encryptedMessage: '',
		};
	},
	methods: {
		async generateKeyPair() {
			try {
				const result = await ipcRenderer.invoke('gen-key-pair');
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		},
		copyToClipboard(data) {
			clipboard.writeText(data);
			this.snackbar = true;
		},
		clearFields() {
			this.message = '';
			this.encryptedMessage = '';
		},
	},
};
</script>
