var pokemon_name;
var pokemon_move1;
var pokemon_move2;
var pokemon_move3;
var pokemon_move4;

$(document).ready(function () {
  PokemonInfo();
});
function PokemonInfo() {
$('#pokeInfo').empty();
var itemList = $('#pokeInfo');
var uniqueID = localStorage.getItem("uniqueID");
$.ajax({
        type: 'GET',
        url: 'http://localhost:8080/store/pokemon/' + uniqueID,

        success: function(pokemon) {
                var name = pokemon.pokeID;
                var hp = pokemon.hp;
                var speed = pokemon.speed;
                var spDefense = pokemon.spDefense;
                var spAttack = pokemon.spAttack;
                var attack = pokemon.attack;
                var defense = pokemon.defense;
                var move1 = pokemon.moveID_1;
                var move2 = pokemon.moveID_2;
                var move3 = pokemon.moveID_3;
                var move4 = pokemon.moveID_4;

                console.log(move3);
                var items = '<h1 class="text-center">' + getPokemonNameByID(name) + '</h1>';
                items += '<hr style="border-top:2px solid">';
                items += '<br>';
                items += '<h2 class="text-center">' + "Stats" + '</h2>';
                items += '<hr style="border-top:2px solid; width: 100px">';
                items += '<br>';
                items += '<h3 class="text-center">' + "HP: " + hp + '</h3>';
                items += '<br>';
                items += '<h3 class="text-center">' + "Attack: " + attack + '</h3>';
                items += '<br>';
                items += '<h3 class="text-center">' + "Defense: " + defense + '</h3>';
                items += '<br>';
                items += '<h3 class="text-center">' + "Sp.Attack: " + spAttack + '</h3>';
                items += '<br>';
                items += '<h3 class="text-center">' + "Sp.Defense: " + spDefense + '</h3>';
                items += '<br>';
                items += '<h3 class="text-center">' + "Speed: " + speed + '</h3>';
                items += '<br><br>';
                items += '<h2 class="text-center">' + "Moves" + '</h2>';
                items += '<hr style="border-top:2px solid; width: 100px">';
                items += '<br>';
                if (getMove1ByPokemonID(uniqueID) != "" && getMove1ByPokemonID(uniqueID) != "N/A") {
                items += '<h3 class="text-center">' + getMove1ByPokemonID(uniqueID) + '</h3>';
                items += '<br>';
              }
                if (getMove2ByPokemonID(uniqueID) != "" && getMove2ByPokemonID(uniqueID) != "N/A") {
                items += '<h3 class="text-center">' + getMove2ByPokemonID(uniqueID) + '</h3>';
                items += '<br>';
              }
                if (getMove3ByPokemonID(uniqueID) != "" && getMove3ByPokemonID(uniqueID) != "N/A") {
                items += '<h3 class="text-center">' + getMove3ByPokemonID(uniqueID) + '</h3>';
                items += '<br>';
              }
                if (getMove4ByPokemonID(uniqueID) != "" && getMove4ByPokemonID(uniqueID) != "N/A") {
                items += '<h3 class="text-center">' + getMove4ByPokemonID(uniqueID) + '</h3>';
                items += '<br>';
              }
                items += '<button type="button" id="back" style="margin-left:730px"class="btn btn-primary" onClick="backUserPage()">Back</button>';
                itemList.append(items);
            },
      // Have an error be displayed in the event that their is a problem
      // connecting to the web service.
      error: function() {
          $('#errorMessages')
              .append($('<li>')
              .attr({class: 'list-group-item list-group-item-danger'})
              .text('Error calling web service. Please try again later.'));
      }
  });


  }

  function getPokemonNameByID(id) {
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/pokemonNames/id/' + id,
            success: function(user) {
                var name = user.pokemonName;
                pokemon_name = name;
              },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
  return pokemon_name;
  }

  function getMove1ByPokemonID(id) {
    $.ajax({
              type: 'GET',
              global: false,
              async:false,
              url: 'http://localhost:8080/store/pokemon/byMoves/' + id,
              success: function(user) {
                for(i in user){
                    var move1 = user[0].moveName;
                    pokemon_move1 = move1;
                    }
              },
    error: function() {
        $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
    }
    });
    return pokemon_move1;
  }
  function getMove2ByPokemonID(id) {
    pokemon_move2 = "";
    $.ajax({
              type: 'GET',
              global: false,
              async:false,
              url: 'http://localhost:8080/store/pokemon/byMoves/' + id,
              success: function(user) {
                for(i in user){
                    var move2 = user[1].moveName;
                    pokemon_move2 = move2;
                    }
              },
    error: function() {
        $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
    }
    });
    return pokemon_move2;
  }
  function getMove3ByPokemonID(id) {
    pokemon_move3 = "";
    $.ajax({
              type: 'GET',
              global: false,
              async:false,
              url: 'http://localhost:8080/store/pokemon/byMoves/' + id,
              success: function(user) {
                for(i in user){
                    var move3 = user[2].moveName;
                    pokemon_move3 = move3;
                    }
              },
    error: function() {
        $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
    }
    });
    return pokemon_move3;
  }
  function getMove4ByPokemonID(id) {
    pokemon_move4 = "";
    $.ajax({
              type: 'GET',
              global: false,
              async:false,
              url: 'http://localhost:8080/store/pokemon/byMoves/' + id,
              success: function(user) {
                for(i in user){
                    var move4 = user[3].moveName;
                    pokemon_move4 = move4;
                    }
              },
    error: function() {
        $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.'));
    }
    });
    return pokemon_move4;
  }

function backUserPage() {
  window.location.href = "userPage.html";
}
