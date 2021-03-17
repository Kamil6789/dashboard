import WANING_GIBBOUS from '../images/moon/WANING_GIBBOUS.png'
import WAXING_CRESCENT from '../images/moon/WAXING_CRESCENT.png'
import FIRST_QUARTER from '../images/moon/FIRST_QUARTER.png'
import WAXING_GIBBOUS from '../images/moon/WAXING_GIBBOUS.png'
import FULL from '../images/moon/FULL.png'
import LAST_QUARTER from '../images/moon/LAST_QUARTER.png'
import WANING_CRESCENT from '../images/moon/WANING_CRESCENT.png'
import NEW from '../images/moon/NEW.png'

const images = {WANING_GIBBOUS, WAXING_CRESCENT, FIRST_QUARTER, WAXING_GIBBOUS, FULL, LAST_QUARTER, WANING_CRESCENT, NEW};

const getMoonIcon = (phase) => {
    return images[phase];
}

export default getMoonIcon;