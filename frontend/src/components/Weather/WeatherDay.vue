<template>
    <div v-if="day.length === 8">
            <div class="weather-day rounded p-2 mt-3">
                <h6 class="text-center">{{day.day}}</h6>
                <div class="row">
                    <div class="col-xl col-lg-3 col-md-3 col-sm-3 col-6 text-center" v-for="item in day" :key="item.dt">
                        <img class="weather-icon" alt="" :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`">
                        <span class="time">{{moment.unix(item.dt).format('HH:mm')}}</span>
                        <span class="temp">{{item.main.temp.toFixed()}}°C</span>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'WeatherDay',
    props: {
        day: Array
    },
    data() {
        return {
            moment
        }
    }
}
</script>