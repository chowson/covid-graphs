import React, { useEffect} from 'react';
import useSWR from 'swr'
import axios from 'axios';
import CountUpComponent from '../components/countup';

const fetcher = url => {
    return axios.get(url).then(res => res.data);
}

function VaccinesToday() {

    const firstDose = useSWR("https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=United%2520Kingdom;areaType=overview&latestBy=cumPeopleVaccinatedFirstDoseByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22%7D", fetcher);
    const secondDose = useSWR("https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=United%2520Kingdom;areaType=overview&latestBy=cumPeopleVaccinatedSecondDoseByPublishDate&structure=%7B%22date%22:%22date%22,%22value%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D", fetcher);

    const getDate = (dateString) => {
        return `${new Date(dateString).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }

    return (
        <div className="flex justify-center">
            <div className="text-center">
                <h2 className="font-bold text-2xl">Daily UK Vaccines</h2>
                {firstDose && firstDose.data && <span className="text-gray-600">{getDate(firstDose.data.data[0].date)}</span>}
                <ul className="flex mt-4">
                    {firstDose && firstDose.data && 
                        <li className="bg-gray-300 p-4 rounded-xl shadow-lg text-left mr-4">
                            <span className="font-bold text-sm">First Dose</span><br />
                            <span className="text-2xl"><CountUpComponent number={firstDose.data.data[0].value} /></span>
                        </li> }
                    {secondDose && secondDose.data && 
                        <li className="bg-gray-300 p-4 rounded-xl shadow-lg text-left mr-4">
                            <span className="font-bold text-sm">Second Dose</span><br />
                            <span className="text-2xl"><CountUpComponent number={secondDose.data.data[0].value} /></span>
                        </li> }
                </ul>
            </div>
        </div>
    );
}

export default VaccinesToday;