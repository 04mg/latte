<script>
import { useSettingsStore } from '@/stores/settings.js';
import { mapStores } from 'pinia';

export default {
    computed: mapStores(useSettingsStore)
};
</script>

<template>
    <div class="box">
        <div class="field">
            <label for="iconColor" class="label">Icons color</label>
            <div class="control">
                <label class="radio">
                    <input
                        type="radio"
                        name="iconsColor"
                        id="0"
                        value="0"
                        v-model="settingsStore.iconsColor"
                    />
                    Black
                </label>
            </div>
            <div class="control">
                <label class="radio">
                    <input
                        type="radio"
                        name="iconsColor"
                        id="1"
                        value="1"
                        v-model="settingsStore.iconsColor"
                    />
                    White
                </label>
            </div>
        </div>

        <div class="field">
            <label for="iconColor" class="label">Icons position</label>
            <div class="control">
                <label class="radio">
                    <input
                        type="radio"
                        name="iconsPosition"
                        id="left"
                        value="left"
                        v-model="settingsStore.iconsPosition"
                    />
                    Left
                </label>
            </div>
            <div class="control">
                <label class="radio">
                    <input
                        type="radio"
                        name="iconsPosition"
                        id="center"
                        value="center"
                        v-model="settingsStore.iconsPosition"
                    />
                    Center
                </label>
            </div>
            <div class="control">
                <label class="radio">
                    <input
                        type="radio"
                        name="iconsPosition"
                        id="right"
                        value="right"
                        v-model="settingsStore.iconsPosition"
                    />
                    Right
                </label>
            </div>
        </div>
    </div>
</template>
