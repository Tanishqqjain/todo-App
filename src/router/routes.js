
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/todo.vue'), meta: { requiresAuth : true}},
      { path: 'help/', component: () => import('pages/help.vue'), meta: { requiresAuth : true}},
      {
        path: '/auth/',
        component: () => import('pages/auth.vue'),
      },
    ]
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
