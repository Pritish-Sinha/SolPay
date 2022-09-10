import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import History from "./common/History";

export default function MerchantTab() {
  return (
    <div className="tab">
      <Tabs
        defaultActiveKey="today"
        id="uncontrolled-tab-example"
        className="home-tab"
      >
        <Tab eventKey="today" title="Today Payment">
          {typeof window !== "undefined" && <History />}
        </Tab>
        <Tab eventKey="all" title="All Payment">
          {typeof window !== "undefined" && <History />}
        </Tab>
      </Tabs>
    </div>
  );
}
