describe('Text Element', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('#side-panel button').eq(1).click(); // second button is the text-element
  })

  describe('Sidebar', () => {
    it('should add text element', () => {
      cy.get('#workarea .b-box').trigger('mouseover');
      cy.get('#workarea .b-box').contains('2');
      cy.get('#workarea .b-box .b-action-remove');
      cy.get('#workarea .b-box .b-action-duplicate');
    })
    it('should see the config data of text element', () => {
      cy.get('#workarea .b-box').trigger('click');
      cy.get('#side-panel').contains('fontSize');
      cy.get('#side-panel').contains('color');
      cy.get('#side-panel').contains('Selected element #2');
      cy.get('#side-panel').contains('Change the text');
      cy.get('#side-panel').contains('Change the type');
      cy.get('.b-text-element');
    })
    it('should update the styles of added element', () => {
      cy.get('#workarea .b-box').should('have.css', 'color', '#000');
      cy.get('#workarea .b-box').trigger('click');
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('#555');
      cy.get('#workarea .b-box').should('have.css', 'color', '#555');
    })
    it('should update the text of added element', () => {
      cy.get('#workarea .b-box').contains('lorem ipsum')
      cy.get('#workarea .b-box').trigger('click');
      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Hello');
      cy.get('#workarea .b-box').contains('Hello')
    })
  });

  describe('Delete', () => {
    
    it('should delete ', () => {
      cy.get('.b-box').trigger('mouseover');
      cy.get('.b-actions-toolbar .b-action-remove').click();
      cy.get('.b-box').should('not.exist');
    })
    it('should delete elements and do not touch other elements', () => {
      
      cy.get('#side-panel button').eq(1).click(); // 2
      cy.get('#side-panel button').eq(1).click();
      cy.get('#side-panel button').eq(1).click(); // 4

      // Deleteing
      cy.get('.b-box').eq(1).trigger('mouseover'); 
      cy.get('.b-box .b-action-remove').eq(1).click(); // 2
      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-remove').eq(1).click(); // 3

      // Checking
      cy.get('.b-box').eq(0).trigger('mouseover');
      cy.get('.b-box').eq(0).contains('1');
      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box').eq(1).contains('4');
    })
  });

  describe('Duplicate', () => {

    beforeEach(() => {
      cy.get('.b-box').trigger('click');
      
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('100px');

      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Hello');

      cy.get('.b-box').trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').click();
    });
   
    it('should duplicate element with styles', () => {

      cy.get('.b-box').eq(0).contains('Hello');
      cy.get('.b-box').eq(1).contains('Hello');
      
      cy.get('.b-box').eq(0).should('have.css', 'width', '100px');
      cy.get('.b-box').eq(1).should('have.css', 'width', '100px');

    })
    it('should duplicate multiple element with updated styles', () => {

      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(1).click();
      cy.get('.b-box').eq(2).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(2).click();

      cy.get('.b-box').eq(0).contains('Hello');
      cy.get('.b-box').eq(1).contains('Hello');
      cy.get('.b-box').eq(2).contains('Hello');
      cy.get('.b-box').eq(3).contains('Hello');
      
      cy.get('.b-box').eq(0).should('have.css', 'width', '100px');
      cy.get('.b-box').eq(1).should('have.css', 'width', '100px');
      cy.get('.b-box').eq(2).should('have.css', 'width', '100px');
      cy.get('.b-box').eq(3).should('have.css', 'width', '100px');
    })
    it('should change the style and config of duplicated element', () => {

      cy.get('.b-box').eq(1).click();
      
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('50px');
      
      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Bye');

      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(1).click();

      cy.get('.b-box').eq(0).contains('Hello');
      cy.get('.b-box').eq(0).should('have.css', 'width', '100px');
      
      cy.get('.b-box').eq(1).contains('Bye');
      cy.get('.b-box').eq(1).should('have.css', 'width', '50px');
      cy.get('.b-box').eq(2).contains('Bye');
      cy.get('.b-box').eq(2).should('have.css', 'width', '50px');
    })
    it('should add element with default style and config after updating', () => {
      
      cy.get('.b-wrapper').click();
      cy.get('#side-panel button').click(); // first button is the box-element

      cy.get('.b-box').eq(0).contains('Hello');
      cy.get('.b-box').eq(0).should('have.css', 'width', '100px');
      cy.get('.b-box').eq(1).contains('Hello');
      cy.get('.b-box').eq(1).should('have.css', 'width', '100px');
      cy.get('.b-box').eq(2).contains('lorem ipsum');
      cy.get('.b-box').eq(2).should('have.css', 'width', 'auto');
    })
    it('should be able to delete the root element after duplication', () => {

      cy.get('.b-box').eq(0).trigger('mouseover');
      cy.get('.b-box .b-action-remove').eq(0).click();

      cy.get('.b-box').should('have.length', 1)
      cy.get('.b-box').should('have.css', 'width', '100px');
    })
    it('should correctly position the new duplicated element', () => {

      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(1).click();
    
      cy.get('.b-box').eq(1).click()
      
      cy.get('.b-style-width').clear();
      cy.get('.b-style-width').type('50px');

      cy.get('.b-text-element').clear();
      cy.get('.b-text-element').type('Bye');

      cy.get('.b-box').eq(1).trigger('mouseover');
      cy.get('.b-box .b-action-duplicate').eq(1).click();

      cy.get('.b-box').eq(0).contains('Hello');
      cy.get('.b-box').eq(0).should('have.css', 'width', '100px');

      cy.get('.b-box').eq(1).contains('Bye');
      cy.get('.b-box').eq(1).should('have.css', 'width', '50px');

      cy.get('.b-box').eq(2).contains('Bye');
      cy.get('.b-box').eq(2).should('have.css', 'width', '50px');
      
      cy.get('.b-box').eq(3).contains('Hello');
      cy.get('.b-box').eq(3).should('have.css', 'width', '100px');
    })
  });
})
