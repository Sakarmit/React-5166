import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

function SummaryPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/api/energySources', {
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
                <PieChart
                    width={700}
                    height={400}
                    series={[
                        {
                            data: data.map((item, index) => {
                                return {id: index, label: item.source, value: item.value};
                            }),
                            valueFormatter: (val) => {
                                return `${val.value}%`;
                            },
                            borderColor: 'black',
                            innerRadius: '50%',
                            paddingAngle: 0.3,
                            highlightScope: { fade: 'global', highlight: 'item' },
                        }
                    ]}
                />
            )}
            <p>
                Summary Placeholder
            </p>
        </main>
    );
};

export default SummaryPage;