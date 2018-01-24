<template>
    <div>
        <div @dblclick="showEditor">
            {{ format(timeEntry.startTime) }} - {{ (timeEntry.endTime) ? format(timeEntry.endTime) : 'now' }}
        </div>
        <time-entry-editor v-if="isEditing"
                           @update-time-entry="updateTimeEntry"
                           @delete-time-entry="deleteTimeEntry"
                           @close-editor="closeEditor"
                           :timeEntry="timeEntry"
                           :editingTimeEntry="true"
        ></time-entry-editor>
    </div>
</template>

<script>
    import moment from 'moment';
    import TimeEntryEditor from './TimeEntryEditor';

    export default {
        props: ['timeEntry'],
        data() {
            return {
                isEditing       : false,
                editingTimeEntry: false,
            };
        },
        methods: {
            format(time) {
                return moment(time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm');
            },
            showEditor() {
                this.isEditing = true;
            },
            updateTimeEntry(timeEntry) {
                this.$store.dispatch('updateTimeEntry', { timeEntry });
                this.isEditing = false;
            },
            deleteTimeEntry(timeEntry) {
                this.$store.dispatch('deleteTimeEntry', { timeEntry });
            },
            closeEditor() {
                this.isEditing = false;
            },
        },
        components: {
            TimeEntryEditor,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
