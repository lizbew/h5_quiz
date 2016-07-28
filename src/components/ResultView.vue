
<style>
.result-view {
	background-image: url(../../assets/img/wrong.png);
	min-height:  500px;
}
#an2-button {
	position: absolute;
	left: 500px;
	top: 400px;
}
</style>

<template>
<div class="result-view">
<x-button type="primary" >Share</x-button>
<x-button type="primary" @click="retryAnswer">Retry</x-button>
</div>
</template>

<script>
import XButton from 'vux/dist/components/x-button'

export default {
	name: 'ResultView',
	components: {
		XButton
	},
	data() {
		return {
			content: ''
		}
	},
	methods: {
		retryAnswer() {
			this.$route.router.go({path: '/quiz'})
		}
	}
}
</script>