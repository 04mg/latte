<script>
import { useSettingsStore } from '@/stores/settings.js';
import { ColorPicker } from 'vue-accessible-color-picker';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            selectedOption: 'backgroundColor'
        };
    },
    methods: {
        changeBackgroundColor(data) {
            this.settingsStore.setSettings({
                [this.selectedOption]: data.colors.hex
            });
        }
    },
    components: {
        ColorPicker
    },
    computed: mapStores(useSettingsStore)
};
</script>

<template>
    <div class="box">
        <div class="field">
            <label for="backgroundColor" class="label">Set colors</label>
            <div class="select mb-2 is-fullwidth">
                <select
                    name="backgroundColor"
                    class="select"
                    v-model="selectedOption"
                >
                    <option value="backgroundColor">Background</option>
                    <option value="textColor">Text</option>
                    <option value="timerBackgroundColor">
                        Timer background
                    </option>
                    <option value="timerProgressColor">Progress</option>
                </select>
            </div>
            <div class="control">
                <ColorPicker
                    class="p-0"
                    :color="settingsStore[selectedOption]"
                    @color-change="changeBackgroundColor"
                />
            </div>
        </div>
    </div>
</template>
