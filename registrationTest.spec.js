/// <reference types="cypress" />

describe("Sign up to the web site", () => {
  beforeEach(() => {
    cy.visit("http://automationpractice.com/index.php");
  });

  it("Sign up", () => {
    cy.get(".nav").find('[class="header_user_info"]').click();

    // TO VERIFY URL REAL VS EXPECT
    cy.url().should(
      "eq",
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );

    cy.get("form")
      .find("#email_create")
      .then((ourvar) => {
        cy.wrap(ourvar).type("testtesterov7@gmail.com");
      });
    cy.get("#SubmitCreate").should("contain", "Create an account").click();

    // FILLING THE PERSONAL INFORMATION
    cy.get(".account_creation").should("contain", "Your personal information");
    cy.get(".clearfix").find('[for="id_gender1"]').click();

    //1st part: YOUR PERSONAL INFORMATION
    cy.get("form")
      .find(".account_creation")
      .eq(0)
      .then((regVar1) => {
        cy.wrap(regVar1).find("#customer_firstname").type("Ivan");
        cy.wrap(regVar1).find("#customer_lastname").type("Ivanov");
        cy.wrap(regVar1).find("#passwd").type("StrongPassword123");
        cy.wrap(regVar1).find(".checker").click({ multiple: true });
        cy.wrap(regVar1)
          .find("span")
          .invoke("attr", "class")
          .should("contain", "checked");
      });

    //2nd part: YOUR ADDRESS
    cy.get("form")
      .find(".account_creation")
      .eq(1)
      .then((regVar2) => {
        cy.wrap(regVar2).find('[name="firstname"]').type("Peta");
        cy.wrap(regVar2).find('[name="lastname"]').type("Petrov");
        cy.wrap(regVar2)
          .find('[name="company"]')
          .type("The best company in the world");
        cy.wrap(regVar2)
          .find('[name="address1"]')
          .type("14000 Prague, street Vaclavske namesti");
        cy.wrap(regVar2).find('[name="city"]').type("Prague");
        cy.wrap(regVar2)
          .find("select")
          .eq(0)
          .select("California")
          .should("have.value", "5");
        cy.wrap(regVar2).find('[name="postcode"]').type("10400");
        cy.wrap(regVar2).find('[name="phone_mobile"]').type("778 924 816");
        cy.wrap(regVar2).find("#alias").clear().type("Palackeho 950");
      });
    // 3rd part: CONFERMING THE REGISTRATION
    cy.get("form")
      .find('[class="submit clearfix"]')
      .then((regVar3) => {
        cy.wrap(regVar3)
          .find('[name="submitAccount"]')
          .should("contain", "Register")
          .click();
      });

    // VERIFICATION URL REAL VS URL EXPECT
    cy.url().should(
      "eq",
      "http://automationpractice.com/index.php?controller=my-account"
    );
  });
});
