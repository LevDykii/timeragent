<template>
    <div>
        <el-container direction="vertical">
        <nav-menu-auth></nav-menu-auth>
        <el-main>
            <el-row>
                <el-col :span="16" :offset="4">
                <span class="page-title"> Projects </span> 

            		<el-card>
            			<div slot="header" class="clearfix">
                                <router-link to="projects/new"
                                             class="el-button el-button--primary is-plain"
                                >
                                <i class="el-icon-plus"></i> New Project</router-link>
            			</div>
                        <el-table :data="projects"
                                  stripe
                                  :default-sort="{ prop: 'name' }"
                        >
                            <el-table-column prop="name"
                                             label="Name"
                                             sortable
                            ></el-table-column>
                            <el-table-column prop="owner_name"
                                             label="Owner"
                            ></el-table-column>
                            <el-table-column label="Members">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.teams.length === 1">Team: {{ scope.row.teams[0].name }}</div>
                                    <div v-if="scope.row.teams.length === 2">Teams: {{ scope.row.teams[0].name }} and {{ scope.row.teams[1].name }}</div>
                                    <div v-if="scope.row.teams.length === 3">Teams: {{ scope.row.teams[0].name }}, {{ scope.row.teams[1].name }} and {{ scope.row.teams[2].name }}</div>
                                    <div v-if="scope.row.teams.length > 3">Teams: {{ scope.row.teams[0].name }}, {{ scope.row.teams[1].name }}, {{ scope.row.teams[2].name }} and
                                    <el-button type="text" @click="showTeams(scope.row.teams)">others...</el-button></div>
                                    <div v-if="scope.row.users_without_team.length === 1">
                                        User: {{ scope.row.users_without_team[0].name }}
                                    </div>
                                    <div v-if="scope.row.users_without_team.length === 2">
                                        Users: {{ scope.row.users_without_team[0].name }} and {{ scope.row.users_without_team[1].name }}
                                    </div>
                                    <div v-if="scope.row.users_without_team.length === 3">
                                        Users: {{ scope.row.users_without_team[0].name }}, {{ scope.row.users_without_team[1].name }} and
                                        {{ scope.row.users_without_team[2].name }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="80">
                                <template slot-scope="scope">
                                    <div v-if="user.id == scope.row.owner_id">
                                        <el-button type="plain" size="mini" @click="goToProject(scope.row.id)">Edit</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog title="Teams" :visible.sync="teamsTableVisible">
                            <el-table :data="teams"
                                      :default-sort="{prop: 'name'}">
                                <el-table-column property="name"
                                                 label="Name"
                                                 sortable
                                ></el-table-column>
                                <el-table-column property="owner_name" label="Owner(Team lead)"></el-table-column>
                            </el-table>
                            <span slot="footer" class="dialog-footer">
                                        <el-button @click="teamsTableVisible = false">Close</el-button>
                                </span>
                        </el-dialog>
            		</el-card>
                </el-col>
            </el-row>
        </el-main>
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
                teamsTableVisible: false,
                teams            : [],
            };
        },
        created() {
            this.$store.dispatch('getProjects')
            .catch(() => {
                this.showError('Something went wrong in loading projects...');
            });
        },
        computed: {
            ...mapGetters([
                'user',
                'projects',
            ]),
        },
        methods: {
            goToProject(projectId) {
                this.$router.push({ name: 'editProject', params: { projectId } });
            },
            showTeams(teams) {
                this.teams = teams;
                this.teamsTableVisible = true;
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
    .projects {
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