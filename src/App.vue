<template>
    <div id="app">
        <Navbar />
        <Weather />
        <Todo />
        <Footer />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Weather from './components/Weather.vue'
import Todo from './components/Todo.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'Dashboard',
    components: {
        Navbar,
        Weather,
        Todo,
        Footer
    }
}
</script>
