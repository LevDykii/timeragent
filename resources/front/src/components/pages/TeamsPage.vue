<template>
    <div>
        <el-container direction="vertical">
            <nav-menu-auth></nav-menu-auth>
            <!--<div class="container">-->
            <el-main>
                <el-row>
                    <el-col :span="16" :offset="4">
                        <span class="page-title"> Teams </span>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <router-link
                                        to="/teams/new"
                                        class="el-button el-button--primary is-plain">
                                    <i class="el-icon-plus"></i> New Team
                                </router-link>
                            </div>
                            <el-table
                                    :data="teams"
                                    stripe
                                    :default-sort = "{prop: 'name'}">
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        sortable>
                                </el-table-column>
                                <el-table-column
                                        prop="owner_name"
                                        label="Owner(Team lead)">
                                </el-table-column>
                                <el-table-column label="Members">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.users.length < 1 "> No members</div>
                                        <div v-if="scope.row.users.length === 1">{{ scope.row.users[0].name }}</div>
                                        <div v-if="scope.row.users.length === 2">
                                            {{ scope.row.users[0].name }} and {{ scope.row.users[1].name }}
                                        </div>
                                        <div v-if="scope.row.users.length === 3">
                                            {{ scope.row.users[0].name }}, {{ scope.row.users[1].name }} and {{ scope.row.users[2].name }}
                                        </div>
                                        <div v-if="scope.row.users.length > 3">
                                            {{ scope.row.users[0].name }}, {{ scope.row.users[1].name }}, {{ scope.row.users[2].name }} and
                                            <el-button type="text" @click="showMembers(scope.row.users)">others...</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label=""
                                        width="80">
                                    <template slot-scope="scope">
                                        <div v-if="user.id == scope.row.owner_id">
                                            <el-button type="plain" size="mini" @click="goToTeam(scope.row.id)">Edit</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--members modal-->
                            <el-dialog title="Members" :visible.sync="membersTableVisible">
                                <el-table :data="members"
                                          :default-sort="{name: 'name'}">
                                    <el-table-column property="name"
                                                     label="Name"
                                                     sortable
                                    ></el-table-column>
                                    <el-table-column property="email" label="Email"></el-table-column>
                                </el-table>
                                <span slot="footer" class="dialog-footer">
                                        <el-button @click="membersTableVisible = false">Close</el-button>
                                </span>
                            </el-dialog>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <!--</div>-->
        </el-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import NavMenuAuth from '../blocks/NavMenuAuth';
    import notification from '../../mixins/notification';

    export default {
        mixins: [notification],
        data() {
            return {
                membersTableVisible: false,
                members            : [],
            };
        },
        created() {
            this.$store.dispatch('getTeams')
            .catch(() => {
                this.showError('Something went wrong in loading teams...');
            });
        },
        computed: {
            ...mapGetters([
                'user',
                'teams',
            ]),
        },
        methods: {
            goToTeam(teamId) {
                this.$router.push({ name: 'editTeam', params: { teamId } });
            },
            showMembers(members) {
                this.members = members;
                this.membersTableVisible = true;
            },
        },
        components: {
            NavMenuAuth,
        },
    };
</script>
<style lang="scss" rel="stylesheet/css" scoped>

    a.el-button {
        text-decoration: none;
    }

    a.el-button:hover {
        text-decoration: none;
    }
    a.el-button:focus {
        text-decoration: none;
    }

    .el-icon-plus {
        font-size: 18px;
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
        padding: 20px;
    }

    .flex-container-space-between {
        display: flex;
        justify-content: space-between;
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
    .col {
        padding: 20px 35px;
        padding-right: 0; 
    }
    .teams {
        td {
            height: 61px;
            padding: 20px;
            line-height: 1.42857;
            vertical-align: top;
            border-top: 1px solid #e0e0e0;
        }
    }
    .edit-button {
        margin: 20px 0;
        text-align: center;
        a {
            color: inherit;
        }
    }
</style>