<template>
	<v-app>
		<v-app-bar app dense color="primary" dark flat outlined>
			<v-tabs fixed-tabs>
				<v-tab to="/symmetric">symmetric</v-tab>
				<v-tab to="/asymmetric">asymmetric</v-tab>
			</v-tabs>
		</v-app-bar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {};
	},
};
</script>

<style>
::-webkit-scrollbar {
	display: none;
}
</style>
