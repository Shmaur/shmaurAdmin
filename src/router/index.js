import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import home from '@/view/frame'
import articleList from '@/view/ArticleList/articleList'
import article from '@/view/Article/article'
import photo from '@/view/photo/photo'
import homePage from '@/view/homePage/homePage'
import comment from '@/view/comment/comment'
import leaveword from '@/view/leaveWord/leaveworld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },{
    	path:'/home',
    	component:home,
      children:[
        {
          path:'/homePage',
          name:"homePage",
          component:homePage
        },{
          path:'/articleList',
          name:'articleList',
          component:articleList
        },{
          path:'/article',
          name:'article',
          component:article
        },{
          path:'/photo',
          name:'photo',
          component:photo
        },{
          path:'/comment',
          name:'comment',
          component:comment
        },{
          path:'/leaveword',
          name:'leaveword',
          component:leaveword
        }
      ]
    }
  ]
})
