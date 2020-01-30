import React from "react";
import { AppLink } from "../../AppLink";

export interface AppFooterProps {
  //
}

/**
 * Footer containing attribution information
 * @param props
 * @constructor
 * @author Matt Maduzia
 */
export function AppFooter(props: AppFooterProps) {
  return ( <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Made with <span role="img" aria-label="sparkling heart implying love">💖</span> by <AppLink href="https://linkedin.com/in/mattmaduzia">Matt Maduzia</AppLink> using <AppLink href="https://www.reactjs.org">React</AppLink>, <AppLink href="https://bulma.io">Bulma</AppLink>, and <AppLink href="https://d3js.org">D3</AppLink>.<br /><br />

          The data on this site was extracted from the <AppLink href="https://www.ncdc.noaa.gov/">National Centers for Environmental Information</AppLink>'s "<AppLink href="ftp://ftp.ncdc.noaa.gov/pub/data/normals/1981-2010/">1981-2010 U.S. Climate Normals</AppLink>" records.<br /><br />

          Banner Photo by <AppLink href="https://unsplash.com/@maxsaeling?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Max Saeling</AppLink> on <AppLink href="https://unsplash.com/s/photos/teal-thunderstorm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</AppLink>.
        </p>
      </div>
    </footer> );
}
