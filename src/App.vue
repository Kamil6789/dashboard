<template>
    <div id="app">
        <Navbar />
        <Weather />
        <hr>
        <Todo />
        <hr>
        <Footer />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Weather from './components/Weather.vue'
import Todo from './components/Todo.vue'
import Footer from './components/Footer.vue'

import './css/general.css'

export default {
    name: 'App',
    components: {
        Navbar,
        Weather,
        Todo,
        Footer
    }
}
</script>
