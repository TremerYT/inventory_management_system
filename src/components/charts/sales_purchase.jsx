import { Card } from 'antd';
import Chart from 'react-apexcharts';

const options = {
  chart: {
    type: 'bar',
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 6,
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  yaxis: {
    labels: {
      formatter: (val) => val.toLocaleString(),
    },
  },
  tooltip: {
    y: {
      formatter: (val) => val.toLocaleString(),
    },
  },
};

const series = [
  {
    name: 'Purchases',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
  {
    name: 'Sales',
    data: [20, 30, 45, 60, 70, 80, 95, 110, 130],
  },
];

const SalesVsPurchase = () => {
  return (
    <Card title="Sales vs Purchase" style={{ marginBottom: 24, height: '100%' }}>
      <Chart type="bar" options={options} series={series} height={350} />
    </Card>
  );
};

export default SalesVsPurchase;
