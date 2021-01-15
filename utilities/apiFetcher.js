import axios from 'axios';
import swr from 'swr';

function GetData(url, areas) {
    const f = (area) => {
        return axios.get(url(area.Name)).then(res => {
            return {
                area: area,
                data: res.data
            };
        });
    }
    
    if (areas.length > 1) {
        return Promise.all(areas.map(f));
    }

    return f(areas);
}

export const GetDailyCases = (areas) => {
    const getUrl = (areaName) => `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${areaName}&latestBy=newCasesByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22newCasesByPublishDate%22%7D`;

    return GetData(getUrl, areas);
}

export const GetCases = (areas) => {
    const getUrl = (areaName) => `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCases":"newCasesBySpecimenDate"}`;

    return GetData(getUrl, areas);
}

const fetcher = url => axios.get(url).then(res => res.data);

export const GetVaccinesData = () => {
    return swr('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B"date":"date","areaName":"areaName","newPeopleVaccinatedFirstDoseByPublishDate":"newPeopleVaccinatedFirstDoseByPublishDate","cumPeopleVaccinatedFirstDoseByPublishDate":"cumPeopleVaccinatedFirstDoseByPublishDate","newPeopleVaccinatedSecondDoseByPublishDate":"newPeopleVaccinatedSecondDoseByPublishDate","cumPeopleVaccinatedSecondDoseByPublishDate":"cumPeopleVaccinatedSecondDoseByPublishDate"%7D', fetcher);
}