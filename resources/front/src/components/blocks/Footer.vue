<template>
    <div>
        <footer id="footer">
            <div class="container">

                <div class="row">

                    <div class="col-lg-2 col-md-12 visible-sm-block visible-md-block visible-lg-block no-col-gutter-inside">
                        <div class="footer-column footer-logo">
                            <div class="footer-column-head">
                                <div class="footer-column-content">
                                    <a href="/">
                                        <img src="/images/Logo_Mono.png">
                                    </a>
                                </div>
                            </div>
                            <div class="footer-column-divider invisible">
                                <div class="footer-column-content"></div>
                            </div>
                            <div class="footer-column-body">
                                <div class="footer-column-content">
                                    <span class="copyright small">Copyright &copy; DigitalIDEA Studio 2017</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-10 col-md-12 no-col-gutter-inside">

                        <div class="col-lg-3 col-md-3 col-sm-6">
                            <div class="footer-column">
                                <div class="footer-column-head">
                                    <div class="footer-column-content">Resources</div>
                                </div>
                                <div class="footer-column-divider">
                                    <div class="footer-column-content"></div>
                                </div>
                                <div class="footer-column-body">
                                    <div class="footer-column-content">
                                        <div class="">
                                            <a href="/help/">Documentation</a>
                                        </div>
                                        <div class="">
                                            <a href="/integrations/">Integrations</a>
                                        </div>
                                        <div class="">
                                            <a href="https://support.timeragent.com">Support</a>
                                        </div>
                                        <div class="">
                                            <a href="/blog/">Blog</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="clearfix visible-xs-block"></div>

                        <div class="col-lg-3 col-md-3 col-sm-6">
                            <div class="footer-column">
                                <div class="footer-column-head">
                                    <div class="footer-column-content">Add-ons</div>
                                </div>
                                <div class="footer-column-divider">
                                    <div class="footer-column-content"></div>
                                </div>
                                <div class="footer-column-body">
                                    <div class="footer-column-content">
                                        <div>
                                            <a href="https://chrome.google.com/webstore/detail/timeragent-extension/ffijoclmniipjbhecddgkfpdafpbdnen">
                                                <span class="icon icon-chrome"></span>
                                                <span>Chrome</span>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://addons.mozilla.org/en-US/firefox/addon/timeragent-extension/">
                                                <span class="icon icon-firefox"></span>
                                                <span>Firefox</span>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://addons.opera.com/en/extensions/details/timeragent-extension/">
                                                <span class="icon icon-opera"></span>
                                                <span>Opera</span>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/help/desktop-app/download-timeragent-desktop/">
                                                <span class="icon icon-windows"></span>
                                                <span>Desktop App</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="clearfix visible-sm-block visible-xs-block"></div>

                        <div class="col-lg-3 col-md-3 col-sm-6">
                            <div class="footer-column">
                                <div class="footer-column-head">
                                    <div class="footer-column-content">About</div>
                                </div>
                                <div class="footer-column-divider">
                                    <div class="footer-column-content"></div>
                                </div>
                                <div class="footer-column-body">
                                    <div class="footer-column-content">
                                        <div class="">
                                            <a href="/about/">About TimerAgent</a>
                                        </div>
                                        <div class="">
                                            <a href="/terms-of-service/">Terms of Service</a>
                                        </div>
                                        <div class="">
                                            <a href="/privacy-policy/">Privacy Policy</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="clearfix visible-xs-block"></div>

                        <div class="col-lg-3 col-md-3 col-sm-6">
                            <div class="footer-column footer-social">
                                <div class="footer-column-head">
                                    <div class="footer-column-content">Social</div>
                                </div>
                                <div class="footer-column-divider">
                                    <div class="footer-column-content"></div>
                                </div>
                                <div class="footer-column-body">
                                    <div class="footer-column-content">
                                        <div>
                                            <a href="https://twitter.com/TimerAgent_Timer">
                                                <span class="icon icon-twitter-mono"></span>
                                                <span>Twitter</span>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://www.facebook.com/timeragenttimer/">
                                                <span class="icon icon-facebook-mono"></span>
                                                <span>Facebook</span>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://www.linkedin.com/company/timeragent">
                                                <span class="icon icon-linkedin-mono"></span>
                                                <span>Linkedin</span>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://plus.google.com/u/0/b/117246355283932430376/117246355283932430376/posts">
                                                <span class="icon icon-googleplus-mono"></span>
                                                <span>Google+</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-12 hidden-sm hidden-md hidden-lg no-col-gutter-inside">
                        <div class="footer-column footer-logo">
                            <div class="footer-column-body text-center">
                                <div class="footer-column-content">
                                    <span class="copyright small">Copyright &copy; Devart 2016</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'bottom',
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    #footer {
        color: #fff;
        font-size: .85rem;
        background-color: #676f7a;
        padding-top: 1.28571429rem;
        padding-bottom: 1.28571429rem
    }

    #footer a {
        color: rgba(255, 255, 255, .7)
    }

    #footer a:focus, #footer a:hover {
        color: #fff;
        background-color: transparent !important;
        text-decoration: none
    }

    #footer .fa {
        margin-top: -.325rem;
        font-size: 1.5rem;
        margin-right: 1.71428571rem
    }

    #footer .footer-column .footer-column-content {
        margin: 18px 36px;
        padding-left: 10px
    }

    #footer .footer-column .footer-column-head {
        font-weight: 700;
        color: #fff
    }

    #footer .footer-column .footer-column-divider {
        height: 2px;
        margin: 0;
        border: 0;
        padding: 0;
        background-color: #858c95
    }

    #footer .footer-column .footer-column-divider .footer-column-content {
        height: 2px;
        margin-top: 0;
        margin-bottom: 0;
        background-color: #f7f7f7
    }

    #footer .footer-column .footer-column-body {
        color: #fff;
        opacity: .7
    }

    #footer .footer-column .footer-column-body .footer-column-content {
        margin-bottom: 24px
    }

    #footer .footer-column .footer-column-body .footer-column-content .icon {
        display: inline-block;
        margin-right: 18px
    }

    #footer .footer-column .footer-column-body .footer-column-content .icon, #footer .footer-column .footer-column-body .footer-column-content .icon ~ span {
        line-height: 1;
        vertical-align: middle
    }

    @media (max-width: 768px) {
        #footer .footer-column .footer-column-content {
            line-height: 32px
        }

        #footer .footer-column .footer-column-head {
            font-size: 1rem
        }

        #footer .footer-column .footer-column-head .footer-column-content {
            margin-top: 0;
            margin-bottom: 0
        }

        #footer .footer-column .footer-column-body {
            font-size: .85rem
        }

        #footer .footer-column .footer-column-body .footer-column-content .icon {
            margin-right: 1rem;
            transform: scale(.8)
        }

        #footer .footer-column.footer-social .footer-column-content > div {
            display: inline-block
        }

        #footer .footer-column.footer-social .footer-column-content > div > a > .icon ~ span {
            display: none
        }

        #footer .footer-column.footer-logo .footer-column-content {
            margin: 0 36px;
            padding-left: 10px
        }
    }

    @media (min-width: 769px) {
        #footer .footer-column .footer-column-content {
            line-height: 40px
        }

        #footer .footer-column .footer-column-head {
            margin-top: 60px;
            font-size: 17px
        }

        #footer .footer-column .footer-column-body {
            font-size: 15px
        }

        #footer .footer-column.footer-logo .footer-column-content {
            margin-left: 0;
            margin-right: 0;
            padding: 0
        }

        #footer .footer-column.footer-logo .footer-column-content img {
            vertical-align: top
        }
    }

    .icon-facebook, .icon-googleplus, .icon-linkedin, .icon-mail, .icon-twitter, .icon-vk {
        display: inline-block;
        width: 38px;
        height: 38px;
        background-image: url(/images/Social.png);
        background-size: auto 100%
    }

    .icon-facebook {
        background-position-x: 0
    }

    .icon-googleplus {
        background-position-x: -48px
    }

    .icon-linkedin {
        background-position-x: -96px
    }

    .icon-mail {
        background-position-x: -144px
    }

    .icon-twitter {
        background-position-x: -192px
    }

    .icon-vk {
        background-position-x: -240px
    }

    .icon-facebook-mono, .icon-googleplus-mono, .icon-linkedin-mono, .icon-twitter-mono {
        display: inline-block;
        width: 34px;
        height: 34px;
        background-image: url(/images/Social_Mono.png)
    }

    .icon-facebook-mono {
        background-position-x: 0;
        background-size: auto 100%
    }

    .icon-googleplus-mono {
        background-position-x: -44px;
        background-size: auto 100%
    }

    .icon-linkedin-mono {
        background-position-x: -88px;
        background-size: auto 100%
    }

    .icon-twitter-mono {
        background-position-x: -132px;
        background-size: auto 100%
    }

    .icon-chrome, .icon-firefox, .icon-opera, .icon-windows {
        display: inline-block;
        width: 34px;
        height: 34px;
        background-image: url(/images/Ext.png);
        background-size: auto 100%
    }

    .icon-chrome {
        background-position-x: 0
    }

    .icon-firefox {
        background-position-x: -44px
    }

    .icon-opera {
        background-position-x: -88px
    }

    .icon-windows {
        background-position-x: -132px
    }
</style>
