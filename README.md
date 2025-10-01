# U06-i-JQuery

## Beskrivning
Denna applikation är en enkel todo app konverterad från vanilla JavaScript till jQuery. Applikationen låter användaren:
- Skapa nya todos
- Ändra befintliga todos
- Ta bort todos
- Filtrera todos (alla, färdiga, ej färdiga)

Varje todo kan ha:
- Titel
- Beskrivning
- Färdig-status
- Deadline

Applikationen är kopplad till ett REST API som hanterar alla CRUD-funktioner.

## Installation
Detta projekt har inga installationer förutom att man måste veta hur man gör en live preview. Detta gör man genom att högerklicka `index.html` sen öppna med live preview.

## Backend (U05)
1. Klona u05 repot
2. Installera det som behövs:
   ```bash
   npm install
   ```
3. Kör servern:
   ```bash
   npm run dev
   ```

Eller så kan man använda den deployade URL: https://u05restfulapi.onrender.com

- HTML5
- CSS3
- jQuery 3.7.1
- REST API

## jQuery Konverteringar
Följande vanilla JavaScript funktioner har konverterats till jQuery:
- `document.getElementById()` → `$("#id")`
- `document.querySelectorAll()` → `$(".class")` eller `$("element")`
- `document.createElement()` → `$("<element>")`
- `element.addEventListener()` → `$(element).on()`
- `fetch()` → `$.ajax()`
- DOM manipulation → jQuery metoder (`.append()`, `.empty()`, `.text()`, etc.)

## Länkar
- Original vanilla frontend: https://github.com/chas-academy/u06-vanilla-frontend-Atilla1907
- Backend u05: https://u05restfulapi.onrender.com
- Figma skiss: https://www.figma.com/design/5v3DzukF6TLA1qra9hk9ZM/to-do-list-lowfi?node-id=0-1&p=f&t=hIjG3084MbPrkuYD-0