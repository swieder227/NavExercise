document.addEventListener("DOMContentLoaded", function(event) {

	// Generates nav HTML from HUGE's JSON API
	getNavJSON();

	// Event handler on curtain to close nav's
	document.getElementById("nav-curtain").addEventListener("mouseup", function(){
		toggleNavSecondary(-1,true);
		toggleNavPrimary(true);
	});


});


// AJAX GET JSON from HUGE's API.
// generateNavHTML() on successful callback.
function getNavJSON(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/nav.json', true);

	// AJAX eventListeners
	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    // Success!
	    var data = JSON.parse(this.response);
	    var html = generateNavHTML(data.items,false);
	    document.getElementById("nav-menus").appendChild(html);
	  } else {
	    console.log("We reached our target server, but it returned an error");
	  }
	};
	request.onerror = function(error) {
	  console.error(error);
	};

	request.send();
}

// Given data JSON, generate the nav markup and append to DOM
// HTML structure: ul.navmenu > li.navbtn > a
function generateNavHTML(data,isRecursive){

	var htmlNode = document.createDocumentFragment();
	var className = isRecursive ? "secondary" : "primary";

	// start with a ul.navmenu
	var navmenu = document.createElement("ul");
	navmenu.className = "navmenu-"+className;

	// iterate and create li.navbtn > a
	for(var i = 0; i < data.length; i++){

		var navbtn = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.textContent = data[i].label;
		navbtn.className = "navbtn-"+className;
		navbtn.appendChild(anchor);

		// Check for childen aka secondary menu
		if(typeof(data[i].items) != "undefined" && data[i].items.length > 0){
			// if children, anchor with js to open menu
			anchor.addEventListener("mouseup", toggleNavSecondary.bind(null,i,true));
			// recurse fn, and generate+append ul.navmenu-secondary
			var navmenuChild = generateNavHTML(data[i].items,true);
			navbtn.appendChild(navmenuChild);
		} else {
			//no children, anchor with href. close nav if open.
			anchor.setAttribute("href",data[i].url);
			anchor.addEventListener("mouseup", function(){
				toggleNavSecondary(-1,true);
				toggleNavPrimary(true);
			});
		}

		navmenu.appendChild(navbtn);
	}

	htmlNode.appendChild(navmenu);
	return htmlNode;
}

// Uses body[data-navmenu-primary] as a state machine
// if override is true, always close
function toggleNavPrimary(override){
	var current = document.body.getAttribute("data-navmenu-primary");
	current = parseInt(current);
	if(!override && current == -1){
		document.body.setAttribute("data-navmenu-primary",1);
	} else {
		document.body.setAttribute("data-navmenu-primary",-1);
	}
}

// Uses body[data-navmenu-secondary] as a state machine
// If override is true, ignore current state and set to index
function toggleNavSecondary(index,override){
	var current = document.body.getAttribute("data-navmenu-secondary");
	current = parseInt(current);
	if(override || current == -1){
		document.body.setAttribute("data-navmenu-secondary",index);
	} else {
		document.body.setAttribute("data-navmenu-secondary",-1);
	}
}


