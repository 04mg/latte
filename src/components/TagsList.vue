<script>
import { useTagsStore } from '@/stores/tags.js';
import { mapStores } from 'pinia';

export default {
    methods: {
        getTimeString(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}h ${mins}m`;
        },
        removeTag(index) {
            this.tagsStore.removeTag(index);
        }
    },
    computed: mapStores(useTagsStore)
};
</script>

<template>
    <div class="box">
        <ul v-if="tagsStore.tags.length">
            <li v-for="(tag, index) in tagsStore.tags" :key="index">
                {{ tag.name }} ({{ getTimeString(tag.minutes) }})
                <button
                    class="delete is-small"
                    @click="removeTag(index)"
                ></button>
            </li>
        </ul>
        <p v-else>No tags found. Add one above!</p>
    </div>
</template>

<style scoped>
li {
    transition-duration: 0.5s;
    cursor: pointer;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c2c2c2;
    border-radius: 3px;
    padding: 3px;
}

li:hover,
li:active {
    transition-duration: 0.5s;
    transform: scale(1.05);
}

li:not(:last-child) {
    margin-bottom: 5px;
}
</style>
