# Teleghaph Image Downloader :zap:

![Telegraph](Telegraph.jpg)

## Version

version  	|Description
:---		|:---
v1.1.0		|add callback & seperate request function
v1.0.0		|first version

## Introduce Project

This is a web spider which can download images in telegraph. Simply input url of telegraph, then it will download all images in that web page. Have fun :rocket:

## How 2 use

1. Install modules 
```
yarn add @fatsoap/telegraph-downloader
// or
npm install @fatsoap/telegraph-downloader
```
2. Require function 
```
const { downloadAlbum, downloadImage } from require('@fatsoap/telegraph-downloader');
```
3. Run function

Get All Pictures' URL

```
downloadAlbum(yourURL, dest_folder, (title, pictures) => {
	// do something with 'title' & 'pictures'
});

type Title: string  //album name
type Pictures: {
	src: string // picture url
	path: string  // save folder
	title: string //album name
}[]
```

Download All Images

```
const len = pictures.length;
pictures.map((img, index) => {
	downloadImage(img.src, img.path, () => {
		console.log(`${img.title} --- download ${index+1}/${len} done.`);
	});
});
```

4. Done ! :sunglasses: You can find images in dest folder :muscle:

