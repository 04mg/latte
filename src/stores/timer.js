import { defineStore } from 'pinia';
import { useTagsStore } from '@/stores/tags.js';
import BeepAudio from '@/assets/beep.wav';

export const useTimerStore = defineStore('timer', {
    state: () => {
        return {
            tagsStore: useTagsStore(),
            selectedMinutes: 0,
            active: false,
            minutes: 0,
            seconds: 0,
            interval: null
        };
    },
    actions: {
        begin() {
            this.active = true;
            this.selectedMinutes = this.minutes;

            const self = this;
            this.interval = setInterval(() => {
                if (self.seconds == 0) {
                    if (self.minutes == 0) {
                        self.stop();
                    } else {
                        self.minutes -= 1;
                        self.seconds = 59;
                    }
                } else {
                    self.seconds -= 1;
                }
            }, 1);
        },
        stop() {
            clearInterval(this.interval);
            
            if (this.tagsStore.tags.length) {
                if (this.seconds <= 30) {
                    this.tagsStore.tags[this.tagsStore.tagIndex].minutes += this.selectedMinutes - this.minutes;
                }
            }
            
            // Play audio if timer finished
            if (this.minutes == 0 && this.seconds == 0) {
                const audio = new Audio(BeepAudio);
                audio.play();
            }

            this.minutes = this.selectedMinutes;
            this.seconds = 0;
            this.active = false;
        }
    }
});
