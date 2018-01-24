<template>
    <div>
        <div class="timer-timeentry-editor">
            <el-form>
                <el-row>
                    <el-col :span="12">
                        <div class="flex-container">
                            <el-col :span="22">
                                <el-form-item>
                                    <el-input placeholder="Enter description"
                                              v-model="localTask.description"
                                              prefix-icon="el-icon-edit-outline"
                                              autofocus></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="20">
                            <el-input placeholder="Estimate"></el-input> <span style="color: red">Demo</span>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="localTask.project_id" :disabled="projects.length > 0 ? false : true">
                            <el-option value="" label="No project"></el-option>
                            <el-option v-for="(project, index) in projects" :label="project.name" :value="project.id" :key="project.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="actions">
                    <el-col class="action-buttons">
                        <el-button type="success"
                                   size="middle"
                                   v-if="editTask"
                                   @click.prevent="updateTask"
                                   title="Save editing"
                        > Save </el-button>
                        <el-button type="success"
                                   size="middle"
                                   v-if="addingTask"
                                   @click.prevent="addTask"
                                   title="Add task"
                        > Save </el-button>
                        <el-button
                                type="plain"
                                size="middle"
                                @click.prevent="closeEditor"
                        >
                            Cancel
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import Http from '../../../helpers/Http';

    export default {
        props: ['task', 'addingTask', 'editTask'],
        data() {
            return {
                localTask: {
                    id         : 0,
                    description: '',
                    checked    : false,
                    project_id : '',
                },
                oldTask : {},
                projects: {},
            };
        },
        created() {
            if (this.task) {
                this.oldTask = Object.assign({}, this.task);
                this.localTask = Object.assign({}, this.task);
            }

            Http.get('api/projects').then((response) => {
                this.projects = response.data;
            });
        },
        methods: {
            closeEditor() {
                this.localTask = Object.assign({}, this.oldTask);
                this.$emit('close-editor');
            },
            updateTask() {
                this.$emit('update-task', this.localTask);
            },
            addTask() {
                this.$emit('add-task', this.localTask);
            },
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
