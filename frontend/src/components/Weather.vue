<template>
    <div id="weather-container">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12">
                    <h1 class="text-center">Weather</h1>
                    <form @submit.prevent="onSubmit">
                        <input type="text" name="search" v-model="search" class="form-control search" placeholder="Wpisz nazwę miejscowości" required />
                        <button type="sumbit" class="btn btn-primary">Wyszukaj</button>
                    </form>
                    <div v-if="loading">
                        <Loader class="loader mt-4" color="#ffffffca" size="260" sizeUnit="px" />
                    </div>
                    <div class="mt-4" v-else>
                        <div v-if="(data !== 'none')">
                            <p>1</p>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    </div>
</template>

<script>
import {RingLoader} from '@saeris/vue-spinners'

import '../css/weather.css'

export default {
    name: 'Weather',
    components: {
        'Loader': RingLoader
    },
    methods: {
        onSubmit: async function () {
            this.loading = true;
            try {
                this.loading = false;
                this.data = null;
            } catch(err) {
                this.data = null
            }
        }
    },
    data() {
        return {
            loading: false,
            search: this.search,
            data: "none"
        };
    }
}

</script>