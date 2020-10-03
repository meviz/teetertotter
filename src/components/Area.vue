<template>
    <div class="game-area">
        <FallArea></FallArea>
	    <TeeterTotter></TeeterTotter>
    </div>
</template>

<script>
    import TeeterTotter from "./TeeterTotter";
    import FallArea from "./FallArea";
    import { mapActions } from 'vuex';

    export default {
		components: {
            FallArea,
			TeeterTotter
        },

        methods:{
            ...mapActions(['createArea'])
        },
        
        created() {
            this.createArea();
        },
	};
</script>

<style lang="scss">
	.game-area{width:1000px;  margin:0 auto;}
</style>