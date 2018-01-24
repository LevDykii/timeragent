<template>
    <div>
        <el-container direction="vertical">
        <nav-menu-auth></nav-menu-auth>
        <el-main>
            <el-row>
                <el-col :span="16" :offset="4">
                <div class="pull-right">
                    <!--<button type="button" class="btn btn-wide btn-default btn-lg" @click="$router.go(-1)"> Cancel </button> -->
                    <el-button type="plain"
                               @click="$router.go(-1)"
                    > Cancel </el-button>
                    <!--<button type="submit" class="btn btn-wide btn-primary btn-lg" title="Press Ctrl+Enter to save changes" @click="updateUser" :disabled="formInvalid"> Save </button>-->
                    <el-button type="success"
                               @click="updateUser"
                               :disabled="formInvalid"
                    > Save </el-button>
                </div>
                <span class="page-title"> My Profile </span>
            	<el-col :span="24">
            		<el-card>
                        <el-row>
                        <el-col :span="16" :offset="4">
                            <el-row>
                                <label>Name</label>
                                    <el-input :class="{ 'has-error': $v.user.name.$error }"
                                              placeholder="Enter your name"
                                              v-model="user.name"
                                              @input="$v.user.name.$touch()"
                                    ></el-input>
                                    <i class="fa fa-exclamation-circle error-icon" v-if="$v.user.name.$error">
                                        <div class="errors">
                                            <span class="error-message" v-if="!$v.user.name.required">Field is required</span>
                                        </div> 
                                    </i>
                            </el-row>
                            <el-row>
                                <label>Email</label>
                                    <el-input :class="{ 'has-error': $v.user.email.$error }"
                                              placeholder="Enter your email"
                                              v-model="user.email"
                                              @input="$v.user.email.$touch()"
                                    ></el-input>
                                    <i class="fa fa-exclamation-circle error-icon" v-if="$v.user.email.$error">
                                        <div class="errors">
                                            <span class="error-message" v-if="!$v.user.email.required">Field is required</span>
                                            <span class="error-message" v-if="!$v.user.email.email">Invalid email</span>
                                        </div>
                                    </i>
                            </el-row>
                            <el-row>
                                <label>Billable rate</label><br>
                                    <!--<el-input :class="{ 'has-error': $v.user.billable_rate.$error }"-->
                                              <!--placeholder="Enter your billable rate"-->
                                              <!--v-model="user.billable_rate"-->
                                              <!--@input="$v.user.billable_rate.$touch()"-->
                                    <!--&gt;</el-input>-->
                                    <el-input-number v-model="user.billable_rate" :min="0"></el-input-number>
                                    <!--<i class="fa fa-exclamation-circle error-icon" v-if="$v.user.billable_rate.$error">-->
                                        <!--<div class="errors">-->
                                            <!--<span class="error-message" v-if="!$v.user.billable_rate.required">Invalid data</span>-->
                                        <!--</div>-->
                                    <!--</i>-->
                                <el-radio-group v-model="user.billable_currency">
                                    <el-radio-button label="$" title="Dollar USA"></el-radio-button>
                                    <el-radio-button label="€" title="Euro"></el-radio-button>
                                    <el-radio-button label="₴" title="Hryvna"></el-radio-button>
                                    <el-radio-button label="£" title="Funt sterling"></el-radio-button>
                                </el-radio-group>
                            </el-row>
                            <el-row>
                                <label class="control-label">Cost rate</label><br>
                                    <!--<el-input :class="{ 'has-error': $v.user.cost_rate.$error }"-->
                                              <!--placeholder="Enter your billable rate"-->
                                              <!--v-model="user.cost_rate"-->
                                              <!--@input="$v.user.cost_rate.$touch()"-->
                                    <!--&gt;</el-input>-->
                                <el-input-number v-model="user.cost_rate" :min="0"></el-input-number>
                                    <!--<i class="fa fa-exclamation-circle error-icon" v-if="$v.user.cost_rate.$error">-->
                                        <!--<div class="errors">-->
                                            <!--<span class="error-message" v-if="!$v.user.cost_rate.numeric">Invalid data</span>-->
                                        <!--</div>-->
                                    <!--</i>-->
                                <el-radio-group v-model="user.cost_currency">
                                    <el-radio-button label="$" title="Dollar USA"></el-radio-button>
                                    <el-radio-button label="€" title="Euro"></el-radio-button>
                                    <el-radio-button label="₴" title="Hryvna"></el-radio-button>
                                    <el-radio-button label="£" title="Funt sterling"></el-radio-button>
                                </el-radio-group>
                            </el-row>
                        </el-col>
                        </el-row>
            		</el-card>
            	</el-col>
                </el-col>
            </el-row>
        </el-main>
        </el-container>
    </div>
</template>

<script>
    import { required, email, numeric } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';
    import NavMenuAuth from '../blocks/NavMenuAuth';
    import notification from './../../mixins/notification';

    export default {
        mixins: [notification],
        created() {
            this.$store.dispatch('getUser');
        },
        computed: {
            formInvalid() {
                return this.$v.$invalid;
            },
            ...mapGetters([
                'user',
            ]),
        },
        methods: {
            updateUser() {
                if (this.$v.$invalid) return;
                this.$store.dispatch('updateUser', { user: this.user })
                .then(() => {
                    this.showSuccess('Profile saved successful');
                    this.$router.go(-1);
                })
                .catch(() => {
                    this.showError();
                });
            },
        },
        components: {
            NavMenuAuth,
        },
        validations: {
            user: {
                name: {
                    required,
                },
                email: {
                    required,
                    email,
                },
//                billable_rate: {
//                    numeric,
//                },
//                cost_rate: {
//                    numeric,
//                },
            },
        },
    };
</script>
<style lang="scss" rel="stylesheet/css" scoped>

    .el-row {
        margin-top: 20px;
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

    .panel {
        display: flex;
        justify-content: center;
        padding: 20px;
    }
    .container-center {
        width: 50%;
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

    .form-control {
        width: 100%;
        height: 34px;
        padding: 6px 0;
        background-color: transparent;
        background-image: none;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;
        -webkit-box-shadow: none;
        transition: border-color ease-in-out .2s;
    }

    .form-control:focus {
        border-bottom: 2px solid #178fe5;
        outline: 0;
        padding: 6px 0 5px;
    }

    .actions {
        display: flex;
        align-items: center;
        text-align: left;
    }

    .margin-top-20 {
        margin-top: 20px !important;
    }

    .btn-primary {
        color: #fff;
        background-color: #545454;
        border-color: #545454;
    }

    .btn-primary:hover {
        color: #fff;
        background-color: #474747;
        border-color: #474747;
    }

    .btn-default {
        color: #525252;
        background-color: rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .07);
    }

    .btn-icon-default {
        display: inline-block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        border-radius: 17px !important;
        padding: 0 !important;
        color: #525252;
        background-color: transparent;
        border-color: transparent;
        font-size: 20px !important;
    }

    .nav-tabs {
        border: none;
        margin: 0;
        display: flex;
        justify-content: center;

        li.active {
            border-bottom: 2px solid #178fe5;
            a {
                color: #178fe5;
            }
        }

        a {
            margin: 0;
            border: 0!important;
            padding-left: 15px;
            padding-right: 15px;
            padding-bottom: 20px;
            background: 0 0!important;
            color: #525252;
            font-size: 18px;
            line-height: 1.1;
        }
    }

    .modal {
        display: block;
    }
    .modal-backdrop {
        opacity: .5;
    }
    .modal-dialog {
        z-index: 1050;
    }
    .modal-content {
        margin-top: 120px;
    }
    .modal-header {
        padding: 25px;
    }
    .modal-body {
        padding: 25px;
    }

    .form-control {
        width: 100%;
        height: 34px;
        padding: 6px 0;
        background-color: transparent;
        background-image: none;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;
        -webkit-box-shadow: none;
        transition: border-color ease-in-out .2s;
    }
    .modal-footer {
        padding: 25px;
        text-align: left;
        border-top: 1px solid #e0e0e0;
    }
    .list-group {
        margin-top: 10px;
    }
    .list-group-item {
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .fa-times {
        cursor: pointer;
    }
</style>