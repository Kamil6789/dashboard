<template>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark">
        <a class="navbar-brand font-weight-bold" href="/">Dashboard</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ml-auto">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#weather-container"> Sprawdź pogodę</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#todo-body"> Do zrobienia</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import '../css/components.css'

export default {
    name: 'Navbar'
}
</script>