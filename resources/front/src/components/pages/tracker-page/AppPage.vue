<template>
    <div>
        <div id="app-page">
            <div class="page-title">
                <div class="tracker-datepicker">
                    <!--<el-button-group>-->
                        <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="subDay"></el-button>
                        <el-date-picker
                                v-model="pickerDate"
                                type="date"
                                placeholder="Pick a day"
                                value-format="yyyy-MM-dd"
                                @change="getTasksByDate"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-button type="primary" size="small" icon="el-icon-arrow-right" @click="addDay" :disabled="date == today">
                        </el-button>
                    <!--</el-button-group>-->
                    <a class="btn-calendar">{{ (date === today) ? 'Today' : (date === yesterday ) ? 'Yesterday' : formatedDate }}</a>
                    <div class="text-right" title="Now">{{ spendTime }}</div>
                </div>
            </div>
            <!--<calendar></calendar>-->
            <!--<div class="col-md-12">-->
            <el-col :span="24" style="position: relative;">
                <el-card>
                    <div class="panel-heading flex-container-space-between">
                        <div class="panel-title">
                            <span class="ng-binding">Total</span>
                            <span class="bold margin-right-15 ng-binding">{{ totalTime }}</span> 
                        </div>
                        <!-- <div class="col-xs-8">
                            <span><span style="color: red; font-weight: 700;">WARNING </span><i>Ні в якому разі не можна видаляти завдання якщо воно не припинене! (буде <span style="color: red; font-weight: 700;">БАБАХ</span>)</i> <i class="fa fa-bomb"></i></span>
                        </div> -->
                       <!--  <div class="btn-group text-right" v-bind:class="{ open: isOpened == 'Options'}">
                            <button type="button" class="btn btn-icon-default dropdown-toggle"
                                    v-on:click.prevent="showSubMenu('Options')"
                                    aria-expanded="false"><i class="fa fa-ellipsis-h"></i> <span class="sr-only">Timeline menu</span>
                            </button>
                            <ul class="dropdown-menu pull-right" role="menu" style="">
                                <li role="presentation">
                                    <a href="" role="menuitem" tabindex="-1"
                                        <i class="fa fa-check invisible"></i>
                                        Show User Activity 
                                    </a>
                                </li>
                            </ul>
                        </div> -->
                    </div>
                    <!--<div class="panel-body">-->
                        <!--<svg height="40" width="1063">-->
                            <!--<g>-->
                                <!--<rect class="timeline-bars" y="0" height="20" x="24" width="1039"></rect>-->
                                <!--<rect class="mask" y="1" height="18" width="1037" x="25"></rect>-->
                            <!--</g>-->
                            <!--<g data-reactid=".0.2.1.1.0.3">-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="24"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="130.48180242634317"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="236.9636048526863"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="343.44540727902944"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="449.9272097053726"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="556.4090121317157"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="662.8908145580589"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="769.372616984402"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="875.8544194107452"></circle>-->
                                <!--<circle class="timeline-tick" r="3" cy="20" cx="982.3362218370884"></circle>-->
                            <!--</g>-->
                        <!--</svg>-->
                    <!--</div>-->
                </el-card>
            </el-col>
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import moment from 'moment';                                                            //eslint-disable-line

    export default {
        data() {
            return {
                isOpened : null,
                today    : moment().format('YYYY-MM-DD'),
                yesterday: moment().subtract(1, 'day').format('YYYY-MM-DD'),
                pickerDate   : moment().format('YYYY-MM-DD'),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },],
                },
            };
        },
        computed: {
            spendTime() {
                let spendTime = this.$store.state.spendTime;                                //eslint-disable-line
                if (spendTime !== null) {
                    return spendTime.format('HH:mm:ss');
                } else return null;                                                         //eslint-disable-line
            },
            activeTask() {
                return this.$store.state.activeTask;
            },
            tasks() {
                return this.$store.state.tasks;
            },
            totalTime() {                                                                   //eslint-disable-line
                if (this.tasks.length > 0) {
//                    const tasks = JSON.parse(JSON.stringify(this.tasks));                   //eslint-disable-line
//
//                    const total = tasks.reduce(function(prev, cur) {                        //eslint-disable-line
//                        let endTime = cur.endTime;
//                        if (!endTime) endTime = moment().format('YYYY-MM-DD HH:mm:ss');
//                        return moment.duration(moment(endTime, 'YYYY-MM-DD HH:mm:ss').diff(moment(cur.startTime, 'YYYY-MM-DD HH:mm:ss'))).add(prev);
//                    }, null);                                                               //eslint-disable-line
                    let total = moment.duration(0);
                    let spendTime = '';
                    let time = '';
                    this.tasks.map((task) => {
                        const spendTime = task.time_entries.reduce((prev, cur) => {
                            time = (cur.spendTime) ? cur.spendTime : '';
                            let endTime = cur.endTime;
                            if (!endTime) endTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            return moment.duration(moment(endTime, 'YYYY-MM-DD HH:mm:ss')
                                .diff(moment(cur.startTime, 'YYYY-MM-DD HH:mm:ss'))).add(prev);
                        }, null);
                        total.add(moment.duration(spendTime));
                    });
                    // return moment.utc(total.asMilliseconds()).format('HH [h] mm [min]');
                    const hours = total.hours();
                    const minutes = total.minutes();
                    return (hours > 0 ? hours + ' h ' : '') + minutes + ' min ';
                } else {
                    return '0 min';
                }
            },
            date() {
                return this.$store.state.date;
            },
            formatedDate() {
                return moment(this.date, 'YYYY-MM-DD').format('ddd, D MMMM');
            },
        },
        methods: {
            addDay() {
                const date = moment(this.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
                this.pickerDate = date;
                this.$store.dispatch('getTasks', { date });
            },
            subDay() {
                const date = moment(this.date, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD');
                this.pickerDate = date;
                this.$store.dispatch('getTasks', { date });
            },
            showSubMenu(name) {
                this.isOpened = (this.isOpened === null) ? name : null;
            },
            getTasksByDate(date) {
                this.$store.dispatch('getTasks', { date });
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/css" scoped>

    .page-title {
        padding: 0;
        font-size: 28px;
        line-height: 33px;
        display: block;
        margin: 0 0 25px;
        height: 40px;
        word-break: break-all;
    }

    .bold {
        font-weight: 700 !important;
    }

    .btn-calendar {

        color: inherit;
        text-decoration: none;
    }

    .btn-calendar:hover {
        text-decoration: none;
    }

    .btn-icon-default {
        background: none;
        border-radius: 50%;
    }

    .btn-icon-default:hover {
        background: #DDDDDD;
    }

    .btn-icon-default:focus {
        background: #DDDDDD;
    }

    .flex-container-space-between {
        display: flex;
        justify-content: space-between;
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

    .timeline-bars {
        fill: #677b94;
    }

    .mask {
        fill: #fff;
    }

    .timeline-tick {
        fill: #333;
        stroke: #efefef;
        stroke-width: 1px;
    }
    .text-right {
        display: inline-block;
        float: right;
        margin-right: 15px;
    }

</style>

<style>
    .el-date-editor {
        width: 135px;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 140px;
    }
</style>
