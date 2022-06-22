import Vue from 'vue';
import VueRouter from 'vue-router';
import Symmetric from '../views/Symmetric.vue';
import Asymmetric from '../views/Asymmetric.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/symmetric',
		name: 'Symmetric',
		component: Symmetric,
	},
	{
		path: '/asymmetric',
		name: 'Asymmetric',
		component: Asymmetric,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.replace('/symmetric');

export default router;
