import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  
} from "chart.js";
import { Line, Pie, Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  MoreHorizontal,
  Filter,
  ArrowUp,
  ArrowDown,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Registering Pie chart module
);

function AdminDashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
   

      {/* Main Content */}
      <div className="p-6 w-full flex flex-col gap-5 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SaleReport
            description="Total Sales"
            amount="34,456.00"
            percent={14}
            icon={<DollarSign size={20} />}
          />
          <SaleReport
            description="Total Order"
            amount={3456}
            percent={17}
            icon={<ShoppingCart size={20} />}
          />
          <SaleReport
            description="Total Revenue"
            amount="1,456.00"
            percent={14}
            icon={<TrendingUp size={20} />}
          />
          <SaleReport
            description="Total Customer"
            amount="42"
            percent={-11}
            icon={<Users size={20} />}
          />
        </div>
        <div className="flex justify-between">
          {/* Graph Section */}
          <div className="h-[250px] w-[550px] p-4 bg-white shadow-lg rounded-lg">
            <Graph />
          </div>

          {/* Sales by Location */}
          <div className="h-[250px] w-[220px] p-4 bg-white shadow-lg rounded-lg">
            <h4 className="text-xl font-bold">Sales By Location</h4>
            {["New York", "Los Angeles", "Chicago", "San Francisco"].map(
              (city, index) => (
                <OrderLocation
                  key={index}
                  location={city}
                  orders={Math.floor(Math.random() * 200)}
                />
              )
            )}
          </div>

          {/* Pie Chart */}
          <PieChart />
        </div>
        <div className="flex justify-between">
          <div>
            <TopSellingProducts></TopSellingProducts>
          </div>
          <div>
            <MonthlyTarget />
          </div>
        </div>
      </div>
    </div>
  );
}
const MonthlyTarget = () => {
    const percentage = 75.34;
    const todayEarnings = 3267;
    const target = "$25k";
    const revenue = "$18k";
    const today = "$1.8k";
  
    // Data for the doughnut chart
    const chartData = {
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: ["#7A56FE", "#E0E0E0"],
          borderWidth: 0,
          cutout: '80%', // Makes it a doughnut with thick ring
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      rotation: -90, // Start from top
      circumference: 180, // Half circle
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    };
  
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg w-80">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Monthly Target</h4>
          <MoreHorizontal size={18} className="cursor-pointer text-gray-500" />
        </div>
  
        {/* Progress Arc - Now using Chart.js Doughnut */}
        <div className="flex justify-center items-center mb-4 h-32">
          <div className="relative w-32 h-full">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-lg font-semibold">{percentage}%</div>
              <div className="text-xs bg-gray-100 px-2 py-1 rounded-md mt-1">
                +12%
              </div>
            </div>
          </div>
        </div>
  
        {/* Earnings Text */}
        <p className="text-center text-sm text-gray-600 mb-4">
          You earn <span className="font-semibold">${todayEarnings}</span> today,
          it's higher than last month. Keep up your good trends!
        </p>
  
        {/* Stats */}
        <div className="flex justify-between border-t pt-3 text-sm text-gray-700">
          <div className="flex flex-col items-center">
            <span className="font-semibold">{target}</span>
            <span className="text-red-500 text-xs">↓</span>
            <span className="text-gray-500">Target</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">{revenue}</span>
            <span className="text-green-500 text-xs">↑</span>
            <span className="text-gray-500">Revenue</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">{today}</span>
            <span className="text-green-500 text-xs">↑</span>
            <span className="text-gray-500">Today</span>
          </div>
        </div>
      </div>
    );
  };
const TopSellingProducts = () => {
  const products = [
    {
      id: 1,
      name: "Shirt",
      image: "/shirt.png",
      price: 76.89,
      category: "Man Cloths",
      quantity: 128,
      amount: 6647.15,
    },
    {
      id: 2,
      name: "T-Shirt",
      image: "/tshirt.png",
      price: 79.8,
      category: "Women Cloths",
      quantity: 89,
      amount: 6647.15,
    },
    {
      id: 3,
      name: "Pant",
      image: "/pant.png",
      price: 86.65,
      category: "Kid Cloths",
      quantity: 74,
      amount: 6647.15,
    },
    {
      id: 4,
      name: "Sweater",
      image: "/sweater.png",
      price: 56.07,
      category: "Man Cloths",
      quantity: 69,
      amount: 6647.15,
    },
    {
      id: 5,
      name: "Light Jacket",
      image: "/light-jacket.png",
      price: 36.0,
      category: "Women Cloths",
      quantity: 65,
      amount: 6647.15,
    },
    {
      id: 6,
      name: "Half Shirt",
      image: "/half-shirt.png",
      price: 46.78,
      category: "Man Cloths",
      quantity: 58,
      amount: 6647.15,
    },
  ];

  return (
    <div className="p-4 w-[700px] bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Top Selling Products
        </h4>
        <div className="flex gap-2">
          <button className="px-3 py-1 flex items-center gap-2 text-sm bg-gray-100 rounded-md">
            <Filter size={14} /> Filter
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">
            See All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600 text-sm">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 rounded-md"
                  />
                  {product.name}
                </td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">${product.amount.toLocaleString()}</td>
                <td className="p-3">
                  <MoreHorizontal size={18} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const PieChart = () => {
  const data = {
    labels: ["Direct", "Affiliate", "Sponsored", "E-mail"],
    datasets: [
      {
        data: [300.56, 135.18, 154.02, 48.96], // Values
        backgroundColor: ["#181D8D", "#1D9BD1", "#7623BD", "#1B8F4C"], // Custom Colors
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4  bg-white shadow-lg rounded-lg h-[250px] w-[220px]">
      <h4 className="text-lg font-semibold text-gray-800 text-center">
        Total Sales
      </h4>
      <div className="w-full h-[100px] flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex justify-between text-sm px-2">
            <div className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></span>
              {label}
            </div>
            <span className="font-medium">
              ${data.datasets[0].data[index].toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Graph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Current Week",
        data: [5000, 10000, 7000, 15000, 13000, 17000],
        borderColor: "#7A56FE",
        backgroundColor: "rgba(122, 86, 254, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Previous Week",
        data: [1000, 20000, 4000, 7000, 8000, 12000],
        borderColor: "#1D9BD1",
        backgroundColor: "rgba(29, 155, 209, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563",
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        grid: { color: "#F3F4F6" },
        ticks: { color: "#6B7280" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

function OrderLocation({ location, orders }) {
  const percentage = Math.min(orders + 10, 100) - 20;

  return (
    <div>
      <div className="flex justify-between">
        <div>{location}</div>
        <div>{orders}</div>
      </div>
      <div className="w-[150px] h-[5px] bg-gray-200 rounded-md overflow-hidden mt-1">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

const SaleReport = ({ description, amount, percent, icon }) => {
  const isPositive = percent >= 0;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="text-gray-500 text-sm font-medium">{description}</div>
          <div className="text-2xl font-bold text-gray-800">${amount}</div>
          <div
            className={`flex items-center gap-1 text-sm ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>{percent}% vs last month</span>
          </div>
        </div>
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
