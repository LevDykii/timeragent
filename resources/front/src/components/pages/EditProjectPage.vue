<template>
    <div>
        <el-container direction="vertical">
        <nav-menu-auth></nav-menu-auth>
        <el-main
                v-loading.fullscreen.lock="loading"
                element-loading-background="rgba(255, 255, 255, 1)"
        >
            <el-row>
                <el-col :span="16" :offset="4">
                <div class="pull-right">
                    <el-button type="plain"
                               @click.prevent="$router.go(-1)"
                    > Cancel </el-button>
                    <el-button type="success"
                               title="Save project"
                               v-if="isEditing"
                               @click.prevent="updateProject"
                               :disabled="formInvalid"
                    > Save </el-button>
                    <el-button v-if="isCreating"
                               type="success"
                               title="Add Project"
                               @click.prevent="addProject"
                               :disabled="formInvalid"
                    > Save </el-button>
                </div>
                <span v-if="isEditing" class="page-title"> Edit Project </span>
                <span v-if="isCreating" class="page-title"> New Project </span>
            	<el-col :span="24">
            		<el-card>
                          <el-row>
                        <el-col :span="16" :offset="4">
                            <div>
                                <label>Name</label>
                                    <el-input :class="{ 'has-error': $v.project.name.$error }"
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
                                    <!--<div>-->
                                        <!--<el-button type="primary"-->
                                                   <!--plain-->
                                                   <!--@click="showModal = true"-->
                                        <!--&gt; Add teams to project </el-button>-->
                                    <!--</div>-->

                                    <el-row>
                                        <el-col :offset="4">
                                            <!--<el-transfer v-model="addedTeams"-->
                                            <el-transfer v-model="teamsInTransfer"
                                                         :data="teamsData"
                                                         :titles="['My Teams', 'Project Teams']"
                                                         :render-content="renderTeams"
                                                         @change="moveTeams"
                                            >
                                            </el-transfer>

                                            <!-- Show team members modal form -->
                                            <el-dialog title="Members"
                                                       :visible.sync="showModal"
                                                       width="40%">
                                                <el-table :data="membersDataTable">
                                                    <el-table-column label="Name" prop="name"></el-table-column>
                                                </el-table>
                                                <span slot="footer">
                                                    <el-button @click="showModal = false">Close</el-button>
                                                </span>
                                            </el-dialog>

                                            <el-dialog title="Users rate in project"
                                                       :visible.sync="showTeamUsersRates"
                                                       :show-close="false"
                                                       width="60%"
                                            >
                                                    <el-collapse v-model="openedTeams">
                                                        <el-collapse-item v-for="(team, index) in teamsForChangeRates.newValue" :key="team.id" :title="team.name" :name="team.name">
                                                            <el-table :data="team.users">
                                                                <el-table-column label="Name" prop="name" :width="300"></el-table-column>
                                                                <el-table-column label="Rate" :width="200">
                                                                    <template slot-scope="scope">
                                                                        <el-input-number v-model="scope.row.cost_rate" :step="1" :min="0"></el-input-number>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column label="Currency">
                                                                    <template slot-scope="scope">
                                                                        <el-radio-group v-model="scope.row.cost_currency">
                                                                            <el-radio-button label="$" title="Dollar USA"></el-radio-button>
                                                                            <el-radio-button label="€" title="Euro"></el-radio-button>
                                                                            <el-radio-button label="₴" title="Hryvna"></el-radio-button>
                                                                            <el-radio-button label="£" title="Funt sterling"></el-radio-button>
                                                                        </el-radio-group>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column :width="100">
                                                                    <template slot-scope="scope">
                                                                        <el-button type="plain"
                                                                                   title="Reset"
                                                                                   size="mini"
                                                                                   @click="resetTeamUserRate(index, scope.$index)">
                                                                            <span class="el-icon-refresh"></span>
                                                                        </el-button>
                                                                    </template>
                                                                </el-table-column>
                                                            </el-table>
                                                        </el-collapse-item>
                                                    </el-collapse>
                                                <span slot="footer">
                                                        <el-button type="plain" @click="resetAllTeamsRates">Reset All</el-button>
                                                        <el-button type="success" @click="setTeamsRates">Apply</el-button>
                                                    </span>
                                            </el-dialog>
                                        </el-col>
                                    </el-row>

                                    <!--<div class="teams" v-if="isEditing">-->
                                        <!--<el-collapse v-model="activePanels">-->
                                            <!--<el-collapse-item v-for="(team, index) in project.teams" :key="team.id" :title="team.name" :name="team.name">-->
                                                <!--<el-table :data="team.users"-->
                                                          <!--:default-sort="{ prop: 'name' }"-->
                                                <!--&gt;-->
                                                    <!--<el-table-column label="Name" prop="name"></el-table-column>-->
                                                    <!--<el-table-column label="Cost rate">-->
                                                        <!--<template slot-scope="scope">-->
                                                    <!--<span v-for="user in project.users" :scope="scope">-->
                                                        <!--<span v-if="user.id === scope.row.id && user.pivot.cost_rate != ''">-->
                                                            <!--$ {{ user.pivot.cost_rate }}-->
                                                        <!--</span>-->
                                                    <!--</span>-->
                                                        <!--</template>-->
                                                    <!--</el-table-column>-->
                                                <!--</el-table>-->
                                                <!--<el-col :span="8" :offset="17">-->
                                                    <!--<div>-->
                                                        <!--<el-button type="text" class="delete_button" @click="deleteTeam(index, team.id)"> <i class="el-icon-close"></i> Delete team from project</el-button>-->
                                                    <!--</div>-->
                                                <!--</el-col>-->
                                            <!--</el-collapse-item>-->
                                        <!--</el-collapse>-->
                                    <!--</div>-->
                                </el-tab-pane>
                                <el-tab-pane label="Users" name="users">
                                    <el-row>
                                        <el-col :offset="4">
                                            <el-transfer v-model="usersInTransfer"
                                                         :data="usersData"
                                                         :titles="['All Users', 'Project Users']"
                                                         :render-content="renderUsers"
                                                         @change="moveUsers"
                                            >

                                            </el-transfer>
                                            <!-- Set rates dialog-->
                                            <el-dialog title="Change rates"
                                                       :visible.sync="showUsersRates"
                                                       :show-close="false"
                                            >
                                                <el-table :data="usersForChangeRates.newValue">
                                                    <el-table-column label="Name" prop="name"></el-table-column>
                                                    <el-table-column label="Rate">
                                                        <template slot-scope="scope">
                                                            <el-input-number v-model="scope.row.cost_rate" :step="1" :min="0"></el-input-number>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column label="Currency">
                                                            <template slot-scope="scope">
                                                                <el-radio-group v-model="scope.row.cost_currency">
                                                                    <el-radio-button label="$" title="Dollar USA"></el-radio-button>
                                                                    <el-radio-button label="€" title="Euro"></el-radio-button>
                                                                    <el-radio-button label="₴" title="Hryvna"></el-radio-button>
                                                                    <el-radio-button label="£" title="Funt sterling"></el-radio-button>
                                                                </el-radio-group>
                                                            </template>
                                                    </el-table-column>
                                                    <el-table-column :width="100">
                                                        <template slot-scope="scope">
                                                            <el-button type="plain"
                                                                       title="Reset"
                                                                       size="mini"
                                                                       @click="resetUserRate(scope.$index)">
                                                                <span class="el-icon-refresh"></span>
                                                            </el-button>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                <span slot="footer">
                                                    <el-button type="plain" @click="resetAllUsersRates">Reset All</el-button>
                                                    <el-button type="success" @click="setUsersRates">Apply</el-button>
                                                </span>
                                            </el-dialog>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>

                            <div v-if="isEditing">
                            <div><el-button type="text" class="delete_button" @click="showConfirmModal = true">Delete Project</el-button></div>

                            <!-- Confirm delete project modal form -->
                            <el-dialog
                                    title="Delete team"
                                    :visible.sync="showConfirmModal"
                                    width="30%">
                                <p>It will not be undone. Please enter project name to continue: <br>({{ project.name }})</p>
                                <el-input v-model="projectName"
                                          placeholder="Enter project name"></el-input>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click.prevent="showConfirmModal = false">Cancel</el-button>
                                    <el-button :disabled="!confirmDeleteProject" type="danger" @click.prevent="deleteProject">Delete</el-button>
                                </span>
                            </el-dialog>
                            </div>
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
import ElTabPane from "../../../node_modules/element-ui/packages/tabs/src/tab-pane.vue";

export default {
    props : ['projectId'],
    mixins: [notification],
    data() {
        return {
            loading            : true,
            isCreating         : false,
            isEditing          : false,
            showModal          : false,
            showConfirmModal   : false,
            activeTabName      : 'teams',
            openedTeams        : [],
            projectName        : '',
            membersDataTable   : [],
            teamsInTransfer    : [],
            usersInTransfer    : [],
            teamsGenerated     : false,
            usersGenerated     : false,
            projectUsers       : [],
            projectTeams       : [],
            showUsersRates     : false,
            showTeamUsersRates : false,
            usersForChangeRates: {
                oldValue: [],
                newValue: [],
            },
            teamsForChangeRates: {
                oldValue: [],
                newValue: [],
            },
        };
    },
    created() {
        this.$store.dispatch('getOwnTeams');
        this.$store.dispatch('getOwnUsers');
        if (this.$route.name === 'newProject') {
            this.isCreating = true;
            this.$store.dispatch('clearProject');
            this.loading = false;
        }
        if (this.$route.name === 'editProject') {
            this.isEditing = true;
            this.$store.dispatch('getOneProject', { projectId: this.projectId })
                .then(() => this.loading = false)
                .catch((error) => {
                    if (error.response.status === 403) {
                        this.showError('Access denied');
                        this.$router.go(-1);
                        this.loading = false;
                    }
                });
        }
    },
    computed: {
        // Checking is form valid
        formInvalid() {
            return this.$v.$invalid;
        },
        // Getters
        ...mapGetters([
            'project',
            'ownTeams',
            'ownUsers',
        ]),
        // Checking is verifying name equal project name to confirm deleting
        confirmDeleteProject() {
            return this.projectName === this.project.name;
        },
        // Generating teams data for transfer
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
            if (this.isEditing) {
                if (!this.teamsGenerated && this.project.teams) {
                    this.project.teams.map((team) => {
                        this.teamsInTransfer.push(team.id);
                        this.projectTeams.push({
                            id   : team.id,
                            users: team.users,
                        });
                        return team;
                    });
                    this.teamsGenerated = true;
                }
            }
            return data;
        },
        // Generating users data for transfer
        usersData() {
            const data = [];
            const users = this.ownUsers;
            users.forEach((user) => {
                let userIsInProject = null;
                if (this.isEditing && this.project.teams) {
                    userIsInProject = this.project.users.find((userInProject) => {
                        return user.id === userInProject.id ? userInProject : null;
                    });
                    if (!this.usersGenerated) {
                        this.project.users.map((user) => {
                            this.usersInTransfer.push(user.id);
                            this.projectUsers.push({
                                id               : user.id,
                                cost_rate        : user.pivot.cost_rate,
                                cost_currency    : user.pivot.cost_currency,
                                billable_rate    : user.pivot.billable_rate,
                                billable_currency: user.pivot.billable_currency,
                            });
                            return user;
                        });
                        this.usersGenerated = true;
                    }
                }
                data.push({
                    key          : user.id,
                    label        : user.name,
                    cost_rate    : (userIsInProject) ? userIsInProject.pivot.cost_rate : null,
                    cost_currency: (userIsInProject) ? userIsInProject.pivot.cost_currency : null,
                    billable_rate: (userIsInProject) ? userIsInProject.pivot.billable_rate : null,
                });
            });
            return data;
        },
    },
    destroyed() {
        // Clear project variable in store
        this.$store.dispatch('clearProject');
    },
    methods: {
        // Handle function for transfer users adding
        moveUsers(value, direction, movedKeys) {
            if (direction === 'right') {
                movedKeys.forEach((key) => {
                    const user = {};
                    const oldUser = {};
                    const userInArray = this.getUser(key);

                    if (this.userIsInProject(userInArray.id)) {
                        setTimeout(() => {
                            this.showWarning(`${userInArray.name} is already added to project`);
                        });
                        this.usersInTransfer = this.usersInTransfer.filter((userId) => {
                            return userId !== key;
                        });
                        return key;
                    }

                    this.showUsersRates = true;

                    if (userInArray) {
                        Object.assign(user, userInArray);
                        Object.assign(oldUser, userInArray);
                    }
                    this.usersForChangeRates.oldValue.push(oldUser);
                    this.usersForChangeRates.newValue.push(user);
                    return key;
                });
            } else {
                this.projectUsers = this.projectUsers.filter((userData) => {
                    return !movedKeys.find((userId) => {
                        return userId === userData.id;
                    });
                });
            }
        },
        // Handle function for transfer teams adding
        moveTeams(value, direction, movedKeys) {
            if (direction === 'right') {
                movedKeys.forEach((key) => {
                    let team = {};
                    let oldTeam = {};
                    const teamInArray = this.getTeam(key);

                    const usersInProject = teamInArray.users.filter((user) => {
                        return this.userIsInProject(user.id);
                    });


                    if (usersInProject.length) {

                        const names = usersInProject.map((user) => {
                            return user.name;
                        });

                        setTimeout(() => {
                            this.showWarning(`${names.join(', ')} ${(names.length === 1) ? 'is' : 'are'} already added to project`);
                        });

                        this.teamsInTransfer = this.teamsInTransfer.filter((teamId) => {
                            return teamId !== key;
                        });
                        return key;
                    }

                    this.showTeamUsersRates = true;

                    teamInArray.users.forEach((user) => {
                        if (this.userIsInProject(user.id)) {
                            this.showWarning(`${user.name} is already added to project`);
                        }
                    });

                    if (teamInArray) {
                        team = _.cloneDeep(teamInArray);
                        oldTeam = _.cloneDeep(teamInArray);
                    }
                    this.teamsForChangeRates.oldValue.push(oldTeam);
                    this.teamsForChangeRates.newValue.push(team);
                    return key;
                });
                if (this.teamsForChangeRates.newValue.length === 1) {
                    this.openedTeams.push(this.teamsForChangeRates.newValue[0].name);
                }
            } else {
                this.projectTeams = this.projectTeams.filter((teamData) => {
                    return !movedKeys.find((teamId) => {
                        return teamId === teamData.id;
                    });
                });
            }
        },
        // Add project
        addProject() {
            if (this.$v.$invalid) return;
            this.$store.dispatch('addProject', {
                project     : this.project,
                projectTeams: this.projectTeams,
                projectUsers: this.projectUsers,
            })
                .then(() => {
                    this.showSuccess('Project saved successful');
                    this.$router.push('/projects');
                })
                .catch(() => {
                    this.showError();
                });
        },
        // Update project
        updateProject() {
            if (this.$v.$invalid) return;
            this.$store.dispatch('updateProject', {
                projectId   : this.project.id,
                project     : this.project,
//                addedTeams  : this.addedTeams,
//                deletedTeams: this.deletedTeams,
                projectTeams: this.projectTeams,
//                addedMembers: this.addedMembers,
                projectUsers: this.projectUsers,
            })
            .then(() => {
                this.showSuccess('Project saved successful');
                this.$router.push('/projects');
            })
            .catch((error) => {
                this.showError(error);
            });
        },
        // Delete project
        deleteProject() {
            if (!this.confirmDeleteProject) return;
            this.showConfirmModal = false;
            this.$store.dispatch('deleteProject', { projectId: this.project.id })
            .then(() => {
                this.showSuccess('Project deleted successful');
                this.$router.push('/projects');
            })
            .catch(() => {
                this.showError();
            });
        },
        // Render one team row in transfer
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
        // Render one user row in transfer
        renderUsers(h, option) {
            return h('span', [
                option.label,
                h('span',
                    {
                        class: {
                            rate: true,
                        },
                        attrs: {
                            title: 'Project rate',
                        },
                    },
                    [
                        (option.cost_currency) ? option.cost_currency : '',
                        option.cost_rate,
                    ]
                ),
            ]);
        },
        // Set users rates
        setUsersRates() {
            this.showUsersRates = false;
            this.usersForChangeRates.newValue.forEach((user) => {
                this.projectUsers.push(user);
            });
            this.usersForChangeRates.oldValue = [];
            this.usersForChangeRates.newValue = [];
        },
        // Set teams rates
        setTeamsRates() {
            this.showTeamUsersRates = false;
            this.teamsForChangeRates.newValue.forEach((team) => {
                this.projectTeams.push(team);
            });
            this.teamsForChangeRates.oldValue = [];
            this.teamsForChangeRates.newValue = [];
            this.openedTeams = [];
        },
        resetTeamUserRate(teamIndex, userIndex) {
            this.teamsForChangeRates
                .newValue[teamIndex]
                .users[userIndex]
                .cost_rate = this.teamsForChangeRates.oldValue[teamIndex].users[userIndex].cost_rate;
            this.teamsForChangeRates
                .newValue[teamIndex]
                .users[userIndex]
                .cost_currency = this.teamsForChangeRates.oldValue[teamIndex].users[userIndex].cost_currency;
        },
        resetAllTeamsRates() {
            this.teamsForChangeRates.newValue = _.cloneDeep(this.teamsForChangeRates.oldValue);
        },
        resetUserRate(userIndex) {
            this.usersForChangeRates
                .newValue[userIndex]
                .cost_rate = this.usersForChangeRates.oldValue[userIndex].cost_rate;
            this.usersForChangeRates
                .newValue[userIndex]
                .cost_currency = this.usersForChangeRates.oldValue[userIndex].cost_currency;
        },
        resetAllUsersRates() {
            this.usersForChangeRates.newValue = _.cloneDeep(this.usersForChangeRates.oldValue);
        },
        getUser(userId) {
            return this.ownUsers.find((user) => {
                return user.id === userId;
            });
        },
        getTeam(teamId) {
            return this.ownTeams.find((team) => {
                return team.id === teamId;
            });
        },
        // Check if the user is already attached to project
        userIsInProject(userId) {
            const inTeams = !!this.projectTeams
                .filter((team) => {
                    return !!team.users
                        .find((user) => {
                            return user.id === userId;
                        });
                })
                .length;
            const inProject = !!this.projectUsers
                .find((user) => {
                    return user.id === userId;
                });
            return inTeams || inProject;
        },
    },
    components: {
        ElTabPane,
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

    .teams {
        margin-top: 40px;
    }

    .delete_button {
        color: #FA5555;
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
    .list-group {
        margin-top: 10px;
    }
    .list-group-item {
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .fa-times {
        cursor: pointer;
    }
</style>