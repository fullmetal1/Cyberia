'use strict'

const server = new Ipfs({
	init: false,
	start: false,
	repo: 'test' + Math.random()
});

var userdata = {
	Config: "",
	Subidentities: []
}

window.onload = function(e){
	console.log('page loaded.');
	server.init((err) => {
		if (err) {
			console.error('failed to initiate server');
		};

		server.start(() => {
			console.log('Online status: ', server.isOnline() ? 'online' : 'offline');
			server.config.get((err, config) => {
				if (err) {
					throw err;
				}
				console.log('Server info: ', config);
				userdata.Config = JSON.stringify(config)
			});
			
		})
	});	
	document.getElementById('fileAdder').addEventListener('change', publishFile, false);
	console.log('program initiated.');
};

function getConfig(node){
	return node.config.get();
}

function initiateNewIdentity(){
	//make the node
	const node = new Ipfs({
		init: false,
		start: false,
		repo: 'test' + Math.random()
	});
	//init the node
	node.init((err) => {
		if (err) {
			throw err;
		};

		node.start(() => {
			console.log('Online status: ', node.isOnline() ? 'online' : 'offline');
			//getConfig(node);
		})
	});
	return node;
};

function stopNode(node){
	node.stop();
}

function newRepo(){
	var node = initiateNewIdentity();
	var config = getConfig(node);
	stopNode(node);
	userdata.Subidentities.push({"Config": config, Subidentities: []});
	console.log("New Identity: ", config);
}

function getRepo(config){
	//todo: wait for IPNS support in js-ipfs
	return []
}

function publishRepo(config, filelist){
	//todo: wait for IPNS support in js-ipfs
}

function addFileToRepo(config, mutihash){
	var filelist = getRepo(config);
	filelist.append(multihash);
	publishRepo(config, filelist);
}

function readFiles(files, node){
	const filesArray = [];
	
	console.log('TEST: ', files);
	
	for (var i = 0; i < files.length; i++) {
		var file = files[i]
		var reader = new FileReader();
		
		reader.onload = (function(file, node){
			return function(event){
				addFile(file.name, event.target.result, node);
				console.log('file: ', file.name, ', array: ', event.target.result, ' staged');
			};
		})(file, node);  

		reader.readAsBinaryString(file);
	}
}

function addFile(fileName, content, node){
	const files = [{path: fileName, content: content}];

	node.files.add(new node.types.Buffer(content), function(err, res) {
			console.log('file: ', res[0], 'published successfully')
	})	
}

function publishFile(evt) {
	console.log('attempting to publish file');
	var files = evt.target.files; // FileList object
	// files is a FileList of File objects. List some properties.
//	for (var i = 0, f; f = files[i]; i++) {
//			console.log('attempting to add file', i, ': ', files[i]);
//		}
	readFiles(files, server);
}

function downloadFile(multihash) {
	console.log('attempting to download file: ', multihash);
	server.files.cat(multihash, function (err, stream) {
      var res = ''

      stream.on('data', function (chunk) {
        res += chunk.toString()
      })

      stream.on('error', function (err) {
        console.error('Error - ipfs files cat ', err)
      })

      stream.on('end', function () {
        console.log('Got:', res)
      })
    })
}

function getMultihash() {
	downloadFile(document.getElementById('multihashtext').value);
}

function saveIdentity() {
	setCookie("userdata", JSON.stringify(userdata));
	console.log("Saved  userdata: ", userdata);
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function loadIdentity() {
	userdata = JSON.parse(getCookie("userdata"));
	server.config.replace(JSON.parse(userdata.Config));
	console.log("Loaded userdata: ", userdata);
	server.config.get((err, config) => {
		if (err) {
			throw err;
		}
		console.log('Server info: ', config);
	});
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


