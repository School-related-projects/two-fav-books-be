# Individuele opdracht Back-end Favorite Books API
LEIDEN, 10-03-2025

Eleonora A. 20220545

## Rest-API, back-end, test resultaten

Ontwerp en implementeer de essentiële functionaliteit voor CRUD API's en de back-end applicatie die kan communiceren
met je front-end applicatie van sprint 1. Volg hierbij de stappen zoals aangegeven in de literatuur van deze sprint.

### Minimumeisen voor een voldoende:

Werk uit en documenteer de stappen 1 t/m 7 en 10 uit de literatuur.

### Extra:

- Naast de gevraagde API-documentatie zoals beschreven in stap 5 van de literatuur,
  maak een Swagger/OpenAPI-specificatie voor je API's, exporteer deze en voeg indien mogelijk een link naar de documentatie
  toe in je ontwerpdocument.
- Werkt uit de stappen 8 en 9 uit zoals beschreven in de literatuur en documenteer deze.

### Oplevering (week 6):

- Lever je applicatie in als een zip-bestand.
- LET OP! Bij het zippen van je back-end app, voeg het mapje node_module niet toe!
- Vul het ontwerpdocument BE in volgens de bijgevoegde template  (als word-bestand, maximaal 20 pagina's).
- Vul verder het logboek uit sprint 1 in met de informatie over sprint 2 (als word-bestand, maximaal 10 pagina's).

### LET OP!

Voor de herkansing kun je de volgende documenten inleveren:

Ontwerpdocument als word-bestand + sourcecode + logboek als zip-bestand.

Voor zowel het ontwerpdocument als het logboek geldt dat je de wijzigingen in een aparte paragraaf zet genaamd: "Herkansing".


# Literatuur back-end:

In deze sprint maak je kennis met de basisingrediënten van de backend development:

- HTTP en de request/response cycle: het protocol voor communicatie tussen front- en backend.
- RESTful APIs: backend endpoints die resources representeren.
- Het JSON-formaat: het opmaakformaat dat als intermediair dient in de communicatie tussen front- en backend.
- Back-end technologie /frameworks.

**Je gaat dit doen door een aantal stappen te volgen.**

## Stap 1: Introductie tot de basisconcepten

Neem de volgende informatie over het HTTP-protocol door:

- https://www.tutorialspoint.com/http/index.htm  of HTTP explained

Bekijk de volgende filmpjes:

- What is an API?
- Wat is a RESTful API?
- How to use an API?
- JSON-files

Deze concepten zijn nu nog wat abstract, maar we zullen deze later gaan implementeren in onze eigen backend.


## Stap 2: Installeren van een JSON-server

Zorg dat je node.js geïnstalleerd hebt op je computer.

Om API's te ontwerpen en testen, ga je eerst een Mock-server in de vorm van een JSON-server op je computer (lokaal dus) aanmaken.
Informatie over hoe je dat kunt doen vind je hier.
Gebruik de data uit je frontend applicatie die je in de eerste sprint als een apart JS-bestand had aangemaakt.
Installeer en configureer een JSON-server op je computer.


## Stap 3: Oefen met het testen van een API

Bestudeer materiaal van /over Postman om thuis te raken in de manier waarop je met Postman de werking van API's kunt ontwerpen, onderzoeken en testen.
Een goed startpunt hiervoor is het Postman Learning Center (met daarin de Postman Exploratory: videofilmpjes met zgn.
"Collections" die je kunt downloaden en bewerken.
Kijk bijvoorbeeld naar Writing Tests in Postman - with Examples.
Zorg ervoor dat je voor je eigen dataset (zie stap 2) weet hoe je:

- Queries kunt maken
- Tests kunt schrijven
- Collections kunt aanmaken
- Kunt werken met omgevingsvariabelen zodat je de URL als een variabele kunt meegeven
- Zie bv. How to use Postman environments


## Stap 4: Ontwerp je API

Alvorens de implementatie van de API dien je deze eerst te ontwerpen /te maken. Dit doen we door EERST de tests te
ontwerpen en DAARNA de endpoints van de backend-server zo aan te maken dat ze de verwachte responses genereren.
Denk na over de volgende zaken:

- Welke resources moet je toegankelijk maken via een endpoint?
- Welke van deze resources zijn collecties en welke zijn individuele items?
- Zit er hiërarchie in de resources?
- Welke operaties (HTTP methods) dien je te kunnen uitvoeren op de resources?
- Welke parameters zijn er nodig per operatie?
- Wat stuur je als respons? Let op: om RESTful te zijn, stuur je altijd een representatie terug van een resource.
- Waar kunnen er potentiele afwijkingen (exceptions) afgedekt /optreden?
- Heb je met je design alle interacties afgedekt die je nodig hebt voor je frontend-applicatie?

Creëer in Postman een "Collection" om een aantal API's te implementeren en testen voor jouw eigen verzamelapplicatie uit sprint 1.
Kies API's die je essentieel acht en die de basis CRUD-functionaliteiten ondersteunen.
Voer deze stap uit op de server die je hebt opgebouwd in stap 2.
Exporteer je Postman "collection" en lever dat in als bewijsmateriaal.


## Stap 5: Documenteer je API

Bij het documenteren van je API dien je aandacht te besteden aan de volgende aspecten:

- Beschrijving van Resources
- Parameters, inclusief eventuele querystring-parameters en headers
- Voorbeeld van een Request
- Voorbeeld van een Response en het schema/error-handling
- Authenticatieprotocollen (eventueel)

**Documentatie API's:**

Section	Description
Description	This API manages a collection of favorite books
Authentication	None required
Base URL 	http://localhost:8000/api

##### Endpoints	
- /api/books: Get all books (GET), add a new book (POST)
- /api/books/:id: Get specific book (GET), update a book (PUT), delete a book (DELETE)
  Resource model	- books: id, title, author, year, genre, summary, cover
  Request Method	GET, POST, PUT, DELETE
  Parameters	- /api/books (GET): None
- /api/books (POST): Book data in the request body
- /api/books/:id (GET): id path parameter
- /api/books/:id (PUT): id path parameter and updated fields in request body
- /api/books/:id (DELETE): id path parameter
  Response Format	JSON
  Error Handling	- 200 OK: Successful response
- 201 Created: Book successfully created
- 400 Bad Request: Invalid request data
- 404 Not Found: Book not found 
- 500 Internal Server Error: Server issue

##### Example Requests/Responses	
- Request: GET /api/books
Response:
`  [{
  "id":"1678954321",
  "title":"To Kill a Mockingbird",
  "author":"Harper Lee",
  "year":1960,
  "genre":"Fiction"
  }]`
- Request: GET /api/books/13
- Response:
`  {
  "id":"13",
  "title":"To Kill a Mockingbird",
  "author":"Harper Lee"
  }`
- Request: POST /api/books
- Request Body:
`  {
  "title":"The Great Gatsby",
  "author":"F. Scott Fitzgerald"
  }`
- Response:
`  {
  "id":"1678954323","title":"The Great Gatsby"
  }`
- Request: PUT /api/books/:id
- Request Body:
`  {
  "genre":"Psychological Fiction"
  }`
- Response: Updated book object
- Request: DELETE /api/books/:id
- Response:` {"message":"Book deleted successfully"}`


## Stap 6: Implementeer de API in een back-end framework

Voor de back-end van je applicatie ga je gebruik maken van het framework Express. Dit is een web framework dat draait op Node.js.
Node.js is een JavaScript runtime die op de back-end kan draaien (tot nu toe heb je alleen JavaScript runtimes gezien in je browser).
Een korte uitleg over express.js vind je hier.

Implementeer de back-end  van je applicatie in Express.js met de data uit opgeslagen in a JSON-server /file.

NB
Voor deze opdracht een hard-coded implementatie van je data is voldoende (de data wordt nog niet persistent opgeslagen in een database).


## Stap 7: Test je API-server

Draai de Postman-collection die je in stap 4 hebt aangemaakt en stel je implementatie (en/of je testscript) bij totdat
alle tests goed worden doorlopen (je draait de server bij deze stap lokaal). Documenteer je resultaten.


## Stap 8: (extra) Werken met ORM (Object Relational Mapping)

Tot zover ben je in staat om een RESTful API te geïmplementeerd in Express. De werking van de endpoints is daarbij hard-coded geïmplementeerd:
bij een request wordt steeds dezelfde respons teruggestuurd. Of je hebt ervoor gekozen om de state bij te houden in de code van je backend
(in dat geval kun je bv. niet twee keer hetzelfde object aanmaken: de tweede keer krijg je als respons dat het object al bestaat).
Het bijhouden van de state in variabelen van je backend-code betekent dat je wijzigingen kwijt bent als je de backend herstart.
In deze stap zullen we de persistentie van data delegeren naar een externe database.
Om te voorkomen dat er een harde koppeling ontstaat tussen de database en je applicatie, gebruikt men in de regel een ORM.
Dit stelt je in staat om op een object georiënteerde manier te interacteren met de datalaag (i.p.v SQL statements te schrijven).
Voor deze applicatie zullen we gebruik maken van Sequelize.js. Verdere informatie over hoe je sequelize.js kunt implementeren in Node.js is te vinden hier of hier.

In een relationele database wordt data opgeslagen in genormaliseerde tabellen. De eerste stap bij het ontwerpen is dat
je identificeert welke tabellen er nodig zijn en hoe de relaties tussen deze tabellen zijn (in de vorm van foreign keys).
Dit ontwerp leg je vast in een ERD in je ontwerpdocument BE.
Voor de opdracht kan het zijn dat je maar één tabel nodig hebt. Leg dan in ieder geval wel vast welke attributen je nodig
hebt en welke datatypes je gebruikt. Je mag zelf kiezen welke database je gaat gebruiken.

Er zijn verschillende manieren hoe je een connectie kan maken tussen je backend (Express.js) en je database.
Uitleg voor hoe je een connectie tussen Express.js met een SQLite database kan maken vind je hier en een ander voorbeeld hier.

Zet je hardcoded data om naar een relationeel database. Je mag zelf je database kiezen. Integreer in je
Express.js code de connectie met de database door middel van Sequelize.js.


## Stap 9: (extra) Deploy je server in Azure en draai de tests opnieuw

In deze stap breng je je server live in Azure, zodat hij ook door de docenten kan worden getest. Let op, dit is een extra stap.
Bij project moet de webapplicatie wel in Azure draaien.

Voeg een omgevingsvariabele toe aan je testscript, zodat je alleen deze variabele hoeft te wijzigen om voor het testen
te schakelen tussen lokaal en cloud. Maak screenshots van de tests in de cloud-omgeving zet die in ontwerpdocument BE samen met een link naar app.

Deploy je back-end applicatie in Azure. Gebruik hiervoor je student-account.

## Stap 10: Sluit de front-end applicatie aan op de API

Nu de backend is geïmplanteerd, wordt het tijd om de front-end applicatie hiermee te koppelen.
Vervang daartoe in de front-end alle verwijzingen naar hard-coded data met de juiste HTTP verzoeken naar de back-end API.
Vanuit veiligheidsoverwegingen is het in de regel niet mogelijk dat applicaties over verschillende domein met elkaar kunnen communiceren (same-origin policy).
Omdat over het algemeen de back-end applicatie op een ander domein draait als je front-end applicatie, krijg je hiermee te maken. Om toch interactie tussen front-end en back-end te kunnen realiseren, dien je daarom CORS te configureren in de backend (de wijze waarop varieert per framework).

Pas je front-end applicatie van sprint 1 aan, zodat deze de gegevens van je verzameling ophaalt uit de back-end.


---------------------------
# Documentatie

## Hoe start je het project op

1. Clone het project
2. Installeer de dependencies met `npm install`
3. Start de server door te navigeren naar {`cd two-fav-books-be/src`} met `npm start`
4. De server draait op `http://localhost:8000`
    - navigeer naar de folder src {`cd two-fav-books-be/src`} en voer het volgende commando uit: `json-server ./data/books.json --port 8000`
    - json-server ./data/books.json --port 8000 --watch
5. De API kan je testen met Postman
6. De API documentatie kan je vinden in de map `docs`
7. De Swagger/OpenAPI-specificatie kan je vinden in de map `swagger`
