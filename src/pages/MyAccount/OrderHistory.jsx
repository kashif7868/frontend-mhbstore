import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import "../../assets/css/MyAccount/orderHistory.css";

// Example data with product images and prices in PKR
const orders = [
  {
    id: "ORD12345",
    date: "2024-11-20",
    total: 12000, // PKR
    status: "Delivered",
    category: "Tech Hub",
    items: [
      {
        name: "Men's Jacket",
        quantity: 1,
        price: 5000,
        imageUrl: "/images/mens-jacket.jpg",
      },
      {
        name: "Tech Hub Earbuds",
        quantity: 2,
        price: 3500,
        imageUrl: "/images/tech-earbuds.jpg",
      },
    ],
  },
  {
    id: "ORD12346",
    date: "2024-11-18",
    total: 8000, // PKR
    status: "Shipped",
    category: "Food",
    items: [
      {
        name: "Women's T-shirt",
        quantity: 1,
        price: 2500,
        imageUrl: "/images/womens-tshirt.jpg",
      },
      {
        name: "Kids' Toy",
        quantity: 1,
        price: 5500,
        imageUrl: "/images/kids-toy.jpg",
      },
    ],
  },
  {
    id: "ORD12347",
    date: "2024-11-15",
    total: 15000, // PKR
    status: "Pending",
    category: "Health Care",
    items: [
      {
        name: "Health Supplement",
        quantity: 2,
        price: 5000,
        imageUrl: "/images/supplement.jpg",
      },
    ],
  },
];

const OrderHistory = () => {
  const [dateFilter, setDateFilter] = useState("all"); // 'all', 'week', 'day', 'year'

  // Helper function to filter by date range
  const filterByDate = (orders, filter) => {
    const today = new Date();

    return orders.filter((order) => {
      const orderDate = new Date(order.date);
      switch (filter) {
        case "week":
          // Check if the order is within the current week
          const weekStart = new Date(
            today.setDate(today.getDate() - today.getDay())
          ); // Start of the current week (Sunday)
          const weekEnd = new Date(today.setDate(weekStart.getDate() + 6)); // End of the current week (Saturday)
          return orderDate >= weekStart && orderDate <= weekEnd;
        case "day":
          // Check if the order is from today
          return orderDate.toDateString() === today.toDateString();
        case "year":
          // Check if the order is from the current year
          return orderDate.getFullYear() === today.getFullYear();
        default:
          return true; // No filtering (all orders)
      }
    });
  };

  const filteredOrders = filterByDate(orders, dateFilter);

  // Table columns and data for react-table
  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "id",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }) => `${value.toLocaleString()} PKR`, // Format total price as PKR
      },
    ],
    []
  );

  const data = useMemo(() => filteredOrders, [filteredOrders]);

  // Use the react-table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Your Order History</h1>

      {/* Date Filter */}
      <div className="date-filter">
        <label>Filter by Date: </label>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Pending Orders */}
      <section>
        <h2>Pending Orders</h2>
        <div className="order-list">
          {filteredOrders.filter((order) => order.status === "Pending").length >
          0 ? (
            <table {...getTableProps()} className="data-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No pending orders.</p>
          )}
        </div>
      </section>

      {/* Orders Received */}
      <section>
        <h2>Orders Received</h2>
        <div className="order-list">
          {filteredOrders.filter(
            (order) =>
              order.status === "Delivered" || order.status === "Shipped"
          ).length > 0 ? (
            <table {...getTableProps()} className="data-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No orders received.</p>
          )}
        </div>
      </section>

      {/* All Orders */}
      <section>
        <h2>All Orders</h2>
        <div className="order-list">
          <table {...getTableProps()} className="data-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {/* Total Orders Summary */}
      <section>
        <h2>Total Orders Summary</h2>
        <div className="order-summary">
          <p>Total number of orders: {filteredOrders.length}</p>
          <p>
            Total Delivered Orders:{" "}
            {
              filteredOrders.filter((order) => order.status === "Delivered")
                .length
            }
          </p>
          <p>
            Total Pending Orders:{" "}
            {
              filteredOrders.filter((order) => order.status === "Pending")
                .length
            }
          </p>
          <p>
            Total Orders Received (Delivered + Shipped):{" "}
            {
              filteredOrders.filter(
                (order) =>
                  order.status === "Delivered" || order.status === "Shipped"
              ).length
            }
          </p>
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
