import React from "react";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import CSSTransition from "react-transition-group/CSSTransition";

export interface AppMessageProps {
  body: string;
  title: string;
  color?: string;
}

/**
 * A notice to the user shown prominently in the window
 * @param props
 * @constructor
 */
export function AppMessage(props: AppMessageProps) {
  const { isAnimating, setIsAnimating } = useIntersectionObserver({ delayOnIntersect: 500, intersectEl: "message__container" });

  return ( <CSSTransition
      timeout={500}
      classNames="expand"
      in={isAnimating}
    >
      <article
        data-testid="ames--wrapper"
        id="message__container"
        className={ `app-message message is-${ props.color ||
        "primary" }` }
      >
        <div className="message-header">
          <p>{ props.title }</p>
          <button
            className="delete"
            aria-label="delete"
            onClick={ () => setIsAnimating(false) }
          />
        </div>
        <div className="message-body">
          { props.body }
        </div>
      </article>
    </CSSTransition> );
}
