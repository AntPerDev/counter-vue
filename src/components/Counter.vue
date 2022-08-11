<template lang="">
    <h2>Counter   
    </h2>
    <p>{{counter}} <sup>2</sup> = {{ squareCounter }} </p>

    <div>
        <button v-on:click="decrease">-1</button>
        <button v-on:click="increase">+1</button>
    </div>
</template>
<script>
export default {
    //name: 'Patito'
    data() {
        return {
            counter: 5
        }
    },
    methods: {
        getSquareValue() {
            return this.counter * this.counter
        },
        // increase
        increase() {
            this.counter++
        },
        // decrease
        decrease() {
            this.counter--
        }

    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        }
    }
}
</script>
<style>
button {
    background-color: #64BB87;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}


button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}
</style>5aa