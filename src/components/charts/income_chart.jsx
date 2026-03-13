import { Card, Select } from 'antd';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const { Option } = Select;

const IncomeChart = () => {
  const [period, setPeriod] = useState('month');
  const [chartData] = useState({
    data: [25000, 28000, 30000, 32000, 35000, 38000],
    totalIncome: 188000,
  });

  const series = [
    {
      name: 'Income',
      data: chartData.data || [],
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

  return (
    <Card className="rounded-xl shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-2xl font-bold text-blue-600">
            KES {chartData.totalIncome.toLocaleString()}
          </p>
        </div>

        <Select
          size="small"
          value={period}
          onChange={(value) => setPeriod(value)}
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
