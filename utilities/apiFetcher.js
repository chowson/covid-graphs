import axios from 'axios';
import useSWR from 'swr';

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

    return Promise.all([f(areas[0])]);
}

const mulitpleFetcher = (url, areaName) => {
    return axios.get(url).then(res => {
        return {
            name: areaName,
            data: res.data
        }
    });
}

export const GetDailyCases = (areas) => {
    const getUrl = (areaName) => [
        `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${areaName}&latestBy=newCasesByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22newCasesByPublishDate%22%7D`,
        areaName
    ];

    const urls = areas.map(areaName => getUrl(areaName));
    
    return urls.map(url => useSWR(url, mulitpleFetcher));
}

export const GetCases = (areas) => {
    const getUrl = (areaName) => `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCases":"newCasesBySpecimenDate"}`;

    return GetData(getUrl, areas);
}

const fetcher = url => axios.get(url).then(res => res.data);

export const GetVaccinesData = () => {
    return useSWR('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B"date":"date","areaName":"areaName","newPeopleVaccinatedFirstDoseByPublishDate":"newPeopleVaccinatedFirstDoseByPublishDate","cumPeopleVaccinatedFirstDoseByPublishDate":"cumPeopleVaccinatedFirstDoseByPublishDate","weeklyPeopleVaccinatedFirstDoseByVaccinationDate":"weeklyPeopleVaccinatedFirstDoseByVaccinationDate","newPeopleVaccinatedSecondDoseByPublishDate":"newPeopleVaccinatedSecondDoseByPublishDate","cumPeopleVaccinatedSecondDoseByPublishDate":"cumPeopleVaccinatedSecondDoseByPublishDate","weeklyPeopleVaccinatedSecondDoseByVaccinationDate":"weeklyPeopleVaccinatedSecondDoseByVaccinationDate","newPeopleVaccinatedThirdDoseByPublishDate":"newPeopleVaccinatedThirdInjectionByPublishDate","cumPeopleVaccinatedThirdDoseByPublishDate":"cumPeopleVaccinatedThirdInjectionByPublishDate"%7D', fetcher);
}

export const GetVaccinesByDemogrpahicsData = (areas) => {
    const getUrl = (areaName) => `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","vaccinationsAgeDemographics":"vaccinationsAgeDemographics"}`;

    const urls = areas.map(areaName => getUrl(areaName));

    return urls.map(url => useSWR(url, mulitpleFetcher));
}

export const GetCasesByDemogrpahicsData = (areas) => {
    const getUrl = (areaName) => `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=${areaName}&structure={"date":"date","newCasesBySpecimenDateAgeDemographics":"newCasesBySpecimenDateAgeDemographics"}`;

    const urls = areas.map(areaName => getUrl(areaName));

    return urls.map(url => useSWR(url, mulitpleFetcher));
}

export const GetNationalCasesByDemogrpahicsData = () => {
    return useSWR('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=England&structure={"date":"date","newCasesBySpecimenDateAgeDemographics":"newCasesBySpecimenDateAgeDemographics"}', fetcher);
}