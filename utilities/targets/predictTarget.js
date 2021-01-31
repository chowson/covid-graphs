const predictTarget = (vaccineData, target) => {
    const last7Days = vaccineData.data.slice(vaccineData.data.length - 7);
    let last7DaysDosesRate = Math.floor((last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate - last7Days[0].cumPeopleVaccinatedFirstDoseByPublishDate) / 7);

    let progressAtCurrentRate = [ [ new Date(last7Days[6].date).getTime(), last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate ] ];
    let totalDoses = last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate;
    let predictedDate = new Date(last7Days[6].date);

    while(totalDoses < target.firstDoses) {
        totalDoses += last7DaysDosesRate;
        predictedDate.setDate(predictedDate.getDate() + 1);
        progressAtCurrentRate.push([predictedDate.getTime(), totalDoses]);
    }

    return progressAtCurrentRate;
};

export default predictTarget;