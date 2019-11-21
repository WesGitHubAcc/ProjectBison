import itens from './components/itens'
import category from './components/category'
import reserves from './components/reserves'
import events from './components/events'


const routes = [
    { path: '/itens', component: itens, name: 'itens' },
    { path: '/category', component: category, name: 'category'},
    { path: '/reserves', component: reserves, name: 'reserves'},
    { path: '/events', component: events, name: 'events'}
];

export default routes;