describe('View Countries List', () => {
  it('successfully display a list of countries', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Loading...').should('not.exist');

    cy.contains('🇦🇩 Andorra - Andorra la Vella (Catalan)').should('exist');
    cy.contains('🇦🇶 Antarctica - ()').should('exist');
    cy.contains('🇧🇪 Belgium - Brussels (Dutch, French, German)').should('exist');
    cy.contains('🇧🇷 Brazil - Brasília (Portuguese)').should('exist');
  });
});
