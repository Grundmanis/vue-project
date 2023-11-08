describe('Sidebar', () => {
  it('should delete an element', () => {
    cy.visit('/')
    cy.get('#side-panel button').click(); // first button is the box-element
    cy.get('.b-box').trigger('mouseover');
    cy.get('.b-actions-toolbar .b-action-remove').click();
    cy.get('.b-box').should('not.exist');
  })

  it('should delete element with child elements', () => {
    cy.visit('/')
    // Adding an element to wrapper
    cy.get('#side-panel button').click();
    // Clicking on created element
    cy.get('#workarea .b-box').trigger('click');
    // Adding a new element inside of just created element
    cy.get('#side-panel button').click();
    // Clicking on just created element
    cy.get('#workarea .b-box .b-box').trigger('click');
    // Adding a new element inside of just created element
    cy.get('#side-panel button').click();
    // Clicking on just created element
    cy.get('.b-box').eq(0).trigger('mouseover');
    cy.get('.b-box .b-action-remove').eq(0).click();
    cy.get('.b-box').should('not.exist');
  })
  it('should delete element with child elements and do not touch other elements', () => {
    cy.visit('/')
    cy.get('#side-panel button').click(); // id = 2
    // Adding an element to wrapper
    cy.get('#side-panel button').click(); 
    // Clicking on created element
    cy.get('#workarea .b-box').eq(1).trigger('click');
    // Adding a new element inside of just created element
    cy.get('#side-panel button').click();
    // Clicking on just created element
    cy.get('#workarea .b-box .b-box').trigger('click');
    // Adding a new element inside of just created element
    cy.get('#side-panel button').click();

    cy.get('.b-wrapper').click();
    cy.get('#side-panel button').click(); // id = 6

    // Clicking on just created element
    cy.get('.b-box').eq(1).trigger('mouseover');
    cy.get('.b-box .b-action-remove').eq(1).click();

    cy.get('.b-box').eq(0).trigger('mouseover');
    cy.get('.b-box').eq(0).contains('2');
    cy.get('.b-box').eq(1).trigger('mouseover');
    cy.get('.b-box').eq(1).contains('6');
  })
})
