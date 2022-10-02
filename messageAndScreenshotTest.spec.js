/// <reference types="cypress" />

describe("Writing the message and making screenshot", () => {
  beforeEach(() => {
    cy.visit("http://automationpractice.com/index.php");
  });

  it("message and screen", () => {
    // OUR MESSAGE AND FORM
    cy.get(".nav")
      .find("#contact-link")
      .should("contain", "Contact us")
      .click();
    cy.url().should(
      "eq",
      "http://automationpractice.com/index.php?controller=contact"
    );
    cy.get("#center_column")
      .find("form")
      .then((var1) => {
        cy.wrap(var1)
          .find("select")
          .select("Webmaster")
          .should("have.value", "1");
        cy.wrap(var1).find("#email").type("testtesterov7@gmail.com");
        cy.wrap(var1).find("#id_order").type("I don't have nothing");
        cy.wrap(var1).find("textarea").type("Hello, I wish you the best !!!");
      });

    //SCREENSHOT OF OUR MESSAGE
    cy.screenshot("my-screenshot", {
      onAfterScreenshot($el, props) {
        {
          name: "my-screenshot";
          path: "./screenshots/my-screenshot.png";
          dimensions: {
            width: 1920;
            height: 1080;
          }
        }
      },
    });

    cy.get("fieldset").find("button").should("contain", "Send").click();

    // VERIFICATION OF OUR REQUEST
    cy.get("#center_column")
      .find("p")
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(
          "Your message has been successfully sent to our team."
        );
      });
  });
});
