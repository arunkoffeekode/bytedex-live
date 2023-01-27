import React from "react";
import { Outlet } from "react-router-dom";
import OrdersNavigation from "../../component/orders/OrdersNavigation";

export default function Orders() {
  return (
    <div>
      <OrdersNavigation />
      <Outlet />
    </div>
  );
}
