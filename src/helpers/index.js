const helper = {

    shapeType:['square','circle','triangle'],
    minWeight:1,
    maxWeight:10,

    getRandomNumber(min = 0, max = 1) {
        return min + Math.round(Math.random() * max);
    },

    getRandomColor(){
        const minValue = 0;
        const maxValue = 200;
        
        const r = this.getRandomNumber(minValue, maxValue);
        const g = this.getRandomNumber(minValue, maxValue);
        const b = this.getRandomNumber(minValue, maxValue);

        const rgb = "rgb("+r+","+ g+","+b+")"; 

        return rgb;
    },

    createUniqueId(){
        return Math.random().toString(36).substr(2, 9);
    }
}

export default helper;