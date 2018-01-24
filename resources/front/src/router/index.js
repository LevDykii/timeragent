import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../components/pages/HomePage.vue';
import Features from '../components/pages/FeaturesPage';
import Pricing from '../components/pages/PricingPage';
import Tracker from '../components/pages/TrackerPage';
import Projects from '../components/pages/ProjectsPage';
import NewProject from '../components/pages/NewProjectPage';
import Members from '../components/pages/MembersPage';
import Teams from '../components/pages/TeamsPage';
import NewTeam from '../components/pages/NewTeamPage';
import EditTeam from '../components/pages/EditTeamPage';
import EditProject from '../components/pages/EditProjectPage';
// import Clients from '../components/pages/ClientsPage.vue';
// import NewClient from '../components/pages/NewClientPage.vue';
import Profile from '../components/pages/ProfilePage';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'Home',
        //     component: Home,
        // },
        {
            path     : '/features',
            name     : 'Features',
            component: Features,
        },
        {
            path     : '/pricing',
            name     : 'Pricing',
            component: Pricing,
        },
        {
            path     : '/',
            name     : Tracker,
            component: Tracker,
        },
        {
            path     : '/projects',
            name     : 'Projects',
            component: Projects,
        },
        {
            path     : '/projects/new',
            name     : 'newProject',
            component: EditProject,
        },
        {
            path     : '/members',
            name     : 'Members',
            component: Members,
        },
        {
            path     : '/teams',
            name     : 'Teams',
            component: Teams,
        },
        {
            path     : '/teams/new',
            name     : 'newTeam',
            component: EditTeam,
        },
        {
            path     : '/teams/:teamId',
            name     : 'editTeam',
            component: EditTeam,
            props    : true,
        },
        {
            path     : '/projects/:projectId',
            name     : 'editProject',
            component: EditProject,
            props    : true,
        },
        // {
        //     path     : '/clients',
        //     name     : 'Clients',
        //     component: Clients,
        // },
        // {
        //     path     : '/clients/new',
        //     name     : 'NewClient',
        //     component: NewClient,
        // },
        {
            path     : '/profile',
            name     : 'Profile',
            component: Profile,
        },
    ],
});
