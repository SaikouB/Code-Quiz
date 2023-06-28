

var scoreListUl = document.querySelector(".scoresList")
function showLastScore() {
	var history = JSON.parse(localStorage.getItem("userScore"))
		for (let i = 0; i < history.length; i++) {
			var li = document.createElement("li")
			var data = history[i]
			li.innerHTML = data.initials + " - " + data.score + "/10"
			scoreListUl.append(li)
        }
}

showLastScore()