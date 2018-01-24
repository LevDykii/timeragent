<template >
	<div>
		<one-task v-for="(task, index) in tasks" :key="task.id" :task="task" :index="index" :tasks="tasks"></one-task>
	</div>
</template>

<script>
    import moment from 'moment';
    import OneTask from './OneTask';

    export default {
        computed: {
            tasks() {
                return this.$store.getters.tasks;
            },
        },
        components: {
            OneTask,
        },
    };
</script>

<style lang="scss" rel="stylesheet/css" scoped>
	

</style>