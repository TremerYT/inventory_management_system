import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, Select } from 'antd';

const { Option } = Select;

const IncomeChart = () => {
  const [period, setPeriod] = useState('month');

  const dataMap = {
    week: [180, 240, 210, 260, 300, 280, 320],
    month: [320, 420, 380, 460, 510, 490, 530],
    year: [5200, 4800, 5600, 6100, 5900, 6400, 6900],
  };

  const series = [
    {
      name: 'Income',
      data: dataMap[period],
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      zoom: { enabled: false },
      dropShadow: {
        enabled: true,
        top: 8,
        left: 0,
        blur: 8,
        opacity: 1,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#2563eb'],
    grid: { show: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    legend: { show: false },
    markers: { size: 0 },
  };

  const totalIncome = series[0].data.reduce((a, b) => a + b, 0);

  return (
    <Card className="rounded-xl shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-2xl font-bold text-blue-600">KES {totalIncome.toLocaleString()}</p>
        </div>

        <Select
          size="small"
          value={period}
          onChange={setPeriod}
          className="bg-gray-100 rounded-md min-w-[90px]"
        >
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
      </div>

      <Chart options={options} series={series} type="line" height={200} />
    </Card>
  );
};

export default IncomeChart;
