<script>
import { useSettingsStore } from './stores/settings.js';
import { mapStores } from 'pinia';
import { RouterLink, RouterView } from 'vue-router';
import SettingsIcon from './assets/icons/settings.svg';
import HomeIcon from './assets/icons/home.svg';
import TagIcon from './assets/icons/tag.svg';

export default {
    data() {
        return {
            HomeIcon,
            TagIcon,
            SettingsIcon
        };
    },
    components: {
        RouterLink,
        RouterView
    },
    computed: mapStores(useSettingsStore)
};
</script>

<template>
    <nav>
        <RouterLink to="/">
            <img :src="HomeIcon" class="nav-icon" />
        </RouterLink>
        <RouterLink to="/tags">
            <img :src="TagIcon" class="nav-icon" />
        </RouterLink>
        <RouterLink to="/settings">
            <img :src="SettingsIcon" class="nav-icon" />
        </RouterLink>
    </nav>

    <main :style="{ backgroundImage: `url(${settingsStore.backgroundImage})` }">
        <RouterView />
    </main>
</template>

<style>
.has-text-color {
    color: v-bind('settingsStore.textColor');
}

nav {
    justify-content: v-bind('settingsStore.iconsPosition');
}

main {
    background-color: v-bind('settingsStore.backgroundColor');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
}

.nav-icon {
    filter: brightness(0) invert(v-bind('settingsStore.iconsColor'));
}
</style>
