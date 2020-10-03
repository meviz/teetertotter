<template>
	<div class="teeter-totter-area">
		<div class="teeter-totter-table" id="teeter-totter-table" :style="'transform: rotateZ(' + rotateDeg + 'deg)'">
			<Shape v-for="shape in fallEndShapes"
                	:key="shape.id"
                	:shape="shape"
					:isOnTable="true"
					:id="'shape-'+shape.id"
					/>

			<Shape v-for="shape in rightShapes"
                	:key="shape.id"
                	:shape="shape" :isOnTable="true" 
					:isRightSide="true"
					:id="'shape-'+shape.id"/>
		</div>
		<div class="teeter-totter-leg"></div>
	</div>
</template>

<script>
	import Shape from "./Shape";
	import { mapState } from 'vuex';

	export default {
		components: { 
			Shape,
		},

		data(){
			return {
				rotateDeg:null,
			}
		},

		mounted(){
			this.rotateDeg = this.tableAngle;
		},

		computed:{
			...mapState(['rightShapes','fallEndShapes', 'tableAngle'])
		}
	};
</script>

<style lang="scss">
	.teeter-totter-area{position:relative; display:flex; flex-direction:column; align-items:center; 
		.teeter-totter-table{position:relative; width:100%; height:10px; background-color:lightcoral;}
		.teeter-totter-leg{width:0; height:0; border-left:50px solid transparent; border-right:50px solid transparent; border-bottom: 140px solid #9b9b9b;}
	}
</style>