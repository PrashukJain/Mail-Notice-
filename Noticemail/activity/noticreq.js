let fs=require("fs");
let  cheerio=require("cheerio");
let request=require("request");
let emailLogic = require("./emailLogic");
let url="https://miet.ac.in/newsdrive";
request(url,cb);
function cb(err,response,html){
    console.log("Response Received");
    if(err==null&&response.statusCode==200){
console.log("File saved");
// fs.writeFileSync("notice.html",html);
parsefile(html);
    }
    else if(response.statusCode==404){
console.log("Page Not Found");
    }
    else {
console.log(err);
console.log(response.statusCode);
    }
}
let not=[];
function parsefile(html){

    let $=cheerio.load(html);
    let Allnotice=$('tbody tr');
    // Allnotice=$(Allnotice).find("tr");
    for(let i=0;i<Allnotice.length&&i<10;i++){
let element=$(Allnotice[i]).find(" td");
        let date=$(element[0]).text();
        let notice=$(element[1]).text();
let newNotice={};
       
        newNotice.Notice=notice;
        newNotice.Date=date;
not.push(newNotice);
    }
    // console.table(not);
    let html1= fs.readFileSync("index.html") + "";
let allNoticesHtml="";
    for (let i = 0; i < not.length; i++) {
        let cNotice = not[i];
        let currentNOtice = `<tr><td>**${cNotice.Notice}</td> <td>${cNotice.Date}</td></tr>`
        allNoticesHtml += currentNOtice;
    }
    html = html1.replace("{{template}}", allNoticesHtml);
        // console.log(html);
        emailLogic.sendEmail(html);
}