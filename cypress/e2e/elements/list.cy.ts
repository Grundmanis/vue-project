describe('List Element', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('#side-panel button').eq(3).click(); // second button is the list-element
  })

  describe('Sidebar', () => {

    it('should add list element', () => {
      cy.get('.b-list').trigger('mouseover');
      cy.get('.b-list').contains('2');
      cy.get('.b-list .b-action-remove');
      cy.get('.b-list .b-action-duplicate');
    })
    it('should see the config data of list element', () => {
      cy.get('.b-list').trigger('click');
      cy.get('#side-panel').contains('color');
      cy.get('#side-panel').contains('Selected element #2');
      cy.get('#side-panel').contains('Update the list');
      cy.get('#side-panel').contains('Change the tag');
      cy.get('.b-tag-element');
      cy.get('.b-list li').should('have.length', 4)
    })
    it('should update the styles of added element', () => {
      cy.get('.b-list').should('have.css', 'color', 'rgb(0, 0, 0)');
      cy.get('.b-list').trigger('click');
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('#555');
      cy.get('.b-list').should('have.css', 'color', 'rgb(85, 85, 85)');
    })
    it('should update the list of added element', () => {
      cy.get('ul.b-list')
      cy.get('.b-list').contains('Home')
      cy.get('.b-list').contains('About')
      cy.get('.b-list').contains('Price')
      cy.get('.b-list').contains('Contacts')
      cy.get('.b-list').trigger('click');
      cy.get('.b-list-text').eq(2).clear();
      cy.get('.b-list-text').eq(2).type('Hello');
      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('ol');
      cy.get('.b-list').contains('Hello')
      cy.get('ol.b-list')
    })
    it('should add multiple elements', () => {
      cy.get('#side-panel button').eq(3).click();
      cy.get('#side-panel button').eq(3).click();
      cy.get('#side-panel button').eq(3).click();
      cy.get('#side-panel button').eq(3).click();
      cy.get('.b-wrapper > .b-list').should('have.length', 5)
    })
    it('should update the tag', () => {
      cy.get('.b-list').trigger('click');
      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('ol');
      cy.get('ol.b-list')
    })
  });

  describe('Delete', () => {
    
    it('should delete ', () => {
      cy.get('.b-list').trigger('mouseover');
      cy.get('.b-actions-toolbar .b-action-remove').click();
      cy.get('.b-list').should('not.exist');
    })
    it('should delete elements and do not touch other elements', () => {
      
      cy.get('#side-panel button').eq(3).click();
      cy.get('#side-panel button').eq(3).click();
      cy.get('#side-panel button').eq(3).click();

      // Deleteing
      cy.get('.b-list').eq(1).trigger('mouseover'); 
      cy.get('.b-list .b-action-remove').eq(1).click();
      cy.get('.b-list').eq(1).trigger('mouseover');
      cy.get('.b-list .b-action-remove').eq(1).click();

      // Checking
      cy.get('.b-list').eq(0).trigger('mouseover');
      cy.get('.b-list').eq(0).contains('2');
      cy.get('.b-list').eq(1).trigger('mouseover');
      cy.get('.b-list').eq(1).contains('5');
    })
  });

  describe('Duplicate', () => {

    beforeEach(() => {
      cy.get('.b-list').trigger('click');
      
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('rgb(85, 85, 85)');

      cy.get('.b-list-text').eq(3).clear();
      cy.get('.b-list-text').eq(3).type('Hello');

      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('ol');

      cy.get('.b-list').trigger('mouseover');
      cy.get('.b-list .b-action-duplicate').click();
    });
   
    it('should duplicate element with styles', () => {

      cy.get('.b-list').eq(0).contains('Hello');
      cy.get('.b-list').eq(1).contains('Hello');
      
      cy.get('.b-list').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-list').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('ol.b-list');

    })
    it('should duplicate multiple element with updated styles', () => {

      cy.get('.b-list').eq(1).trigger('mouseover');
      cy.get('.b-list .b-action-duplicate').eq(1).click();
      cy.get('.b-list').eq(2).trigger('mouseover');
      cy.get('.b-list .b-action-duplicate').eq(2).click();

      cy.get('.b-list').eq(0).contains('Hello');
      cy.get('.b-list').eq(1).contains('Hello');
      cy.get('.b-list').eq(2).contains('Hello');
      cy.get('.b-list').eq(3).contains('Hello');
      
      cy.get('.b-list').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-list').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-list').eq(2).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('.b-list').eq(3).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('ol.b-list').eq(0);
      cy.get('ol.b-list').eq(1);
      cy.get('ol.b-list').eq(2);
      cy.get('ol.b-list').eq(3);
    })
    it('should change the style and config of duplicated element', () => {

      cy.get('.b-list').eq(1).click();
      
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('rgb(85, 85, 85)');
      
      cy.get('.b-list-text').eq(0).clear();
      cy.get('.b-list-text').eq(0).type('Bye');
      
      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('ol');

      cy.get('.b-list').eq(1).trigger('mouseover');
      cy.get('.b-list .b-action-duplicate').eq(1).click();

      cy.get('.b-list').eq(0).contains('Hello');
      cy.get('.b-list').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('ol.b-list').eq(0);
      
      cy.get('.b-list').eq(1).contains('Bye');
      cy.get('.b-list').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('ol.b-list').eq(0);

      cy.get('.b-list').eq(2).contains('Bye');
      cy.get('.b-list').eq(2).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('ol.b-list').eq(1)
    })
    it('should add element with default style and config after updating', () => {
      
      cy.get('.b-wrapper').click();
      cy.get('#side-panel button').eq(3).click(); // first button is the list-element

      cy.get('.b-list').eq(0).contains('Hello');
      cy.get('.b-list').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('.b-list').eq(1).contains('Hello');
      cy.get('.b-list').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('.b-list').eq(2).contains('Home');
      cy.get('.b-list').eq(2).contains('About');
      cy.get('.b-list').eq(2).contains('Contacts');
      cy.get('.b-list').eq(2).contains('Price');
      cy.get('.b-list').eq(2).should('have.css', 'color', 'rgb(0, 0, 0)');
      cy.get('ol.b-list');
    })
    it('should be able to delete the root element after duplication', () => {

      cy.get('.b-list').eq(0).trigger('mouseover');
      cy.get('.b-list .b-action-remove').eq(0).click();

      cy.get('.b-list').should('have.length', 1)
      cy.get('.b-list').should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('ol.b-list');
    })
    it('should correctly position the new duplicated element', () => {

      cy.get('.b-list').eq(1).trigger('mouseover');
      cy.get('.b-list .b-action-duplicate').eq(1).click();
    
      cy.get('.b-list').eq(1).click()
      
      cy.get('.b-style-color').clear();
      cy.get('.b-style-color').type('rgb(85, 85, 85)');

      cy.get('.b-list-text').eq(0).clear();
      cy.get('.b-list-text').eq(0).type('Bye');

      cy.get('.b-tag-element').clear();
      cy.get('.b-tag-element').type('ul');

      cy.get('.b-list').eq(1).trigger('mouseover');
      cy.get('.b-list .b-action-duplicate').eq(1).click();

      cy.get('.b-list').eq(0).contains('Hello');
      cy.get('.b-list').eq(0).should('have.css', 'color', 'rgb(85, 85, 85)');

      cy.get('.b-list').eq(1).contains('Bye');
      cy.get('.b-list').eq(1).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('ul.b-list').eq(0);

      cy.get('.b-list').eq(2).contains('Bye');
      cy.get('.b-list').eq(2).should('have.css', 'color', 'rgb(85, 85, 85)');
      cy.get('ul.b-list').eq(1);
      
      cy.get('.b-list').eq(3).contains('Hello');
      cy.get('.b-list').eq(3).should('have.css', 'color', 'rgb(85, 85, 85)');
    })
  });
})
