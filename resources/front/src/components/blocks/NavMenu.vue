<template>
    <div>
        <template v-if="!authenticated">
            <div>
                <nav id="main-nav"
                     class="navbar navbar-inverse navbar-fixed-top home"
                     :class="{ 'minimized': scrolled }"
                >
                    <div class="container container-normal">

                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#main-navbar-collapse" aria-expanded="false"
                                    aria-controls="main-navbar-collapse">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <router-link to="/">
                                <!--<img src="../../assets/images/logo.png" alt="TimerAgent">-->
                            </router-link>
                        </div>

                        <div id="main-navbar-collapse" class="collapse navbar-collapse navbar-right">
                            <ul class="nav navbar-nav">
                                <li class="">
                                    <router-link to="features">Features</router-link>
                                </li>
                                <li class="">
                                    <router-link to="pricing">Pricing</router-link>
                                </li>
                                <li class="">
                                    <a href="https://support.timeragent.com">Support</a>
                                </li>
                                <li class="">
                                    <a href="/blog/">Blog</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a class="login" href="http://time-tracker-laravel.dev/redirect">Log In</a>
                                </li>
                                <li>
                                    <a class="signup" href="https://app.timeragent.com/register">Sign Up</a>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                scrolled     : false,
                authenticated: false,
                loginQuery   : '',
            };
        },
        methods: {
            handleScroll() {
                this.scrolled = window.scrollY > 100;
            },
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    header {
        display          : block;
        flex-grow        : 0;
        background-color : #464646;
        box-shadow       : 0 2px 3px 0 rgba(47, 47, 47, .25) !important;
    }

    .btn-common, .navbar-fixed-top .navbar-nav > li > a {
        font-family    : Montserrat;
        text-transform : uppercase;
    }

    .background-contain, .banner > .banner-image {
        background-attachment : scroll;
        background-position   : center center;
        background-repeat     : no-repeat
    }

    .navbar-inverse .navbar-nav > li > a {
        color : rgba(255, 255, 255, .7)
    }

    .navbar-default {
        background-color : #464646;
    }

    @media (min-width : 769px) {
        .container-narrow {
            width : 780px
        }
    }

    .navbar-fixed-top .container-normal {
        width     : auto;
        max-width : 1024px;
    }

    .navbar-fixed-top .navbar-nav > li > a {
        border     : 1px solid transparent;
        transition : .5s
    }

    @media (min-width : 769px) {
        .navbar-fixed-top {
            padding    : 1.71428571rem 0;
            transition : .4s
        }

        .navbar-fixed-top.home {
            background-color : transparent;
            border-color     : transparent
        }

        .navbar-fixed-top.minimized {
            background-color : #333;
            border-color     : #1a1a1a;
            padding          : .42857143rem 0
        }

        .navbar-fixed-top .navbar-nav > li > a.signup {
            border : 1px solid rgba(255, 255, 255, .7)
        }

        .navbar-fixed-top .navbar-nav > li > a.signup:focus, .navbar-fixed-top .navbar-nav > li > a.signup:hover {
            border-color : #fff
        }

        .navbar-fixed-top .navbar-nav > li.active > a {
            border-bottom : 1px solid
        }

        .navbar-fixed-top .navbar-nav > li.divider {
            border-left  : .85714286rem solid transparent;
            border-right : .85714286rem solid transparent
        }
    }
</style>
