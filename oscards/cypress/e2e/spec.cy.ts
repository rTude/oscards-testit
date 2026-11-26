/// <reference types="cypress" />
describe('Oscards', () => {
	beforeEach(() => {
		cy.intercept('https://imdb.iamidiotareyoutoo.com/**', {
			statusCode: 200,
			body: { description: [] }
		});
		cy.visit('/');
	});

	// Testaa siirtymisen etusivun, näyttelijöiden, ohjaajien, suosikkien ja credits-sivun välillä.
	it('navigates between the main pages and returns home', () => {
		cy.contains('a', 'Actors').click();
		cy.wait(500);
		cy.location('pathname').should('equal', '/actors');
		cy.get('[data-cy="carousel-desktop-actors"] [data-cy="person-card"]').should(
			'contain.text',
			'Matthew McConaughey'
		);

		cy.get('a[href="/"]').first().click();
		cy.wait(500);
		cy.location('pathname').should('equal', '/');
		cy.contains('a', 'Directors').click();
		cy.wait(500);
		cy.location('pathname').should('equal', '/directors');
		cy.get('[data-cy="carousel-desktop-directors"] [data-cy="person-card"]').should(
			'contain.text',
			'Martin Scorsese'
		);

		cy.get('a[href="/favorites"]').click();
		cy.wait(500);
		cy.location('pathname').should('equal', '/favorites');
		cy.contains('No favorites yet').should('be.visible');

		cy.contains('a', 'Credits').click();
		cy.wait(500);
		cy.location('pathname').should('equal', '/about');
	});

	// Testaa credits-sivun tietoryhmien avaamisen ja sulkemisen sekä lähdelinkit.
	it('opens and closes credits information groups', () => {
		cy.visit('/about');
		cy.get('img[alt="credits"]').should('be.visible');
		cy.wait(1000);
		cy.contains('button', 'Creators').should('be.visible').click();
		cy.wait(500);
		cy.contains('Tuomas Huhtala').should('be.visible');
		cy.contains('button', 'Creators').click();
		cy.wait(500);
		cy.contains('Tuomas Huhtala').should('not.exist');

		cy.contains('button', 'Actors').click();
		cy.wait(500);
		cy.contains('a', 'Matthew McConaughey').should(
			'have.attr',
			'href',
			'https://commons.wikimedia.org/wiki/File:Matthew_McConaughey_2019_(48648344772).jpg'
		);

		cy.contains('button', 'Web Pages').click();
		cy.wait(500);
		cy.contains('a', 'Wikimedia.org').should('be.visible');
		cy.contains('a', 'API').should('have.attr', 'href', 'https://imdb.iamidiotareyoutoo.com/');
	});

	// Testaa henkilökortin tiedot, henkilön valinnan, elokuvatiedot ja suoratoiston saatavuuden.
	it('selects a person and displays movie details and streaming availability', () => {
		cy.visit('/actors');
		cy.get('[data-cy="carousel-desktop-actors"] [data-cy="person-card"]')
			.first()
			.should('contain.text', 'Matthew McConaughey')
			.within(() => {
				cy.contains('B. 4.11.1969').should('be.visible');
				cy.contains('American').should('be.visible');
				cy.contains('Total movies: 50-60').should('be.visible');
				cy.contains('Oscar nominations: 1').should('be.visible');
				cy.contains('x 1').should('be.visible');
				cy.get('img[alt="kuva"]').should('have.attr', 'src').and('include', 'upload.wikimedia.org');
			});
		cy.get('[data-cy="carousel-desktop-actors"] [data-cy="person-card"]').first().click();
		cy.wait(1000);

		cy.get('[data-cy="carousel-desktop-Matthew McConaughey"] [data-cy="movie-card"]')
			.first()
			.within(() => {
				cy.contains('Dallas Buyers Club').should('be.visible');
				cy.contains('Year: 2013').should('be.visible');
				cy.contains('1h 57min').should('be.visible');
				cy.contains('IMDb rating: 7.9').should('be.visible');
				cy.contains('x 3').should('be.visible');
				cy.contains('Not available').should('be.visible');
				cy.get('img[alt="Poster"]').should('exist');
			});

		cy.get('[data-cy="carousel-next-Matthew McConaughey"]').click();
		cy.wait(1000);
		cy.get('[data-cy="carousel-desktop-Matthew McConaughey"] [data-cy="movie-card"]')
			.eq(1)
			.within(() => {
				cy.contains('Interstellar').should('be.visible');
				cy.get('a[href="https://www.netflix.com/"]').should('exist');
				cy.get('a[href="https://viaplay.fi/"]').should('exist');
			});
	});

	// Testaa, että ohjaajan valinta näyttää hänen elokuvansa ja tunnetun suoratoistopalvelun.
	it('shows the selected director’s movies', () => {
		cy.visit('/directors');
		cy.get('[data-cy="carousel-desktop-directors"] [data-cy="person-card"]')
			.first()
			.should('contain.text', 'Martin Scorsese')
			.click();
		cy.wait(1000);

		cy.get('[data-cy="carousel-desktop-Martin Scorsese"] [data-cy="movie-card"]')
			.first()
			.within(() => {
				cy.contains('The Departed').should('be.visible');
				cy.contains('Year: 2006').should('be.visible');
				cy.get('a[href="https://viaplay.fi/"]').should('exist');
			});
	});

	// Testaa henkilökarusellissa siirtymisen ja toisen näyttelijän elokuvien avaamisen.
	it('moves through the person carousel and selects another actor', () => {
		cy.visit('/actors');
		cy.get('[data-cy="carousel-desktop-actors"] [data-cy="person-card"]').should(
			'contain.text',
			'Matthew McConaughey'
		);
		cy.get('[data-cy="carousel-next-actors"]').click();
		cy.wait(1000);
		cy.get('[data-cy="carousel-desktop-actors"] [data-cy="person-card"]')
			.contains('Emma Stone')
			.click();
		cy.wait(500);

		cy.get('[data-cy="carousel-desktop-Emma Stone"] [data-cy="movie-card"]')
			.first()
			.should('contain.text', 'La La Land');
	});

	// Testaa suosikin lisäämisen, ilmoituksen, säilymisen sivusiirtymässä, tietojen avaamisen ja poiston.
	it('adds a favorite, keeps it during navigation, opens details, and removes it', () => {
		cy.visit('/actors');
		cy.get('[data-cy="carousel-desktop-actors"] [data-cy="person-card"]')
			.first()
			.should('contain.text', 'Matthew McConaughey')
			.click();
		cy.wait(500);
		cy.get('[data-cy="carousel-desktop-Matthew McConaughey"] [data-cy="movie-card"]')
			.first()
			.find('[data-cy="favorite-toggle"]')
			.click();
		cy.wait(500);
		cy.contains('Added to favorites').should('be.visible');

		cy.get('a[href="/favorites"]').click();
		cy.wait(500);
		cy.get('[data-cy="carousel-desktop-favorites"] [data-cy="favorite-card"]').should(
			'have.length',
			1
		);
		cy.get('[data-cy="carousel-desktop-favorites"] [data-cy="favorite-card"]')
			.first()
			.find('button')
			.first()
			.click();
		cy.wait(500);
		cy.contains('Dallas Buyers Club').should('be.visible');
		cy.contains('IMDb rating: 7.9').should('be.visible');

		cy.get('[data-cy="close-movie-details"]').click();
		cy.wait(500);
		cy.get('[data-cy="carousel-desktop-favorites"] [data-cy="favorite-card"]')
			.first()
			.find('[data-cy="remove-favorite"]')
			.click();
		cy.wait(500);
		cy.contains('Removed from favorites').should('be.visible');
		cy.contains('No favorites yet').should('be.visible');
	});

	// Testaa, että mobiilinäkymässä näkyy mobiilille tarkoitettu henkilökaruselli.
	it('keeps the person carousel usable on mobile-sized screens', () => {
		cy.viewport('iphone-6');
		cy.visit('/actors');
		cy.wait(500);
		cy.get('[data-cy="carousel-mobile-actors"]').should('be.visible');
		cy.get('[data-cy="carousel-desktop-actors"]').should('not.be.visible');
		cy.get('[data-cy="person-card"]').first().should('be.visible');
	});
});
