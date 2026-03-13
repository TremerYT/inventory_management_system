import { Card, Col, Row, Skeleton, Statistic, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import {
  FaBoxes,
  FaCashRegister,
  FaMoneyBillWave,
  FaUsers,
  FaUserTie,
  FaWallet,
} from 'react-icons/fa';
import { MdRemoveShoppingCart, MdWarningAmber } from 'react-icons/md';
import ExpensesChart from '../../components/charts/expenses_chart.jsx';
import IncomeChart from '../../components/charts/income_chart.jsx';
import Overall from '../../components/charts/overall.jsx';
import ProfitVsLoss from '../../components/charts/profit_loss.jsx';
import RevenueVsCost from '../../components/charts/revenue_cost.jsx';
import SalesVsPurchases from '../../components/charts/sales_purchase.jsx';
import { useAuth } from '../../context/auth/auth_provider.jsx';
import { useProduct } from '../../context/product/product_context.jsx';
import { getDashboardMetrics } from '../../services/dashboard.service.js';
import { cardInfo, statsCards } from '../../utils/card_info.jsx';
import { lowStockColumns } from '../../utils/columns.jsx';

const { Title, Text } = Typography;

const currencyFormatter = (value) => (
  <CountUp end={value} duration={2} separator="," prefix="Ksh " />
);

const countFormatter = (value) => <CountUp end={value} duration={1.5} />;

const StatisticCard = ({ icon: Icon, iconColor, bgIconColor, title, value, formatter }) => (
  <Card className="rounded-lg h-full">
    <div className="flex items-center justify-between">
      <div>
        <Statistic title={title} value={value} formatter={formatter} prefix="" />
      </div>
      <div
        className="w-12 h-12 rounded-full text-2xl flex items-center justify-center"
        style={{ backgroundColor: bgIconColor, color: iconColor }}
      >
        <Icon />
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { lowStockProducts, loadingLowStock } = useProduct();
  const [dynamicCardInfo, setDynamicCardInfo] = useState(cardInfo);
  const [dynamicStatsCards, setDynamicStatsCards] = useState(statsCards);
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      setLoading(true);
      try {
        const { data } = await getDashboardMetrics();
        setMetricsData(data);
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);
  return (
    <div>
      <div className="mb-4">
        <Row gutter={[16, 16]} className="w-full flex items-center">
          <Col xs={24} lg={8}>
            <h1 className="mb-2">
              Hi {user?.username},{' '}
              {`Good ${
                new Date().getHours() < 12
                  ? 'Morning'
                  : new Date().getHours() < 18
                    ? 'Afternoon'
                    : 'Evening'
              }`}
            </h1>
            <p>Your dashboard gives you views of key performance or business processes.</p>
          </Col>

          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]} className="mb-4">
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <StatisticCard
                    icon={FaBoxes}
                    iconColor="#ff5c00"
                    bgIconColor="#ffc896"
                    title="Inventory Value"
                    value={metricsData?.totalInventoryValue || 0}
                    formatter={currencyFormatter}
                  />
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <StatisticCard
                    icon={FaCashRegister}
                    iconColor="#0067ff"
                    bgIconColor="#9ab2fb"
                    title="Sales Revenue"
                    value={metricsData?.totalSalesRevenue || 0}
                    formatter={currencyFormatter}
                  />
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <StatisticCard
                    icon={FaWallet}
                    iconColor="#c70000"
                    bgIconColor="#ffb3b3"
                    title="Expenses"
                    value={metricsData?.totalExpenses || 0}
                    formatter={currencyFormatter}
                  />
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <StatisticCard
                    icon={FaMoneyBillWave}
                    iconColor="#00b300"
                    bgIconColor="#b3ffb3"
                    title="Net Profit"
                    value={metricsData?.totalProfit || 0}
                    formatter={currencyFormatter}
                  />
                )}
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <Card className="rounded-lg h-full" style={{ backgroundColor: '#ff630d' }}>
                    <div className="flex items-center justify-between" style={{ color: 'white' }}>
                      <Statistic
                        title={<span style={{ color: 'white' }}>Total Customers</span>}
                        value={metricsData?.totalCustomers || 0}
                        formatter={countFormatter}
                        valueStyle={{ color: 'white' }}
                      />
                      <div style={{ fontSize: '28px' }}>
                        <FaUsers />
                      </div>
                    </div>
                  </Card>
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <Card className="rounded-lg h-full" style={{ backgroundColor: '#3c89fb' }}>
                    <div className="flex items-center justify-between" style={{ color: 'white' }}>
                      <Statistic
                        title={<span style={{ color: 'white' }}>Total Suppliers</span>}
                        value={metricsData?.totalSuppliers || 0}
                        formatter={countFormatter}
                        valueStyle={{ color: 'white' }}
                      />
                      <div style={{ fontSize: '28px' }}>
                        <FaUserTie />
                      </div>
                    </div>
                  </Card>
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <Card className="rounded-lg h-full" style={{ backgroundColor: '#FA9644' }}>
                    <div className="flex items-center justify-between" style={{ color: 'white' }}>
                      <Statistic
                        title={<span style={{ color: 'white' }}>Low Stock</span>}
                        value={metricsData?.lowStockProducts || 0}
                        formatter={countFormatter}
                        valueStyle={{ color: 'white' }}
                      />
                      <div style={{ fontSize: '28px' }}>
                        <MdWarningAmber />
                      </div>
                    </div>
                  </Card>
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {loading ? (
                  <Card className="rounded-lg h-full">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <Card className="rounded-lg h-full" style={{ backgroundColor: '#FB0133' }}>
                    <div className="flex items-center justify-between" style={{ color: 'white' }}>
                      <Statistic
                        title={<span style={{ color: 'white' }}>Out of Stock</span>}
                        value={metricsData?.outOfStockProducts || 0}
                        formatter={countFormatter}
                        valueStyle={{ color: 'white' }}
                      />
                      <div style={{ fontSize: '28px' }}>
                        <MdRemoveShoppingCart />
                      </div>
                    </div>
                  </Card>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} lg={9}>
          <Overall />
        </Col>
        <Col xs={24} lg={15}>
          <ProfitVsLoss />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <SalesVsPurchases />
        </Col>
        <Col span={12}>
          <Card title="Low Stock" className="h-full">
            <Table
              columns={lowStockColumns}
              dataSource={lowStockProducts}
              loading={loadingLowStock}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Row style={{ marginBottom: '16px' }}>
            <Col span={24}>
              <ExpensesChart />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <IncomeChart />
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <RevenueVsCost />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
