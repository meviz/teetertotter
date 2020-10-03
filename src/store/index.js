import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from "../helpers"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fallEndShapes: [],
    fallStartShapes: [],
    rightShapes: [],

    isOnTable: false,
    isOnTableRight: false,

    fallingSpeed:100,

    tableAngle:20,
    leftTotalWeight:0,
    rightTotalWeight:0,

    isPaused: true,
    isResultShow: false,
    isOptionShow: false,

    fallingIntervalGap: null
  },
  mutations: {
    clearShapes(state) {
      state.fallEndShapes= []
      state.fallStartShapes= []
      state.rightShapes= []
      state.leftTotalWeight = 0;
    },

    addFallEndShape(state, shape = {}) {
      state.fallEndShapes.push(shape);
    },

    removeFallStartShape(state){
      state.fallStartShapes.pop();
    },

    addFallStartShape(state, shape){
      state.fallStartShapes.push(shape);
    },

    calculateLeftTable(state,shapePos){
      state.leftTotalWeight += state.fallEndShapes[state.fallEndShapes.length-1].weight * shapePos
      console.log(state.leftTotalWeight,state.fallEndShapes[state.fallEndShapes.length-1].weight,shapePos);
    },



    createShape({rightShapes, fallStartShapes}, isOnTableRight = false) {
        let id,weight,type,left,top,color,scale,shape;
        
        id=Helpers.createUniqueId();
        weight=Helpers.getRandomNumber(Helpers.minWeight, Helpers.maxWeight - 1);
        type=Helpers.shapeType[Helpers.getRandomNumber(0, 2)];
        left=Helpers.getRandomNumber(0, 40);
        color=Helpers.getRandomColor();
        top=0;
        scale= 1 + parseFloat((weight / Helpers.maxWeight).toFixed(1));

        shape = { id, color, left, scale, top, type, weight };

        if(isOnTableRight){
          rightShapes.push(shape);
        }else{
          fallStartShapes.push(shape);
        }
    },
  },
  actions: {
    createArea({ commit, state }) {
      commit('clearShapes');
      commit('createShape');
      commit('createShape');
      commit('createShape', true);
    }
  },
})
