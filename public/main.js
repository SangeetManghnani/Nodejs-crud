var mainHandler = (function(){
	return{
		updateQuotes : function(){
			var updateBtn = document.getElementById('update') ;
			update.addEventListener('click', function () {
				var xmlHttp = new XMLHttpRequest(); //returns a XMLHttpRequest object
			    var mimeType = "application/json";
			    var data = JSON.stringify({
							    'name': 'SANGEET',
							    'quote': 'I Have Finally done it.'
							});
			    var url = 'quotes'
		      	xmlHttp.open('PUT', url, true);  // true : asynchrone false: synchrone
			    xmlHttp.setRequestHeader('Content-Type', mimeType);  
			    xmlHttp.onreadystatechange = function () {
			    if (xmlHttp.readyState === 4) {
				    if (xmlHttp.status === 200) 
				      window.location.reload(true)// 'This is the returned text.'
				    }
			    }
			    xmlHttp.send(data); 
			});

		}
	}
}) ();
mainHandler.updateQuotes();