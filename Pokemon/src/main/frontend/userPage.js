var pokemon_name;
var pokemon_ability;
var pokemon_type1;
var pokemon_type2;
var pokemon_id;
var username;
var user_id;

$(document).ready(function () {
  loadPokemon();
});

$("#filter").click(function (event) {
  search();
})

function loadPokemon() {
$('#body').empty();
var itemList = $('#body');
var userName = localStorage.getItem("username");

$.fn.editPokemon = function (poke_id, unique_id, ability_id){
    localStorage.setItem("pokeID", poke_id);
    localStorage.setItem("ability", ability_id);
    localStorage.setItem("unique", unique_id);
    window.location.href = "Edit_Pokemon.html";
}


$.ajax({
        type: 'GET',
        url: 'http://localhost:8080/store/users/' + userName,
        success: function(itemArray) {
            $.each(itemArray, function(index, user){
                var uniqueID = user.uniqueID;
                var pokeID = user.pokeID;
                var level = user.level;
                var ability = user.abilityID;

                var items = '<tr>';
                items += '<td>' + getPokemonNameByID(pokeID) + '</td>';
                items += '<td>' + level + '</td>';
                items += '<td>' + getPokemonAbilityByID(ability) + '</td>';
                items += '<td>' + getType1ByPokemonID(pokeID);
                if (getType2ByPokemonID(pokeID) != "") {
                  items += "/" + getType2ByPokemonID(pokeID) + '</td>';
                } else {
                items += '</td>';
              }
                items += '<td>' + '<button type="button" id="edit' + uniqueID + '" class="btn btn-primary" onClick="$(this).editPokemon('+ pokeID + ", " + uniqueID + ", " + ability + ')">Edit</button>' + '</td>';
                items += '<td>' + '<button type="button" id=' + uniqueID + ' class="btn btn-primary" onClick="viewInfo('+uniqueID+')">Additional Info</button>' + '</td>';
                items += '<td>' + '<button type="button" id="delete' + uniqueID + '" class="btn btn-primary" onClick="remove('+uniqueID+')">Delete</button>' + '</td>';
                items += '</tr>';
                itemList.append(items);
            })
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

function search() {
$('#body').empty();
var itemList = $('#body');
var searchBar = $('#find').val();
searchBar = getPokemonIDByName(searchBar);
var userName = localStorage.getItem("username");

$.ajax({
        type: 'GET',
        url: 'http://localhost:8080/store/pokemon/search/' + searchBar,
        success: function(itemArray) {
            $.each(itemArray, function(index, user){
                var userID = user.userID;
                var uniqueID = user.uniqueID;
                var pokeID = user.pokeID;
                var level = user.level;
                var ability = user.abilityID;

                if (userName == getUserID(userID)) {
                var items = '<tr>';
                items += '<td>' + getPokemonNameByID(pokeID) + '</td>';
                items += '<td>' + level + '</td>';
                items += '<td>' + getPokemonAbilityByID(ability) + '</td>';
                items += '<td>' + getType1ByPokemonID(pokeID);
                if (getType2ByPokemonID(pokeID) != "") {
                  items += "/" + getType2ByPokemonID(pokeID) + '</td>';
                } else {
                items += '</td>';
              }
                items += '<td>' + '<button type="button" id=' + uniqueID + ' class="btn btn-primary" onClick="viewInfo('+uniqueID+')">Additional Info</button>' + '</td>';
                items += '<td>' + '<button type="button" id="edit' + uniqueID + '" class="btn btn-primary">Edit</button>' + '</td>';
                items += '<td>' + '<button type="button" id="delete' + uniqueID + '" class="btn btn-primary" onClick="remove('+uniqueID+')">Delete</button>' + '</td>';
                items += '</tr>';
                itemList.append(items);
            }
          })
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

function getPokemonIDByName(name) {
$.ajax({
          type: 'GET',
          global: false,
          async:false,
          url: 'http://localhost:8080/store/pokemonNames/names/' + name,
          success: function(user) {
              var id = user.pokeName_ID;
              pokemon_id = id;
            },
error: function() {
    $('#errorMessages')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text('Error calling web service. Please try again later.'));
}
});
return pokemon_id;
}

function getPokemonAbilityByID(id) {
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/pokemon/byAbility/' + id,
            success: function(user) {
                var ability = user.ability;
                pokemon_ability = ability;
              },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
  return pokemon_ability;
}

function getUserID(id) {
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/Users/' + id,
            success: function(user) {
                var id = user.username;
                username = id;
              },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
  return username;
}

function storeUserID(id) {
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/Users/' + id,
            success: function(user) {
                var id = user.user_Id;
                user_id = id;
              },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
  console.log(user_id);
  return user_id;
}

function getType1ByPokemonID(id) {
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/pokemon/byType/' + id,
            success: function(user) {
              for(i in user){
                  var type1 = user[0].typeName;
                  pokemon_type1 = type1;
                  }
            },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
  return pokemon_type1;
}

function getType2ByPokemonID(id) {
  pokemon_type2 = "";
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/pokemon/byType/' + id,
            success: function(user) {
              for(i in user){
                  var type2 = user[1].typeName;
                  pokemon_type2 = type2;
                  }
            },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
  return pokemon_type2;
}

function viewInfo(unique_ID) {
  window.location.href = "info.html";
  localStorage.setItem("uniqueID", unique_ID);
}

function goAdd(userID) {
  window.location.href = "addPokemon.html";
  localStorage.setItem("userID", storeUserID(userID));
}

$("#add").click(function (event) {
  var userName = localStorage.getItem("username");
  
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/Users',
    success: function(itemArray) {
        $.each(itemArray, function(index, user){
          var username = user.username;
          if (username == userName) {
          var userID = user.user_Id;
          goAdd(userID);
        }
})
},

error: function() {
    $('#errorMessages')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text('Error calling web service. Please try again later.'));
}
});
})


function remove(uniqueID) {
  $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/store/pokemon/' + uniqueID,
            success: function(user) {
              loadPokemon();
            },
  error: function() {
      $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
  }
  });
}
