import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useTagsStore = defineStore('tags', {
    state: () => {
        return {
            tagIndex: 0,
            tags: useStorage('tags', [])
        };
    },
    actions: {
        addTag(name) {
            this.tags.push({
                name: '#' + name,
                minutes: 0
            });
        },
        removeTag(index) {
            this.tagIndex = 0;
            this.tags.splice(index, 1);
        }
    }
});
