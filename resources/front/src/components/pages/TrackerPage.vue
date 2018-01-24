<template>
    <div>
        <el-container direction="vertical">
            <nav-menu-auth></nav-menu-auth>
            <!--<div class="container">-->
            <el-main>
                <!--<div class="row">-->
                <el-row>
                    <el-col :span="16" :offset="4">
                        <app-page></app-page>
                    <!--</div>-->
                    <!--<div class="row">-->
                        <time-entries></time-entries>
                    </el-col>
                </el-row>
                <!--</div>-->
            </el-main>
            <!--</div>-->
        </el-container>
    </div>
</template>

<script>
    import NavMenuAuth from '../blocks/NavMenuAuth';
    import AppPage from './tracker-page/AppPage';
    import TimeEntries from './tracker-page/TimeEntries';
    import ElContainer from '../../../node_modules/element-ui/packages/container/src/main';

    export default {
        data() {
            return {
                timerStarted: false,
            };
        },
        created() {
            const date = this.$store.state.date;
            this.$store.dispatch('getTasks', { date });
        },
        methods: {
            startTimer() {
                this.timerStarted = true;
            },
            stopTimer() {
                this.timerStarted = false;
            },
        },
        components: {
            ElContainer,
            NavMenuAuth, AppPage, TimeEntries,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/css" scoped>

    body {
        background-color: #efefef;
    }

    .container {
        margin-top: 70px;
    }


</style>
