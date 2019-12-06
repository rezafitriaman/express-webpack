let fs = require('fs');

/*
------------------------------
APPEND TEMPLATE FILE
append html template to html index
------------------------------
*/

function copyBanner() {

	// read the banners-template NAMES files from dist
	fs.readdir('./src/banners/rect/', 'utf8', (err , files) => {
		//if error throw err
		if(err) throw err;
		fs.readdir('./src/banners/rect/' + files[0], 'utf8', (err , html) => {
			//if error throw err
			if(err) throw err;
			//loop through the banners-templates files-names
			console.log(html);
			//loop through the banners-templates files-names
			for (let i = 0; i < html.length; i++) {
				// read the CONTENT of the banners-templates file
				let templateString = fs.readFileSync('./src/banners/rect/' + files[i], 'utf8').toString();
				// create regex to replace the content of the index.html with the banners-template file ( <!-- banner-320x100 --> )
				let regex = new RegExp("<!-- banner-" + files[i].split('.html')[0] + " -->", "g");
				//if i is zero then read index.html file from src-folder otherwise read it from dist-folder (so in the beginning u have a clean index.html file again)
				/*if(i > 0) {
					//read the CONTENT of the index.html on DIST folder
					let indexSrc = fs.readFileSync('./dist/app/index.html','utf8').toString();
					//then replace <!-- banner-320x100 --> with the CONTENT of the banners-template file
					let newIndexSrc = indexSrc.replace(regex, templateString);
					//write index-file to dist-folder
					fs.writeFileSync('./dist/app/index.html', newIndexSrc, 'utf8');
					console.log(`${files[i]} has been saved`)
				}else {
					//read the CONTENT of the index.html on SRC folder (CLEAN INDEX.HTML FILE)
					let indexSrc = fs.readFileSync('./src/app/html/index.html','utf8').toString();
					//then replace <!-- banner-320x100 --> with the CONTENT of the banners-template file
					let newIndexSrc = indexSrc.replace(regex, templateString);
					//write index-file to dist-FOLDER
					fs.writeFileSync('./src/app/html/index.html', newIndexSrc, 'utf8');
					console.log(`${files[i]} has been saved`);
				}*/
			}
		});
	});

}

module.exports = copyBanner;


