//@ sourceURL=text.js

window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			//var textType = /text.*/;

			if (file.name.indexOf(".mkp")!=-1 && file.name.indexOf("Makeup")!=-1) {
				var reader = new FileReader();

				reader.onload = function(e) {
					//fileDisplayArea.innerText = reader.result;
					var importado=JSON.parse(reader.result);
					chrome.extension.sendMessage({operation:"importMakeupReader", importado: importado}); 
				};

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
};
