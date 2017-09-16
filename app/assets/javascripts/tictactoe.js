// Code your JavaScript / jQuery solution here
$(function () {

  $('#save').click(function(event) {
    var dumbArray = []
    dumbArray.push(document.getElementsByTagName("td")[0]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[1]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[2]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[3]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[4]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[5]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[6]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[7]["textContent"])
    dumbArray.push(document.getElementsByTagName("td")[8]["textContent"])
    var values = dumbArray;
    var gameId = document.getElementsByTagName("table").game
    debugger

    if (gameId) {
      $.ajax({
        url: '/games/' + gameId,
        method: 'patch',
        data: {state: values}
      });
    } else {
    $.ajax({
      url: '/games',
      method: 'post',
      data: {state: values}
    }).done(function(data){
      document.getElementsByTagName("table").game = data["data"]["id"]
      // debugger
    })

  }
  // $("#clear").click()
})


 //  $('#save').click(function(event) {
 //    var dumbArray = []
 //    dumbArray.push(document.getElementsByTagName("td")[0]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[1]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[2]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[3]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[4]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[5]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[6]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[7]["textContent"])
 //    dumbArray.push(document.getElementsByTagName("td")[8]["textContent"])
 //    var values = dumbArray;
 //
 //    var posting2 = $.get('/games');
 //    posting2.done(function(data) {
 //      var games = data["data"]
 //      var posting = $.post('/games');
 //      posting.done(function(data) {
 //        var game = data["data"]["id"]
 //        var check = games.includes(function(game){
 //          if (game.id === game) {
 //            return true
 //          }})
 //        if (check === false) {
 //          var posting1 = $.ajax({
 //            url: '/games/' + game,
 //            type: 'post',
 //            method: 'patch',
 //            data: {state: values}
 //          });
 //        } else {
 //          var posting1 = $.ajax({
 //            url: '/games/' + game,
 //            type: 'post',
 //            method: 'post',
 //            data: {state: values}
 //          });
 //        }
 // posting1.done();
 //
 //  });})})

  $('#clear').click(function() {

    // $.post('/games').done();
    // messageCall("")
    var x = document.getElementsByTagName("td")
    var gameId = document.getElementsByTagName("table").game
    debugger
    if (gameId) {
      // $("#save").click()
      gameId = ""
      $(x).empty();
      turn = 0;
      $.post('/games').done();
    } else {
      $(x).empty();
      turn = 0;
      // $.post('/games').done();

    }
  });

  $('#previous').click(function() {
    var posting = $.get('/games');
    posting.done(function(data) {
      var games = data["data"]
      $("#games").empty()
      games.forEach(function(game){
      var button = $('<button type="button" id="game-'+ game["id"] +'">Game ' + game["id"] + '</>');
      $("#games").append(button)})
    });
  });


  $("#games").on('click', ":button[id^='game-']", function() {
    var posting = $.get('/games/' + this.id.substring(5));
    posting.done(function(data) {
      var game = data["data"]["attributes"]["state"]
      // debugger;
      document.getElementsByTagName("table").game = this.url.substring(7)
      turn = game.filter(Boolean).length
      $("td:eq(0)").text(game[0])
      $("td:eq(1)").text(game[1])
      $("td:eq(2)").text(game[2])
      $("td:eq(3)").text(game[3])
      $("td:eq(4)").text(game[4])
      $("td:eq(5)").text(game[5])
      $("td:eq(6)").text(game[6])
      $("td:eq(7)").text(game[7])
      $("td:eq(8)").text(game[8])
    });
  });


  attachListeners();
});

  function attachListeners() {
      $('td').click(function() {
        doTurn(this);
      })}
      //
      // $(document).ready(function() {
      //   })


var turn = 0;

function player(){
  if (turn % 2 === 0) {
    return 'X'
  } else {
    return 'O'
  }
}

function updateState(input) {
  // debugger;
  if (input.innerHTML === "") {
  input.innerHTML = player();
} else {
  messageCall("Choose another square")
  turn -= 1
}
}

function messageCall(string) {
  return document.getElementById("message").innerHTML = string
}

var winCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

function checkWinner() {
  var dumbArray = []
  dumbArray.push(document.getElementsByTagName("td")[0]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[1]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[2]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[3]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[4]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[5]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[6]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[7]["textContent"])
  dumbArray.push(document.getElementsByTagName("td")[8]["textContent"])

  for (win of winCombinations) {
    if (dumbArray[win[0]] === dumbArray[win[1]] && dumbArray[win[1]] === dumbArray[win[2]] && dumbArray[win[0]] != ''){
      debugger
      messageCall('Player ' + player() + ' Won!')
      $("#save").click()
      return true }
    } return false
}

function doTurn(input) {
  updateState(input)

  if (checkWinner() === false) {
    turn +=1
  } else {
    // turn = 0;
    $("#clear").click()
    // $.get('/games').done()
    // $.post('/games').done();

  }

  if (turn === 9 && checkWinner() === false){
    $("#save").click()
    messageCall("Tie game.");
    // turn = 0;
    $("#clear").click()
    // $.get('/games').done()
  }
}
