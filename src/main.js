import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Button, NavBar, Toast, Field, Cell, CellGroup, Icon, Image as VanImage, Empty } from 'vant'
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'
import PlayerPage from './components/PlayerPage.vue'
import CommentPage from './components/CommentPage.vue'
import LyricBookPage from './components/LyricBookPage.vue'
import JournalDetailPage from './components/JournalDetailPage.vue'
import ProfilePage from './components/ProfilePage.vue'

const routes = [
  { path: '/', redirect: '/profile' },
  { path: '/profile', component: ProfilePage },
  { path: '/player', component: PlayerPage },
  { path: '/comment', component: CommentPage },
  { path: '/lyricbook', component: LyricBookPage },
  { path: '/journal-detail', component: JournalDetailPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(Button).use(NavBar).use(Toast).use(Field).use(Cell).use(CellGroup).use(Icon).use(VanImage).use(Empty)
app.mount('#app')