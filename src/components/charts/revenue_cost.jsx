import { Card } from 'antd';
import Chart from 'react-apexcharts';

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
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yaxis: [
    {
      title: {
        text: 'Revenue',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Cost',
      },
    },
  ],
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

const series = [
  {
    name: 'Revenue',
    type: 'line',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
  },
  {
    name: 'Cost',
    type: 'column',
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
  },
];

const RevenueVsCost = () => {
  return (
    <Card title="Revenue vs Cost" className="h-full">
      <Chart options={options} series={series} type="line" height={545} />
    </Card>
  );
};

export default RevenueVsCost;
