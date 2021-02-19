var pokemon_name;
var ability_id;
var pokemon_move1;
var pokemon_move2;
var pokemon_move3;
var pokemon_move4;
var pokemon_id;

$(document).ready(function () {
  var user = localStorage.getItem("userID");
  $('#name').select2();
  $('#Ability').select2();
  $('#Move1').select2();
  $('#Move2').select2();
  $('#Move3').select2();
  $('#Move4').select2();
});

$.getJSON("http://localhost:8080/store/names",
  function (data) {
    $.each(data, function (indexInArray, valueOfElement) { 
      $("#name").append("<option>"+valueOfElement['pokemonName']+"</option>");
    });
  }
);

$.getJSON("http://localhost:8080/store/abilities",
  function (data) {
    $.each(data, function (indexInArray, valueOfElement) { 
      $("#Ability").append("<option>"+valueOfElement['ability']+"</option>");
    });
  }
);

$.getJSON("http://localhost:8080/store/moves",
  function (data) {
    $.each(data, function (indexInArray, valueOfElement) { 
      $("#Move1").append("<option>"+valueOfElement['moveName']+"</option>");
      $("#Move2").append("<option>"+valueOfElement['moveName']+"</option>");
      $("#Move3").append("<option>"+valueOfElement['moveName']+"</option>");
      $("#Move4").append("<option>"+valueOfElement['moveName']+"</option>");
    });
  }
);

function getMoveName1(name) {
  //pokemon_move1 = "";
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/moves/' + name,
            success: function(user) {
             var moveID = user.move_ID;
             pokemon_move1 = moveID;

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

function getMoveName2(name) {
  //pokemon_move2 = "";
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/moves/' + name,
            success: function(user) {
             var moveID = user.move_ID;
             pokemon_move2 = moveID;
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

function getMoveName3(name) {
  //pokemon_move3 = "";
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/moves/' + name,
            success: function(user) {
             var moveID = user.move_ID;
             pokemon_move3 = moveID;
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

function getMoveName4(name) {
  //pokemon_move4 = "";
  $.ajax({
            type: 'GET',
            global: false,
            async:false,
            url: 'http://localhost:8080/store/moves/' + name,
            success: function(user) {
             var moveID = user.move_ID;
             pokemon_move4 = moveID;
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


function getPokemonAbilityIDByName(ability) {
$.ajax({
          type: 'GET',
          global: false,
          async:false,
          url: 'http://localhost:8080/store/abilities/' + ability,
          success: function(user) {
              var id = user.ability_ID;
              ability_id = id;
            },
error: function() {
    $('#errorMessages')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text('Error calling web service. Please try again later.'));
}
});
return ability_id;
}

function addPokemon() {
if($('#Move1').val() == "") {
    $('#Move1').val("N/A");
  }
if($('#Move2').val() == "") {
  $('#Move2').val("N/A");
}
if($('#Move3').val() == "") {
  $('#Move3').val("N/A");
}
if($('#Move4').val() == "") {
  $('#Move4').val("N/A");
}
var user = localStorage.getItem("userID");



if($("#Level").val() == "" || $("#Level").val() <= 0 || $("#Level").val() > 100) {
  alert("Please enter a valid number for Level");
}
else if($("#HP").val() == "" || $("#HP").val() <= 0 || $("#HP").val() > 999) {
  alert("Please enter a valid number for HP");
}
else if($("#Attack").val() == "" || $("#Attack").val() <= 0 || $("#Attack").val() > 999) {
  alert("Please enter a valid number for Attack");
}
else if($("#Defense").val() == "" || $("#Defense").val() <= 0 || $("#Defense").val() > 999) {
  alert("Please enter a valid number for Defense");
}
else if($("#Special_Attack").val() == "" || $("#Special_Attack").val() <= 0 || $("#Special_Attack").val() > 999) {
  alert("Please enter a valid number for Sp.Attack");
}
else if($("#Special_Defense").val() == "" || $("#Special_Defense").val() <= 0 || $("#Special_Defense").val() > 999) {
  alert("Please enter a valid number for Sp.Defense");
}
else if($("#Speed").val() == "" || $("#Speed").val() <= 0 || $("#Speed").val() > 999) {
  alert("Please enter a valid number for Speed");
}
else if ($('#Move1').val() == "N/A" && $('#Move2').val() == "N/A" && $('#Move3').val() == "N/A" && $('#Move4').val() == "N/A") {
  alert("Please Enter at least one move");
} else if($('#Move1').val() == "" && $('#Move2').val() == "" && $('#Move3').val() == "" && $('#Move4').val() == "") {
  alert("Please Enter at least one move");
} else {

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/store/add',
            data: JSON.stringify({
                userID: user,
                pokeID: getPokemonIDByName($('#name').val()),
                level: $('#Level').val(),
                abilityID: getPokemonAbilityIDByName($('#Ability').val()),
                moveID_1: getMoveName1($('#Move1').val()),
                moveID_2: getMoveName2($('#Move2').val()),
                moveID_3: getMoveName3($('#Move3').val()),
                moveID_4: getMoveName4($('#Move4').val()),
                hp: $('#HP').val(),
                attack: $('#Attack').val(),
                defense: $('#Defense').val(),
                speed: $('#Speed').val(),
                spAttack: $('#Special_Attack').val(),
                spDefense: $('#Special_Defense').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
           success: function() {
               window.location.href = "userPage.html";
           },
           error: function () {
            alert("Name, Move, or Ability cannot be found, please try again.");
            $('#errorMessages')
             .append($('<li>')
             .attr({class: 'list-group-item list-group-item-danger'})
             .text('Error calling web service. Please try again later.'));
            }
        });
      }
    }

  $("#addButton").click(function (event) {
    addPokemon();
  })

$("#cancelButton").click(function (event) {
  window.location.href = "userPage.html";
})
