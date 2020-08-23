import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskList from '../views/TaskList.vue'
import EditTask from '../views/EditTask.vue'
import CreateTask from '../views/CreateTask.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: EditTask
  },
  {
    path: '/createTask',
    name: 'Create',
    component: CreateTask
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
