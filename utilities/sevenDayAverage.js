import _ from 'lodash';

export default function sevenDayAverage(data) {
    data = _.sortBy(data, [0]);

    const last7DayAverages = []
    for(let i = data.length - 1; i > 6; i--) {
        
        const last7Days = data.slice(i - 7, i);
        
        const average = Math.ceil(_.sumBy(last7Days, (o) => o[1]) / 7);
        
        last7DayAverages.push([data[i][0], average]);
    }

    return _.reverse(last7DayAverages);
}