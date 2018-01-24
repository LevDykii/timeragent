<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    };
</script>

<style>
    @import '../node_modules/font-awesome/css/font-awesome.min.css';
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Lato');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');

    body {
        font-family : "Open Sans", Helvetica, Arial, sans-serif;
        font-size   : 14px;
        line-height : 1.42857143;
        color       : #676f7a;
    }

    .has-error {
        border-bottom : 2px solid #e02c48 !important;
        color         : #e02c48 !important;
        border-radius: 4px;
    }

    .has-error:focus {
        border-bottom : 2px solid #e02c48 !important;
    }

    .error-icon {
        position : relative;
        margin   : 5px;
        color    : #e02c48;
    }

    .error-icon:before {
        position  : relative;
        font-size : 20px;
        margin    : 5px;
        color     : #e02c48;
        display   : block;
    }

    .error-message {
        display: block;
        color: red;
        margin-top: 2px;
    }


    .error-icon:hover .errors {
        display : block;
    }

    a {
        cursor : pointer;
    }

    .el-table td:first-child .cell, .el-table th:first-child .cell {
        padding-left: 10px;
    }

    .el-collapse-item__header {
        padding: 0 10px;
    }

    .member-item {
        padding: 0;
    }

    .rate {
        float: right;
        margin-right: 10px;
    }
</style>