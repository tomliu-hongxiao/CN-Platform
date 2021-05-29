import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboardLayoutRoutes,
} from "./index";

import DashboardLayout from "../layouts/Dashboard";

const childRoutes = (Layout, routes) =>
  routes.map(({ component: Component, guard, children, path }, index) => {
    const Guard = guard || React.Fragment;

    return children ? (
      children.map((element, index) => {
        const Guard = element.guard || React.Fragment;
        const ElementComponent = element.component || React.Fragment;

        return (
          <Route
            key={index}
            path={element.path}
            exact
            render={(props) => (
              <Layout>
                <Guard>
                  <ElementComponent {...props} />
                </Guard>
              </Layout>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Guard>
              <Component {...props} />
            </Guard>
          </Layout>
        )}
      />
    ) : null;
  });

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
    </Switch>
  </Router>
);

export default Routes;
