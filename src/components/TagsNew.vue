<script>
import { useTagsStore } from '@/stores/tags.js';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        addTag() {
            if (!this.name) {
                this.$toast.info('Enter tag name');
                return;
            } else if (this.name.startsWith('-') || this.name.endsWith('-')) {
                this.$toast.error(
                    'Tag names should not begin/end with a hyphen'
                );
                return;
            }

            this.tagsStore.addTag(this.name);
            this.name = '';
        },
        setFormat() {
            // The expression
            // + no double hyphens
            // + space = -
            this.name = this.name
                .replace(' ', '-')
                .replace('--', '-') // no double hyphens
                .replace(/[^\w-]/g, '') // only allow word characters (\w), -
                .toLowerCase();
        }
    },
    computed: mapStores(useTagsStore)
};
</script>

<template>
    <div class="box">
        <div class="field">
            <label for="tag" class="label">Add a new tag</label>
            <div class="control">
                <input
                    type="text"
                    class="input is-fullwidth"
                    v-model="name"
                    @input="setFormat"
                    maxlength="32"
                />
            </div>
        </div>
        <div class="field">
            <button class="button is-fullwidth" @click="addTag">Add</button>
        </div>
    </div>
</template>
