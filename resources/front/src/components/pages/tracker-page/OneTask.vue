<template>
	<div>
		<el-row v-if="!isEditing">
			<el-col :span="2">
				<el-checkbox v-model="tasks[index].checked"></el-checkbox>
			</el-col>
			<el-col :span="12">
				<span v-if="task.description != null " class="description" @dblclick="showEditor">{{ task.description }}</span>
				<span v-else @dblclick="showEditor"> (no description) </span>
				<transition name="editor">
					<el-tag v-if="active" type="success" size="medium" class="active-tag" color="#5daf34">Active</el-tag>
				</transition>
			</el-col>
			<!--<el-col :span="4">-->
				<!--<small v-if="task.startTime !== null" class="text-muted"> {{ time(task.startTime) }} - <span v-if="task.endTime == null">now</span> <span v-else >{{ time(task.endTime) }}</span> </small>-->
			<!--</el-col>-->
			<!--<el-col :span="4">-->
				<!--<span v-if="task.startTime !== null"><span >{{ spendTime }}</span></span>-->
			<!--</el-col>-->
            <el-col :span="4">
                {{ total }}
            </el-col>
			<el-col :span="2">
				<span title="Stop task">
					<el-button type="danger" plain v-if="active" @click="stopTask" class="stop-button">
						<i class="el-icon-close"></i>
					</el-button>
				</span>
				<span title="Continue task">
					<el-button type="success" plain class="start-button">
                    	<i class="el-icon-caret-right" v-if="!active" @click="checkForActive"></i>
					</el-button>
				</span>
			</el-col>
			<el-col :span="2">
				<span>
					<el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span @click.prevent="showEditor"><i class="el-icon-edit" ></i> Edit</span>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <span  @click.prevent="dialogVisible = true"><i class="el-icon-delete" ></i> Delete</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
				</span>
			</el-col>
            <el-col :span="2">
                <i class="el-icon-arrow-down"
                   v-if="!showTimeEntries"
                   @click="showTimeEntries = true"
                ></i>
                <i class="el-icon-arrow-up"
                   v-if="showTimeEntries"
                   @click="showTimeEntries = false"
                ></i>
            </el-col>
		</el-row>
		<el-row v-if="showTimeEntries">
            <el-col :span="20">
                <div v-for="timeEntry in task.time_entries">
                    <time-entry :timeEntry="timeEntry"></time-entry>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button
                        @click="showTimeEntryCreator"
                        type="primary"
                        size="mini"
                        plain
                >
                    Add Time Entry
                </el-button>
            </el-col>
		</el-row>
        <el-row>
            <el-col :span="20">
                <time-entry-editor v-if="addingTimeEntry"
                                   @add-time-entry="addTimeEntry"
                                   @close-editor="closeEditor"
                                   :taskId="task.id"
                                   :addingTimeEntry="true"
                ></time-entry-editor>
            </el-col>
			<task-editor v-if="isEditing"
                         @update-task="updateTask"
                         @close-editor="closeEditor"
                         :editTask="true"
                         :task="task"
            ></task-editor>
        </el-row>
        <!--Confirm dialog-->
        <el-dialog
                title="Delete task"
                :visible.sync="dialogVisible"
                width="30%">
            <span>It will not be undone. Continue?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">No</el-button>
                <el-button type="primary" @click="deleteTask">Yes</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="Stop current active task"
                :visible.sync="confirmStopActive"
                width="30%">
            <span>Stop previous active task?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmStopActive = false">No</el-button>
                <el-button type="primary" @click="continueTask(stopActive)">Yes</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment';
import TimeEntryEditor from './TimeEntryEditor';
import TaskEditor from './TaskEditor';
import TimeEntry from './TimeEntry';

export default {
    props: ['task', 'index', 'tasks'],
    data() {
        return {
            isEditing        : false,
            addingTimeEntry  : false,
            dialogVisible    : false,
            confirmStopActive: false,
            stopActive       : true,
            showTimeEntries  : false,
        };
    },
    computed: {
        spendTime() {
            let spendTime;
            if (this.task.endTime == null) {
                spendTime = moment.duration(this.task.spendTime);
            }
            if (this.task.endTime !== null) {
                spendTime = moment.duration(moment(this.task.endTime, 'HH:mm:ss').diff(moment(this.task.startTime, 'HH:mm:ss')));
            }
            const hours = spendTime.hours();
            const minutes = spendTime.minutes();
            return `${(hours > 0 ? `${hours} h ` : '')} ${minutes} min`;
        },
        total() {
            let spendTime = '';
            const total = this.task.time_entries.reduce((prev, cur) => {
                let endTime = cur.endTime;
                spendTime = (cur.spendTime) ? cur.spendTime : '';
                if (!endTime) endTime = moment().format('YYYY-MM-DD HH:mm:ss');
                return moment.duration(moment(endTime, 'YYYY-MM-DD HH:mm:ss')
                    .diff(moment(cur.startTime, 'YYYY-MM-DD HH:mm:ss'))).add(prev);
            }, null);
            // return moment.utc(total.asMilliseconds()).format('HH [h] mm [min]');
            const hours = total.hours();
            const minutes = total.minutes();
            if (minutes < 1) {
                const seconds = total.seconds();
                return `${seconds} sec`;
            }
            return `${(hours > 0 ? `${hours}  h ` : '')} ${minutes} min `;
		},
        active() {
            return !!this.task.time_entries.find((timeEntry) => {
                return timeEntry.active === 1;
            });
        },
        date() {
            return moment().format('YYYY-MM-DD');
        },
    },
    methods: {
        showEditor() {
            this.isEditing = true;
        },
        showTimeEntryCreator() {
            this.addingTimeEntry = true;
        },
        closeEditor() {
            this.isEditing = false;
            this.addingTimeEntry = false;
        },
        updateTask(task) {
            const lTask = task;
            lTask.spendTime = moment(lTask.spendTime, 'h [h] mm [min]').format('HH:mm:ss');
            this.$store.dispatch('updateTask', { task: lTask, index: this.index });
            // this.task = Object.assign({}, task);
            this.isEditing = false;
        },
        stopTask() {
            const activeTimeEntry = this.getActiveTimeEntry();
            this.$store.dispatch('stopTimer');
            this.$store.dispatch('stopTask', { task: activeTimeEntry });
        },
        checkForActive() {
            if (this.$store.getters.activeTask !== null) {
                this.confirmStopActive = true;
            } else {
                this.continueTask(!this.stopActive);
            }
        },
        continueTask(stopTask) {
            if (this.$store.state.date !== this.date) {
                this.getTodayTasks()
                    .then(() => {
                        this.confirmStopActive = false;
                        if (stopTask) {
                            const activeTimeEntry = this.getActiveTimeEntry();
                            this.$store.dispatch('stopTimer');
                            this.$store.dispatch('stopTask', { task: activeTimeEntry });
                        }
                        this.$store.dispatch('createTask', { task: this.task });
                        this.$store.dispatch('startTimer');
                    });
            } else {
                this.confirmStopActive = false;
                if (stopTask) {
                    const activeTimeEntry = this.getActiveTimeEntry();
                    this.$store.dispatch('stopTimer');
                    this.$store.dispatch('stopTask', { task: activeTimeEntry });
                }
                this.$store.dispatch('createTask', { task: this.task });
                this.$store.dispatch('startTimer');
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
        addTimeEntry(timeEntry) {
            this.$store.dispatch('addTimeEntry', timeEntry);
            this.closeEditor();
        },
        getTodayTasks() {
            return new Promise((resolve, reject) => {
                if (this.$store.state.date !== this.date) {
                    this.$store.dispatch('getTasks', { date: this.date }).then(() => resolve());
                }
            });
        },
        deleteTask() {
            this.dialogVisible = false;
            if (this.task.active === true && moment().diff(moment(this.task.startTime, 'HH:mm:ss'), 'seconds') < 60) {
                this.stopTask();
            } else if (this.task.active === true) {
                this.stopTask();
                this.$store.dispatch('deleteTask', { task: this.task, index: this.index });
            } else {
                this.$store.dispatch('deleteTask', { task: this.task, index: this.index });
            }
        },
        currentTime() {
            return moment();
        },
        time(time) {
            return moment(time, 'HH:mm:ss').format('HH:mm');
        },
    },
    components: {
        TimeEntryEditor, TaskEditor, TimeEntry,
    },
};
</script>

<style lang="scss" rel="stylesheet/css" scoped>
    .el-icon-more {
        margin: 5px;
    }
	.el-col {
		padding: 15px;
	}

    .el-icon-caret-right {
        font-size: 20px;
        cursor: pointer;
    }

	.start-button {
		padding: 0;
	}

	.stop-button {
		padding: 3px;
	}

	.active-tag {
		color: #fff;
	}

	.col {
			padding: 20px 35px;
			padding-right: 0; 
		}

		.label-success {
			background-color: #00bc6a; 
		}

		.description {
			margin-right: 10px;
		}

	.label {
	    display: inline-block;
	    padding: 4px 6px;
	    font-size: 11px;
	    font-weight: 400;
	    color: #fff;
	    vertical-align: baseline;
	    border-radius: 3px;
	    text-transform: uppercase;
	    letter-spacing: .5px;
	    font-family: "Open Sans",sans-serif;
	}

	.btn-icon-danger {
		color: #e26a6a;
		background: none;
	}

	.btn-icon-danger:hover:active {
		color: #e26a6a;
    	background-color: rgba(226,106,106,.1);
    	border-color: transparent;
    	border-radius: 17px;
	}

	.btn-icon-success {
		color: rgba(82,82,82,.4);
    	background-color: transparent;
    	border-color: transparent;
	}

	.btn-icon-success:hover {
		color: #00bc6a;
    	background-color: rgba(0,188,106,.1);
    	border-color: transparent;
    	border-radius: 17px;
	}

	.editor-enter-active{
        transition: opacity .5s;
    }

    .editor-enter, .editor-leave-to {
        opacity: 0;
    }
</style>