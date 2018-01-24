<template>
    <div>
        <el-container direction="vertical">
        <nav-menu-auth></nav-menu-auth>
        <el-main>
            <el-row>
                <el-col :span="16" :offset="4">
                <div class="pull-right">
                    <el-button type="plain"
                               @click.prevent="$router.go(-1)"
                    > Cancel </el-button>
                    <el-button type="success"
                               title="Click to save"
                               @click.prevent="addProject"
                               :disabled="formInvalid"
                    > Save </el-button>
                </div>
                <span class="page-title"> New Project </span>
            	<el-col :span="24">
            		<el-card>
                        <el-row>
                            <el-col :span="16" :offset="4">
                                <div>
                                    <label>Name</label>
                                    <el-input :class="{ 'has-error': $v.project.name.$error}"
                                           placeholder="Enter project name"
                                           v-model="project.name"
                                           @input="$v.project.name.$touch()"
                                    ></el-input>
                                        <i class="fa fa-exclamation-circle error-icon" v-if="$v.project.name.$error">
                                        <div class="errors">
                                            <span class="error-message" v-if="!$v.project.name.required">Field is required</span>
                                        </div> 
                                    </i>
                                </div>

                                <el-tabs v-model="activeTabName">
                                    <el-tab-pane label="Teams" name="teams">
                                        <div>
                                            <!--<el-button type="primary"-->
                                                       <!--plain-->
                                                       <!--@click="showModal = true"-->
                                            <!--&gt; Add teams to project </el-button>-->
                                        </div>
                                        <!--<el-tree :data="teamsData"-->
                                                 <!--show-checkbox-->
                                                 <!--ref="tree"-->
                                        <!--&gt;</el-tree>-->
                                        <el-row>
                                            <el-col :offset="4">
                                                <el-transfer v-model="addedTeams"
                                                             :data="teamsData"
                                                             :titles="['All Teams', 'To Add']"
                                                             :render-content="renderTeams"
                                                >
                                                </el-transfer>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="Users" name="users">
                                        <el-row>
                                            <el-col :offset="4">
                                                <el-transfer v-model="addedMembers"
                                                             :data="usersData"
                                                             :titles="['All Teams', 'To Add']">

                                                </el-transfer>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                </el-tabs>
                                <el-dialog title="Members"
                                           :visible.sync="showModal"
                                           width="40%"
                                >
                                            <el-table :data="membersDataTable">
                                                <el-table-column label="Name" prop="name"></el-table-column>
                                            </el-table>
                                    <span slot="footer">
                                        <el-button type="plain" @click="showModal = false">Close</el-button>
                                    </span>
                                </el-dialog>
                            </el-col>
                        </el-row>
            		</el-card>
            	</el-col>
                </el-col>
            </el-row>
        </el-main>
        </el-container>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';
    import NavMenuAuth from '../blocks/NavMenuAuth';
    import notification from '../../mixins/notification';

    export default {
        mixins: [notification],
        data() {
            return {
                project: {
                    name: null,
                },
                showModal       : false,
                addedTeams      : [],
                addedMembers    : [],
                activeTabName   : 'teams',
                membersDataTable: [],
            };
        },
        computed: {
            formInvalid() {
                return this.$v.$invalid;
            },
            ...mapGetters([
                'ownTeams',
                'ownUsers',
            ]),
            teamsData() {
                const data = [];
                const teams = this.ownTeams;
                teams.forEach((team) => {
                    data.push({
                        key  : team.id,
                        label: team.name,
                        users: team.users,
                    });
                });
                return data;
            },
            usersData() {
                const data = [];
                const users = this.ownUsers;
                users.forEach((user) => {
                    data.push({
                        key  : user.id,
                        label: user.name,
                    });
                });
                return data;
            },
        },
        created() {
            this.$store.dispatch('getOwnTeams');
            this.$store.dispatch('getOwnUsers');
        },
        methods: {
            addProject() {
                if (this.$v.$invalid) return;
                this.$store.dispatch('addProject', {
                    project     : this.project,
                    addedTeams  : this.addedTeams,
                    addedMembers: this.addedMembers,
                })
                .then(() => {
                    this.showSuccess('Project saved successful');
                    this.$router.push('/projects');
                })
                .catch(() => {
                    this.showError();
                });
            },
            renderTeams(h, option) {
                return h('span', [h('el-button', {
                    class: {
                        'member-item': true,
                    },
                    attrs: {
                        type: 'text',
                    },
                    on: {
                        click: () => {
                            this.membersDataTable = option.users;
                            this.showModal = true;
                        },
                    },
                }, option.label)]);
            },
        },
        components: {
            NavMenuAuth,
        },
        validations: {
            project: {
                name: {
                    required,
                },
            },
        },
    };
</script>
<style lang="scss" rel="stylesheet/css" scoped>

    .el-tabs {
        margin-top: 30px;
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

	    body {
        background-color: #efefef;
    }

    .container {
        margin-top: 70px;
    }

    .panel {
        display: flex;
        justify-content: center;
        padding: 20px;
    }
    .container-center {
        width: 50%;
    }

    .btn-primary {
    	color: #fff;
    	background-color: #545454;
    	border-color: #545454;
    }

	.btn-primary:hover {
		color: #fff;
    	background-color: #3b3b3b;
    	border-color: #3b3b3b;
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

    .nav-tabs {
        border: none;
        margin: 0;
        display: flex;
        justify-content: center;

        li.active {
            border-bottom: 2px solid #178fe5;
            a {
                color: #178fe5;
            }
        }

        a {
            margin: 0;
            border: 0!important;
            padding-left: 15px;
            padding-right: 15px;
            padding-bottom: 20px;
            background: 0 0!important;
            color: #525252;
            font-size: 18px;
            line-height: 1.1;
        }
    }

    .modal {
        display: block;
    }
    .modal-backdrop {
        opacity: .5;
    }
    .modal-dialog {
        z-index: 1050;
    }
    .modal-content {
        margin-top: 120px;
    }
    .modal-header {
        padding: 25px;
    }
    .modal-body {
        padding: 25px;
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
    .modal-footer {
        padding: 25px;
        text-align: left;
        border-top: 1px solid #e0e0e0;
    }
</style>