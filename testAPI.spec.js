/// <reference types="cypress" />

describe("The test of different API when we added something to the cart", () => {
  beforeEach("our main page", () => {
    cy.visit("http://automationpractice.com/index.php");
  });

  it("POST and GET API", () => {
    cy.intercept("POST", "http://automationpractice.com/index.php*").as(
      "performance"
    );
    cy.intercept(
      "GET",
      "http://automationpractice.com/modules/blocklayered/blocklayered-ajax.php*"
    ).as("verification");

    //MAIN PAGE
    cy.get("#block_top_menu").contains("Dresses").click({ force: true });

    // PICK THE SPECIFIC DRESS
    cy.get(".layered_filter")
      .find("#ul_layered_category_0")
      .children()
      .eq(2)
      .click();

    //SIZE
    cy.get("#ul_layered_id_attribute_group_1")
      .find('[name="layered_id_attribute_group_1"]')
      .click();

    // API CHECK @VERIFICATION
    cy.wait("@verification");
    cy.get("@verification").then((xhrVar) => {
      console.log(xhrVar);
      expect(xhrVar.response.statusCode).to.equal(200);
      expect(xhrVar.response.headers.server).to.equal("Apache");
      expect(xhrVar.request.headers.referer).to.equal(
        "http://automationpractice.com/index.php?id_category=8&controller=category"
      );
    });

    cy.get(".product_list")
      .find(".left-block")
      .then((ourItem) => {
        cy.wrap(ourItem).find(".product_img_link").eq(2).click();
      });

    // ADD TO CART
    cy.contains("Add to cart").click();

    // API CHECK @PERFORMANCE
    cy.wait("@performance");
    cy.get("@performance").then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.statusMessage).to.equal("OK");
      expect(xhr.request.headers.origin).to.equal(
        "http://automationpractice.com"
      );
    });

    //CONFIRMATION OF THE ORDER
    cy.get(".button-container")
      .should("contain", "Proceed to checkout")
      .click();
  });
});
