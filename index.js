const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const prompt = require("prompt-sync")({ sigint: true });


const domain = 'https://telegra.ph';
const rootFolder = 'album';

const downloadAlbum = function(url) {
	if (!fs.existsSync(rootFolder)){
	    fs.mkdirSync(rootFolder);
	}
	request({
		url: url,
		method: "GET"
	}, function(err ,req, body) {
		if(err || !body){
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
		downloadImages(pic);
	});
};

const folderNamePreprocess = function(folder_name) {
    folder_name = folder_name.replace(/[ |?<\\*:"']/g,'');
    return folder_name;
}

const downloadImage = function(uri, path, callback){
	request.head(uri, function(err, res, body){
		request(uri).pipe(fs.createWriteStream(path)).on('close', callback);
	});
};

const downloadImages = function(pictures) {
	const len = pictures.length;
	pictures.map((img, index) => {
		downloadImage(img.src, img.path, () => {
			console.log(`${img.title} --- download ${index+1}/${len} done.`);
		})
	})
};

//Readline
const url = prompt("Enter Telegraph URL : ");
downloadAlbum(url);

