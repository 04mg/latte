<script>
import CoffeeImage from '@/assets/images/coffee_plate.svg';
import CircleSlider from 'vue-circle-slider/src/components/CircleSlider.vue';
import { useSettingsStore } from '@/stores/settings.js';
import { useTimerStore } from '@/stores/timer.js';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            step: 1,
            max: 120,
            CoffeeImage
        };
    },
    methods: {
        beginTimer() {
            if (this.timerStore.minutes == 0) {
                this.$toast.info('Set the timer first');
                return;
            }

            this.timerStore.begin();
        },
        stopTimer() {
            this.timerStore.stop();
        },
        toggleTimer() {
            this.timerStore.paused
                ? this.timerStore.resume()
                : this.timerStore.pause();
        },
        setMinutes(value) {
            if (!this.timerStore.active) this.timerStore.minutes = value;
        },
        decreaseMinutes() {
            if (!this.timerStore.active && this.timerStore.minutes > 0)
                this.timerStore.minutes -= this.step;
        },
        increaseMinutes() {
            if (!this.timerStore.active && this.timerStore.minutes < this.max)
                this.timerStore.minutes += this.step;
        }
    },
    components: {
        CircleSlider
    },
    computed: {
        pauseOrResume() {
            return this.timerStore.paused ? 'resume' : 'pause';
        },
        minutes() {
            return this.timerStore.minutes < 10
                ? '0' + this.timerStore.minutes
                : this.timerStore.minutes;
        },
        seconds() {
            return this.timerStore.seconds < 10
                ? '0' + this.timerStore.seconds
                : this.timerStore.seconds;
        },
        ...mapStores(useSettingsStore, useTimerStore)
    }
};
</script>

<template>
    <div class="slider">
        <div class="slider-item">
            <img :src="CoffeeImage" />
        </div>
        <div class="slider-item">
            <CircleSlider
                :value="timerStore.minutes"
                :step-size="step"
                :min="0"
                :max="max"
                circle-color="transparent"
                :progress-color="settingsStore.timerProgressColor"
                :knob-color="settingsStore.timerProgressColor"
                id="circle"
                @input="setMinutes"
            ></CircleSlider>
        </div>
        <div class="cover-slider slider-item" v-if="timerStore.active"></div>
    </div>
    <span class="mt-4 is-size-3 has-text-color">
        <span class="decrease" @click="decreaseMinutes">-</span>
        <span class="time">{{ minutes }}:{{ seconds }}</span>
        <span class="increase" @click="increaseMinutes">+</span>
    </span>
    <span
        class="helper has-text-color"
        @click="beginTimer"
        v-if="!timerStore.active"
        >begin</span
    >
    <span class="helper has-text-color" v-else>
        <span @click="toggleTimer">{{ pauseOrResume }}</span> &bull;
        <span @click="stopTimer">stop</span>
    </span>
</template>

<style scoped>
img {
    background-color: v-bind('settingsStore.timerBackgroundColor');
    padding: 10px;
    border-radius: 100%;
    width: 173px;
    margin-top: 14px;
    margin-left: 14px;
}

.slider {
    position: relative;
    height: 200px;
    width: 200px;
}

.slider > .slider-item {
    position: absolute;
    width: 200px;
}

.cover-slider {
    background-color: transparent;
    height: 200px;
    z-index: 7;
}

.decrease,
.increase {
    cursor: pointer;
    font-weight: bold;
}

.time {
    width: 130px;
    text-align: center;
    display: inline-block;
}

.helper {
    cursor: pointer;
}
</style>
