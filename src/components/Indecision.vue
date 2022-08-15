<template>

    <h1>Indecision</h1>
    <img v-if="img" :src="img" alt="bg" />
    <div class="bg-dark"></div>
    <div class="indecision-container">
        <input type="text" placehoder="hazme una pregunta" v-model="question" />
        <p>Recuerda terminar con un signo de interrogacion(?)</p>

        <div v-if="isValidQuestion">
            <h2>{{ question }}</h2>
            <!-- <h1>{{ answer === 'Yes'? "Si!":"NO!" }}</h1> -->
            <h1>{{ answer }}</h1>
        </div>
    </div>
</template>
<script>
export default {

    data() {
        return {
            // question: 'Hola mundo'
            // question: this.question
            question: null,
            answer: null,
            img: null,
            isValidQuestion: false
        }
        // question
    },
    methods: {
        async getAnswer() {

            try {

                this.answer = 'Pensando...'

                const { answer, image } = await fetch('https://yesno.wtf/api').then(r => r.json())
                console.log(answer, image)


                this.answer = answer === 'yes' ? 'Si!' : 'No!'
                this.img = image

            } catch (error) {
                console.log('IndecisionComponent: ', error )
                this.answer = 'No se pudo cargar del API'
                this.img = null
            }

        }
    },
    watch: {
        question(value, oldValue) {

            this.isValidQuestion = false

            console.log({ value })

            if (!value.includes('?')) return

            // TODO Realizar la petición http
            this.getAnswer()
            this.isValidQuestion = true
        }
    }
}
</script>
<style scoped>
img,
.bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
}

.bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
    position: relative;
    z-index: 99;
}

input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
}

input:focus {
    outline: none;
}

p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
}

h1,
h2 {
    color: white;
}

h2 {
    margin-top: 150px;
}
</style>