import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useToast } from 'vue-toast-notification';

import App from './App.vue';
import router from './router';

import 'bulma/css/bulma.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

const $toast = useToast({
    position: 'bottom',
    queue: false,
    duration: 3000
});
app.config.globalProperties.$toast = $toast;
pinia.use(({ store }) => {
    store.$toast = $toast;
});

app.use(pinia);
app.use(router);

app.mount('#app');
