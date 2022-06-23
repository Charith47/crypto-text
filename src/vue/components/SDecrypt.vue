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
		>
		</v-textarea>
		<v-btn x-large color="primary" elevation="0" block @click="decryptData">
			Decrypt!
		</v-btn>
		<v-btn class="my-4" block elevation="0">clear</v-btn>
	</v-container>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
	data() {
		return {
			key: '',
			ciphertext: '',
			decryptedMessage: '',
		};
	},
	methods: {
		async decryptData() {
			try {
				const result = await ipcRenderer.invoke(
					'decrypt-symmetric',
					this.ciphertext,
					this.key
				);
                this.decryptedMessage = result[0].data;
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>
