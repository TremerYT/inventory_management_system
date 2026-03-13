import { Card } from 'antd';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const RevenueVsCost = () => {
  const [chartData] = useState({
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Revenue', data: [30000, 35000, 32000, 40000, 38000, 45000] },
      { name: 'Cost', data: [20000, 22000, 21000, 25000, 24000, 28000] },
    ],
  });

  const options = {
    chart: {
      type: 'line',
      stacked: true,
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: { enabled: false },
    xaxis: { categories: chartData.categories || [] },
    yaxis: [{ title: { text: 'Revenue' } }, { opposite: true, title: { text: 'Cost' } }],
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    colors: ['#3B82F6', '#F97316'],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <Card title="Revenue vs Cost" className="h-full">
      <Chart options={options} series={chartData.series || []} type="line" height={545} />
    </Card>
  );
};

export default RevenueVsCost;
