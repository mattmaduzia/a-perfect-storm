const blocks = [[
  {icon: 'weather-fog', type: "Clouds Broken"},
  {icon: 'weather-sunny', type: "Clouds Clear"},
  {icon: 'weather-partly-cloudy', type: "Clouds Few"},
  {icon: 'weather-cloudy', type: "Clouds Overcast"},
  {icon: 'weather-windy-variant', type: "Clouds Scattered"},
],
  [
    {icon: 'weather-snowy-rainy', type: "Average Monthly Precipitation"},
    {icon: 'weather-partly-snowy', type: "Average Snowfall"},
    {icon: 'weather-snowy', type: "Days/Month w/1+ Inch Snow"},
    {icon: 'weather-snowy-heavy', type: "Days/Month w/5+ Inch Snow"},
  ],
  [
    {icon: 'home-thermometer', type: "Average Temperature"},
    {icon: 'thermometer-chevron-up', type: "Average High"},
    {icon: 'thermometer-chevron-down', type: "Average Low"},
    {icon: 'weather-night-partly-cloudy', type: "Average Diurnal"},
    {icon: 'water-pump', type: "Average Heat Index"},
    {icon: 'snowflake', type: "Average Wind Chill"},
    {icon: 'weather-windy', type: "Average Wind Speed"},
  ],
];

describe("sidebar containing the types (axes) of weather", () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it("activates 'Rain/Snow' tab by default'", () => {
    cy.get('.panel-tabs').contains('Rain/Snow').then($tab => {
      expect($tab).to.have.class('is-active');
    });
  });
  it("activates tabs on click", () => {
    cy.get('.panel--types .panel-tabs > a').each(($tab, tabIndex) => {
      cy.wrap($tab).click().then($activeTab => {
        expect($activeTab).to.have.class("is-active");
        cy.get('.panel--types [data-testid="apb--wrapper"]').each(($weatherType, typeIndex) => {
          let blockElement = blocks[tabIndex][typeIndex];
          cy.wrap($weatherType).contains(blockElement.type).then($block => {
            cy.wrap($block).find(`.mdi-${blockElement.icon}`);
            cy.wrap($block).click().should('have.class', 'has-background-accent').and('have.class', 'has-text-white');
          });
        });
      });
    });
  });
});
