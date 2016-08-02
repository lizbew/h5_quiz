
<style>
.home-view {
	background: no-repeat center url(../../assets/img/index.png) ;
	min-height:  500px;
	filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size:100% 100%;
    background-size:100% 100%;
}
#start-button {
	position: absolute;
	left: 500px;
	top: 400px;
}
.btn-row {
	text-align: center;
}
.st-button {
  font-size: 24px;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  box-sizing: border-box;
}
</style>

<template>
<div class="home-view">
<div style="height:350px">
</div>
<div class="btn-row">
  <button class="st-button" @click="nextQuiz">开始答题</button>
</div>
</div>
</template>

<script>

export default {
	name: 'HomeView',
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