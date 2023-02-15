import { defineStore } from 'pinia';
import { useTagsStore } from '@/stores/tags.js';
import BeepAudio from '@/assets/beep.wav';

export const useTimerStore = defineStore('timer', {
    state: () => {
        return {
            interval: null,
            tagsStore: useTagsStore(),
            startMinutes: 0,
            minutes: 0,
            seconds: 0,
            active: false,
            paused: true
        };
    },
    actions: {
        begin() {
            this.startMinutes = this.minutes;
            this.resume();
        },
        resume() {
            // Set status variables
            this.active = true;
            this.paused = false;

            // Calculate the finish date from now
            const finishDate = new Date(
                new Date().getTime() +
                    this.minutes * 60 * 1000 +
                    this.seconds * 1000
            ).getTime();

            // Set interval that will check and compare dates every 100ms
            // As Dates are just being compared, the timer will still work even
            // when the page loses focus
            const self = this;
            this.interval = setInterval(() => {
                const remaining = finishDate - new Date().getTime();
                if (remaining > 0) {
                    self.minutes = Math.floor(remaining / 60000);
                    self.seconds = remaining / 1000 % 60;
                } else {
                    self.stop();
                }
            }, 100);
        },
        pause() {
            this.paused = true;
            clearInterval(this.interval);
        },
        stop() {
            // Set status variables
            this.active = false;
            this.paused = false;

            // Clear interval
            clearInterval(this.interval);

            // Play audio if timer finished
            if (this.minutes == 0 && this.seconds < 1) {
                const audio = new Audio(BeepAudio);
                audio.play();
            }

            // Add time to selected tag
            if (this.tagsStore.tags.length) {
                const elapsedMinutes = this.startMinutes - this.minutes - 1;
                if (elapsedMinutes) {
                    this.tagsStore.tags[this.tagsStore.tagIndex].minutes +=
                        elapsedMinutes;
                }
            }

            // Reset seconds
            this.seconds = 0;
        }
    }
});
