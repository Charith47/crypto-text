<template>
	<v-container>
		<SModeSelect @modeChanged="toggleView"></SModeSelect>
		<SEncrypt v-if="mode === 'e'"></SEncrypt>
		<SDecrypt v-else></SDecrypt>
	</v-container>
</template>

<script>
import SModeSelect from '../components/SModeSelect.vue';
import SEncrypt from '../components/SEncrypt.vue';
import SDecrypt from '../components/SDecrypt.vue';

export default {
	components: {
		SModeSelect,
		SEncrypt,
		SDecrypt,
	},
	data() {
		return {
			mode: 'e',
		};
	},
	methods: {
		toggleView(event) {
			this.mode = event;
		},
	},
};
</script>
