import { createRouter, createWebHashHistory } from 'vue-router'
import ForceList from '@/views/ForceList.vue'
import ForceDetailsView from '@/views/ForceDetailsView.vue'
import ForceEditorView from '@/views/ForceEditorView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ForceList,
    },
    {
      path: '/force/:id',
      name: 'force-details',
      component: ForceDetailsView,
    },
    {
      path: '/force/:id/edit',
      name: 'force-editor',
      component: ForceEditorView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/printable-force-list',
      name: 'printable-force-list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PrintableForceList.vue'),
    },
  ],
})

export default router
