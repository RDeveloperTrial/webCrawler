const http = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

/**
 * Function that takes a URL, downloads the HTML and saves it into a newly created file
 */
const downloadPage = (url='http://nodeprogram.com') => { //Define a default value for URL
    console.log('downloading ', url);
    const fetchPage = (urlF, callback) => {
        http.get(urlF, (response) => { //GET method is asynchronous
            let buff = '';
            response.on('data', (chunk) => {
                buff += chunk;
            })
            response.on('end', () => {
                callback(null, buff); //first argument is null because it's for errors
            })
        }).on('error', (error) => {
            console.error('Got error: ${error.message}');
            callback(error);
        })
    }

    const folderName = uuid.v1(); //generates random timestamped values
    fs.mkdirSync(folderName); //mkdirSync method is synchronous
    fetchPage(url, (error, data) => { //takes a url and a callback function and makes a GET request
        if(error) return console.log(error);
        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url); //wrtieFileSync mthod is synchronous
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
        console.log('downloading is done in folder ', folderName);
    })
}
//This is a comment just to try the GIT feature (changes)
downloadPage(process.argv[2]);