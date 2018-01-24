<template>
    <div>
        <el-col :span="24">
            <el-card>
                <el-row justify="start">
                    <el-col :span="1">
                            <el-checkbox v-bind:disabled="!tasksExists"
                                         v-bind:checked="isChecked"></el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <div v-if="!isChecked" class="actions full-width">
                            <!--<el-button-->
                                    <!--@click="showEditor"-->
                                    <!--type="primary" plain-->
                            <!--&gt;-->
                                <!--Add Time Entry-->
                            <!--</el-button>-->
                            <el-button
                                    @click="showEditor"
                                    type="primary"
                                    plain
                            >
                                Create task
                            </el-button>
                            <el-button plain disabled>
                                Add Break
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <div>
                        <!--<time-entry-editor-->
                                <!--v-if="AddingTimeEntry"-->
                                <!--@close-editor="closeEditor"-->
                                <!--@add-time-entry="AddTimeEntry"-->
                                <!--:addingTimeEntry="true"-->
                        <!--&gt;</time-entry-editor>-->
                    <task-editor v-if="addingTask"
                                 @add-task="checkForActive"
                                 @close-editor="closeEditor"
                                 :addingTask="true"
                    ></task-editor>

                    <div class="tasks-section">
                        <tasks-list v-if="tasksExists"></tasks-list>
                    </div>
                    <div v-if="!tasksExists" class="well text-center">
                        No work time is recorded for this day.
                    </div>
                </div>
            </el-card>
            <el-dialog
                    title="Stop current active task"
                    :visible.sync="confirmStopActive"
                    width="30%">
                <span>Stop previous active task?</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="confirmStopActive = false">No</el-button>
                <el-button type="primary" @click="startTimer(stopActive)">Yes</el-button>
            </span>
            </el-dialog>
        </el-col>
    </div>
</template>

<script>
    import moment from 'moment';
    import TimeEntryEditor from './TimeEntryEditor';
    import TasksList from './TaksList';
    import TaskEditor from './TaskEditor';

    export default {
        data() {
            return {
                task: {},
                addingTask: false,
                checkedTasks   : 0,
                timerID        : null,
                time           : null,
                stopActive       : true,
                confirmStopActive: false,
            };
        },
        computed: {
            isChecked() {
                return this.tasks.some(this.searchForCheck);
            },
            tasks() {
                return this.$store.getters.tasks;
            },
            tasksExists() {
                return this.$store.getters.tasks.length;
            },
            date() {
                return moment().format('YYYY-MM-DD');
            },
        },
        methods: {
            startTimer(stopActive) {
                this.confirmStopActive = false;
                if (stopActive) {
                    const activeTimeEntry = this.getActiveTimeEntry();
                    this.$store.dispatch('stopTimer');
                    this.$store.dispatch('stopTask', { task: activeTimeEntry });
                }
                this.$store.dispatch('startTimer');
                this.$store.dispatch('createTask', { task: this.task });
            },
            checkForActive(task) {
                this.closeEditor();
                this.task = Object.assign(task);
                this.getTodayTasks();
                if (this.$store.getters.activeTask !== null) {
                    this.confirmStopActive = true;
                } else {
                    this.startTimer(!this.stopActive);
                }
            },
            getActiveTimeEntry() {
                let activeTimeEntry = {};
                this.$store.getters.tasks.map((task) => { // find active task in all tasks
                    activeTimeEntry = task.time_entries.find((timeEntry) => {
                        return timeEntry.id === this.$store.getters.activeTask;
                    });
                });
                return activeTimeEntry;
            },
            getTodayTasks() {
                if (this.$store.state.date !== this.date) {
                    this.$store.dispatch('getTasks', { date: this.date });
                }
            },
            showEditor() {
                this.addingTask = true;
            },
            closeEditor() {
                this.addingTask = false;
            },

            searchForCheck(task) {
                return task.checked === true;
            },
            currentTime() {
                return moment();
            },
            AddTimeEntry(task) {
                task.spendTime = moment(task.spendTime, 'HH [h] mm [min]').format('HH:mm:ss'); //eslint-disable-line

                this.$store.dispatch('addTimeEntry', task);
                this.AddingTimeEntry = false;
            },
            // checkAll() {
            //     this.tasks.forEach(task => (task.checked = true));//eslint-disable-line
            // },
            // unCheckAll() {
            //     this.tasks.forEach(task => (task.checked = false)); //eslint-disable-line
            // },
            // numberOfTasks() {
            //     this.tasks.forEach(this.counterTasks);//eslint-disable-line
            // },
            // counterTasks(task) {
            //     if (task.checked === true) {
            //         this.checkedTasks = this.checkedTasks + 1;
            //     }
            // },
        },
        components: {
            TimeEntryEditor, TasksList, TaskEditor,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/css" scoped>

    .el-checkbox {
        margin: 10px 10px 10px 15px;
    }

    .tasks-section {
        margin-top: 20px;
    }

    .page-title {
        padding: 0;
        font-size: 28px;
        line-height: 33px;
        display: block;
        margin: 0 0 25px;
        height: 40px;
        word-break: break-all;
    }

    .bold {
        font-weight: 700 !important;
    }

    .btn-calendar {

        color: inherit;
        text-decoration: none;
    }

    .btn-calendar:hover {
        text-decoration: none;
    }

    .btn-icon-default {
        background: none;
        border-radius: 50%;
    }

    .btn-icon-default:hover {
        background: #DDDDDD;
    }

    .btn-icon-default:focus {
        background: #DDDDDD;
    }

    .flex-container-space-between {
        display: flex;
        justify-content: space-between;
    }

    .flex-container {
        display: flex !important;
        flex-flow: row nowrap;
        align-items: center;
    }

    .panel-default {
        border-color: #e0e0e0;

        .panel-heading {
            color: #525252;
            background-color: #fff;
            border-color: #e0e0e0;
        }
    }

    .panel-heading {
        padding: 20px;
    }

    .panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 3px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(47, 47, 47, .15);
        box-shadow: 0 2px 6px 0 rgba(47, 47, 47, .15);
    }

    .panel-title {
        font-weight: 300;
        font-size: 22px;
    }

    .panel-body {
        padding: 0;
    }

    .table-checkbox {
        margin: 9px 0;
        width: 18px !important;
        height: 16px;
        display: flex;
        padding: 0 !important;
        background-color: transparent;
    }

    .actions {
        display: flex;
        align-items: center;
        text-align: left;
    }

    .actions > :not(:last-child) {
        margin-right: 12px;
    }

    .well {
        min-height: 20px;
        padding: 19px;
        margin: 20px 0;
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        border-radius: 3px;
        box-shadow: none;
    }

    .task-enter-active{
        transition: opacity .5s;
    }

    .task-enter, .task-leave-to {
        opacity: 0;
    }



</style>
