import React from "react";

export interface AppPanelTabsProps {
  activeTab: number;
  setActiveTab: (newActive: number) => void,
  tabNames: string[],
}

/**
 * Switchable panel tabs
 * @param props
 * @constructor
 */
export function AppPanelTabs(props: AppPanelTabsProps) {
  const handeClick = (e: any, index: number) => {
    e.preventDefault();
    props.setActiveTab(index);
  };
  return (<p className="panel-tabs">
    { props.tabNames.map((title: string, index: number) => {
      return ( <a
        href="#"
        key={ title }
        onClick={ (event) => handeClick(event, index) }
        className={ props.activeTab === index ? 'is-active' : '' }
      >{ title }</a> );
    })}
  </p>);
}
