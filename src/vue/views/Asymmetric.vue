<template>
	<v-container class="px-6 py-6">
		<SModeSelect @modeChanged="toggleView"></SModeSelect>
		<AEncrypt v-if="mode === 'e'"></AEncrypt>
		<ADecrypt v-else></ADecrypt>
	</v-container>
</template>

<script>
import SModeSelect from '../components/SModeSelect.vue';
import AEncrypt from '../components/AEncrypt.vue';
import ADecrypt from '../components/ADecrypt.vue';

export default {
	data() {
		return {
			mode: 'e',
		};
	},
	components: {
		SModeSelect,
		AEncrypt,
		ADecrypt,
	},
	methods: {
		toggleView(event) {
			this.mode = event;
		},
	},
};
</script>
