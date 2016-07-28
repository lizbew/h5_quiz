
<style>
.home-view {
	background-image: url(../../assets/img/index.png);
	min-height:  500px;
}
#start-button {
	position: absolute;
	left: 500px;
	top: 400px;
}
</style>

<template>
<div class="home-view">
<x-button id="start-button" type="primary" @click="nextQuiz">Start</x-button>
</div>
</template>

<script>
import XButton from 'vux/dist/components/x-button'

export default {
	name: 'HomeView',
	components: {
		XButton
	},
	data() {
		return {
			content: 'this is just some text'
		}
	},
	methods: {
		nextQuiz() {
			this.$route.router.go({path: '/quiz'})
		}
	}
}
</script>