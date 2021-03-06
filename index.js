const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")({ sigint: true });

const domain = 'https://telegra.ph';

const downloadAlbum = function(url, rootFolder = 'album', callback) {
	if (!fs.existsSync(rootFolder)){
	    fs.mkdirSync(rootFolder);
	}
	request({
		url: url,
		method: "GET"
	}, function(err ,req, body) {
		if(err || !body){
			callback(null, 'some error happen while request');
			return;
		}
		const $ = cheerio.load(body);
		const pic = [];
		const pictures = $('figure');
		const title = folderNamePreprocess( $('title').text() );
		if (!fs.existsSync(`${rootFolder}/${title}`)){
		    fs.mkdirSync(`${rootFolder}/${title}`);
		}
		for(let i=0; i<pictures.length; i++) {
			let src = domain + pictures[i.toString()].children[0].attribs.src;
			let srcType = src.split('.');
			let type = srcType[srcType.length - 1];
			let path = `${rootFolder}/${title}/${i}.${type}`;
			pic.push({ src: src, path: path, title: title });
		}
		callback(title, pic);
	});
};

const folderNamePreprocess = function(folder_name) {
    folder_name = folder_name.replace(/[ |?<\\*:"']/g,'');
    return folder_name;
}

const downloadImage = function(uri, path, callback){
	try {
		request.head(uri, function(err, res, body){
			request(uri).pipe(fs.createWriteStream(path)).on('close', callback);
		});
	} catch(err) {
		console.log(err);
	}
	
};


module.exports = { downloadAlbum, downloadImage }