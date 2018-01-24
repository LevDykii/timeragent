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
                                   v-if="isEditing"
                                   title="Click to save"
                                    @click.prevent="updateTeam"
                                   :disabled="formInvalid"
                        > Save </el-button>
                        <el-button type="success"
                                   v-if="isCreating"
                                   title="Click to create"
                                    @click.prevent="addTeam"
                                   :disabled="formInvalid"
                        > Save </el-button>
                    </div>
                    <span v-if="isCreating" class="page-title"> New Team </span>
                    <span v-if="isEditing" class="page-title"> Edit Team </span>
                    <el-col :span="24">
                        <el-card>
                            <el-row>
                            <el-col :span="16" :offset="4">
                                <div>
                                    <label >Name</label>
                                        <el-input :class="{ 'has-error': $v.team.name.$error }"
                                                  placeholder="Enter team name"
                                                  v-model="team.name"
                                                  @input="$v.team.name.$touch()"
                                        ></el-input>
                                        <i class="fa fa-exclamation-circle error-icon" v-if="$v.team.name.$error">
                                            <div class="errors">
                                                <span class="error-message" v-if="!$v.team.name.required">Field is required</span>
                                            </div>
                                        </i>
                                </div>

                                <el-tabs v-model="activeTabName">
                                    <el-tab-pane label="Members" name="members">

                                        <el-row>
                                            <el-col :span="17" :offset="4">
                                                <!--<el-input :class="{ 'has-error': $v.members.$error }"-->
                                                          <!--placeholder="Enter user email..."-->
                                                          <!--v-model="members"-->
                                                          <!--@input="$v.members.$touch()"-->
                                                <!--&gt;</el-input>-->
                                                <!--<i class="fa fa-exclamation-circle error-icon" v-if="$v.members.$error">-->
                                                    <!--<div class="errors">-->
                                                        <!--<span class="error-message" v-if="!$v.members.email">Invalid email</span>-->
                                                    <!--</div>-->
                                                <!--</i>-->
                                                <el-select v-model="members"
                                                           multiple
                                                           filterable
                                                           allow-create
                                                           placeholder="Type members emails here"
                                                           class="members-emails"
                                                >
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                        <el-row class="transfer">
                                            <el-col :offset="4">
                                                <el-transfer v-model="teamUsers"
                                                             :data="membersData"
                                                             :titles="['Exists Members', 'To Add']"
                                                >
                                                </el-transfer>
                                            </el-col>
                                        </el-row>

                                    </el-tab-pane>
                                </el-tabs>
                                <div>
                                    <el-button type="text"
                                                class="delete_button"
                                                v-if="isEditing"
                                                @click="showConfirmModal = true"
                                    >Delete team</el-button>
                                </div>
                                <!-- Confirm delete team modal form -->

                                <el-dialog
                                        title="Delete team"
                                        v-if="isEditing"
                                        :visible.sync="showConfirmModal"
                                        width="30%">
                                    <p>It will not be undone. Please enter team name to continue: <br>({{ team.name }})</p>
                                    <el-input v-model="teamName"
                                              placeholder="Enter team name"></el-input>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click.prevent="showConfirmModal = false">Cancel</el-button>
                                        <el-button :disabled="!confirmDeleteTeam"
                                                   type="danger"
                                                   @click.prevent="deleteTeam"
                                        >Delete</el-button>
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
    import { required, email } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';
    import NavMenuAuth from '../blocks/NavMenuAuth';
    import notification from '../../mixins/notification';

    export default {
        props : ['teamId'],
        mixins: [notification],
        data() {
            return {
                loading         : true,
                isCreating      : false,
                isEditing       : false,
                showModal       : false,
                showConfirmModal: false,
                members         : [],
                teamUsers       : [],
                activeTabName   : 'members',
                teamName        : '',
                teamsGenerated  : false,
            };
        },
        created() {
            if (this.$route.name === 'editTeam') {
                this.$store.dispatch('getOneTeam', { teamId: this.teamId })
                    .then(() => this.loading = false)
                    .catch((error) => {
                        if (error.response.status === 403) {
                            this.showError('Access denied');
                            this.$router.go(-1);
                            this.loading = false;
                        }
                    });
                this.isEditing = true;
            }
            if (this.$route.name === 'newTeam') {
                this.isCreating = true;
                this.loading = false;
            }
            this.$store.dispatch('getExistsMembers');
        },
        computed: {
            formInvalid() {
                return this.$v.$invalid;
            },
            ...mapGetters([
                'team',
                'existsMembers',
            ]),
            confirmDeleteTeam() {
                return this.teamName === this.team.name;
            },
            membersData() {
                const data = [];
                const members = this.existsMembers;
                members.forEach((member) => {
                    data.push({
                        key  : member.id,
                        label: member.name,
                    });
                });
                if (!this.teamsGenerated && this.team.users) {
                    this.team.users.map((user) => {
                        this.teamUsers.push(user.id);
                        return user;
                    });
                    this.teamsGenerated = true;
                }
                return data;
            },
        },
        destroyed() {
            this.$store.dispatch('clearTeam');
        },
        methods: {
            addTeam() {
                if (this.$v.$invalid) return;
                this.$store.dispatch('addTeam', {
                    team          : this.team,
                    teamUsers     : this.teamUsers,
                    emailsToInvite: this.members,
                })
                    .then(() => {
                        this.showSuccess('Team saved successful');
                        this.$router.push('/teams');
                    })
                    .catch(() => {
                        this.showError();
                    });
            },
            updateTeam() {
                if (this.$v.$invalid) return;
                this.$store.dispatch('updateTeam', {
                    team          : this.team,
                    teamUsers     : this.teamUsers,
                    emailsToInvite: this.members,
                })
                    .then(() => {
                        this.showSuccess('Team saved successful');
                        this.$router.push('/teams');
                    })
                    .catch(() => {
                        this.showError();
                    });
            },
            deleteTeam() {
                if (!this.confirmDeleteTeam) return;
                this.showConfirmModal = false;
                this.$store.dispatch('deleteTeam', { teamId: this.team.id })
                .then(() => {
                    this.showSuccess('Team deleted successful');
                    this.$router.push('/teams');
                })
                .catch(() => {
                    this.showError();
                });
            },
        },
        components: {
            NavMenuAuth,
        },
        validations: {
            team: {
                name: {
                    required,
                },
            },
//            members: {
//                email,
//            },
        },
    };
</script>
<style lang="scss" rel="stylesheet/css" scoped>
    .transfer {
        margin-top: 20px;
    }

    .el-tabs {
        margin-top: 30px;
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

    .form-control:focus {
        box-shadow: none;
        border-bottom: 2px solid #178fe5;
        outline: 0;
        padding: 6px 0 5px;
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
    .members-list {
        margin-top: 20px;
    }
    .fa-times {
        cursor: pointer;
    }
</style>

<style>
    .members-emails {
        width: 100%;
    }
</style>
