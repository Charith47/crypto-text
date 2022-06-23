<template>
	<v-container>
		<h1>Hello from asym</h1>
		<v-btn @click="gen">generate</v-btn>
	</v-container>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
	data() {
		return {};
	},
	methods: {
		gen() {
			try {
				const result = ipcRenderer.invoke('gen-key-pair');
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>
