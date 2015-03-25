document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    getNavJSON();
});


// GET JSON from HUGE API and return JS object
function getNavJSON(){
	var request = new XMLHttpRequest();
	request.open('GET', '/api/nav.json', true);

	// AJAX eventListeners
	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    // Success!
	    var data = JSON.parse(this.response);
	    document.getElementById("nav").innerHTML = generateNavHTML(data.items,false);
	  } else {
	    console.log("We reached our target server, but it returned an error");
	  }
	};
	request.onerror = function(error) {
	  console.error(error);
	};

	request.send();
}

// Given data array, generate ul>li
function generateNavHTML(data,isRecursive){
	var html = "<ul>";
	for(var i = 0; i < data.length; i++){
		html += "<li class='"+ (isRecursive ? "navbtn-secondary" : "navbtn-primary") +"'>";
		html += "<a href="+data[i].url+">"+data[i].label+"</a>"
		if(typeof(data[i].items) != "undefined" && data[i].items.length > 0){
			html += generateNavHTML(data[i].items,true);
		}
		html += "</li>";
	}
	html += "</ul>";

	return html
}


// Originally used .createElement && .createDocumentFragment
// For this size node tree, string was faster and more legible
// https://jsperf.com/string-vs-createelement2

// function generateNavHTML(data){

// 	var root = document.createElement("ul");
// 	for(var i = 0; i < data.length; i++){

// 		// foreach top level, create a primary navigation link
// 		var primary = document.createElement("li");
// 		var anchor = document.createElement("a");
// 		anchor.setAttribute("href",data[i].url);
// 		anchor.textContent = data[i].label;
// 		primary.appendChild(anchor);

// 		// check for second level, then create secondary menu links
// 		if(typeof(data[i].items) != undefined && data[i].items.length > 0){
// 			// submenu
// 			var subroot = document.createElement("ul");
// 			primary.appendChild(subroot);
// 			// secondary links
// 			for (var s = 0; s < data[i].items.length; s++) {
// 				var secondary = document.createElement("li");
// 				var anchor = document.createElement("a");
// 				anchor.setAttribute("href",data[i].items[s].url);
// 				anchor.textContent = data[i].items[s].label;
// 				secondary.appendChild(anchor);
// 				subroot.appendChild(secondary);
// 			};
// 		}

// 		root.appendChild(primary);
// 	}

// 	document.getElementById("nav").appendChild(root);
// }