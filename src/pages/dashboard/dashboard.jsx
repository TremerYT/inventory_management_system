import DashboardCards from "../../components/ui/dashboard_cards.jsx";
import useAuth from "../../hooks/useAuth.js";
import {Card, Col, Row, Table, Typography} from "antd";
import {cardInfo, statsCards} from "../../utils/card_info.jsx";
import StatsCards from "../../components/ui/stats_cards.jsx";
import SalesVsPurchases from "../../components/charts/sales_purchase.jsx";
import RevenueVsCost from "../../components/charts/revenue_cost.jsx";
import ExpensesChart from "../../components/charts/expenses_chart.jsx";
import IncomeChart from "../../components/charts/income_chart.jsx";
import {lowStockColumns} from "../../utils/columns.jsx";
import Overall from "../../components/charts/overall.jsx";
import ProfitVsLoss from "../../components/charts/profit_loss.jsx";
import {useProduct} from "../../context/product/product_context.jsx";

const {Title, Text} = Typography;
const Dashboard = () => {
  const {user} = useAuth();
  const {lowStockProducts, loadingLowStock} = useProduct()
  return (
    <div>
      <div className="mb-4">
        <Row gutter={[16, 16]} className="w-full flex items-center">
          <Col xs={24} lg={8}>
            <h1 className="mb-2">
              Hi {user?.sub},{" "}
              {`Good ${
                new Date().getHours() < 12
                  ? "Morning"
                  : new Date().getHours() < 18
                    ? "Afternoon"
                    : "Evening"
              }`}
            </h1>
            <p>
              Your dashboard gives you views of key performance or business
              processes.
            </p>
          </Col>

          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]} className="mb-4">
              {cardInfo.map((card, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <DashboardCards {...card} />
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]}>
              {statsCards.map((card, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <StatsCards {...card} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>
        <Col xs={24} lg={9}>
          <Overall/>
        </Col>
        <Col xs={24} lg={15}>
          <ProfitVsLoss/>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginBottom: '16px'}}>
        <Col span={12}>
          <SalesVsPurchases/>
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
          <Row style={{marginBottom: '16px'}}>
            <Col span={24}>
              <ExpensesChart/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <IncomeChart/>
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <RevenueVsCost/>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
