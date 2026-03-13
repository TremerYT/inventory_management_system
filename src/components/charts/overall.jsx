import { Card } from 'antd';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const Overall = () => {
  const [chartData] = useState({
    labels: ['Revenue', 'Cost', 'Profit', 'Expenses', 'Other'],
    series: [35, 25, 20, 15, 5],
  });

  const options = {
    chart: { type: 'pie' },
    labels: chartData.labels || [],
    dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%` },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: 'right' },
        },
      },
    ],
  };

  return (
    <Card title="Overall Report">
      <Chart options={options} series={chartData.series || []} type="pie" />
    </Card>
  );
};

export default Overall;
