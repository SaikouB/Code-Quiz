// Adds funtion to show user last score to scores webpage
var scoreListUl = document.querySelector(".scoresList")
function showLastScore() {
	var history = JSON.parse(localStorage.getItem("userScore"))
	// for loop to iterate and show history of scores
		for (let i = 0; i < history.length; i++) {
			// "li" elemt created for list of scores
			var li = document.createElement("li")
			var data = history[i]
			// Displays score 
			li.textContent = data.initials + " - " + data.score + "/10"
			scoreListUl.append(li)
        }
}
// show last scores function
showLastScore()