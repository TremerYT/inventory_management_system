import { Card } from 'antd';
import Chart from 'react-apexcharts';

const options = {
  chart: {
    type: 'line',
    toolbar: { show: true },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

const series = [
  {
    name: 'Profit',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
  },
  {
    name: 'Loss',
    data: [350, 450, 300, 550, 200, 400, 150, 300, 600, 250, 200, 150],
  },
];

const ProfitVsLoss = () => {
  return (
    <Card style={{ height: '100%' }}>
      <Chart options={options} series={series} type="line" height={450} />
    </Card>
  );
};

export default ProfitVsLoss;
