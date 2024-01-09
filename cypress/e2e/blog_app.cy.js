describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
  });
  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("form").should("have.descendants", "input");
    cy.contains("username").should("be.visible");
    cy.contains("password").should("be.visible");
  });
});