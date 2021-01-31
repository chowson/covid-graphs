import React, { useEffect} from 'react';
import useSWR from 'swr'
import axios from 'axios';
import CountUpComponent from '../components/countup';
import { TotalPopulation } from '../utilities/userAreas';

const fetcher = url => {
    return axios.get(url).then(res => res.data);
}

function VaccinesToday() {

    const totalDoses = useSWR("https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=United%2520Kingdom;areaType=overview&latestBy=cumPeopleVaccinatedFirstDoseByPublishDate&structure=%7B%22date%22:%22date%22,%22cumPeopleVaccinatedFirstDoseByPublishDate%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22cumPeopleVaccinatedSecondDoseByPublishDate%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D", fetcher);

    const getDate = (dateString) => {
        return `${new Date(dateString).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }

    return (
        <div className="flex justify-center separator mt-4">
            <div className="text-center w-full flex flex-col md:flex-row items-center md:justify-start">
                <div className="md:mr-16">
                    <h2 className="font-bold text-2xl">Daily UK Vaccines</h2>
                    {totalDoses && totalDoses.data && <span className="text-gray-600 text-xs">{getDate(totalDoses.data.data[0].date)}</span>}
                </div>
                <ul className="flex my-4 w-full md:w-2/3">
                    <li className="text-white bg-cyan-900 bg-opacity-90 p-4 rounded-3xl shadow-lg text-center md:text-left mr-4 w-1/2 md:w-auto">
                        <span className="font-bold text-sm">First Dose</span><br />
                        <span className="flex flex-col md:flex-row items-center">
                            <span className="text-2xl" style={{width: '8ch'}}>
                                {totalDoses && totalDoses.data
                                    ? (<CountUpComponent number={totalDoses.data.data[0].cumPeopleVaccinatedFirstDoseByPublishDate} delay="0" />)
                                    : (<>0</>)
                                }
                            </span>
                            <span className="md:ml-6">
                                {totalDoses && totalDoses.data 
                                    ? (<CountUpComponent number={((totalDoses.data.data[0].cumPeopleVaccinatedFirstDoseByPublishDate / TotalPopulation()) * 100)} delay="2000" suffix="%" decimalPlaces={2} />)
                                    : (<>0</>)
                                }
                            </span>
                        </span>
                    </li>
                    <li className="text-white bg-cyan-900 bg-opacity-90 p-4 rounded-3xl shadow-lg text-center md:text-left w-1/2 md:w-auto">
                        <span className="font-bold text-sm">Second Dose</span><br />
                        <span className="flex flex-col md:flex-row items-center">
                            <span className="text-2xl">
                                {totalDoses && totalDoses.data
                                    ? (<CountUpComponent number={totalDoses.data.data[0].cumPeopleVaccinatedSecondDoseByPublishDate} delay="0" />)
                                    : (<>0</>)
                                }
                            </span>
                            <span className="md:ml-6">
                                {totalDoses && totalDoses.data
                                    ? (<CountUpComponent number={((totalDoses.data.data[0].cumPeopleVaccinatedSecondDoseByPublishDate / TotalPopulation()) * 100)} delay="2000" suffix="%" decimalPlaces={2} />)
                                    : (<>0</>)
                                }
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default VaccinesToday;