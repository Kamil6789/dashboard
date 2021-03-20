<template>
    <div class="weather-day rounded p-2 mt-3 text-center container">
        <div class="row">
            <div class="col-xl-12">
                <div class="text-center mb-2">
                    <h5 class="d-inline">{{data.city.name}}</h5>&nbsp;
                    <img class="flag rounded" alt="" :src="`https://www.countryflags.io/${data.city.country}/flat/32.png`">
                </div>
                <p class="info">Wschód słońca: <span class="badge badge-weather">{{moment.unix(data.city.sunrise).format('HH:mm')}}</span></p>
                <p class="info">Zachód słońca: <span class="badge badge-weather">{{moment.unix(data.city.sunset).format('HH:mm')}}</span></p>
                <hr>
            </div>
            <div class="col-xl-12">
                <h5>Pogoda na dzisiaj:</h5>
                <div v-for="item in data.weather[Object.keys(data.weather)[0]]" :key="item.dt">
                    <p class="info"><span class="badge badge-weather">{{moment.unix(item.dt).format('HH:mm')}}</span> {{item.main.temp.toFixed()}}°C | {{item.weather[0].description}}</p>
                </div>
                <hr>
            </div>
            <div class="col-xl-12 col-lg-12 col-md-6">
                <p class="info">Prędkość wiatru: <span class="badge badge-weather">{{data.weather[Object.keys(data.weather)[0]][0].wind.speed}} m/s</span></p>
                <p class="info">Zachmurzenia: <span class="badge badge-weather">{{data.weather[Object.keys(data.weather)[0]][0].clouds.all}}%</span></p>
                <p class="info">Wilgotność: <span class="badge badge-weather">{{data.weather[Object.keys(data.weather)[0]][0].main.humidity}}%</span></p>
                <p class="info">Ciśnienie: <span class="badge badge-weather">{{data.weather[Object.keys(data.weather)[0]][0].main.grnd_level}} hPa</span></p>
                <hr class="d-md-none d-lg-block"> <!-- Hide on md screens -->
            </div>
            <div class="col-xl-12 col-lg-12 col-md-6">
                <h5>Faza księżyca:</h5>
                <img alt="" :src="getMoonIcon(phase)">
                <p class="info">{{moon[phase]}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import mooncalc from 'mooncalc'

import getMoonIcon from '../../utils/getMoonIcon.js'

export default {
    name: 'CityInfo',
    props: {
        data: Object
    },
    data() {
        return {
            moment,
            getMoonIcon,
            phase: mooncalc.datasForDay(new Date()).phase.toUpperCase().split(" ").join("_"),
            moon: {
                WANING_GIBBOUS: "Garbaty zanikający",
                WAXING_CRESCENT: "Sierpowaty powiększający się",
                FIRST_QUARTER: "Pierwsza kwadra",
                WAXING_GIBBOUS: "Garbaty powiększający się",
                FULL: "Pełnia",
                LAST_QUARTER: "Ostatnia kwadra",
                WANING_CRESCENT: "Sierpowaty zmniejszający się",
                NEW: "Nów"
            }
        }
    }
}
</script>