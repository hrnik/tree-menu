// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

const testHook = (hook) => `[data-test-hook="${hook}"]`;

context("Tree menu e2e test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Tree menu", function () {
    cy.get(testHook("tree-item")).contains("Meet IntelliJ IDEA");
    cy.get(testHook("tree-item")).contains("Getting help").should("not.exist");
    cy.get(testHook("tree-item")).contains("Meet IntelliJ IDEA").click();
    cy.get(testHook("tree-item")).contains("Getting help");
    cy.get(testHook("tree-item")).contains("Learn more").should("not.exist");
    cy.get(testHook("tree-item")).contains("Getting help").click();
    cy.get(testHook("tree-item")).contains("Learn more");

    cy.get(testHook("filter")).type("Feedback");

    cy.get(testHook("tree-item")).should("have.length", 1);
    cy.get(testHook("tree-item"))
      .contains("Meet IntelliJ IDEA")
      .should("not.exist");
    cy.get(testHook("tree-item")).contains("Sending Feedback");
  });
});
