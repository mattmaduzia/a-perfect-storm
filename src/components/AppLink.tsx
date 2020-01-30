import React, { ReactNode } from "react";

export interface AppLinkProps {
  href: string;
  children: ReactNode;
}

/**
 * A link to a page outside of the app
 * @param props
 * @constructor
 */
export function AppLink(props: AppLinkProps) {
  return (<a href={props.href} target="_blank" rel="noopener noreferrer">
    {props.children}
  </a>);
}
