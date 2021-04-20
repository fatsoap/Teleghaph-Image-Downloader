# Teleghaph Image Downloader :zap:

![Telegraph](Telegraph.jpg)

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
const { downloadAlbum } from require('@fatsoap/telegraph-downloader');
```
3. Run function
```
downloadAlbum(yourURL, dest_folder);
// dest_folder will be 'album' if no input.
```
4. Done ! :sunglasses: You can find images in dest folder :muscle:

