import React, { useEffect, useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";

export interface AppHeaderProps {
  //
}

/**
 * A header introducing the page
 * @param props
 * @constructor
 */
export function AppHeader(props: AppHeaderProps) {
  const [background, setBackground] = useState({ color: "blue" } as any);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getBackgroundImage = async () => {
      const image = await import("../../../assets/thunderstorm.jpg");
      setBackground({ backgroundImage: `url('${ image.default }')` });
    };
    getBackgroundImage().then(() => {
      setIsLoaded(true);
    });
  }, []);

  return ( <section
    className="banner__container hero is-large"
    style={ background }
  >
    <div className="hero-body">
      <div className="container">
        <CSSTransition in={isLoaded} timeout={1000} mountOnEnter={false} classNames="fade-in-left">
          <div className={!isLoaded ? "is-not-opaque" : ""}>
            <h1 className="is-size-1 title has-text-white">
              A Perfect Storm
            </h1>
            <h2 className="is-size-4 has-text-accent subtitle">
              U.S. Weather Visualization By County
            </h2>
          </div>
        </CSSTransition>
      </div>
    </div>
  </section> );
}
