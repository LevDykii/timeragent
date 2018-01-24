import moment from 'moment';
import * as types from './mutation-types';

export default {
    [types.GET_TASKS](state, data) {
        let activeTask;
        const tasks = data.data;
        if (tasks.length > 0 && tasks[tasks.length - 1].time_entries[tasks[tasks.length - 1].time_entries.length - 1].active === 1) {
            activeTask = tasks[tasks.length - 1].time_entries[tasks[tasks.length - 1].time_entries.length - 1].id;
            Object.assign(state, {
                activeTask,
            });
        }

        Object.assign(state, {
            tasks: data.data,
            date : data.date,
            activeTask: state.activeTask,
        });
    },

    [types.START_TIMER](state) {

        let activeTask = {};
        let spendTime = '';
        const date = moment().format('YYYY-MM-DD');
        Object.assign(state, { spendTime: moment() });

        if (state.activeTask) {

            state.tasks.map((task) => {
                activeTask = task.time_entries.find((timeEntry) => {
                    return timeEntry.id === state.activeTask;
                });
            });

            //
            spendTime = moment.duration(moment().diff(moment(activeTask.startTime, 'YYYY-MM-DD HH:mm:ss')));
            activeTask.spendTime = moment.utc(spendTime.asMilliseconds()).format('HH:mm:ss');
        }

        const timerID = window.setInterval(() => {
            Object.assign(state, { spendTime: moment() });
            //
            if (state.date === date) {
                state.tasks.map((task) => { // find active task in all tasks
                    activeTask = task.time_entries.find((timeEntry) => {
                        return timeEntry.id === state.activeTask;
                    });
                });
                spendTime = moment.duration(moment().diff(moment(activeTask.startTime, 'YYYY-MM-DD HH:mm:ss')));

                activeTask.spendTime = moment.utc(spendTime.asMilliseconds()).format('HH:mm:ss');
            }
        }, 1000);
        Object.assign(state, {
            timerID,
            timerStarted: true,
        });
    },

    [types.STOP_TIMER](state) {
        clearInterval(state.timerID);
        Object.assign(state, {
            timerID     : 0,
            spendTime   : null,
            timerStarted: false,
        });
    },

    [types.CREATE_TASK](state, task) {
        // Object.assign(task, { startTime: moment().format('HH:mm:ss') });
        // state.tasks.push(task);
        // const tasks = state.tasks;
        // Object.assign(state, {
        //     tasksExists: true,
        //     activeTask : tasks[tasks.length - 1].duration[tasks[tasks.length - 1].duration.length - 1].id,
        // });
    },

    [types.UPDATE_TASK](state, task) {
        // const taskIndex = state.tasks.findIndex((element) => {
        //     return element.id === task.task.id;
        // });
        // //
        // Object.assign(state.tasks[taskIndex], task.task);
    },

    [types.CONTINUE_TASK](state) {
        // const activeTask = {};
        // const task = state.tasks.find((task) => {
        //     return task.id === state.oldActiveTask;
        // });
        // const taskIndex = state.tasks.findIndex((element) => {
        //     return element.id === task.id;
        // });
        // state.activeTask = task.id;
        // Object.assign(activeTask, task);
        // activeTask.active = true;
        // activeTask.endTime = null;
        // Object.assign(state.tasks[taskIndex], activeTask);
    },

    [types.STOP_TASK](state, payload) {
        // let durationIndex = null;
        // let taskIndex = null;
        // state.tasks.map((task, index) => {
        //     durationIndex = task.duration.findIndex((element) => {
        //         return element.id === payload.task.id;
        //     });
        //     taskIndex = index;
        // });
        // Object.assign(state.tasks[taskIndex].duration[durationIndex], payload.task);
        (payload.withDelete) ? state.oldActiveTask = null : state.oldActiveTask = state.activeTask;
        state.activeTask = null;
    },
    [types.DELETE_TASK](state, task) {
        // state.tasks.splice(task.index, 1);
        const tasks = state.tasks.filter((taskInArray) => {
            return taskInArray.id !== task.id;
        });
        Object.assign(state, {
            tasks        : tasks,
            activeTask   : null,
            oldActiveTask: null,
        });
    },
    [types.DELETE_TIME_ENTRY](state, timeEntry) {
        // state.tasks.splice(task.index, 1);
        const tasks = state.tasks.map((task) => {
            task.time_entries = task.time_entries.filter((timeEntryInArray) => {
                // console.log(durationInArray.id !== duration.id);
                return timeEntryInArray.id !== timeEntry.id;
            });
            return task;
        });
        // console.log(tasks);
        Object.assign(state, {
            tasks        : tasks,
            activeTask   : null,
            oldActiveTask: null,
        });
    },

    [types.ADD_TIME_ENTRY](state, task) {
        Object.assign(state, {
            tasks      : state.tasks.concat(task),
            tasksExists: true,
        });
    },
    [types.GET_USER](state, user) {
        Object.assign(state, { user });
    },
    [types.UPDATE_USER](state, user) {
        Object.assign(state, { user });
    },
    [types.SET_TEAMS](state, teams) {
        Object.assign(state, { teams });
    },
    [types.SET_PROJECTS](state, projects) {
        Object.assign(state, { projects });
    },
    [types.SET_ONE_TEAM](state, team) {
        Object.assign(state, { team });
    },
    [types.CLEAR_TEAM](state, team = {}) {
        Object.assign(state, { team });
    },
    [types.SET_ONE_PROJECT](state, project) {
        Object.assign(state, { project });
    },
    [types.CLEAR_PROJECT](state, project = {}) {
        Object.assign(state, { project });
    },
    [types.SET_OWN_TEAMS](state, ownTeams) {
        Object.assign(state, { ownTeams });
    },
    [types.SET_OWN_USERS](state, ownUsers) {
        Object.assign(state, { ownUsers });
    },
    [types.SET_EXISTS_MEMBERS](state, existsMembers) {
        Object.assign(state, { existsMembers });
    },
};
