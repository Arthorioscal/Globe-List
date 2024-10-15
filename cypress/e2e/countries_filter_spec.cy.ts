describe ('Countries List filters' , () => {
  it ('search by name' , () => {
    cy.visit('http://localhost:5173/')

    cy.get('#nameFilter').type('Andorra');

    cy.contains('🇦🇩 Andorra - Andorra la Vella (Catalan)').should('exist');
    cy.contains('🇦🇶 Antarctica - ()').should('not.exist');
    cy.contains('🇧🇪 Belgium - Brussels (Dutch, French, German)').should('not.exist');
    cy.contains('🇧🇷 Brazil - Brasília (Portuguese)').should('not.exist');
  });

  it ('search by capital' , () => {
    cy.visit('http://localhost:5173/')

    cy.get('#capitalFilter').type('Brussels');

    cy.contains('🇧🇪 Belgium - Brussels (Dutch, French, German)').should('exist');
    cy.contains('🇦🇩 Andorra - Andorra la Vella (Catalan)').should('not.exist');
    cy.contains('🇦🇶 Antarctica - ()').should('not.exist');
    cy.contains('🇧🇷 Brazil - Brasília (Portuguese)').should('not.exist');
  });

  it ('search by language' , () => {
    cy.visit('http://localhost:5173/')

    cy.get('#languageFilter').select('Portuguese');

    cy.contains('🇧🇷 Brazil - Brasília (Portuguese)').should('exist');
    cy.contains('🇦🇩 Andorra - Andorra la Vella (Catalan)').should('not.exist');
    cy.contains('🇦🇶 Antarctica - ()').should('not.exist');
    cy.contains('🇧🇪 Belgium - Brussels (Dutch, French, German)').should('not.exist');
  });
});