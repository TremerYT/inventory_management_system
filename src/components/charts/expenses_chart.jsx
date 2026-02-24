import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, Select } from 'antd';

const { Option } = Select;

const ExpensesChart = () => {
  const [period, setPeriod] = useState('month');

  const dataMap = {
    week: [120, 180, 150, 220, 200, 170, 210],
    month: [320, 420, 380, 460, 510, 490, 530],
    year: [4200, 3900, 4600, 5100, 4800, 5300, 5700],
  };

  const series = [
    {
      name: 'Expenses',
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

  const totalExpenses = series[0].data.reduce((a, b) => a + b, 0);

  return (
    <Card className="rounded-xl shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-xl font-semibold text-orange-500">
            KES {totalExpenses.toLocaleString()}
          </p>
        </div>

        <Select size="small" value={period} onChange={setPeriod} className="min-w-[90px]">
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
