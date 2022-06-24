<template>
	<v-container class="px-0 py-0">
		<v-container class="d-flex px-0 py-0 mb-8">
			<v-btn color="primary" @click="selectPrivateKey" outlined
				>Select private key</v-btn
			>
			<v-chip
				v-if="filename"
				pill
				color="secondary"
				class="ml-4"
				close
				@click:close="clearKey"
				>{{ filename }}</v-chip
			>
		</v-container>
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
		>
		</v-textarea>
		<v-btn x-large color="primary" block elevation="0" @click="decryptData"
			>Decrypt!</v-btn
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
import { ipcRenderer } from 'electron';

export default {
	data() {
		return {
			snackbar: false,
			filename: '',
			priKey: '',
			ciphertext: '',
			decryptedMessage: '',
		};
	},
	methods: {
		async decryptData() {
			if(!this.priKey || !this.ciphertext) return;

			const result = await ipcRenderer.invoke(
				'decrypt-asymmetric',
				this.ciphertext,
				this.priKey
			);
			if (result[0]) {
				this.decryptedMessage = result[0];
			}
		},
		async selectPrivateKey() {
			try {
				const result = await ipcRenderer.invoke('open-key', 'private');
				if (result[0]) {
					this.filename = result[0].filename;
					this.priKey = result[0].key;
				}
			} catch (err) {
				console.log(err);
			}
		},
		clearFields() {
			this.filename = '';
			this.priKey = '';
			this.ciphertext = '';
			this.decryptedMessage = '';
		},
		clearKey() {
			this.priKey = '';
			this.filename = '';
		},
	},
};
</script>
