import { Card } from 'antd';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const ProfitVsLoss = () => {
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Profit', data: [5000, 8000, 6500, 12000, 11000, 15000] },
      { name: 'Loss', data: [2000, 1500, 1800, 1000, 1200, 800] },
    ],
  });

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: true },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: { enabled: false },
    labels: chartData.labels || [],
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280' },
      },
    },
    grid: {
      borderColor: '#ffeaea',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3B82F6', '#F97316'],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <Card style={{ height: '100%' }}>
      <Chart options={options} series={chartData.series || []} type="line" height={450} />
    </Card>
  );
};

export default ProfitVsLoss;
