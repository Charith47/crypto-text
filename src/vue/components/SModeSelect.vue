<template>
	<v-container class="px-0 py-0">
		<v-radio-group @change="triggerUpdate" class="my-0" v-model="mode" row>
			<template v-slot:label>
				<div class="body-1">Mode</div>
			</template>
			<v-radio class="mx-4" label="Encrypt" key="e" value="e"></v-radio>
			<v-radio class="mx-4" label="Decrypt" key="d" value="d"></v-radio>
		</v-radio-group>
	</v-container>
</template>

<script>
export default {
	name: 'SModeSelect',
	data() {
		return {
			mode: 'e',
		};
	},
	methods: {
		triggerUpdate() {
			this.$emit('modeChanged', this.mode);
		},
	},
};
</script>
