import React, { useContext } from "react";
import { DispatchContext } from "../../App";

export interface AppPanelBlockProps {
  isActive: boolean;
  icon?: string;
  title: string;
  actionType: string;
  actionPayload: any;
}

/**
 * A single entry in a generic sidebar panel
 * @param props
 * @constructor
 */
export function AppPanelBlock(props: AppPanelBlockProps) {
  const blockClassName = 'panel-block has-text-left' +
    ' has-background-transition has-text-transition';

  const dispatch = useContext(DispatchContext);
  const handleClick = () => dispatch({
    type: props.actionType,
    payload: props.actionPayload,
  });

  return ( <div
    onClick={ handleClick }
    className={ `${ blockClassName }${ props.isActive
      ? ' has-background-accent has-text-white'
      : ' has-cursor-pointer has-background-transparent' }` }
    data-testid="apb--wrapper"
  >
    <span className="has-padding-top-15 is-large icon panel-icon">
      <i
        className={ `mdi-48px has-text-transition mdi mdi-${ props.icon }${ props.isActive
          ? ' has-text-white'
          : '' }` }
        aria-hidden="true"
        data-testid="apb--icon"
      />
    </span>
    { props.title }
  </div> );
}
