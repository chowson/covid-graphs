import React, { useEffect} from 'react';
import useSWR from 'swr'
import axios from 'axios';
import CountUpComponent from '../components/countup';
import { TotalAdultPopulation } from '../utilities/userAreas';

const fetcher = url => {
    return axios.get(url).then(res => res.data);
}

function VaccinesToday() {

    const totalDoses = useSWR("https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=United%2520Kingdom;areaType=overview&latestBy=cumPeopleVaccinatedFirstDoseByPublishDate&structure=%7B%22date%22:%22date%22,%22cumPeopleVaccinatedFirstDoseByPublishDate%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22cumPeopleVaccinatedSecondDoseByPublishDate%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22%7D", fetcher);

    const getDate = (dateString) => {
        return `${new Date(dateString).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }

    return (
        <div className="flex justify-center separator mt-4">
            <div className="text-center w-full flex flex-col lg:flex-row lg:items-center">
                <div className="lg:mr-16">
                    <h2 className="font-bold text-2xl">Daily UK Vaccines</h2>
                    {totalDoses && totalDoses.data && <span className="text-gray-600 text-xs">{getDate(totalDoses.data.data[0].date)}</span>}
                </div>
                <ul className="flex flex-col md:flex-row my-4 w-full justify-center lg:justify-start">
                    <li className="text-white bg-cyan-900 bg-opacity-90 p-4 rounded-3xl shadow-lg text-center lg:text-left mr-4 w-full md:w-auto items-center mb-4 md:mb-0">
                        <span className="font-bold text-sm">First Dose</span><br />
                        <span className="flex">
                            <span className="mr-2 bg-cyan-200 bg-opacity-20 rounded-2xl py-2 px-4 mt-2 flex flex-col w-1/2 items-center">
                                <span className="text-xs">Today</span>
                                <span className="text-2xl text-center" style={{width: '6ch'}}>
                                    {totalDoses && totalDoses.data
                                        ? (<CountUpComponent number={totalDoses.data.data[0].newPeopleVaccinatedFirstDoseByPublishDate} delay="0" />)
                                        : (<>0</>)
                                    }
                                </span>
                                <span>
                                    {totalDoses && totalDoses.data 
                                        ? (<CountUpComponent number={((totalDoses.data.data[0].newPeopleVaccinatedFirstDoseByPublishDate / TotalAdultPopulation()) * 100)} delay="2000" suffix="%" decimalPlaces={2} />)
                                        : (<>0</>)
                                    }
                                </span>
                            </span>
                            <span className="ml-2 bg-cyan-200 bg-opacity-20 rounded-2xl py-2 px-4 mt-2 flex flex-col w-1/2 items-center">
                                <span className="text-xs">Total</span>
                                <span className="text-2xl text-center" style={{width: '8ch'}}>
                                    {totalDoses && totalDoses.data
                                        ? (<CountUpComponent number={totalDoses.data.data[0].cumPeopleVaccinatedFirstDoseByPublishDate} delay="0" />)
                                        : (<>0</>)
                                    }
                                </span>
                                <span>
                                    {totalDoses && totalDoses.data 
                                        ? (<CountUpComponent number={((totalDoses.data.data[0].cumPeopleVaccinatedFirstDoseByPublishDate / TotalAdultPopulation()) * 100)} delay="2000" suffix="%" decimalPlaces={2} />)
                                        : (<>0</>)
                                    }
                                </span>
                            </span>
                        </span>
                    </li>
                    <li className="text-white bg-cyan-900 bg-opacity-90 p-4 rounded-3xl shadow-lg text-center lg:text-left w-full md:w-auto">
                        <span className="font-bold text-sm">Second Dose</span><br />
                        <span className="flex">
                            <span className="mr-2 bg-cyan-200 bg-opacity-20 rounded-2xl py-2 px-4 mt-2 flex flex-col w-1/2 items-center">
                                <span className="text-xs">Today</span>
                                <span className="text-2xl text-center" style={{width: '6ch'}}>
                                    {totalDoses && totalDoses.data
                                        ? (<CountUpComponent number={totalDoses.data.data[0].newPeopleVaccinatedSecondDoseByPublishDate} delay="0" />)
                                        : (<>0</>)
                                    }
                                </span>
                                <span>
                                    {totalDoses && totalDoses.data 
                                        ? (<CountUpComponent number={((totalDoses.data.data[0].newPeopleVaccinatedSecondDoseByPublishDate / TotalAdultPopulation()) * 100)} delay="2000" suffix="%" decimalPlaces={2} />)
                                        : (<>0</>)
                                    }
                                </span>                                
                            </span>
                            <span className="ml-2 bg-cyan-200 bg-opacity-20 rounded-2xl py-2 px-4 mt-2 flex flex-col w-1/2 items-center">
                                <span className="text-xs">Total</span>
                                <span className="text-2xl text-center" style={{width: '8ch'}}>
                                    {totalDoses && totalDoses.data
                                        ? (<CountUpComponent number={totalDoses.data.data[0].cumPeopleVaccinatedSecondDoseByPublishDate} delay="0" />)
                                        : (<>0</>)
                                    }
                                </span>
                                <span>
                                    {totalDoses && totalDoses.data 
                                        ? (<CountUpComponent number={((totalDoses.data.data[0].cumPeopleVaccinatedSecondDoseByPublishDate / TotalAdultPopulation()) * 100)} delay="2000" suffix="%" decimalPlaces={2} />)
                                        : (<>0</>)
                                    }
                                </span>
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default VaccinesToday;