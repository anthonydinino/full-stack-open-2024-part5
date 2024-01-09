/// <reference types="Cypress" />
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

  describe("Login", function () {
    beforeEach(function () {
      const user = {
        username: "adinino",
        name: "Anthony Dinino",
        password: "password",
      };
      cy.request("POST", "http://localhost:3003/api/users", user);
    });
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("adinino");
      cy.get("#password").type("password");
      cy.contains("login").get("button[type='submit']").click();
      cy.contains("adinino logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("adinino");
      cy.get("#password").type("wrongpassword");
      cy.contains("login").get("button[type='submit']").click();
      cy.get(".notification").should("contain", "wrong username or password");
      cy.get(".notification").should("have.css", "border-style", "solid");
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "adinino logged in");
    });
  });
});
