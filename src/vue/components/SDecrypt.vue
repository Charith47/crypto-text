<template>
	<v-container class="px-0 py-0">
		<p class="subtitle-1">
			Enter the secret key which was used to encrypt the message
		</p>
		<v-text-field
			v-model="key"
			outlined
			dense
			clearable
			label="Secret key"
		></v-text-field>
		<v-textarea
			v-model="ciphertext"
			outlined
			no-resize
			clearable
			label="Enter the ciphertext"
		>
		</v-textarea>
		<v-divider class="mb-8"></v-divider>
		<v-textarea
			v-model="decryptedMessage"
			outlined
			no-resize
			clearable
			label="Decrypted message"
			:append-icon="decryptedMessage ? 'mdi-content-copy' : ''"
			@click:append="copyToClipboard(decryptedMessage)"
		>
		</v-textarea>
		<v-btn x-large color="primary" elevation="0" block @click="decryptData">
			Decrypt!
		</v-btn>
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
			key: '',
			ciphertext: '',
			decryptedMessage: '',
			snackbar: false,
		};
	},
	methods: {
		async decryptData() {
			try {
				if (!this.key || !this.ciphertext) return;

				const result = await ipcRenderer.invoke(
					'decrypt-symmetric',
					this.ciphertext,
					this.key
				);
				if (result[0]) this.decryptedMessage = result[0].data;
			} catch (err) {
				console.log(err);
			}
		},
		copyToClipboard(data) {
			clipboard.writeText(data);
			this.snackbar = true;
		},
		clearFields() {
			this.key = '';
			this.ciphertext = '';
			this.decryptedMessage = '';
		},
	},
};
</script>
