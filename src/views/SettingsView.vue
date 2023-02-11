<script setup>
import SettingsColor from '@/components/SettingsColor.vue';
import SettingsIcons from '@/components/SettingsIcons.vue';
import SettingsImage from '@/components/SettingsImage.vue';
import SettingsProfile from '@/components/SettingsProfile.vue';
</script>

<template>
    <div class="columns">
        <div class="column">
            <SettingsColor />
            <SettingsIcons />
        </div>
        <div class="column">
            <SettingsImage />
            <SettingsProfile />
        </div>
    </div>
</template>
