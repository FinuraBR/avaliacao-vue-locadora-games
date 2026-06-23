import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JogosView from '../views/JogosView.vue'
import NovoJogoView from '../views/NovoJogoView.vue'
import EditarJogoView from '../views/EditarJogoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jogos',
      name: 'jogos-listagem',
      component: JogosView
    },
    {
      path: '/jogos/novo',
      name: 'jogo-novo',
      component: NovoJogoView
    },
    {
      path: '/jogos/:id/editar',
      name: 'jogo-editar',
      component: EditarJogoView,
      props: true
    }
  ],
})

export default router