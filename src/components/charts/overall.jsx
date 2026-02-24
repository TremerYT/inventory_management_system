import { Card } from 'antd';
import Chart from 'react-apexcharts';

const Overall = () => {
  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['Purchases', 'Sales', 'Expenses', 'Profits'],
    dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%` },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'right',
          },
        },
      },
    ],
  };
  const series = [400, 600, 300, 200];
  return (
    <Card title="Overall Report">
      <Chart options={options} series={series} type="pie" />
    </Card>
  );
};

export default Overall;
