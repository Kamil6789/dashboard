<template>
    <div id="weather-container">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12">
                    <form @submit.prevent="onSubmit">
                        <div class="input-group">
                            <input type="text" name="search" v-model="search" class="form-control search" placeholder="Podaj miejscowość lub pozostaw puste aby wykryć automatycznie" />
                            <div class="input-group-append">
                                <button type="sumbit" class="btn btn-primary">Wyszukaj</button>
                            </div>
                        </div>
                    </form>
                    <div v-if="loading">
                        <Loader class="text-center mt-5" color="#ffffffca" size="40" sizeUnit="px" />
                    </div>
                    <div class="mt-4" v-else>
                        <div v-if="(body !== 'none') && (body.success == true)">
                            {{body.data.city.name}}
                        </div>
                        <div v-else>
                            {{body.error}}
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {BeatLoader} from '@saeris/vue-spinners'

import '../css/weather.css'

export default {
    name: 'Weather',
    components: {
        'Loader': BeatLoader
    },
    methods: {
        onSubmit: async function () {
            this.loading = true;
            if(this.search) {
                try {
                    const response = await axios.get(`/api/weather/city?q=${this.search}`);
                    this.loading = false;
                    this.body = (response.data.success ? response.data : {success: false, error: "NOT_FOUND"});
                } catch(err) {
                    this.body = {success: false, error: "OTHER"}
                }
            } else {
                try {
                    const error = () => {
                        this.loading = false;
                        this.body = {success: false, error: "DENIED"}
                    }
                    navigator.geolocation.getCurrentPosition(async loc => {
                        const response = await axios.get(`/api/weather/location?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`);
                        this.loading = false;
                        this.body = (response.data.success ? response.data : {success: false, error: "NOT_FOUND"});
                    }, error, {timeout: 5000})
                } catch(err) {
                    this.loading = false;
                    this.body = {success: false, error: "OTHER"}
                }
            }
        }
    },
    data() {
        return {
            loading: false,
            search: this.search,
            body: "none"
        };
    }
}

</script>