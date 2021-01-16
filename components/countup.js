import React, { useEffect} from 'react';
import { CountUp } from '../node_modules/countup.js/dist/countUp.js';

function CountUpComponent({ number, delay }) {
    if(number) {
        const ref = React.createRef();

        useEffect(() => {
            setTimeout(() => {
                const countUp = new CountUp(ref.current, number);
                countUp.start();
            }, delay);
        })

        return <span ref={ref}></span>
    }
}

export default CountUpComponent;