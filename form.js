var keys = ["Q", "W", "E", "R"];
var newGame = false;

// Generic request function
function sendRequest(onload, url) {
	var ajax = new XMLHttpRequest();
	ajax.onload = onload;
	// ajax.onerror = displayError;
	ajax.open("GET", url, true);
	ajax.send();
}

// API request function
function getData() {
	sendRequest(returnSpells, api);
}

// Add options to textfield input
function addChampsToField(datalist){
  for (var key in champs_json.data) {
      if (champs_json.data.hasOwnProperty(key)) {
        var curr_key = key;
        var opt = document.createElement("OPTION");
        opt.innerHTML = curr_key;

        datalist.appendChild(opt);
      }
  }
}

// Add textfields for champion name input
function addFields(){
  var container = document.getElementById("container");
  var numOfPlayers = 10;
	document.getElementById("submit").disabled = true;
  getData(); // Get the spells from API first

	// No textfields -> make textfields
  if (!newGame) {
    for (var i=0; i<numOfPlayers; i++) {
      var input = document.createElement("INPUT");
      var datalist = document.createElement("DATALIST");
      input.setAttribute("class", "champInput");
      input.setAttribute("id", "champInput" + i);
      input.setAttribute("list", "champions" + i);
      input.setAttribute("placeholder", "Champion " + (i+1));
      datalist.setAttribute("id", "champions" + i);
      addChampsToField(datalist);
      container.appendChild(input);
      container.appendChild(datalist);
    }
    document.getElementById("submit").style.display = "inline-block";
    newGame = true;
  }

	// Textfields -> clear existing ones
	else {
    var inputs = document.getElementsByClassName("champInput");
    for (var i=0; i<inputs.length; i++) {
      inputs[i].value = "";
    }
    document.getElementById("results").innerHTML = "";
  }
}

function getNames() {
  var champsList = document.getElementsByClassName("champInput");
  var results = document.getElementById("results");

  for (var i=0; i < champsList.length; i++) {
    var curr_champ = document.getElementsByClassName("champInput")[i].value;
    var curr_spells = [];
    for(var j=0; j<4; j++) {
      curr_spells.push(spellData.data[curr_champ].spells[j].name);
    }

    var champBox = document.createElement("DIV");
    var champImg = document.createElement("IMG");
    var champName = document.createElement("H1");

    champBox.setAttribute("id", "champ");
    champName.innerHTML = curr_champ;
    champImg.setAttribute("src", "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + curr_champ + "_0.jpg");

    champBox.appendChild(champImg);
    champBox.appendChild(champName);

    for(var k=0; k<4; k++) {
      var spell = document.createElement("P");
      spell.innerHTML = keys[k] + ": " + curr_spells[k];
      champBox.appendChild(spell);
    }

    results.appendChild(champBox);
	}
}

function returnSpells() {
  spellData = JSON.parse(this.responseText);

	// Enable button after complete spell retrieval
	document.getElementById("submit").disabled = false;
}
