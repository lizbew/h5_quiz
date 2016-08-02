
<style>
.result-view {
	background-image: url(../../assets/img/wrong.png);
	min-height:  500px;
	filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size:100% 100%;
    background-size:100% 100%;
}
#an2-button {
	position: absolute;
	left: 500px;
	top: 400px;
}
#result-pic {
	height: 250px;
}
#result-btn {
	padding: 10px 30px;
}
</style>

<template>
<div class="result-view">
<div id="result-pic">
</div>
	<div id="result-btn">
		<x-button type="primary" >Share</x-button>
		<x-button type="primary" @click="retryAnswer">Retry</x-button>
	</div>

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