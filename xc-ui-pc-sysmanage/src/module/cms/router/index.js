import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';


export default [{
  path: '/',
  component: Home,
  name: 'cms',
  hidden: false,
  // ,
  // redirect: '/home',
  children: [
      {path: '/cms/page/list', name: '页面列表', component: page_list, hidden: false},
      {path: '/cms/page/add', name: '添加页面', component: page_add, hidden: false},
      {path: '/cms/page/edit', name: '修改页面', component: page_edit, hidden: false}
    ]
  }
  ]
