module.exports = {
    title: "seyuuuu",
    description: "desc",
    themeConfig: {
        nav: [{ text: "Github", link: "https://github.com/seyu1116" }], // github주소
        sidebar: getSidebarArr()
    },
    //<username>.github.io 뒤에 주소가 붙으시면 base: "/{REPO}/" 같이 ..
    //필자는 붙지 않아서 base: "/" 로 ..
    base: "/{REPO}/"
};

function getSidebarArr() {
    var fs = require("fs");
    var docsPath = __dirname + "/../";
    var sidebarArr = [];
    var HomeFilelist = [];
    var filelist = fs.readdirSync(docsPath);
    filelist.forEach(function (file) {
        if (file === ".vuepress") return;
        var stat = fs.lstatSync(docsPath + "/" + file);
        if (stat.isDirectory()) {
            // directory
            // title is file, children is readdirSync
            var docsFolderPath = docsPath + "/" + file;
            var list = fs.readdirSync(docsFolderPath);
            sidebarArr.push(makeSidebarObject(file, list));
        } else {
            // NOT directory
            // title is '/' children is file
            HomeFilelist.push(file);
        }
    });
    sidebarArr.unshift(makeSidebarObject("", HomeFilelist));
    return sidebarArr;
}
function makeSidebarObject(folder, mdfileList) {
    var path = folder ? "/" + folder + "/" : "/";
    mdfileList = aheadOfReadme(mdfileList);
    var tmpMdfileList = [];
    // remove .md, add Path
    mdfileList.forEach(function (mdfile) {
        if (mdfile.substr(-3) === ".md") {
            mdfile = mdfile.slice(0, -3) === "README" ? "" : mdfile.slice(0, -3);
            tmpMdfileList.push(path + mdfile);
        }
    });
    mdfileList = tmpMdfileList;
    // remove folder prefix number
    if (folder) {
        var dotIdx = folder.indexOf(".");
        var title = Number(folder.substr(0, dotIdx))
            ? folder.substr(dotIdx + 1)
            : folder;
    } else {
        title = "HOME";
    }
    return {
        title: title,
        children: mdfileList
    };
}
function aheadOfReadme(arr) {
    // ['1.test.md','README.md'] => ['README.md','1.test.md']
    var readmeIdx = arr.indexOf("README.md");
    if (readmeIdx > 0) {
        arr.unshift(arr.splice(readmeIdx, 1)[0]);
    }
    return arr;
}