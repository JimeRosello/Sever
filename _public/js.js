// variables

var timer = 1000; 
var timerBanner = 10000; 
var back1 = "url(\"images/background_fir.jpg\")"; 
var back2 = "url(\"images/background_sec.jpeg\")"; 
var back3 = "url(\"images/background_thi.jpg\")"; 
var titleHome = "Home"; 
var titleEmpresa = "Quiénes somos"; 
var titleServicios = "Servicios"; 
var titlePortones = "Portones"; 
var titleFrentes = "Frentes de rejas"; 
var titleServicioTecn = "Servicio técnico"; 
var titleContacto = "Contacto"; 
var titleLevadizo = "Levadizos"; 
var titleBatientes = "Batientes"; 
var titleCorredizo = "Corredizos"; 
var titleGuillotina = "Guillotina"; 
var titleManuales = "Manuales"; 
var currentPorton = ""; 
var currentSection = ""; 
var photosLevadizo = ""; 
var photosBatientes = ""; 
var photosCorredizo = ""; 
var photosGuillotina = ""; 


setInterval(function() {
	var main = document.getElementsByTagName("main")[0]; 	
	if (main.style.backgroundImage == back1) {
		main.style.backgroundImage = back2; 
	} else if (main.style.backgroundImage == back2) { 
		main.style.backgroundImage = back3; 
	} else { 
		main.style.backgroundImage = back1; 
	}
}, timerBanner); 


// functions 

function loadPage() {
	var back = document.getElementsByTagName("section")[0]; 	
	back.style.opacity = 1; 
	openPage();
}

function openPage(titleText) {
	var title = document.getElementsByClassName("pagetitle")[0]; 
	var text = document.getElementsByClassName("pagetext")[0]; 
	var back = document.getElementsByTagName("section")[0]; 
	currentSection = "" + titleText; 
	restorePorton(); 
	document.getElementsByTagName("footer")[0].style.opacity = 1;
	if (title.innerHTML != titleText) {
		back.style.opacity = 0; 
		title.style.opacity = 0; 
		text.style.opacity = 0; 
		setTimeout(function(){ 
			title.style.opacity = 1; 
			text.style.opacity = 1; 
			back.style.opacity = 1; 
		}, timer);
	}
}

function scrollToTop(scrollDuration) {
	var scrollStep = -window.scrollY / (scrollDuration / 15),
		scrollInterval = setInterval(function(){
		if (window.scrollY != 0) {
			window.scrollBy(0, scrollStep);
		}
		else clearInterval(scrollInterval); 
	},15);
	var hidden = document.getElementsByClassName("hidden"); 
	for(i = 0; i < hidden.length; i++) {
	 	hidden[i].style.opacity = 0;
	 }
	document.getElementById("top").style.opacity = 0; 
	document.getElementsByTagName("footer")[0].style.opacity = 1;
}

function goTo(id) { 
	switch (currentSection) {
		case "Portones": 
			document.getElementById("galleryTitle").innerHTML = "Portones " + currentPorton.toLowerCase(); 
			break;
		default: 
			document.getElementById("galleryTitle").innerHTML = currentSection; 
			break;	
	}
	document.getElementsByTagName("footer")[0].style.opacity = 0;
	document.getElementById(id).scrollIntoView({
		behavior: 'smooth'
	});
	document.getElementById(id).style.opacity = 1; 
	document.getElementById("top").style.opacity = 1; 
	showPhotos();
}

function showPhotosButton() {
	document.getElementById("viewPhotos").style.opacity = 1; 
	document.getElementById("viewPhotos").style.visibility = "visible"; 
}

function openPorton(kind) {
	var container = document.getElementById("containerPorton"); 
	var buttons = document.getElementsByClassName("linkPorton"); 
	showPhotosButton(); 
	document.getElementsByClassName("linkPorton")[0].style.opacity = 1; 
	document.getElementsByTagName("hr")[0].style.opacity = 1;
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].style.color = "black";
	}
	switch (kind) {
		case titleLevadizo: 
			currentPorton = titleLevadizo; 
			buttons[0].style.color = "white";
			$("#containerPorton").load("portones/levadizos.html")
			break;
		case titleBatientes:
			currentPorton = titleBatientes; 
			buttons[1].style.color = "white";
			$("#containerPorton").load("portones/batientes.html")
			break;
		case titleCorredizo: 
			currentPorton = titleCorredizo; 
			buttons[2].style.color = "white";
			$("#containerPorton").load("portones/corredizos.html")
			break;
		case titleGuillotina: 
			currentPorton = titleGuillotina;
			buttons[3].style.color = "white";
			$("#containerPorton").load("portones/guillotina.html")
			break;
	}
	container.style.opacity = 1; 
}

function restorePorton() {
	var container = document.getElementById("containerPorton"); 
	container.innerHTML = "";
	document.getElementById("viewPhotos").style.opacity = 0; 
	document.getElementById("viewPhotos").style.visibility = "hidden"; 

}

function showPhotos() {
	var panel = document.getElementById("panel");
	switch (currentSection) {
		case "Portones": 
			switch (currentPorton) {
				case titleLevadizo: 
					getPhotosAndMakeTable("images/levadizos/");
					break;
				case titleBatientes: 
					getPhotosAndMakeTable("images/batientes/");
					break;
				case titleCorredizo: 
					getPhotosAndMakeTable("images/corredizos/");
					break;
				case titleGuillotina: 
					getPhotosAndMakeTable("images/guillotina/");
					break;
			}
			break; 
		}
}


function getFiles(sourceFolder) {
	var fileArray = new Array();
	var extRE = /\.(?:png)$/i;
	var docs = sourceFolder.getFiles();
	var len = docs.length;
	for (var i = 0; i < len; i++) {
		var doc = docs[i];
		if (doc instanceof File) {
			var docName = doc.name;
			if (docName.match(extRE)) {
				fileArray.push(doc);
			}
		}
	}
	return fileArray;
}

function getPhotosAndMakeTable(directory) {
	var sourceFolder = Folder(directory);
	var files = getFiles(sourceFolder); 
	alert(sourceFolder); 
}

