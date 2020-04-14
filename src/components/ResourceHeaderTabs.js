import classNames from 'classnames';
import React from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const DetailHeaderTabs = (props) => (
  <Tabs
    value={props.tab}
    onChange={props.handleTabClick}
    indicatorColor="secondary"
    textColor="black"
    fullWidth={true}
    scrollable={false}
    variant="fullWidth"
    indicatorClassName={props.classes.tabIndicator}
  >
    {props.tabs.map((tab) => (
      <Tab
        key={tab.value}
        label={props.isMobile && tab.mobileLabel ? tab.mobileLabel : tab.label}
        className={classNames(
          props.classes.tabRoot,
          props.classes.tabLabel,
          props.classes.tabLabelContainer
        )}
      />
    ))}
  </Tabs>
);

export default DetailHeaderTabs;
