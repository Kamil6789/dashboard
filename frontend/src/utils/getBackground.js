import general from '../images/default.jpg';
import clear from '../images/clear.jpg';
import clouds from '../images/clouds.jpg';
import drizzle from '../images/drizzle.jpg';
import rain from '../images/rain.jpg';
import snow from '../images/snow.jpg';
import thunderstorm from '../images/thunderstorm.jpg';

const backgrounds = [
    {
        url: thunderstorm,
        author: "Greg",
        scope: {
            min: 200,
            max: 232
        }
    },
    {
        url: drizzle,
        author: "veeterzy",
        scope: {
            min: 300,
            max: 321
        }
    },
    {
        url: rain,
        author: "Pedro Figueras",
        scope: {
            min: 500,
            max: 531
        }
    },
    {
        url: snow,
        author: "Nikolai Ulltang",
        scope: {
            min: 600,
            max: 622
        }
    },
    {
        url: clear,
        author: "Maria Orlova",
        scope: {
            min: 800,
            max: 800
        }
    },
    {
        url: clouds,
        author: "Josh Sorenson",
        scope: {
            min: 801,
            max: 804
        }
    }
]

const getBackground = (number) => {
    let result;
    for(const i in backgrounds) {
        if((number <= backgrounds[i].scope.max) && (number >= backgrounds[i].scope.min)) {
            result = {
                src: backgrounds[i].url,
                author: backgrounds[i].author
            };
            break;
        } else {
            result = {
                src: general,
                author: "Johannes Plenio"
            };
        }
    }
    return result;
}

export default getBackground;