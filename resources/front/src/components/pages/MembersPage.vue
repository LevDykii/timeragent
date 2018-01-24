<template>
    <div>
        <nav-menu-auth></nav-menu-auth>
        <div class="container">
                <span class="page-title"> Members </span> 
            <div class="row">
                <div class="col-md-12"> 
                    <div class="panel panel-default"> 
                        <div class="panel-heading flex-container-space-between">  
                            <div class="actions pull-left">  
                                <button class="btn btn-primary" @click="showModal = true"><span class="fa fa-plus"></span> Invite Members</button>  
                            </div>  
                            <div class="table-container"> 
                                <div class="text-muted table-cell ng-binding"></div>
                            </div> 
                        </div> 
                        <div class="panel-body form clear-padding">
                            <!-- <div class="well text-center" > No projects have been added yet. </div> -->
                        </div> 
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" v-if="showModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form> 
                        <div class="modal-header"> 
                            <button type="button" class="close" @click="showModal = false"> 
                                <span>×</span>
                            </button> <h4 class="modal-title ng-binding">Invite Members to Account</h4> 
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <textarea class="form-control" rows="7" placeholder="Write emails one per line."></textarea>
                                </div>
                            </div>
                        </div> 
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Send Emails</button>
                            <button type="submit" class="btn btn-default" @click="showModal = false ">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-backdrop" ></div>
        </div>
    </div>
</template>

<script>
    import NavMenuAuth from '../blocks/NavMenuAuth';

    export default {
        data() {
            return {
                showModal: false,
            };
        },
        components: {
            NavMenuAuth,
        },
    };
</script>
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
        box-shadow: none;
        border-bottom: 2px solid #178fe5;
        outline: 0;
        padding: 6px 0 5px;
    }
    .modal-footer {
        padding: 25px;
        text-align: left;
        border-top: 1px solid #e0e0e0;

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
    }
</style>