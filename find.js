//find.js

const fs = require('fs').promises;
const path = require('path');
const la=require('./loadingAnimation');
var exactDirectories = [];
var similarDirectories = [];
var similarFiles = [];
var found = false;

function exactFilePrintInstant(location) {
    loadingAnimation.stopLoadingAnimation();
    if (found == false) {
        console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
        found = true;
    }
    console.log('\n Found successfully ! Location is : ' + '\"' + location + '\"');
    loadingAnimation.startLoadingAnimation();
}

async function walkPath(folderPath) {
    try {
        const files = await fs.readdir(folderPath);
        for (let file of files) {
            try {
                const stat = await fs.stat(folderPath + path.sep + file);
                if (stat.isDirectory()) {
                    if (dir) // when looking for directory/folder also
                    {
                        if (find.toUpperCase() == file.toUpperCase()) { 
                            exactDirectories.push({ 'Folder Name': file, location: folderPath + path.sep + file });
                        } else if (find.toUpperCase().includes(file.toUpperCase()) || file.toUpperCase().includes(find.toUpperCase())) {
                            similarDirectories.push({ 'Folder Name': file, location: folderPath + path.sep + file });
                        }
                    }
                    await walkPath(folderPath + path.sep + file);
                }
                if (stat.isFile()) {
                    if (find.lastIndexOf('.') == -1) // for checking without file extension (aadhar.pdf)
                    {
                        if (find.toUpperCase() == file.toUpperCase().substring(0, file.lastIndexOf('.'))) {
                            exactFilePrintInstant(folderPath + path.sep + file);
                        }
                    } else // for checking with file extension (aadhar.pdf)
                    {
                        if (find.toUpperCase() == file.toUpperCase()) {
                            exactFilePrintInstant(folderPath + path.sep + file);
                        }
                    }

                    if (file.toUpperCase().includes(find.toUpperCase()) || find.toUpperCase().includes(file.toUpperCase())) // similar case file example find(aadhar.pdf) file(yatharthAadhar2021.pdf)
                    {
                        similarFiles.push({ "File Name": file, location: folderPath + path.sep + file });
                    }
                }
            } catch (error) {
                //console.log("stat Sync : caught Error ! ", error);
            }
        }

    } catch (error) {
        //console.log("readdirSync : caught Error ! ", error);
    }
}

var dir = false;
var find = '';
var findIn = '';
var loadingAnimation=new la.LoadingAnimation();
if (process.argv.length >= 3) {
    if (process.argv[2].toLowerCase() == 'dir' || process.argv[2].toLowerCase() == 'directory' || process.argv[2].toLowerCase() == 'folder') {
        dir = true;
        find = process.argv[3].trim();
        findIn = process.argv[4] != null ? process.argv[4].trim() : '.';
    } else {
        find = process.argv[2].trim();
        findIn = process.argv[3] != null ? process.argv[3].trim() : '.';
    }
}
if (find == null || find.length == 0) {
    console.log('Usage : \" node find \'file Name \' \' location where to locate\' \"');
    return;
}

async function Main()
{
    loadingAnimation.startLoadingAnimation();

    await walkPath(findIn);

    loadingAnimation.stopLoadingAnimation();

    if (similarFiles.length) {
        console.log('\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n');
        console.log(' Files with similar name \" ' + find + ' \" are : ');
        console.log(similarFiles);
    }

    if (dir == true) {
        if (exactDirectories.length) {
            console.log('\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n');
            console.log(" Exact dir location \" " + find + " \"");
            console.log(exactDirectories);
        }
        if (similarDirectories.length) {
            console.log('\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n');
            console.log(" Similar dir location \" " + find + " \"");
            console.log(similarDirectories);
        }
    }
    if (found || similarFiles.length || exactDirectories.length || similarDirectories.length) {
        console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
    }

    if ((dir == false || !exactDirectories.length || !similarDirectories.length) && found == false && !similarFiles.length) // not exists case
    {
        console.log("\" " + find + " \" not found");
    }

}

Main();