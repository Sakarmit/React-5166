import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

function ReportPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/api/energyUse', {
            headers: {
            'Authorization': `Bearer ${token}`
        }}).then(response => {
            setData(response.data);
        }).catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, []);

    return (
        <main>
            {data && (
                <BarChart
                    width={500}
                    height={500}
                    series={[
                        {
                            data: data.map(item => item.totalEnergyUse),
                            valueFormatter: (val) => {
                                return `${val} TWh`;
                            }
                        }
                    ]}
                    xAxis={[{data: data.map(item => item.year), label: 'World Electricity Demand (TWh)', scaleType: 'band' }]}
                    
                />
            )}
            <p>
                Report Placeholder
            </p>
        </main>
    );
};

export default ReportPage;