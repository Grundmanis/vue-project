describe('Toolbar', () => {
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

  describe.only('Duplicate', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get('#side-panel button').click(); // first button is the box-element
      cy.get('.b-box').trigger('click');
      cy.get('.b-style-minHeight').clear();
      cy.get('.b-style-minHeight').type('50px');
      cy.get('.b-box').trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').click();
    });

    it('should duplicate element with styles', () => {

      cy.get('.b-box').eq(1).should('have.css', 'minHeight', '50px');
    })
    it('should duplicate multiple element with updated styles', () => {

      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(1).click();
      cy.get('.b-box').eq(2).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(2).click();
      cy.get('.b-box').eq(0).should('have.css', 'minHeight', '50px');
      cy.get('.b-box').eq(1).should('have.css', 'minHeight', '50px');
      cy.get('.b-box').eq(2).should('have.css', 'minHeight', '50px');
      cy.get('.b-box').eq(3).should('have.css', 'minHeight', '50px');
    })
    it('should change the style of duplicated element', () => {

      cy.get('.b-box').eq(1).click();
      
      cy.get('.b-style-minHeight').clear();
      cy.get('.b-style-minHeight').type('20px');
      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(1).click();

      cy.get('.b-box').eq(0).should('have.css', 'minHeight', '50px');
      cy.get('.b-box').eq(1).should('have.css', 'minHeight', '20px');
      cy.get('.b-box').eq(2).should('have.css', 'minHeight', '20px');
    })
    it('should add element with default style after updating', () => {
      
      cy.get('.b-wrapper').click();
      cy.get('#side-panel button').click(); // first button is the box-element

      cy.get('.b-box').eq(0).should('have.css', 'minHeight', '50px');
      cy.get('.b-box').eq(1).should('have.css', 'minHeight', '50px');
      cy.get('.b-box').eq(2).should('have.css', 'minHeight', '100px');
    })
    it('should be able to delete the duplicated element', () => {

      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-remove').eq(1).click();

      cy.get('.b-box').should('have.length', 1)
      cy.get('.b-box').should('have.css', 'minHeight', '50px');
    })
    it('should be able to delete the root element after duplication', () => {

      cy.get('.b-box').eq(0).trigger('mouseover');
      cy.get('.b-box .b-action-remove').eq(0).click();

      cy.get('.b-box').should('have.length', 1)
      cy.get('.b-box').should('have.css', 'minHeight', '50px');
    })
  })
})
