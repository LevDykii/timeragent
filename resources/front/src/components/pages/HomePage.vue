<template>
    <div id="wrapper">
        <navmenu v-if="!authenticated"></navmenu>
        <navmenuauth v-if="authenticated"></navmenuauth>

        <div id="content">


            <header class="banner">
                <div class="banner-image" style=""></div>
                <div class="container container-normal">
                    <div class="banner-overlay">
                        <h1>Time Tracking Made Easy</h1>
                        <h2>Simple time tracking software for teams of any size.</h2>
                        <a class="btn btn-danger btn-lg btn-common"
                           href="https://app.timeragent.com/register"
                           role="button">Start Tracking</a>
                    </div>
                </div>
            </header>
            <button v-on:click="show()">click</button>


            <div class="clearfix"></div>

            <div class="description">
                <div class="description-content">
                    <div class="container container-narrow">
                        <p class="lead text-center">
                            TimerAgent is a work time tracking service for IT-professionals and companies.
                            Start in one minute, setup later. Track tasks from multiple project management systems with one click. Categorize time, create reports, and monitor your team online.
                        </p>
                    </div>
                </div>
            </div>

            <div class="screenshot">
                <div class="screenshot-content">
                    <div class="screenshot-background section-background"></div>
                    <div class="screenshot-image">
                        <img src="/media/1632/timeragent_main_screen.png" style="max-width: 1180px"/>
                    </div>
                </div>
            </div>

            <div class="features">
                <div class="features-header">
                    <div class="container container-normal">
                        <h2 class="text-center">
                            Features
                        </h2>
                    </div>
                </div>
                <div class="features-content">
                    <div class="container container-normal">
                        <div class="features-list">
                            <ul>
                                <li><strong>Tracking in real time</strong>
                                    - Use timer to keep track of every minute of your billable time. Add time manually, if you need.
                                </li>
                                <li><strong>Work day timeline</strong>
                                    - Your work day is visualized as a timeline. You can edit your work time using only a mouse.
                                </li>
                                <li><strong>Projects and clients</strong>
                                    - Create an unlimited number of projects and clients, assign icons to them.
                                </li>
                                <li><strong>Billable time and rates -</strong>
                                    Record billable and non-billable time, set billable rates to track your expenses and revenues.
                                </li>
                                <li><strong>Tags</strong>
                                    - Add tags to time entries to group your time by activities. Use tag filters in reports to show the required activities.
                                </li>
                                <li><strong>Flexible reports</strong>
                                    - Get an overview of your billable time, projects and teams. Use filters to drill down the details.
                                </li>
                                <li><strong>Time synchronization</strong>
                                    - the time you track is seamlessly synchronized with Jira or Redmine.
                                </li>
                                <li><strong>Team View</strong>
                                    - Switch to team view and see what the colleagues are working on at the moment.
                                </li>
                                <li><strong>Time-sheet export</strong>
                                    - Export time entries to PDF for printing or to CSV loading to Excel or a database.
                                </li>
                                <li><strong>Fits any team structure</strong>
                                    - Render any management structure: flat, hierarchical, or matrix type. Setup teams and projects <span>as it fits your needs.</span>
                                </li>
                            </ul>
                        </div>
                        <div class="features-navigation text-center">
                            <a class="btn btn-primary-outline btn-lg btn-common"
                               href="/features/"
                               role="button">Detailed Features</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="integrations">
                <div class="integrations-header">
                    <div class="container container-normal">
                        <h2 class="text-center">
                            Integrations
                        </h2>
                    </div>
                </div>
                <div class="integrations-content">
                    <div class="integrations-background section-background"></div>
                    <div class="container container-normal">
                        <div class="integration-content-holder">
                            <div class="integrations-image">
                                <div class="aspect-ratio-holder" style="padding-top: 72%"></div>
                                <div class="aspect-ratio-content"></div>
                            </div>
                            <div class="integrations-text">
                                <p>
                                <p>
                                    Install a browser extension for TimerAgent and track time for tasks created in your favorite web application.
                            </p>
                            </div>
                            <div class="integrations-button text-center">
                                <p>
                                    <a class="btn btn-default btn-lg btn-common"
                                       href="/integrations/"
                                       role="button">See Integrations</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pricing">
                <div class="pricing-header">
                    <div class="container container-normal">
                        <h2 class="text-center">
                            Pricing
                        </h2>
                    </div>
                </div>
                <div class="pricing-content">
                    <div class="container container-normal">
                        <div class="pricing-plans">
                            <div class="plan-holder free">
                                <div class="plan">
                                    <div class="plan-title text-uppercase text-center">
                                        <div class="wrapper">
                                            Free
                                        </div>
                                    </div>
                                    <div class="plan-special">
                                        <div class="wrapper">

                                        </div>
                                    </div>
                                    <div class="plan-price text-center">
                                        <div class="wrapper">
                                            <i class="fa fa-dollar" aria-hidden="true"></i>
                                            <span>0</span>
                                        </div>
                                    </div>
                                    <div class="plan-billing">
                                        <div class="wrapper">
                                            <p style="text-align: center;">Forever free</p>
                                        </div>
                                    </div>
                                    <div class="plan-features">
                                        <div class="wrapper">
                                            <ul>
                                                <li>Up to 5 users</li>
                                                <li>Time tracking</li>
                                                <li>Reporting</li>
                                                <li>Web apps integration</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="plan-spacer">
                                    </div>
                                </div>
                            </div>
                            <div class="plan-holder paid">
                                <div class="plan">
                                    <div class="plan-title text-uppercase text-center">
                                        <div class="wrapper">
                                            Professional
                                        </div>
                                    </div>
                                    <div class="plan-special ">
                                        <div class="wrapper">

                                        </div>
                                    </div>
                                    <div class="plan-price text-center">
                                        <div class="wrapper">
                                            <i class="fa fa-dollar" aria-hidden="true"></i>
                                            <span>4</span>
                                        </div>
                                    </div>
                                    <div class="plan-billing">
                                        <div class="wrapper">
                                            <p style="text-align: center;">user/month if billed annually,<br/>$5 if billed monthly
                                            </p>
                                        </div>
                                    </div>
                                    <div class="plan-features">
                                        <div class="wrapper">
                                            <ul>
                                                <li>Unlimited users</li>
                                                <li>Billable rates</li>
                                                <li>Tasks and todo lists</li>
                                                <li>Everything in Free</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="plan-spacer">
                                    </div>
                                </div>
                            </div>
                            <div class="plan-holder paid">
                                <div class="plan">
                                    <div class="plan-title text-uppercase text-center">
                                        <div class="wrapper">
                                            Business
                                        </div>
                                    </div>
                                    <div class="plan-special ">
                                        <div class="wrapper">
                                            <p style="text-align: center;"><strong> </strong></p>
                                        </div>
                                    </div>
                                    <div class="plan-price text-center">
                                        <div class="wrapper">
                                            <i class="fa fa-dollar" aria-hidden="true"></i>
                                            <span>6</span>
                                        </div>
                                    </div>
                                    <div class="plan-billing">
                                        <div class="wrapper">
                                            <p style="text-align: center;">user/month if billed annually,<br/>$7 if billed monthly
                                            </p>
                                        </div>
                                    </div>
                                    <div class="plan-features">
                                        <div class="wrapper">
                                            <ul>
                                                <li>Time synchronization</li>
                                                <li>Cost rates</li>
                                                <li>Everything in Professional</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="plan-spacer">
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="pricing-navigation text-center">
                            <a class="btn btn-primary-outline btn-lg btn-common"
                               href="/pricing/"
                               role="button">Detailed Pricing</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom-actions">
                <div class="container container-normal">
                    <div class="text-center">
                        <p>
                            <a class="btn btn-success btn-lg btn-common"
                               href="https://app.timeragent.com/register"
                               role="button">Start for Free</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <bottom></bottom>

    </div>
</template>
<script>
    //    import Template from './template';
    import Navmenu from '../blocks/NavMenu';
    import Navmenuauth from '../blocks/NavMenuAuth';
    import Bottom from '../blocks/Footer';

    export default {
        name: 'home-page',
        data() {
            return {
                authenticated: false,
            };
        },
        methods: {
            show() {
                this.authenticated = !this.authenticated;
            },
        },
        components: {
            Navmenu, Bottom, Navmenuauth,
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    /*@import url('../../assets/css/style.css');*/

    /*#app {*/
    /*margin-top: 0px;*/
    /*}*/

    /*.banner .container-normal .banner-overlay {*/
    /*background-color: rgba(55,71,79,.95);*/
    /*border-radius: 50px 0;*/
    /*text-align: center;*/
    /*padding: .71428571rem 1.14285714rem 2.85714286rem;*/
    /*position: absolute;*/
    /*left: 10%;*/
    /*right: 10%;*/
    /*bottom: -80px;*/
    /*}*/

    /*.banner .container-normal {*/
    /*position: relative;*/
    /*}*/

    /*.banner>.container-normal .banner-overlay h1 {*/
    /*margin-top: 50px;*/
    /*margin-bottom: 30px;*/
    /*font-family: Montserrat;*/
    /*font-weight: 700;*/
    /*font-size: 3rem;*/
    /*text-transform: uppercase;*/
    /*color: #fff!important;*/
    /*}*/

    /*h2 {*/
    /*display: block;*/
    /*font-size: 1.5em;*/
    /*-webkit-margin-before: 0.83em;*/
    /*-webkit-margin-after: 0.83em;*/
    /*-webkit-margin-start: 0px;*/
    /*-webkit-margin-end: 0px;*/
    /*font-weight: bold;*/
    /*}*/

    /*.banner .container-normal .banner-overlay h1+h2 {*/
    /*margin-top: 30px;*/
    /*margin-bottom: 30px;*/
    /*font-family: Open Sans;*/
    /*font-size: 1.5rem;*/
    /*font-weight: 300;*/
    /*color: #fff!important;*/
    /*}*/

    /*.features .features-list {*/
    /*padding: 0;*/
    /*margin: 30px auto 60px;*/
    /*}*/

    /*.features .features-list ul {*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*list-style-type: none;*/
    /*}*/

    /*.features .features-list ul li {*/
    /*margin: 0;*/
    /*padding: 15px 0 15px 45px;*/
    /*background-image: url(/images/star.png);*/
    /*background-repeat: no-repeat;*/
    /*background-position: 0 15px;*/
    /*}*/

    /*.bottom-actions, .features {*/
    /*margin: 60px auto;*/
    /*}*/

    .banner {
        height: 500px;
        margin-bottom: 80px;
    }

    .banner-image {
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        -o-background-size: cover;
        height: 100%;

        background-attachment: scroll;
        background-position: center center;
        background-repeat: no-repeat;
        // background-image: url('../../assets/images/timeragent_topbar_500px_light.png')
    }

    /*.lead {*/
    /*font-size: 1.25rem;*/
    /*}*/

    .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto
    }

    .modal-dialog {
        position: relative;
        width: auto;
        margin: 10px
    }

    .modal-content {
        position: relative;
        background-color: #fff;
        border: 1px solid #999;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: .42857143rem;
        -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        outline: 0
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        z-index: 1040;
        background-color: #000
    }

    .modal-backdrop.fade {
        opacity: 0;
        filter: alpha(opacity=0)
    }

    .modal-backdrop.in {
        opacity: .5;
        filter: alpha(opacity=50)
    }

    .modal-header {
        padding: 15px;
        border-bottom: 1px solid #e5e5e5
    }

    .modal-header .close {
        margin-top: -2px
    }

    .modal-title {
        margin: 0;
        line-height: 1.5
    }

    .modal-body {
        position: relative;
        padding: 15px
    }

    .modal-footer {
        padding: 15px;
        text-align: right;
        border-top: 1px solid #e5e5e5
    }

    .modal-footer .btn + .btn {
        margin-left: 5px;
        margin-bottom: 0
    }

    .modal-footer .btn-group .btn + .btn {
        margin-left: -1px
    }

    .modal-footer .btn-block + .btn-block {
        margin-left: 0
    }

    .modal-scrollbar-measure {
        position: absolute;
        top: -9999px;
        width: 50px;
        height: 50px;
        overflow: scroll
    }

    @media (min-width: 768px) {
        .modal-dialog {
            width: 600px;
            margin: 30px auto
        }

        .modal-content {
            -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5)
        }

        .modal-sm {
            width: 300px
        }
    }

    .tooltip.top-left .tooltip-arrow, .tooltip.top-right .tooltip-arrow {
        bottom: 0;
        margin-bottom: -5px;
        border-width: 5px 5px 0;
        border-top-color: #000
    }

    @media (min-width: 992px) {
        .modal-lg {
            width: 900px
        }
    }

    .tooltip {
        position: absolute;
        z-index: 1070;
        display: block;
        text-align: left;
        text-align: start;
        font-size: .85rem;
        opacity: 0;
        filter: alpha(opacity=0)
    }

    .tooltip.in {
        opacity: .9;
        filter: alpha(opacity=90)
    }

    .tooltip.top {
        margin-top: -3px;
        padding: 5px 0
    }

    .tooltip.right {
        margin-left: 3px;
        padding: 0 5px
    }

    .tooltip.bottom {
        margin-top: 3px;
        padding: 5px 0
    }

    .tooltip.left {
        margin-left: -3px;
        padding: 0 5px
    }

    .tooltip-inner {
        max-width: 200px;
        padding: 3px 8px;
        color: #fff;
        text-align: center;
        background-color: #000;
        border-radius: .28571429rem
    }

    .tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid
    }

    .tooltip.top .tooltip-arrow {
        bottom: 0;
        left: 50%;
        margin-left: -5px;
        border-width: 5px 5px 0;
        border-top-color: #000
    }

    .tooltip.top-left .tooltip-arrow {
        right: 5px
    }

    .tooltip.top-right .tooltip-arrow {
        left: 5px
    }

    .tooltip.right .tooltip-arrow {
        top: 50%;
        left: 0;
        margin-top: -5px;
        border-width: 5px 5px 5px 0;
        border-right-color: #000
    }

    .tooltip.left .tooltip-arrow {
        top: 50%;
        right: 0;
        margin-top: -5px;
        border-width: 5px 0 5px 5px;
        border-left-color: #000
    }

    .tooltip.bottom .tooltip-arrow, .tooltip.bottom-left .tooltip-arrow, .tooltip.bottom-right .tooltip-arrow {
        border-width: 0 5px 5px;
        border-bottom-color: #000;
        top: 0
    }

    .tooltip.bottom .tooltip-arrow {
        left: 50%;
        margin-left: -5px
    }

    .tooltip.bottom-left .tooltip-arrow {
        right: 5px;
        margin-top: -5px
    }

    .tooltip.bottom-right .tooltip-arrow {
        left: 5px;
        margin-top: -5px
    }

    .popover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1060;
        display: none;
        max-width: 276px;
        padding: 1px;
        text-align: left;
        text-align: start;
        font-size: 1rem;
        background-color: #fff;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: .42857143rem;
        -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2)
    }

    .carousel-caption, .carousel-control {
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .6)
    }

    .popover.top {
        margin-top: -10px
    }

    .popover.right {
        margin-left: 10px
    }

    .popover.bottom {
        margin-top: 10px
    }

    .popover.left {
        margin-left: -10px
    }

    .popover-title {
        margin: 0;
        padding: 8px 14px;
        font-size: 1rem;
        background-color: #f7f7f7;
        border-bottom: 1px solid #ebebeb;
        border-radius: -.57142857rem -.57142857rem 0 0
    }

    .popover-content {
        padding: 9px 14px
    }

    .popover > .arrow, .popover > .arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid
    }

    .carousel, .carousel-inner {
        position: relative
    }

    .popover > .arrow {
        border-width: 11px
    }

    .popover > .arrow:after {
        border-width: 10px;
        content: ""
    }

    .popover.top > .arrow {
        left: 50%;
        margin-left: -11px;
        border-bottom-width: 0;
        border-top-color: #999;
        border-top-color: rgba(0, 0, 0, .25);
        bottom: -11px
    }

    .popover.top > .arrow:after {
        content: " ";
        bottom: 1px;
        margin-left: -10px;
        border-bottom-width: 0;
        border-top-color: #fff
    }

    .popover.left > .arrow:after, .popover.right > .arrow:after {
        content: " ";
        bottom: -10px
    }

    .popover.right > .arrow {
        top: 50%;
        left: -11px;
        margin-top: -11px;
        border-left-width: 0;
        border-right-color: #999;
        border-right-color: rgba(0, 0, 0, .25)
    }

    .popover.right > .arrow:after {
        left: 1px;
        border-left-width: 0;
        border-right-color: #fff
    }

    .popover.bottom > .arrow {
        left: 50%;
        margin-left: -11px;
        border-top-width: 0;
        border-bottom-color: #999;
        border-bottom-color: rgba(0, 0, 0, .25);
        top: -11px
    }

    .popover.bottom > .arrow:after {
        content: " ";
        top: 1px;
        margin-left: -10px;
        border-top-width: 0;
        border-bottom-color: #fff
    }

    .popover.left > .arrow {
        top: 50%;
        right: -11px;
        margin-top: -11px;
        border-right-width: 0;
        border-left-color: #999;
        border-left-color: rgba(0, 0, 0, .25)
    }

    .popover.left > .arrow:after {
        right: 1px;
        border-right-width: 0;
        border-left-color: #fff
    }

    .carousel-inner {
        overflow: hidden;
        width: 100%
    }

    .carousel-inner > .item {
        display: none;
        position: relative;
        -webkit-transition: .6s ease-in-out left;
        -o-transition: .6s ease-in-out left;
        transition: .6s ease-in-out left
    }

    .carousel-inner > .item > a > img, .carousel-inner > .item > img {
        line-height: 1
    }

    @media all and (transform-3d), (-webkit-transform-3d) {
        .carousel-inner > .item {
            -webkit-transition: -webkit-transform .6s ease-in-out;
            -moz-transition: -moz-transform .6s ease-in-out;
            -o-transition: -o-transform .6s ease-in-out;
            transition: transform .6s ease-in-out;
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000px;
            -moz-perspective: 1000px;
            perspective: 1000px
        }

        .carousel-inner > .item.active.right, .carousel-inner > .item.next {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
            left: 0
        }

        .carousel-inner > .item.active.left, .carousel-inner > .item.prev {
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
            left: 0
        }

        .carousel-inner > .item.active, .carousel-inner > .item.next.left, .carousel-inner > .item.prev.right {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            left: 0
        }
    }

    .carousel-inner > .active, .carousel-inner > .next, .carousel-inner > .prev {
        display: block
    }

    .carousel-inner > .active {
        left: 0
    }

    .carousel-inner > .next, .carousel-inner > .prev {
        position: absolute;
        top: 0;
        width: 100%
    }

    .carousel-inner > .next {
        left: 100%
    }

    .carousel-inner > .prev {
        left: -100%
    }

    .carousel-inner > .next.left, .carousel-inner > .prev.right {
        left: 0
    }

    .carousel-inner > .active.left {
        left: -100%
    }

    .carousel-inner > .active.right {
        left: 100%
    }

    .carousel-control {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 15%;
        opacity: .5;
        filter: alpha(opacity=50);
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0)
    }

    .carousel-control.left {
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0, rgba(0, 0, 0, .0001) 100%);
        background-image: -o-linear-gradient(left, rgba(0, 0, 0, .5) 0, rgba(0, 0, 0, .0001) 100%);
        background-image: linear-gradient(to right, rgba(0, 0, 0, .5) 0, rgba(0, 0, 0, .0001) 100%);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)
    }

    .carousel-control.right {
        left: auto;
        right: 0;
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .0001) 0, rgba(0, 0, 0, .5) 100%);
        background-image: -o-linear-gradient(left, rgba(0, 0, 0, .0001) 0, rgba(0, 0, 0, .5) 100%);
        background-image: linear-gradient(to right, rgba(0, 0, 0, .0001) 0, rgba(0, 0, 0, .5) 100%);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)
    }

    .carousel-control:focus, .carousel-control:hover {
        outline: 0;
        color: #fff;
        text-decoration: none;
        opacity: .9;
        filter: alpha(opacity=90)
    }

    .carousel-control .glyphicon-chevron-left, .carousel-control .glyphicon-chevron-right, .carousel-control .icon-next, .carousel-control .icon-prev {
        position: absolute;
        top: 50%;
        margin-top: -10px;
        z-index: 5;
        display: inline-block
    }

    .carousel-control .glyphicon-chevron-left, .carousel-control .icon-prev {
        left: 50%;
        margin-left: -10px
    }

    .carousel-control .glyphicon-chevron-right, .carousel-control .icon-next {
        right: 50%;
        margin-right: -10px
    }

    .carousel-control .icon-next, .carousel-control .icon-prev {
        width: 20px;
        height: 20px;
        line-height: 1;
        font-family: serif
    }

    .carousel-control .icon-prev:before {
        content: '‹'
    }

    .carousel-control .icon-next:before {
        content: '›'
    }

    .carousel-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        z-index: 15;
        width: 60%;
        margin-left: -30%;
        padding-left: 0;
        list-style: none;
        text-align: center
    }

    .carousel-indicators li {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 1px;
        text-indent: -999px;
        border: 1px solid #fff;
        border-radius: 10px;
        cursor: pointer;
        background-color: #000 \9
    ;
        background-color: rgba(0, 0, 0, 0)
    }

    .carousel-indicators .active {
        margin: 0;
        width: 12px;
        height: 12px;
        background-color: #fff
    }

    .carousel-caption {
        position: absolute;
        left: 15%;
        right: 15%;
        bottom: 20px;
        z-index: 10;
        padding-top: 20px;
        padding-bottom: 20px
    }

    .carousel-caption .btn, .text-hide {
        text-shadow: none
    }

    @media screen and (min-width: 768px) {
        .carousel-control .glyphicon-chevron-left, .carousel-control .glyphicon-chevron-right, .carousel-control .icon-next, .carousel-control .icon-prev {
            width: 30px;
            height: 30px;
            margin-top: -10px;
            font-size: 30px
        }

        .carousel-control .glyphicon-chevron-left, .carousel-control .icon-prev {
            margin-left: -10px
        }

        .carousel-control .glyphicon-chevron-right, .carousel-control .icon-next {
            margin-right: -10px
        }

        .carousel-caption {
            left: 20%;
            right: 20%;
            padding-bottom: 30px
        }

        .carousel-indicators {
            bottom: 20px
        }
    }

    .btn-group-vertical > .btn-group:after, .btn-group-vertical > .btn-group:before, .btn-toolbar:after, .btn-toolbar:before, .clearfix:after, .clearfix:before, .container-fluid:after, .container-fluid:before, .container:after, .container:before, .dl-horizontal dd:after, .dl-horizontal dd:before, .form-horizontal .form-group:after, .form-horizontal .form-group:before, .modal-footer:after, .modal-footer:before, .modal-header:after, .modal-header:before, .nav:after, .nav:before, .navbar-collapse:after, .navbar-collapse:before, .navbar-header:after, .navbar-header:before, .navbar:after, .navbar:before, .pager:after, .pager:before, .panel-body:after, .panel-body:before, .row:after, .row:before {
        content: " ";
        display: table
    }

    .btn-group-vertical > .btn-group:after, .btn-toolbar:after, .clearfix:after, .container-fluid:after, .container:after, .dl-horizontal dd:after, .form-horizontal .form-group:after, .modal-footer:after, .modal-header:after, .nav:after, .navbar-collapse:after, .navbar-header:after, .navbar:after, .pager:after, .panel-body:after, .row:after {
        clear: both
    }

    .center-block {
        display: block;
        margin-left: auto;
        margin-right: auto
    }

    .pull-right {
        float: right !important
    }

    .pull-left {
        float: left !important
    }

    .hide {
        display: none !important
    }

    .show {
        display: block !important
    }

    .hidden, .visible-lg, .visible-lg-block, .visible-lg-inline, .visible-lg-inline-block, .visible-md, .visible-md-block, .visible-md-inline, .visible-md-inline-block, .visible-sm, .visible-sm-block, .visible-sm-inline, .visible-sm-inline-block, .visible-xs, .visible-xs-block, .visible-xs-inline, .visible-xs-inline-block {
        display: none !important
    }

    .invisible {
        visibility: hidden
    }

    .text-hide {
        font: 0/0 a;
        color: transparent;
        background-color: transparent;
        border: 0
    }

    .affix {
        position: fixed
    }

    @media (max-width: 767px) {
        .visible-xs {
            display: block !important
        }

        table.visible-xs {
            display: table !important
        }

        tr.visible-xs {
            display: table-row !important
        }

        td.visible-xs, th.visible-xs {
            display: table-cell !important
        }

        .visible-xs-block {
            display: block !important
        }

        .visible-xs-inline {
            display: inline !important
        }

        .visible-xs-inline-block {
            display: inline-block !important
        }
    }

    @media (min-width: 768px) and (max-width: 991px) {
        .visible-sm {
            display: block !important
        }

        table.visible-sm {
            display: table !important
        }

        tr.visible-sm {
            display: table-row !important
        }

        td.visible-sm, th.visible-sm {
            display: table-cell !important
        }

        .visible-sm-block {
            display: block !important
        }

        .visible-sm-inline {
            display: inline !important
        }

        .visible-sm-inline-block {
            display: inline-block !important
        }
    }

    @media (min-width: 992px) and (max-width: 1199px) {
        .visible-md {
            display: block !important
        }

        table.visible-md {
            display: table !important
        }

        tr.visible-md {
            display: table-row !important
        }

        td.visible-md, th.visible-md {
            display: table-cell !important
        }

        .visible-md-block {
            display: block !important
        }

        .visible-md-inline {
            display: inline !important
        }

        .visible-md-inline-block {
            display: inline-block !important
        }
    }

    @media (min-width: 1200px) {
        .visible-lg {
            display: block !important
        }

        table.visible-lg {
            display: table !important
        }

        tr.visible-lg {
            display: table-row !important
        }

        td.visible-lg, th.visible-lg {
            display: table-cell !important
        }

        .visible-lg-block {
            display: block !important
        }

        .visible-lg-inline {
            display: inline !important
        }

        .visible-lg-inline-block {
            display: inline-block !important
        }

        .hidden-lg {
            display: none !important
        }
    }

    @media (max-width: 767px) {
        .hidden-xs {
            display: none !important
        }
    }

    @media (min-width: 768px) and (max-width: 991px) {
        .hidden-sm {
            display: none !important
        }
    }

    @media (min-width: 992px) and (max-width: 1199px) {
        .hidden-md {
            display: none !important
        }
    }

    .visible-print {
        display: none !important
    }

    @media print {
        .visible-print {
            display: block !important
        }

        table.visible-print {
            display: table !important
        }

        tr.visible-print {
            display: table-row !important
        }

        td.visible-print, th.visible-print {
            display: table-cell !important
        }
    }

    .visible-print-block {
        display: none !important
    }

    @media print {
        .visible-print-block {
            display: block !important
        }
    }

    .visible-print-inline {
        display: none !important
    }

    @media print {
        .visible-print-inline {
            display: inline !important
        }
    }

    .visible-print-inline-block {
        display: none !important
    }

    @media print {
        .visible-print-inline-block {
            display: inline-block !important
        }

        .hidden-print {
            display: none !important
        }
    }

    .treeview .list-group-item {
        cursor: pointer
    }

    .treeview span.indent {
        margin-left: 10px;
        margin-right: 10px
    }

    .treeview span.icon {
        width: 12px;
        margin-right: 5px
    }

    .treeview .node-disabled {
        color: silver;
        cursor: not-allowed
    }

    /*banner*/

    .banner {
        height: 500px;
        margin-bottom: 80px
    }

    .banner > .banner-image {
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        -o-background-size: cover;
        height: 100%
    }

    .banner > .container-normal {
        position: relative
    }

    .banner > .container-normal .banner-overlay {
        background-color: rgba(55, 71, 79, .95);
        border-radius: 50px 0;
        text-align: center;
        padding: .71428571rem 1.14285714rem 2.85714286rem;
        position: absolute;
        left: 10%;
        right: 10%;
        bottom: -80px
    }

    .banner > .container-normal .banner-overlay h1 {
        margin-top: 50px;
        margin-bottom: 30px;
        font-family: Montserrat;
        font-weight: 700;
        font-size: 3rem;
        text-transform: uppercase;
        color: #fff !important
    }

    .banner > .container-normal .banner-overlay h1 + h2 {
        margin-top: 30px;
        margin-bottom: 30px;
        font-family: Open Sans;
        font-size: 1.5rem;
        font-weight: 300;
        color: #fff !important
    }

    @media (max-width: 768px) {
        .navbar-fixed-top .navbar-nav > li.divider {
            border-top: 1px solid #1a1a1a;
            border-bottom: 1px solid rgba(255, 255, 255, .1)
        }

        .banner {
            height: auto;
            margin: 50px 0 0
        }

        .banner > .banner-image {
            display: none
        }

        .banner > .container-normal {
            padding: 0
        }

        .banner > .container-normal .banner-overlay {
            position: static;
            border-radius: 0
        }
    }

    /*Description*/

    .description {
        margin-top: 90px;
        margin-bottom: 90px
    }

    .text-center {
        text-align: center;
    }

    /*Features*/
    .features .features-list {
        padding: 0;
        margin: 30px auto 60px
    }

    .features .features-list ul {
        padding: 0;
        margin: 0;
        list-style-type: none
    }

    .features .features-list ul li {
        margin: 0;
        padding: 15px 0 15px 45px;
        // background-image: url(../../assets/images/star.png);
        background-repeat: no-repeat;
        background-position: 0 15px
    }

    .features .features-button {
        margin-top: 60px
    }

    .icon-checked, .icon-unchecked {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: top
    }

    .icon-checked {
        // background-image: url(/images/icon_checked.png)
    }

    .icon-unchecked {
        // background-image: url(/images/icon_unchecked.png)
    }

    .features-table {
        display: table;
        border-collapse: collapse;
        margin: auto;
        line-height: 22px
    }

    .features-table p {
        margin: auto
    }

    .features-table .feature, .features-table .feature-group {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap
    }

    .features-table .feature .feature-description, .features-table .feature-group .feature-description {
        flex-grow: 1;
        flex-shrink: 1
    }

    .features-table .feature .feature-plans, .features-table .feature-group .feature-plans {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        flex-grow: 0;
        flex-shrink: 0;
        text-align: center
    }

    .features-table .feature .feature-plans .feature-plan, .features-table .feature-group .feature-plans .feature-plan {
        width: 150px
    }

    .features-table .feature-group {
        margin-top: 30px
    }

    .features-table .feature-group .feature-description, .features-table .feature-group .feature-plan {
        padding: 12px;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase
    }

    .features-table .feature-group .feature-description {
        padding-left: 0
    }

    .features-table .feature-group .feature-plan {
        color: #fff;
        background-color: #14b9d6
    }

    .features-table .feature .feature-description, .features-table .feature .feature-plan {
        padding: 15px
    }

    .features-table .feature .feature-description {
        padding-left: 0;
        font-size: 14px
    }

    .features-table .feature .feature-plan {
        font-size: 12px;
        background-color: #fff
    }

    .features-table .feature + .feature {
        border-top: 1px dashed #d1d4d7
    }

    @media (max-width: 768px) {
        .features-table .feature, .features-table .feature-group {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap
        }

        .features-table .feature .feature-plan, .features-table .feature-group .feature-plan {
            padding-left: 6px;
            padding-right: 6px;
            flex-wrap: nowrap;
            flex-grow: 1;
            flex-shrink: 1
        }

        .features-table .feature .feature-plans .feature-plan, .features-table .feature-group .feature-plans .feature-plan {
            width: auto
        }

        .features-table .feature .feature-description {
            padding: 15px 15px 0;
            background-color: #fff
        }

        .features-table .feature, .features-table .feature-group .feature-plans {
            -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
            -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
            box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05)
        }
    }

    @media (min-width: 769px) {
        .features-table .feature-plans {
            -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
            -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
            box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05)
        }
    }

    .btn-primary-outline {
        color: #14b9d6;
        background-color: transparent;
        border-color: #14b9d6;
        border-radius: 0;
    }

    /*Integrations*/
    .integrations {
        margin: 60px auto
    }

    .integrations .integrations-content {
        position: relative
    }

    .integrations .integrations-content .integrations-background {
        position: absolute;
        top: 10%;
        bottom: 10%;
        left: 0;
        right: 0;
        z-index: -1
    }

    .integrations .integrations-content .integration-content-holder {
        position: relative
    }

    .integrations .integrations-content .integration-content-holder .integrations-image {
        min-height: 500px;
        position: relative
    }

    .integrations .integrations-content .integration-content-holder .integrations-image > .aspect-ratio-holder {
        display: block;
        width: 100%;
        padding-top: 100%
    }

    .integrations .integrations-content .integration-content-holder .integrations-image > .aspect-ratio-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0
    }

    .integrations .integrations-content .integration-content-holder .integrations-image .aspect-ratio-content {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat
    }

    .integrations .integrations-content .integration-content-holder .integrations-text {
        position: absolute;
        top: 15%;
        left: 0;
        right: 0
    }

    .integrations .integrations-content .integration-content-holder .integrations-button {
        position: absolute;
        bottom: 15%;
        left: 0;
        right: 0
    }

    .integrations .integrations-content .integration-content-holder .integrations-button a {
        color: #fff;
        background-color: #3f444b;
        border-color: #212427;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
    }

    .integration-thumbs-background .integration-thumbs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin: -5px
    }

    .integration-thumbs-background .integration-thumbs .integration-thumb {
        width: 290px;
        -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
        -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
        margin: 5px;
        padding: 12px;
        background: #fff
    }

    @media (min-width: 769px) {
        .integration-thumbs-background .integration-thumbs .integration-thumb {
            width: 324px;
            margin: 5px
        }
    }

    .integration-thumbs-background .integration-thumbs .integration-thumb .integration-link {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 12px 24px;
        color: #676f7a
    }

    .integration-thumbs-background .integration-thumbs .integration-thumb .integration-link:hover {
        background-color: #e9f8fb;
        cursor: pointer
    }

    .integration-thumbs-background .integration-thumbs .integration-thumb .integration-link:focus {
        outline: 0
    }

    .integration-thumbs-background .integration-thumbs .integration-thumb .integration-link .integration-text {
        margin: auto
    }

    .integration-thumbs-background .integration-buttons {
        margin-top: 60px
    }

    .aspect-ratio-content {
        // background-image: url('../../assets/images/int_banner.png')
    }

    /*Pricing*/

    .pricing-plans {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        margin: 30px auto 60px
    }

    .pricing-plans .plan-holder {
        width: 290px;
        margin: 10px auto;
        -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
        -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05);
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .05)
    }

    @media (min-width: 769px) {
        .pricing-plans {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between
        }

        .pricing-plans .plan-holder {
            width: 324px;
            margin: 10px 0
        }
    }

    .pricing-plans .plan-holder .plan > * {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap
    }

    .pricing-plans .plan-holder .plan > * .wrapper {
        margin: auto;
        align-self: center
    }

    .pricing-plans .plan-holder .plan > * .wrapper p {
        margin: auto
    }

    .pricing-plans .plan-holder .plan > * .wrapper ul {
        margin: 0
    }

    .pricing-plans .plan-holder .plan .plan-title {
        height: 100px;
        padding: 34px 25px;
        font-size: 28px;
        line-height: 1
    }

    .pricing-plans .plan-holder .plan .plan-special {
        height: 52px;
        line-height: 1;
        font-size: 16px
    }

    .pricing-plans .plan-holder .plan .plan-special.success .wrapper {
        padding: 5px;
        color: #fff;
        background-color: #00bc6a
    }

    .pricing-plans .plan-holder .plan .plan-special.info .wrapper {
        padding: 5px;
        color: #fff;
        background-color: #14b9d6
    }

    .pricing-plans .plan-holder .plan .plan-special.warning .wrapper {
        padding: 5px;
        color: #fff;
        background-color: #ffd15f
    }

    .pricing-plans .plan-holder .plan .plan-special.danger .wrapper {
        padding: 5px;
        color: #fff;
        background-color: #e26a6a
    }

    .pricing-plans .plan-holder .plan .plan-price {
        height: 50px
    }

    .pricing-plans .plan-holder .plan .plan-price .wrapper > * {
        display: inline-block;
        font-weight: 700;
        vertical-align: top
    }

    .pricing-plans .plan-holder .plan .plan-price i {
        margin-top: 10px;
        font-size: 30px
    }

    .pricing-plans .plan-holder .plan .plan-price span {
        line-height: .75;
        font-family: Montserrat;
        font-size: 70px;
        text-transform: uppercase
    }

    .pricing-plans .plan-holder .plan .plan-billing {
        height: 48px;
        margin-top: 15px;
        line-height: 1;
        font-size: 13px
    }

    .pricing-plans .plan-holder .plan .plan-features {
        min-height: 98px;
        margin-top: 15px;
        margin-bottom: 30px;
        line-height: 1;
        font-size: 16px
    }

    .pricing-plans .plan-holder .plan .plan-features .wrapper {
        margin-top: 0
    }

    .pricing-plans .plan-holder .plan .plan-features ul {
        padding-left: 0;
        list-style: none
    }

    .pricing-plans .plan-holder .plan .plan-features ul li:not(:last-child) {
        padding-bottom: 10px
    }

    .pricing-plans .plan-holder .plan .plan-features ul li:before {
        margin-right: .5em;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        content: "";
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
    }

    .pricing-plans .plan-holder .plan .plan-divider {
        margin: auto 24px;
        border-top: 1px dashed #d1d4d7
    }

    .pricing-plans .plan-holder .plan .plan-action {
        height: 96px
    }

    .pricing-plans .plan-holder .plan .plan-action .btn {
        width: 150px
    }

    .pricing-plans .plan-holder .plan .plan-spacer {
        height: 28px
    }

    .pricing-plans .plan-holder:nth-child(1) {
        border: 1px solid #c2c5ca;
        background: #fff
    }

    .pricing-plans .plan-holder:nth-child(1) .plan-title {
        color: #fff;
        background: #858c95
    }

    .pricing-plans .plan-holder:nth-child(1) .plan-features ul li:before, .pricing-plans .plan-holder:nth-child(1) .plan-price, .pricing-plans .plan-holder:nth-child(1) .plan-special {
        color: #858c95
    }

    .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action {
        color: #fff;
        background-color: #858c95;
        border-color: #858c95
    }

    .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:focus {
        color: #fff;
        background-color: #6b727c;
        border-color: #484d53
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.active, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:active, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:hover {
        color: #fff;
        background-color: #6b727c;
        border-color: #676d76
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.focus, .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:focus, .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:hover, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.active.focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.active:focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.active:hover, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:active.focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:active:focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:active:hover {
        color: #fff;
        background-color: #5b6169;
        border-color: #484d53
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.active, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:active {
        background-image: none
    }

    .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.disabled.focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.disabled:focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.disabled:hover, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action[disabled].focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action[disabled]:focus, .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action[disabled]:hover, fieldset[disabled] .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action.focus, fieldset[disabled] .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:focus, fieldset[disabled] .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action:hover {
        background-color: #858c95;
        border-color: #858c95
    }

    .pricing-plans .plan-holder:nth-child(1) .plan-action .btn-plan-action .badge {
        color: #858c95;
        background-color: #fff
    }

    .pricing-plans .plan-holder:nth-child(2) {
        border: 1px solid #c2c5ca;
        background: #fff
    }

    .pricing-plans .plan-holder:nth-child(2) .plan-title {
        color: #fff;
        background: #00bc6a
    }

    .pricing-plans .plan-holder:nth-child(2) .plan-features ul li:before, .pricing-plans .plan-holder:nth-child(2) .plan-price, .pricing-plans .plan-holder:nth-child(2) .plan-special {
        color: #00bc6a
    }

    .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action {
        color: #fff;
        background-color: #00bc6a;
        border-color: #00bc6a
    }

    .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:focus {
        color: #fff;
        background-color: #00894d;
        border-color: #003d22
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.active, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:active, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:hover {
        color: #fff;
        background-color: #00894d;
        border-color: #007f47
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.focus, .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:focus, .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:hover, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.active.focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.active:focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.active:hover, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:active.focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:active:focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:active:hover {
        color: #fff;
        background-color: #006539;
        border-color: #003d22
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.active, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:active {
        background-image: none
    }

    .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.disabled.focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.disabled:focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.disabled:hover, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action[disabled].focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action[disabled]:focus, .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action[disabled]:hover, fieldset[disabled] .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action.focus, fieldset[disabled] .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:focus, fieldset[disabled] .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action:hover {
        background-color: #00bc6a;
        border-color: #00bc6a
    }

    .pricing-plans .plan-holder:nth-child(2) .plan-action .btn-plan-action .badge {
        color: #00bc6a;
        background-color: #fff
    }

    .pricing-plans .plan-holder:nth-child(3) {
        border: 1px solid #c2c5ca;
        background: #fff
    }

    .pricing-plans .plan-holder:nth-child(3) .plan-title {
        color: #fff;
        background: #14b9d6
    }

    .pricing-plans .plan-holder:nth-child(3) .plan-features ul li:before, .pricing-plans .plan-holder:nth-child(3) .plan-price, .pricing-plans .plan-holder:nth-child(3) .plan-special {
        color: #14b9d6
    }

    .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action {
        color: #fff;
        background-color: #14b9d6;
        border-color: #14b9d6
    }

    .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:focus {
        color: #fff;
        background-color: #1091a7;
        border-color: #095461
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.active, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:active, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:hover {
        color: #fff;
        background-color: #1091a7;
        border-color: #0f899e
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.focus, .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:focus, .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:hover, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.active.focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.active:focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.active:hover, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:active.focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:active:focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:active:hover {
        color: #fff;
        background-color: #0d7487;
        border-color: #095461
    }

    .open > .dropdown-toggle.pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.active, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:active {
        background-image: none
    }

    .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.disabled.focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.disabled:focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.disabled:hover, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action[disabled].focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action[disabled]:focus, .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action[disabled]:hover, fieldset[disabled] .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action.focus, fieldset[disabled] .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:focus, fieldset[disabled] .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action:hover {
        background-color: #14b9d6;
        border-color: #14b9d6
    }

    .pricing-plans .plan-holder:nth-child(3) .plan-action .btn-plan-action .badge {
        color: #14b9d6;
        background-color: #fff
    }

    .pricing {
        margin: 60px auto
    }

    .pricing-plans-background .plan-deployment {
        display: flex;
        justify-content: space-between
    }

    .pricing-plans-background .plan-deployment > * {
        height: 52px
    }

    .pricing-plans-background .pricing-plans {
        margin: 0
    }

    .pricing-plans-background .pricing-plans .plan-deployment {
        width: 290px;
        margin: 10px auto;
        margin-top: 0 !important;
        margin-bottom: 0 !important
    }

    @media (min-width: 769px) {
        .pricing-plans-background .pricing-plans .plan-deployment {
            width: 324px;
            margin: 10px 0
        }
    }

    .pricing-plans-background .pricing-plans .plan-holder {
        border: 0;
        margin-top: 0;
        margin-bottom: 20px
    }


</style>