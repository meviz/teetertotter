<template>
    <div class="fall-area">
        <Shape  v-for="shape in fallStartShapes"
                :key="shape.id"
                :shape="shape"
                :id="'shape-'+shape.id"
                />
    </div>
</template>

<script>
    import Shape from './Shape';
    import { mapMutations, mapState } from 'vuex'

    export default {
        components: {
            Shape,
        },

        computed:{
            ...mapState(['fallStartShapes','tableAngle','leftTotalWeight','rightShapes']),
        },

        mounted(){
            const self = this
            this.fallingAnimation();
            window.addEventListener("keyup",function(e){
                let el = document.getElementById("shape-"+  self.fallStartShapes[0].id );
                var elRect = el.getBoundingClientRect();
                var table = self.$el.getBoundingClientRect();

                if(e.keyCode === 37){
                    self.fallStartShapes[0].left >= 0 ? self.fallStartShapes[0].left-- : null;
                }else if(e.keyCode === 39){
                    elRect.right <= (table.right-550) ? self.fallStartShapes[0].left ++ : null
                }
            });
        },

        methods:{
            ...mapMutations(['addFallEndShape','createShape', 'calculateLeftTable']),
            fallingAnimation(){
                 this.interval = setInterval(() => {
                    let tableElm =document.getElementById("teeter-totter-table");
                    let shapeElm = document.getElementById("shape-" + this.fallStartShapes[0].id);
                    let shapeRect = shapeElm.getBoundingClientRect();
                    let tableRect = tableElm.getBoundingClientRect();

                    /*toplam yükseklik oranı ile şekil ile masanın top değerini çıkarıp o konumdaki yükselik bulundu. Sonra oranlama ile sonuca gidildi.*/
                    let triangleHeight = tableRect.bottom - tableRect.top - tableElm.clientHeight;
                    let shapeLeftForTable = shapeRect.left - tableRect.left;
                    let calc = (shapeLeftForTable / tableRect.width)*triangleHeight;

                    let sumHeight;

                    if(this.tableAngle>0){
                        sumHeight = tableRect.top + calc;
                    }else if (this.tableAngle< 0){
                        sumHeight = tableRect.bottom - calc;
                    }else{
                        sumHeight = tableRect.top;
                    }


                    /*momentum hesaplama*/

                    if (shapeRect.bottom >= sumHeight) {
                        let fallEndShape = this.fallStartShapes.shift();
                        
                        clearInterval(this.interval);
                        this.addFallEndShape(fallEndShape);
                        this.createShape();
                        this.createShape(true);
                        var distForLeg = ((tableRect.width/2) - shapeLeftForTable)
                        this.calculateLeftTable(distForLeg);
                        this.fallingAnimation();
                    }
                    else {
                        let el = document.getElementById("shape-"+  this.fallStartShapes[0].id );
                        this.fallStartShapes[0].top += 1;
                        el.style.top = this.fallStartShapes[0].top + "px";
                    }
                }, 10);
            },
        }
	};
</script>

<style lang="scss">
	.fall-area{width:100%; position:relative; margin:0 auto; height:500px;}
</style>