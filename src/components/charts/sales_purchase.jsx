import { Card } from 'antd';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const SalesVsPurchase = () => {
  const [chartData] = useState({
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Sales', data: [45000, 52000, 48000, 61000, 58000, 67000] },
      { name: 'Purchase', data: [35000, 38000, 36000, 42000, 40000, 45000] },
    ],
  });

  const options = {
    chart: { type: 'bar', toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        endingShape: 'rounded',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: chartData.categories || [] },
    yaxis: { labels: { formatter: (val) => val.toLocaleString() } },
    tooltip: { y: { formatter: (val) => val.toLocaleString() } },
  };

  return (
    <Card title="Sales vs Purchase" style={{ marginBottom: 24, height: '100%' }}>
      <Chart type="bar" options={options} series={chartData.series || []} height={350} />
    </Card>
  );
};

export default SalesVsPurchase;
