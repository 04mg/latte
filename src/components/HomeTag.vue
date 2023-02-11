<script>
import { useTagsStore } from '@/stores/tags.js';
import { useTimerStore } from '@/stores/timer.js';
import { mapStores } from 'pinia';

export default {
    methods: {
        changeTag() {
            if (this.timerStore.active) {
                this.$toast.info('Stop the timer first')
                return;
            }

            if (this.tagsStore.tagIndex < this.tagsStore.tags.length - 1) {
                this.tagsStore.tagIndex++;
            } else {
                this.tagsStore.tagIndex = 0;
            }
        }
    },
    computed: {
        tag() {
            if (this.tagsStore.tags.length) {
                return this.tagsStore.tags[this.tagsStore.tagIndex].name;
            }

            return '#untagged';
        },
        ...mapStores(useTagsStore, useTimerStore)
    }
};
</script>

<template>
    <span class="mb-4 is-size-6 has-text-color" @click="changeTag">{{
        tag
    }}</span>
</template>

<style scoped>
span {
    transition-duration: 0.5s;
    cursor: pointer;
}
span:hover,
span:active {
    transition-duration: 0.5s;
    transform: scale(1.1);
}
</style>
