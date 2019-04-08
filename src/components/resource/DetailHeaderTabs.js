import React from 'react';

import Tabs, { Tab } from 'material-ui/Tabs';

const DetailHeaderTabs = (props) => (
  <Tabs
    value={props.tab}
    onChange={props.handleTabClick}
    indicatorColor="secondary"
    textColor="black"
    fullWidth={true}
    scrollable={false}
    indicatorClassName={props.classes.tabIndicator}
  >
    {props.tabs.map((tab) => 
      (<Tab key={tab.value} label={props.isMobile && tab.mobileLabel ? tab.mobileLabel : tab.label} classes={{root: props.classes.tabRoot, label: props.classes.tabLabel, labelContainer: props.classes.tabLabelContainer}} />)
    )}
  </Tabs>
);

export default DetailHeaderTabs;