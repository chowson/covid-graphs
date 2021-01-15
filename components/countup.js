import React, { useEffect} from 'react';
import { CountUp } from '../node_modules/countup.js/dist/countUp.js';

function CountUpComponent({ number }) {
    if(number) {
        const ref = React.createRef();

        useEffect(() => {
            var countUp = new CountUp(ref.current, number);
            countUp.start();
        })

        return <span ref={ref}></span>
    }
}

export default CountUpComponent;