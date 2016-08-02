
<style>
.quiz-view {
	background: no-repeat center url(../../assets/img/inprogress.png);
	min-height:  500px;
	filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size:100% 100%;
    background-size:100% 100%;
}
#an1-button {
	position: absolute;
	left: 500px;
	top: 400px;
}

#quiz-pic {
	height: 165px;
	background-color: #25D8F4;
}

#quiz-content {
	background-color: #80F2FC;
	padding: 1em 1em;
	min-height: 150px;
	font-size: 30px;
	font-weight: 800;

}


#quiz-btn-row {
	padding: 20px 40px;
}
</style>

<template>
<div class="quiz-view">
  <div id="quiz-pic">
  </div>
  <div id="quiz-content">
   <p>{{ quiz.q }}</p>
  </div>
  <div id="quiz-btn-row">	
  	<x-button v-for="(k, p) in quiz.options" type="primary" @click="submitAnswer(k)">{{ p }}</x-button>
  </div>
  <dialog :show.sync="show_comp_dialog" :hide-on-blur="true">
    <div class="weui_dialog_hd"><strong class="weui_dialog_title">答题完成</strong></div>
        <div class="weui_dialog_bd">恭喜，你已经正确回答了所有问题！</div>
        <div class="weui_dialog_ft">
            <a href="javascript:;" class="weui_btn_dialog primary" @click="hideDialog">确定</a>
        </div>
  </dialog>
</div>
</template>

<script>
import XButton from 'vux/dist/components/x-button'
import Dialog from 'vux/dist/components/dialog'

let api_quiz = '/api/quiz'

export default {
	name: 'QuizView',
	components: {
		XButton,
		Dialog
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
		},
		hideDialog() {
			this.$set('show_comp_dialog', false);
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