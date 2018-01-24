<template>
    <div>
    <div class="timer-timeentry-editor">
        <el-form>
            <!--<el-row>-->
                <!--<el-col :span="16">-->
                    <!--<div class="flex-container">-->
                        <!--<el-col :span="22">-->
                            <!--<el-form-item>-->
                                <!--<el-input placeholder="Enter description"-->
                                          <!--v-model="localTask.description"-->
                                          <!--prefix-icon="el-icon-edit-outline"-->
                                          <!--autofocus></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :span="8">-->
                    <!--<el-select v-model="localTask.project_id" :disabled="projects.length > 0 ? false : true">-->
                        <!--<el-option value="" label="No project"></el-option>-->
                        <!--<el-option v-for="(project, index) in projects" :label="project.name" :value="project.id" :key="project.id"></el-option>-->
                    <!--</el-select>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
                <!--<div v-for="duration in localTask.duration">{{ duration.startTime }} - {{ (duration.endTime) ? duration.endTime : 'now' }}</div>-->
            <!--</el-row>-->
            <el-row>
                <el-col class="time-pickers" :span="24">
                    <el-col :span="9">
                        <el-col :span="15">
                        <el-time-picker
                                :class="{'has-error': $v.localTimeEntry.startTime.$error }"
                                placeholder="Start time"
                                v-model="localTimeEntry.startTime"
                                @input="$v.localTimeEntry.startTime.$touch()"
                                value-format="HH:mm:ss"
                                :default-value="defaultTime"
                                format="HH:mm"
                                @blur="clearStartTime"
                        ></el-time-picker>
                         <!-- errors block -->
                        <i class="fa fa-exclamation-circle error-icon" v-if="$v.localTimeEntry.startTime.$error">

                        </i>
                            <span v-if="$v.localTimeEntry.startTime.$error">
                            <span
                                    class="error-message"
                                    v-if="!$v.localTimeEntry.startTime.required"
                            >Field is required</span>
                            <span
                                    class="error-message"
                                    v-if="!$v.localTimeEntry.startTime.validTime"
                            >Invalid time</span>
                            </span>
                        </el-col>

                        <el-col :span="8"><span class="spend-time">{{ spendTime }}</span></el-col>
                    </el-col>
                    <el-col :span="6"
                         v-if="(timeEntry) ? $store.state.activeTask !== timeEntry.id : true">
                        <el-time-picker
                                :class="{ 'has-error': $v.localTimeEntry.endTime.$error }"
                                placeholder="End time"
                                v-model="localTimeEntry.endTime"
                                @input="$v.localTimeEntry.endTime.$touch()"
                                value-format="HH:mm:ss"
                                format="HH:mm"
                                @blur="clearEndTime"
                                :disabled="(timeEntry) ? $store.state.activeTask === timeEntry.id : false"
                        ></el-time-picker>
                        <!-- errors block -->
                        <i class="fa fa-exclamation-circle error-icon" v-if="$v.localTimeEntry.endTime.$error">

                        </i>
                        <span v-if="$v.localTimeEntry.endTime.$error">
                            <span class="error-message" v-if="!$v.localTimeEntry.endTime.required">Field is required</span>
                            <span class="error-message" v-if="!$v.localTimeEntry.endTime.validTime">Invalid time</span>
                        </span>
                    </el-col>
                </el-col>
            </el-row>
            <el-dialog
                    title="Delete time entry"
                    :visible.sync="confirmDeleting"
                    width="30%">
                <span>It will not be undone. Continue?</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="confirmDeleting = false">No</el-button>
                <el-button type="primary" @click="deleteTimeEntry">Yes</el-button>
            </span>
            </el-dialog>
            <el-row class="actions">
                <el-col class="action-buttons">
                    <el-button type="success"
                               size="middle"
                               v-if="editingTimeEntry"
                               @click.prevent="updateTimeEntry"
                               title="Save editing"
                               :disabled="formInvalid"
                    > Save </el-button>
                    <el-button type="success"
                               size="middle"
                               v-if="addingTimeEntry"
                               @click.prevent="addTimeEntry"
                               title="Add time entry"
                               :disabled="formInvalid"
                    > Save </el-button>
                    <el-button
                            type="plain"
                            size="middle"
                            @click.prevent="closeEditor"
                    >
                        Cancel
                    </el-button>
                    <el-button type="text"
                               v-if="editingTimeEntry"
                               class="delete_button"
                               @click.prevent="confirmDeleting = true"
                    >Delete Time Entry</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { required } from 'vuelidate/lib/validators';

    export default {
        props: ['addingTimeEntry', 'editingTimeEntry', 'timeEntry', 'duration', 'editTask', 'taskId'],
        data() {
            return {
                localTimeEntry: {
                    active   : 0,
                    task_id  : this.taskId,
                    startTime: '',
                    spendTime: '',
                    endTime  : '',
                },
                oldTimeEntry   : {},
                projects       : {},
                confirmDeleting: false,
            };
        },
        computed: {
            spendTime() {
                if (this.localTimeEntry.startTime !== '' && this.localTimeEntry.endTime !== '') {
                    const spendTime = moment.duration(moment(this.localTimeEntry.endTime, 'HH:mm:ss')
                        .diff(moment(this.localTimeEntry.startTime, 'HH:mm:ss')));
                    if (spendTime.seconds() >= 0) {
                        return `${spendTime.hours()}  h  ${spendTime.minutes()}  min `;
                    }
                }
                return ' ';
            },
            formInvalid() {
                return this.$v.$invalid;
            },
            defaultTime() {
                return moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
            },
        },
        created() {
            if (this.timeEntry) {
                this.oldTimeEntry = Object.assign({}, this.timeEntry);
                this.localTimeEntry = Object.assign({}, this.timeEntry);
                this.localTimeEntry.startTime = moment(this.timeEntry.startTime, 'YYYY-MM-DD HH:mm:ss')
                    .format('HH:mm:ss');
                this.localTimeEntry.endTime = moment(this.timeEntry.endTime, 'YYYY-MM-DD HH:mm:ss')
                    .format('HH:mm:ss');
            }
        },
        methods: {
            clearStartTime(comp) {
                if (comp.userInput === '') this.localTimeEntry.startTime = '';
            },
            clearEndTime(comp) {
                if (comp.userInput === '') this.localTimeEntry.endTime = '';
            },
            closeEditor() {
                this.localTimeEntry = Object.assign({}, this.oldTimeEntry);
                this.$emit('close-editor');
            },
            updateTimeEntry() {
                const timeEntry = Object.assign(this.reformatTime(this.localTimeEntry));
                this.$emit('update-time-entry', timeEntry);
            },
            addTimeEntry() {
                if (this.$v.$invalid) return;
                const timeEntry = Object.assign(this.reformatTime(this.localTimeEntry));
                this.$emit('add-time-entry', timeEntry);
            },
            deleteTimeEntry() {
                this.$emit('delete-time-entry', this.localTimeEntry);
                this.closeEditor();
            },
            reformatTime(object) {
                const timeEntry = Object.assign(object);
                timeEntry.startTime = `${this.$store.getters.date} ${moment(this.localTimeEntry.startTime, 'HH:mm:ss').format('HH:mm:ss')}`;
                timeEntry.endTime = `${this.$store.getters.date} ${moment(this.localTimeEntry.endTime, 'HH:mm:ss').format('HH:mm:ss')}`;
                return timeEntry;
            },
        },
        validations() {
            const timeEntryId = (this.timeEntry) ? this.timeEntry.id : 0;
            if (this.$store.state.activeTask === timeEntryId) {
                return {
                    localTimeEntry: {
                        startTime: {
                            required,
                            validTime(value) {
                                return moment(value, 'HH:mm:ss').isBefore(moment()) && value !== '';
                            },
                        },
                    },
                };
            } else {
                return {
                    localTimeEntry: {
                        startTime: {
                            required,
                            validTime(value) {
                                let valid = false;
                                const today = moment().format('YYYY-MM-DD');
                                if (moment(this.$store.getters.date, 'YYYY-MM-DD').isBefore(moment(today, 'YYYY-MM-DD'))) {
                                    valid = true;
                                } else {
                                    valid = moment(value, 'HH:mm:ss').isBefore(moment());
                                }
                                return valid && value !== '';
                            },
                        },
                        endTime: {
                            required,
                            validTime(value) {
                                let isAfter = true;
                                let valid = false;
                                const today = moment().format('YYYY-MM-DD');
                                if (this.localTimeEntry.startTime !== '') {
                                    isAfter = moment(this.localTimeEntry.endTime, 'HH:mm:ss')
                                        .isAfter(moment(this.localTimeEntry.startTime, 'HH:mm:ss'));
                                }
                                if (moment(this.$store.getters.date, 'YYYY-MM-DD').isBefore(moment(today, 'YYYY-MM-DD'))) {
                                    valid = true;
                                } else {
                                    valid = moment(value, 'HH:mm:ss').isBefore(moment());
                                }
                                return valid && value !== '' && isAfter;
                            },
                        },
                    },
                };
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/css" scoped>
    .el-icon-edit-outline {
        font-size: 20px;
        margin: 10px;
    }

    .el-select {
        width: 100%;
    }

    .actions {
        margin-top: 20px;
    }

    .delete_button {
        color: #FA5555;
    }

    .form-control {
        width: 100%;
        height: 34px;
        padding: 6px 0;
        background-color: transparent;
        background-image: none;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;
        -webkit-box-shadow: none;
        transition: border-color ease-in-out .2s;
    }

    .form-control:focus {
        border-bottom: 2px solid #178fe5;
        outline: 0;
        padding: 6px 0 5px;
    }

    .actions {
        display: flex;
        align-items: center;
        text-align: left;
    }

    .margin-top-20 {
        margin-top: 20px !important;
    }

    .btn-primary {
        color: #fff;
        background-color: #545454;
        border-color: #545454;
    }

    .btn-primary:hover {
        color: #fff;
        background-color: #474747;
        border-color: #474747;
    }

    .btn-default {
        color: #525252;
        background-color: rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .07);
    }

    .btn-icon-default {
        display: inline-block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        border-radius: 17px !important;
        padding: 0 !important;
        color: #525252;
        background-color: transparent;
        border-color: transparent;
        font-size: 20px !important;
    }

    .flex-container {
        display: flex;
        justify-content: flex-start;
    }

    .full-width {
        width: 100%;
    }

    .flex-container-space-between {
        display: flex;
        justify-content: space-between;
    }

    .actions > :not(:last-child) {
        margin-right: 12px;
    }

    .timer-timeentry-editor {
        padding: 20px 0 20px 0;
    }

</style>

<style>
    .spend-time {
        color: #b4bccc;
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;

    }
</style>
