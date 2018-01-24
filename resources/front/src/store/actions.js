import moment from 'moment';
import Http from '../helpers/Http';
import * as types from './mutation-types';

export default {
    getTasks(context, obj) {
        return Http.get(`api/tasks?date=${obj.date}`).then((response) => {
            context.commit(types.GET_TASKS, { data: response.data, date: obj.date });
            const tasks = response.data;
            if (tasks.length > 0
                && tasks[tasks.length - 1].time_entries[tasks[tasks.length - 1].time_entries.length - 1].active === 1) {
                if (context.state.timerID === 0) {
                    context.dispatch('startTimer');
                }
            }
        });
    },
    startTimer(context) {
        context.commit(types.START_TIMER);
    },
    stopTimer(context) {
        context.commit(types.STOP_TIMER);
    },
    stopTask(context, obj) {
        if (moment().diff(moment(obj.task.startTime, 'YYYY-MM-DD HH:mm:ss'), 'seconds') < 60) {
            context.dispatch('deleteTimeEntry', { timeEntry: obj.task });
            context.commit(types.STOP_TASK, { withDelete: true });
        } else {
            const endTime = moment().format('YYYY-MM-DD HH:mm:ss');
            Http.post(`api/stop-task/${obj.task.id}`, { endTime })
                .then((response) => {
                    context.commit(types.STOP_TASK, { withDelete: false });
                    context.dispatch('getTasks', { date: context.state.date });
                });
            // context.commit(types.STOP_TASK);
        }
    },
    createTask(context, payload) {
        const startTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const task = {
            description: payload.task.description,
            task_id    : payload.task.id,
            checked    : false,
            active     : true,
            project_id : payload.task.project_id,
            startTime,
            spendTime  : null,
            endTime    : null,
        };

        let oldActiveTimeEntry = {};
        if (context.getters.oldActiveTask) {
            context.getters.tasks.map((task) => { // find active task in all tasks
                oldActiveTimeEntry = task.time_entries.find((timeEntry) => {
                    return timeEntry.id === context.getters.oldActiveTask;
                });
            });
        } else {
            const tasks = Object.assign(context.getters.tasks);
            if (tasks.length > 0) {
                oldActiveTimeEntry = tasks[tasks.length - 1]
                    .time_entries[tasks[tasks.length - 1]
                    .time_entries.length - 1];
            }
        }

        if (payload.task.id === oldActiveTimeEntry.task_id) {

            if (moment().diff(moment(oldActiveTimeEntry.endTime, 'YYYY-MM-DD HH:mm:ss'), 'seconds') > 60) {
                Http.post('api/create-time-entry', { task })
                    .then(response => context.dispatch('getTasks', { date: context.state.date }));
                    // .then(response => context.commit(types.CREATE_TASK, response.data));
            } else {
                Http.post(`api/continue-task/${oldActiveTimeEntry.id}`)
                    .then(() => context.dispatch('getTasks', { date: context.state.date }));
                    // .then(() => context.commit(types.CONTINUE_TASK, { task_id: context.state.oldActiveTask }));
            }
        } else if (payload.task.id) {
            Http.post('api/create-time-entry', { task })
                .then(() => context.dispatch('getTasks', { date: context.state.date }));
                // .then(response => context.commit(types.CREATE_TASK, response.data));
        } else {
            Http.post('api/create-task', { task })
                .then(() => context.dispatch('getTasks', { date: context.state.date }));
                // .then(response => context.commit(types.CREATE_TASK, response.data));
        }
    },
    updateTask(context, obj) {
        // context.commit(types.UPDATE_TASK, { task: task.task, index: task.index });
        Http.post(`api/update-task/${obj.task.id}`, { task: obj.task })
            .then(() => context.dispatch('getTasks', { date: context.state.date }));

    },
    deleteTask(context, task) {
        Http.post(`api/delete-task/${task.task.id}`)
            .then(() => context.commit(types.DELETE_TASK, { id: task.task.id }));
    },
    deleteTimeEntry(context, payload) {
        Http.post(`api/delete-time-entry/${payload.timeEntry.id}`)
            .then(() => context.dispatch('getTasks', { date: context.state.date }));
    },
    addTimeEntry(context, task) {
        // Http.post('api/create-task', { task })
        //     .then(response => context.commit(types.ADD_TIME_ENTRY, response.data));
        // context.commit(types.ADD_TIME_ENTRY, task);
        Http.post('api/create-time-entry', { task })
            .then(() => context.dispatch('getTasks', { date: context.state.date }));
    },
    updateTimeEntry(context, payload) {
        Http.post(`api/update-time-entry/${payload.timeEntry.id}`, { timeEntry: payload.timeEntry })
            .then(() => context.dispatch('getTasks', { date: context.state.date }));
    },
    getUser(context) {
        Http.get('api/user')
            .then(response => context.commit(types.GET_USER, response.data));
    },
    updateUser(context, payload) {
        return Http.post('api/user', { user: payload.user });
    },
    getTeams(context) {
        return Http.get('api/teams').then((response) => {
            context.commit(types.SET_TEAMS, response.data);
        });
    },
    getProjects(context) {
        return Http.get('api/projects').then((response) => {
            context.commit(types.SET_PROJECTS, response.data);
        });
    },
    addTeam(context, payload) {
        return Http.post('api/teams/new', { team: payload.team, teamUsers: payload.teamUsers }).then((response) => {
            if (payload.emailsToInvite !== []) {
                context.dispatch('inviteMembers', { teamId: response.data.id, emailsToInvite: payload.emailsToInvite });
            }
        });
    },
    inviteMembers(context, payload) {
        Http.post('api/teams/invite', { members: payload.emailsToInvite, team_id: payload.teamId });
    },
    addProject(context, payload) {
        return Http.post('api/projects/new', { project: payload.project, projectTeams: payload.projectTeams, projectUsers: payload.projectUsers });
    },
    getOneTeam(context, payload) {
        return Http.get(`api/teams/${payload.teamId}`)
            .then((response) => {
                context.commit(types.SET_ONE_TEAM, response.data);
            });
    },
    updateTeam(context, payload) {
        return Http.post(`api/teams/${payload.team.id}`, {
            team     : payload.team,
            teamUsers: payload.teamUsers,
        })
        .then((response) => {
            if (payload.emailsToInvite !== []) {
                context.dispatch('inviteMembers', { teamId: response.data.id, emailsToInvite: payload.emailsToInvite });
            }
        });
    },
    clearTeam(context) {
        context.commit(types.CLEAR_TEAM);
    },
    deleteTeam(context, payload) {
        return Http.post(`api/teams/${payload.teamId}/delete`);
    },
    getOneProject(context, payload) {
        return Http.get(`api/projects/${payload.projectId}`).then((response) => {
            context.commit(types.SET_ONE_PROJECT, response.data);
        });
    },
    updateProject(context, payload) {
        return Http.post(`api/projects/${payload.projectId}`, {
            project     : payload.project,
            // addedTeams  : payload.addedTeams,
            // deletedTeams: payload.deletedTeams,
            projectTeams: payload.projectTeams,
            // addedMembers: payload.addedMembers,
            projectUsers: payload.projectUsers,
        });
    },
    clearProject(context) {
        context.commit(types.CLEAR_PROJECT);
    },
    deleteProject(context, payload) {
        return Http.post(`api/projects/${payload.projectId}/delete`);
    },
    getOwnTeams(context) {
        Http.get('api/projects/teams').then((response) => {
            context.commit(types.SET_OWN_TEAMS, response.data);
        });
    },
    getOwnUsers(context) {
        Http.get('api/projects/users').then((response) => {
            context.commit(types.SET_OWN_USERS, response.data);
        });
    },
    getExistsMembers(context) {
        return Http.get('api/teams/exists-members').then((response) => {
            context.commit(types.SET_EXISTS_MEMBERS, response.data);
        });
    },
    logout() {
        return Http.post('logout');
    },
};
