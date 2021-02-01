import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index';
import "firebaseui/dist/firebaseui.css";


createApp(App).use(store).mount('#app')
