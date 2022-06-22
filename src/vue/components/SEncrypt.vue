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
		<v-btn x-large color="primary" elevation="0" block>Encrypt!</v-btn>
	</v-container>
</template>

<script>
import { clipboard } from 'electron';

export default {
	data() {
		return {
			showPassword: false,
			password: '',
			key: '',
			message: '',
		};
	},
	methods: {
		generateKey() {
			
		},
		copyToClipboard(data) {
			clipboard.writeText(data);
			// render toast
		},
	},
};
</script>
