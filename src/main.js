import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import VueResource from 'vue-resource'
import HomeView from './components/HomeView.vue'
import QuizView from './components/QuizView.vue'
import ResultView from './components/ResultView.vue'


Vue.use(Router)
Vue.use(VueResource)

var router = new Router()


router.map({
	'/': {
		component: HomeView
	},
	'/quiz': {
		component: QuizView
	},
	'/result': {
		component: ResultView
	}
})


router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})


router.start(App, '#app')
