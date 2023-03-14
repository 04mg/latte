import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            textColor: useStorage('text_color', '#fff'),
            backgroundColor: useStorage('background_color', '#00000094'),
            backgroundImage: useStorage(
                'background_image',
                'https://bit.ly/403takj'
            ),
            iconsColor: useStorage('icons_color', '1'),
            iconsPosition: useStorage('icons_position', 'center'),
            timerProgressColor: useStorage('timer_progress_color', '#fff'),
            timerBackgroundColor: useStorage(
                'timer_background_color',
                '#0000009c'
            )
        };
    },
    actions: {
        setSettings(settings) {
            Object.assign(this, settings);
        }
    }
});
