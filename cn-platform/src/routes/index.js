/* eslint-disable import/first */
import React from "react";

import async from "../components/Async";

import { Home, BookOpen, Sliders, Grid,} from "react-feather";


// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const TSLATradeChart = async(() => import("../pages/tradechart/tsla"));
const FUTUTradeChart = async(() => import("../pages/tradechart/futu"));
const TSLATradeSummary = async(() => import("../pages/tradesummary/tsla"));
const FUTUTradeSummary = async(() => import("../pages/tradesummary/futu"));

const homeRoutes = {
  id: "Home",
  header: "Menu",
  path: "/home",
  icon: <Home />,
  component: Default,
  children: null,
}

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  icon: <Sliders />,
  containsHome: true,
  children: null,
  component: Default,
};

const TSLARoutes = {
  id: "TSLA",
  header: "Stock",
  path: "/tsla",
  icon: <Grid />,
  children: [
    {
      path: "/tsla/summary",
      name: "Summary",
      component: TSLATradeSummary,
    },
    {
      path: "/tsla/chart",
      name: "Chart",
      component: TSLATradeChart,
    },
  ],
  component: null,
}

const FUTURoutes = {
  id: "FUTU",
  path: "/futu",
  icon: <BookOpen />,
  children: [
    {
      path: "/futu/summary",
      name: "Summary",
      component: FUTUTradeSummary,
    },
    {
      path: "/futu/chart",
      name: "Chart",
      component: FUTUTradeChart,
    },
  ],
  component: null,
}

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  homeRoutes,
  dashboardsRoutes,
  TSLARoutes,
  FUTURoutes,
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  homeRoutes,
  dashboardsRoutes,
  TSLARoutes,
  FUTURoutes,
];
