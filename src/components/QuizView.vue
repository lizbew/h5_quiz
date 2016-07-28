
<style>
.quiz-view {
	background-image: url(../../assets/img/inprogress.png);
	min-height:  500px;
}
#an1-button {
	position: absolute;
	left: 500px;
	top: 400px;
}
</style>

<template>
<div class="quiz-view">
  <div>
   <p>{{ quiz.q }}</p>
  </div>
  <div>
  	<x-button v-for="(k, p) in quiz.options" type="primary" @click="submitAnswer(k)">{{ p }}</x-button>
  </div>
  <dialog :show.sync="show_comp_dialog">ALL Completed!</dialog>
</div>
</template>

<script>
import XButton from 'vux/dist/components/x-button'
import Dialog from 'vux/dist/components/dialog'

let api_quiz = '/api/quiz'

export default {
	name: 'QuizView',
	components: {
		XButton
	},
	data() {
		return {
			content: 'this is just some text',
			quiz: {},
			show_comp_dialog: false
		}
	},
	methods: {
		submitAnswer(selectedA) {
			this.$http.post(api_quiz, {
				'answer': {
					'quiz_sequence': this.$data.quiz.sequence,
					'selected': selectedA
				}
			}).then((response) => {
				let resp = response.json();
				if (resp.status == 'ok') {
					if (!!resp.quiz) {
						this.$set('quiz', resp.quiz);
					} else {
						this.$set('show_comp_dialog', true);
					}
					
				} else if (resp.status == 'fail') {
					this.$route.router.go({path: '/result'})
				}
			}, (response) => {})
		},
		gotoResult() {
			this.$route.router.go({path: '/result'})
		}
	},
	ready() {
		this.$http.post(api_quiz, {}, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			let resp = response.json()
			if (!!resp.quiz) {
				this.$set('quiz', resp.quiz)
			}
		},(response) => {

		});
	}
}
</script>