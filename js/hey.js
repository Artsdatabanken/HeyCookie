/**
 * Informasjonskapselvarsel for Artsdatabanken
 * @type {*|{hey, init}}
 */
window.heyCookie = window.heyCookie || (function(){
  var settings = {
    notice: 'Denne siden bruker informasjonskapser', // Informasjonsteksten
    btnText: 'OK', // Knappetekst
    lnkText: 'Les mer', // Lenketekst
    lnkHref: 'https://example.com', // lenkemål
    lsId: 'heyCookie', // Id brukt av localstorage
    className: 'heyCookie', // Klassen infoboksenbruker
  };

  // Les settings satt direkte på script-elementet
 var script = document.querySelector('script[src*="hey.js"], script[src*="hey.mini.js"]');
 if (script && script.dataset) {
   Object.keys(script.dataset).forEach(function(k){
     settings[k] = script.dataset[k];
   })
 }

  // Lag infoboks, sett events på knapp
  var sayHey = function() {
    var hey = document.createElement('DIV');
    hey.className = settings.className;
    hey.innerHTML = settings.notice;
    var btn = document.createElement('BUTTON');
    btn.innerText = settings.btnText;
    var lnk = document.createElement('A');
    lnk.href = settings.lnkHref;
    lnk.innerText = settings.lnkText;

    hey.appendChild(btn);
    hey.appendChild(lnk);
    document.body.appendChild(hey);

    // Bruk gammel event syntax for mest mulig bakoverkkompabilitet
    btn.onclick = doIt;
    btn.onkeydown = doIt;
  };

  // Snurr film! Sett localstorage og fjern infoboks.
  var doIt = function(e){
    e.preventDefault();
    if (e.type === 'keydown' && 'Enter Spacebar'.indexOf(e.key) < 0) return; // Overse alle taster untatt enter og mellomrom.
    window.localStorage.setItem(settings.lsId,'1');
    document.body.removeChild(document.querySelector('div.heyCookie')); // Fjern infoboksen.
  };

  // Funksjonalitet eksponert for nettsiden
  return {
    hey: function(){
      if (window.localStorage.getItem(settings.lsId)) {
        return; //Good good, bruker har godtatt informasjonskapsler
      }
      sayHey(); // Plag brukeren med infoboks.
    },
    init: function(obj){
      Object.keys(obj).forEach(function(k){
        settings[k] = obj[k];
      })
    }
  }

})();

window.onload = window.heyCookie.hey; // Snurr film når siden har lasta.