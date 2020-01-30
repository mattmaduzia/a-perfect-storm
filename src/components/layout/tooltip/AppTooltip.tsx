import React, { useEffect } from "react";
import dummy_thumbnail from "../../../assets/dummy_thumbnail.png";
import TooltipPainter from "../../../helpers/tooltip/TooltipPainter";
import { createPopper } from "@popperjs/core";

/**
 * Tooltip containing individual county information
 * @constructor
 */
export function AppTooltip() {

  useEffect(() => {
    TooltipPainter.init();

    TooltipPainter.popper =
      createPopper(document.getElementById("tooltip__base")!,
        document.getElementById("tooltip")!,
        {
          placement: "auto",
          strategy: "absolute",
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
                boundary: 'document',
              },
            },
            {
              name: 'offset',
              options: {
                offset: [10, 10]
              }
            },
            {
              name: 'computeStyles',
            },
            {
              name: 'popperoffsets',
            }
          ],
        },
      );
  }, []);

  return (
    <div id="tooltip" className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={ dummy_thumbnail }
            alt="Representative photo of the county from Wikipedia"
            id="tooltip__image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4" id="tooltip__title">County Name, State
                                                          Name</p>
            <p className="subtitle is-6" id="tooltip__subtitle">Subtitle</p>
          </div>
        </div>
        <div id="tooltip__data" className="is-size-5 content">
          Data
        </div>
        <div id="tooltip__forecast" className="content">
          Loading...
        </div>
        <progress
          id="tooltip__loading"
          className="progress is-small is-accent"
          max="100"
          style={ { display: "none" } }
        />
      </div>
    </div>
  );
}
