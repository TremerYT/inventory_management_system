import { Card, Select } from 'antd';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const { Option } = Select;

const ExpensesChart = () => {
  const [period, setPeriod] = useState('month');
  const [chartData] = useState({
    data: [12000, 15000, 13000, 18000, 16000, 14000],
    totalExpenses: 88000,
  });

  const series = [
    {
      name: 'Expenses',
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
    colors: ['#f97316'],
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
    <Card className="rounded-xl shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-xl font-semibold text-orange-500">
            KES {chartData.totalExpenses.toLocaleString()}
          </p>
        </div>

        <Select
          size="small"
          value={period}
          onChange={(value) => setPeriod(value)}
          className="min-w-[90px]"
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

export default ExpensesChart;
