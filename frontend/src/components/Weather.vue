<template>
    <div id="weather-container">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12">
                    <form @submit.prevent="onSubmit">
                        <div class="input-group">
                            <input type="text" name="search" v-model="search" class="form-control search" placeholder="Podaj miejscowość lub pozostaw puste aby wykryć automatycznie" />
                            <div class="input-group-append">
                                <button type="sumbit" class="btn btn-weather">Wyszukaj</button>
                            </div>
                        </div>
                    </form>
                    <div v-if="loading">
                        <Loader class="text-center mt-5" color="#00000086" size="40" sizeUnit="px" />
                    </div>
                    <div class="mt-2 mb-3 row" v-else-if="(body !== 'none') && (body.success == true)">
                        <CityInfo class="col-lg-3" :data="body" />
                        <div class="col-lg-9">
                            <WeatherDay v-for="day in body.weather" :key="day.dt" :day="day" />
                            <p class="text-right mt-1 img-author">Zdjęcie autorstwa {{background.author}} z <a href="https://pexels.com">Pexels.com</a>.</p>
                        </div>
                    </div>
                    <div v-else-if="body.error">
                        <div class="alert alert-danger alert-dismissible alert-weather mt-4">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            {{errors[body.error]}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CityInfo from './Weather/CityInfo.vue'
import WeatherDay from './Weather/WeatherDay.vue'

import axios from 'axios'
import moment from 'moment'
import {BeatLoader} from '@saeris/vue-spinners'

import getBackground from '../utils/getBackground.js'
import weatherFormat from '../utils/weatherFormat.js'

import '../css/weather.css'

export default {
    name: 'Weather',
    components: {
        'Loader': BeatLoader,
        WeatherDay,
        CityInfo
    },
    methods: {
        onSubmit: async function () {
            this.loading = true;
            if(this.search) {
                try {
                    const response = await axios.get(`/api/weather/city?q=${this.search}`);
                    this.background = (response.data.success ? getBackground(response.data.data.list[0].weather[0].id) : getBackground());
                    this.body = (response.data.success ? weatherFormat(response.data) : {success: false, error: "NOT_FOUND"});
                    this.$el.style.backgroundImage = `url(${this.background.src})`;
                    this.loading = false;
                    if(response.data.success == true) {
                        this.$cookie.set('place', response.data.data.city.name, 180);
                    }
                } catch(err) {
                    this.body = {success: false, error: "OTHER"}
                }
            } else {
                try {
                    const error = () => {
                        this.loading = false;
                        this.body = {success: false, error: "ACCESS_DENIED"}
                    }
                    navigator.geolocation.getCurrentPosition(async loc => {
                        const response = await axios.get(`/api/weather/location?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`);
                        this.background = (response.data.success ? getBackground(response.data.data.list[0].weather[0].id) : getBackground());
                        this.body = (response.data.success ? weatherFormat(response.data) : {success: false, error: "NOT_FOUND_LOC"});
                        this.$el.style.backgroundImage = `url(${this.background.src})`;
                        this.loading = false;
                        if(response.data.success == true) {
                            this.$cookie.set('place', response.data.data.city.name, 180);
                        }
                    }, error, {timeout: 5000})
                } catch(err) {
                    this.loading = false;
                    this.body = {success: false, error: "OTHER"}
                }
            }
        }
    },
    async created() {
        const place = this.$cookie.get('place');
        if(place) {
            this.loading = true;
            try {
                const response = await axios.get(`/api/weather/city?q=${place}`);
                this.background = (response.data.success ? getBackground(response.data.data.list[0].weather[0].id) : getBackground());
                this.body = (response.data.success ? weatherFormat(response.data) : {success: false, error: "NOT_FOUND"});
                this.$el.style.backgroundImage = `url(${this.background.src})`;
                this.loading = false;
            } catch(err) {
                this.body = {success: false, error: "OTHER"}
            }
        }
    },
    data() {
        return {
            moment,
            loading: false,
            search: this.search,
            background: "",
            body: "none",
            errors: {
                OTHER: "Wystąpił nieznany błąd.",
                NOT_FOUND: "Nie odnaleziono podanej miejscowości.",
                NOT_FOUND_LOC: "Nie odnaleziono pogody dla twojej lokalizacji.",
                ACCESS_DENIED: "Nie udzielono pozwolenia na użycie lokalizacji lub twoja przeglądarka nie obsługuje tej funkcji."
            }
        };
    }
}

</script>