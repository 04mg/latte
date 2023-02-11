<script>
export default {
    methods: {
        exportProfile() {
            // Create 'a' element, assign the URL to it and click it
            const a = document.createElement('a');
            const file = new Blob([JSON.stringify(window.localStorage)], {
                type: 'application/json'
            });
            a.href = URL.createObjectURL(file);
            a.download = `latte_${new Date().toISOString()}.json`;
            a.click();
        },
        importProfile() {
            // Create input element
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';

            // Handle input
            input.onchange = (element) => {
                const reader = new FileReader();
                reader.readAsText(element.target.files[0], 'UTF-8');

                reader.onload = (readerEvent) => {
                    // Attempt to parse JSON
                    let json;
                    try {
                        json = JSON.parse(readerEvent.target.result);
                    } catch (err) {
                        this.$toast.error(err);
                        return;
                    }

                    // Set localStorage values
                    localStorage.clear();
                    Object.entries(json).forEach(([key, value]) => {
                        localStorage.setItem(key, value);
                    });

                    // Reload the page
                    this.$router.go();
                };
            };

            // Click it
            input.click();
        }
    }
};
</script>

<template>
    <div class="box">
        <label class="label">Export profile</label>
        <p class="mb-2">This will export your settings, tags and history.</p>
        <button class="button is-fullwidth mb-2" @click="exportProfile">
            Export
        </button>
        <label class="label">Import profile</label>
        <p class="mb-2">This will override your current profile.</p>
        <button class="button is-fullwidth mb-2" @click="importProfile">
            Import
        </button>
    </div>
</template>

<style scoped>
.box {
    max-width: calc(300px + 1.25rem * 2);
}
</style>
