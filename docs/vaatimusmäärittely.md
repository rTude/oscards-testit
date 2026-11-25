# Oscards – vaatimusmäärittely

## 1. Tarkoitus

Oscards on selainpohjainen sovellus, joka esittelee Oscar-palkittuja näyttelijöitä, ohjaajia ja elokuvia.
Käyttäjä voi tutustua elokuvien perustietoihin, tarkistaa suoratoistopalveluita ja tallentaa elokuvia suosikeiksi.

## 2. Käyttäjät

Sovelluksen käyttäjiä ovat elokuvista, näyttelijöistä, ohjaajista ja
Oscar-palkinnoista kiinnostuneet henkilöt. Käyttö ei vaadi kirjautumista tai
käyttäjätiliä.

## 3. Toiminnalliset vaatimukset

### 3.1 Navigointi

- Etusivulta tulee päästä näyttelijöiden ja ohjaajien sivuille.
- Käyttäjä voi palata etusivulle jokaiselta sivulta.
- Käyttäjä voi siirtyä suosikkisivulle.
- Käyttäjä voi avata credits-sivun.

### 3.2 Näyttelijät ja ohjaajat

- Näyttelijät tulee näyttää kortteina.
- Ohjaajat tulee näyttää kortteina.
- Kortissa tulee näyttää henkilön nimi, kuva, syntymäaika,
  kansallisuus, Oscar-ehdokkuudet, Oscar-voitot ja elokuvien määrä.
- Henkilökortteja tulee voida selata karusellissa.
- Henkilön valitseminen näyttää hänen elokuvansa.

### 3.3 Elokuvat

Elokuvakortissa tulee näyttää:

- elokuvan nimi,
- julkaisuvuosi,
- kesto,
- IMDb-arvosana,
- Oscar-voittojen määrä ja
- elokuvan posterikuva.

Elokuvien tulee olla selattavissa karusellissa. Jos elokuva on saatavilla
suoratoistopalvelussa, palvelun nimi tai kuvake tulee näyttää linkkinä.
Jos palvelua ei ole tiedossa, näytetään ilmoitus `Not available`.

### 3.4 Suosikit

- Käyttäjä voi lisätä elokuvan suosikkeihin.
- Käyttäjä voi poistaa elokuvan suosikeista.
- Käyttäjälle näytetään ilmoitus lisäyksen tai poiston jälkeen.
- Suosikit näytetään omalla suosikkisivulla.
- Tyhjä suosikkilista näyttää ilmoituksen `No favorites yet`.
- Suosikkielokuvan tiedot voidaan avata tarkempaan näkymään.
- Suosikit säilyvät vähintään nykyisen käyttöistunnon ajan.

### 3.5 Credits

Credits-sivulla tulee näyttää:

- sovelluksen tekijät,
- käytettyjen kuvien lähteet ja
- käytetyt verkkopalvelut tai rajapinnat.

Tietoryhmiä tulee voida avata ja sulkea.

## 4. Sivut

| Reitti | Sisältö |
| --- | --- |
| `/` | Etusivu ja kategorioiden valinta |
| `/actors` | Näyttelijät ja heidän elokuvansa |
| `/directors` | Ohjaajat ja heidän elokuvansa |
| `/favorites` | Käyttäjän suosikkielokuvat |
| `/about` | Credits-tiedot |

## 5. Tietovaatimukset

Sovellus tarvitsee henkilötiedoista vähintään:

- nimen,
- kuvan,
- syntymäajan,
- kansallisuuden,
- Oscar-ehdokkuuksien määrän,
- Oscar-voittojen määrän ja
- elokuvien määrän.

Sovellus tarvitsee elokuvatiedoista vähintään:

- nimen,
- vuoden,
- keston,
- IMDb-arvosanan,
- Oscar-voittojen määrän,
- yksilöivän tunnisteen ja
- suoratoistopalveluiden tiedot.

## 6. Ei-toiminnalliset vaatimukset

- Sovelluksen tulee toimia nykyaikaisella verkkoselaimella.
- Käyttöliittymän tulee toimia tietokoneella ja mobiililaitteella.
- Käyttöliittymän tulee olla selkeä ja yhdenmukainen.
- Tekstin ja taustan kontrastin tulee olla riittävä.
- Painikkeiden tulee olla helposti tunnistettavia ja käytettäviä.
- Sovellus ei saa vaatia henkilötietoja tai kirjautumista.
- Ulkoisen kuvalähteen ongelma ei saa estää muun sisällön käyttöä.
- Sovelluksen tulee toteuttaa SvelteKitillä, TypeScriptillä ja Tailwind CSS:llä.

## 7. Rajaukset

Tähän versioon eivät kuulu:

- käyttäjätilit ja kirjautuminen,
- tietojen ylläpito sovelluksen käyttöliittymästä,
- elokuvien ostaminen tai varaaminen,
- vapaa tekstihaku,
- käyttäjien omat arviot ja kommentit sekä
- suosikkien pilvitallennus.

## 8. Hyväksymiskriteerit

Sovellus hyväksytään, kun:

1. kaikki määritellyt sivut avautuvat,
2. näyttelijöitä ja ohjaajia voi selata,
3. henkilön valinta näyttää oikeat elokuvat,
4. elokuvan perustiedot näkyvät,
5. elokuvan voi lisätä ja poistaa suosikeista,
6. tyhjä ja täytetty suosikkilista toimivat,
7. suoratoistopalveluiden linkit toimivat,
8. käyttöliittymä toimii mobiili- ja työpöytänäkymässä ja
9. sovellus voidaan rakentaa ja tarkistaa projektin npm-komennoilla.
