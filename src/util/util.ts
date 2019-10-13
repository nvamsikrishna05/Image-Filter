import fs from 'fs';
import Jimp = require('jimp');
import path from 'path';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async resolve => {
    console.log(inputURL);
    const photo = await Jimp.read(inputURL);
    const outpath =
      '/tmp/filtered-' + Math.floor(Math.random() * 2000) + '.png';

    console.log(photo);
    console.log(path.join(__dirname + outpath));
    photo.write(path.join(__dirname + outpath), error => {
      if (error) {
        console.log(`Error Occured while saving the image : ${error}`);
      }
      console.log(error);
    });

    await photo
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(__dirname + outpath, img => {
        resolve(path.join(__dirname + outpath));
      });
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
