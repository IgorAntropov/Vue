import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import Store from './store.js'

library.add(fas);

createApp(App)
    .use(Store)
    .component('fa', FontAwesomeIcon)
    .mount('#app');
