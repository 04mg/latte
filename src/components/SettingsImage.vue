<script>
import { searchImage } from '@/services/imageService.js';
import { useSettingsStore } from '@/stores/settings.js';
import { mapStores } from 'pinia';
import BrokenImage from '@/assets/images/broken_thumbnail.webp';

export default {
    data() {
        return {
            searchTerm: '',
            BrokenImage
        };
    },
    methods: {
        changeBrokenImage(event) {
            event.target.src = this.BrokenImage;
        },
        searchImage(event) {
            if (this.searchTerm == '') {
                this.$toast.info('Enter a search term');
                return;
            }

            event.target.disabled = true;

            searchImage(this.searchTerm)
                .then((image) => {
                    this.settingsStore.setSettings({
                        backgroundImage: image
                    });
                })
                .catch((err) => {
                    this.$toast.error(err.message);
                })
                .finally(() => {
                    event.target.disabled = false;
                });
        }
    },
    computed: mapStores(useSettingsStore)
};
</script>

<template>
    <div class="box">
        <div class="field">
            <label for="imageUrl" class="label">Background image</label>
            <div class="thumbnail-container mb-1">
                <img
                    id="thumbnail"
                    :src="settingsStore.backgroundImage || BrokenImage"
                    @error="changeBrokenImage"
                />
            </div>
            <label for="url" class="label">Image URL</label>
            <input
                type="text"
                class="input"
                name="imageUrl"
                id="url"
                v-model="settingsStore.backgroundImage"
                placeholder="Paste or search below"
            />
        </div>
        <div class="field">
            <label for="unsplashSearchTerm" class="label">Search by term</label>
            <input
                type="text"
                class="input"
                placeholder="Ex: coffee"
                v-model="searchTerm"
            />
        </div>
        <div class="field">
            <button class="button is-fullwidth" @click="searchImage">
                Search
            </button>
        </div>
        <p class="help">Powered by Unsplash</p>
    </div>
</template>
