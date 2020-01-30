import React, { ReactNode } from "react";

export interface AppPanelProps {
  title: string;
  icon: string;
  children: ReactNode;
}

/**
 * Generic panel containing links
 * @param props
 * @constructor
 * @author Matt Maduzia
 */
export function AppPanel(props: AppPanelProps) {
  return (
    <nav className="app-panel panel">
      <p className="panel-heading">
        { props.title }
        <span className="has-margin-left-5 large icon">
          <i className={`mdi mdi-24px mdi-${props.icon}`} />
        </span>
      </p>
      {props.children}
    </nav>
  );
}
