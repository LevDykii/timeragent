<template>
	<div>
		<div class="tab-content"> 
			<div> 
				<button type="button" class="btn btn-default" @click="showModal = true"> Add members to project team </button> 
			</div>
		</div>

		<div class="modal" v-if="showModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<form> 
						<div class="modal-header"> 
							<button type="button" class="close" @click="showModal = false"> 
								<span>×</span>
							</button> <h4 class="modal-title ng-binding">Add Project Members</h4> 
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-sm-12">
									<input type="text" class="form-control" placeholder="Find user...">
								</div>
							</div>
						</div> 
						<div class="modal-footer">
							<button type="submit" class="btn btn-primary">Add</button>
							<button type="submit" class="btn btn-default" @click="showModal = false	">Cancel</button>
						</div>
					</form>
				</div>
			</div>
			<div class="modal-backdrop" ></div>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                showModal: false,
            };
        },
    };
</script>

<style>
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
</style>