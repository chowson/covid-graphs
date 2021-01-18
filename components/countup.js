import React, { useEffect} from 'react';
import { CountUp } from '../node_modules/countup.js/dist/countUp.js';

function CountUpComponent({ number, delay, suffix, decimalPlaces }) {
    if(number) {
        const ref = React.createRef();

        useEffect(() => {
            setTimeout(() => {
                const countUp = new CountUp(ref.current, number, { suffix: (suffix || ''), decimalPlaces: decimalPlaces || 0 });
                countUp.start();
            }, delay);
        })

        return <span ref={ref}>0{suffix}</span>
    }
}

export default CountUpComponent;