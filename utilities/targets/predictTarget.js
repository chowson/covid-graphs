import { ToUtc } from '../time';

const predictTarget = (vaccineData, startDate, startFirstDoses, targetFirstDoses) => {
    const last7Days = vaccineData.data.slice(vaccineData.data.length - 7);
    
    const last7DaysDosesRate = Math.ceil(_.sumBy(last7Days, 'newPeopleVaccinatedFirstDoseByPublishDate') / 7);

    let progressAtCurrentRate = [ [ new Date(last7Days[6].date).getTime(), last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate ] ];
    let totalDoses = last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate;
    let predictedDate = new Date(startDate);

    while(totalDoses < (startFirstDoses + targetFirstDoses)) {
        totalDoses += last7DaysDosesRate;
        predictedDate.setDate(predictedDate.getDate() + 1);
        progressAtCurrentRate.push([ToUtc(predictedDate), totalDoses]);
    }

    return progressAtCurrentRate;
};

export default predictTarget;