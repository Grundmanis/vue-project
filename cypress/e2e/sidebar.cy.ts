describe('Sidebar', () => {
  it('should add box element', () => {
    cy.visit('/')
    cy.get('#side-panel button').click(); // first button is the box-element
    cy.get('#workarea .b-box').trigger('mouseover');
    cy.get('#workarea .b-box').contains('2');
    cy.get('#workarea .b-box .b-action-remove').contains('x');
  })
  it('should see the config data of added element', () => {
    cy.visit('/')
    cy.get('#side-panel button').click(); // first button is the box-element
    cy.get('#workarea .b-box').trigger('click');
    cy.get('#side-panel').contains('height');
    cy.get('#side-panel').contains('minHeight');
    cy.get('#side-panel').contains('width');
    cy.get('#side-panel').contains('Selected element #2');
    cy.get('.b-style-height');
    cy.get('.b-style-minHeight');
    cy.get('.b-style-width');
  })
  it('should update the styles of added element', () => {
    cy.visit('/')
    cy.get('#side-panel button').click(); // first button is the box-element
    cy.get('#workarea .b-box').should('have.css', 'minHeight', '100px');
    cy.get('#workarea .b-box').trigger('click');
    cy.get('.b-style-minHeight').clear();
    cy.get('.b-style-minHeight').type('50px');
    cy.get('#workarea .b-box').should('have.css', 'minHeight', '50px');
  })
  it('should toggle the grid', () => {
    cy.visit('/')
    cy.get('#side-panel button').click(); // first button is the box-element
    cy.get('#workarea .b-box').should('have.css', 'border', '1px dotted rgb(143, 143, 143)');
    cy.get('#showGrid').click()
    cy.get('#workarea .b-box').should('not.have.css', 'border', '1px dotted rgb(143, 143, 143)');
  })
  it('should add multiple elements', () => {
    cy.visit('/')
    cy.get('#side-panel button').click();
    cy.get('#side-panel button').click();
    cy.get('#side-panel button').click();
    cy.get('#side-panel button').click();
    cy.get('#side-panel button').click();
    cy.get('.b-wrapper > .b-box').should('have.length', 5)
  })
  it('should add nested elements', () => {
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
    cy.get('#workarea .b-box .b-box .b-box');
  })
})
