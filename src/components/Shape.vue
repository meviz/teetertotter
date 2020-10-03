<template>
    <div class="shape" :class="shapeType">
        <div class="shape-text">{{shape.weight}}kg</div>
    </div>
</template>

<script>
    export default {
        computed: {
            shapeType() {
                const { type } = this.shape;

                switch(type){
                    case "square":{return "shape-square";}
                    case "circle":{return "shape-circle";}
                    case "triangle":{return "shape-triangle";}
                }
            }
        },
        mounted() {
            this.setShapeAppearance();

            this.$watch('shape.left', this.setShapePosition, { immediate: true });
        },

        methods: {
            setShapeAppearance() {
                const { style } = this.$el;
                const { color, scale, type, left, top, } = this.shape;

                if (type === "triangle") {
                    style.borderBottomColor = color;
                }
                else {
                    style.backgroundColor = color;
                }

                if(!this.isRightSide){
                    style.left = "calc("+ left + "% - " + 60 +"px)";
                }else{
                    style.left = "calc("+ (50 + left) + "% - " + 60 +"px)";
                }
                
                if(!this.isOnTable){
                    style.top = top + 'px';
                    style.transform = "scale(" + scale + ")";
                }else{
                    style.transform = "scale(" + scale + ") translateY(-100%)";
                }
            },

            setShapePosition(left) {
                console.log(this.isRightSide);
                 if(!this.isRightSide){
                    this.$el.style.left = left + "%";
                }else{
                    this.$el.style.left = (50 + left) + "%";
                }
            }
        },
        props : {
            shape: {
                type:Object,
                required:true
            },
            isOnTable:{
                type: Boolean,
            },
            isRightSide:{
                type: Boolean,
            }
        },
    };
</script>

<style lang="scss" scoped>

    .shape {position:absolute; display:flex; align-items:center; justify-content:center; transform-origin:top;
        .shape-text{font-size:8px; color:#ffffff; text-align:center; font-weight:bold;}
        &.shape-square{width:20px; height:20px;}
        &.shape-circle{width:20px; height:20px; border-radius:50%;}
        &.shape-triangle{width:0; height:0; border-left:20px solid transparent; border-right:20px solid transparent; border-bottom:30px solid;
            .shape-text{transform: translateY(100%); margin-top:20px;}
        }
    }

</style>
