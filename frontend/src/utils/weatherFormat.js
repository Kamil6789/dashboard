const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

const weatherFormat = (body) => {
    let result;
    if(body.success == true) {
        let weather = {};
        weather['list'] = [];
        for(const i in days) {
            let day = [];
            body.data.list.filter(item => days[i] == days[new Date(item.dt * 1000).getDay()]).forEach(item => {
                day.push(item);
            });
            if((days[new Date().getDay()] == days[i]) || (day.length == 8)) {
                weather['list'][i] = day;
                weather['list'][i].day = days[i]
            }
        }
        result = {
            success: true,
            weather: weather.list,
            city: body.data.city
        }
    } else {
        result = body;
    }
    return result;
}

export default weatherFormat;