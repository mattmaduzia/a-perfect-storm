/// <reference types="cypress" />
/// <reference types="../support" />

const waitForMapToTransition = () => {
  cy.get("#county1122").should("not.have.css", "fill", "rgb(135, 206, 235)"); // skyblue
};

const wikiEndpoint = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const forecastEndpoint1 = "https://api.weather.gov/points/";
const forecastEndpoint2 = "https://api.weather.gov/gridpoints/";

describe("Map interactivity", () => {
  // setup
  beforeEach(() => {
    cy.visit("/");

    cy.get(".panel--types .panel-block").first().click();
    cy.get(".panel--periods .panel-block").first().click();
    cy.get("#county1195").as("home");
    cy.get("#tooltip").as("tip");

    cy.server();

    cy.fixture("dummy_thumbnail", "base64").as("dummyImage");
    cy.fixture("county.jfif", "base64").as("countyImage").then($countyImage => {
      cy.route({
        method: "GET",
        url: `${wikiEndpoint}**`,
        status: 200,
        response: {
          thumbnail: {
            source: "data:image/png;base64," + $countyImage,
            width: 320,
            height: 288,
          },
          coordinates: {
            lat: 30,
            lon: 90,
          }
        },
        delay: 300,
      }).as("wikiApi");
    });
  });
  it("shows tooltip on hover", () => {
    cy.route({
      method: "GET",
      url: `${forecastEndpoint1}**`,
      response: {
        properties: {
          forecastGridData: "https://api.weather.gov/gridpoints/DLH/30,90",
        },
      },
      delay: 500,
    }).as("forecastApi1");

    cy.fixture("forecast.json").as("forecastJSON").then($forecastJSON => {
      cy.route({
        method: "GET",
        url: `${forecastEndpoint2}**`,
        response: $forecastJSON,
        delay: 500,
      }).as("forecastApi2");
    });

    waitForMapToTransition();

    // default state of test county and tooltip
    cy.get("@home").notExpectStyle("stroke", "rgb(0, 0, 0)");
    cy.get("@tip")
      .expectStyle(
        "opacity", "0",
      );

    // mouseover - highlight and show by county
    cy.get("@home")
      .trigger("mouseover")
      .expectStyle("stroke", "rgb(0, 0, 0)");
    cy.get("@tip")
      .contains("Average Monthly Precipitation (Annual): 3.38 Inches")
      .expectStyle(
        "opacity", "1",
      );

    cy.get("#tooltip__image").then(function ($image) {
      expect($image.attr("src")).to.equal("data:image/png;base64," + this.dummyImage); // loading image data url
    });
    cy.get("#tooltip__loading").expectStyle("display", "block");
    cy.get("#tooltip__forecast").should("be.empty");

    cy.wait("@wikiApi");

    cy.get("#tooltip__image").then(function ($image) {
      expect($image.attr("src")).to.equal("data:image/png;base64," + this.countyImage);  // wikipedia image
    });

    cy.wait("@forecastApi1");

    cy.get("#tooltip__loading").expectStyle("display", "block");
    cy.get("#tooltip__forecast").should("be.empty");

    cy.wait("@forecastApi2");

    cy.get("#tooltip__loading").expectStyle("display", "none");
    cy.get("#tooltip__forecast").contains("Current");

    // mouseout - unhighlight and hide
    cy.get("@home").trigger("mouseout")
      .expectStyle("stroke", "none");
    cy.get("@tip")
      .expectStyle(
        "opacity", "0",
      );
  });
  it("shows no tooltip if county is missing datapoint", () => {
    // setup
    cy.get("#county2153").trigger("mouseover")
      .notExpectStyle("stroke", "rgb(0, 0, 0)");
    cy.get("@tip")
      .expectStyle("opacity", "0");
  });
});
