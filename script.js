document.addEventListener('DOMContentLoaded', function() {
    function matching(){
        console.log("matching");
        chrome.tabs.executeScript({
            code : 'document.querySelector("body").innerText'
        }, function(result){
            var bodyText = result[0];
            var totalWordNum = bodyText.split(' ').length;
            var myWordNum = bodyText.match(new RegExp('\\b' + userWord + '\\b', 'gi')).length;
            var display = myWordNum + '/' + totalWordNum;
            var percent = myWordNum / totalWordNum * 100;
            display += '(' + percent.toFixed(2) + '%)';
            document.querySelector('#result').innerHTML = display;
            document.querySelector("#process").innerHTML = "";
        });
    }

    chrome.storage.sync.get(function(data){
        var userWord = data.userWord;
        if(userWord == undefined) userWord = "";
        document.querySelector("#userWord").value = userWord;
        //document.querySelector("#tmp").innerHTML = "HERE!!!";
        matching();
    });

    document.querySelector('#userWord').addEventListener('change', function(e){
        var userWord = document.querySelector("#userWord").value;
        //document.querySelector("#userWord").innerHTML = "Here";
        chrome.storage.sync.set({
            'userWord' : userWord
        });
        matching();
    });

    document.querySelector("#btn").addEventListener('click', function(){
        var userWord = document.querySelector("#userWord").value;
        chrome.storage.sync.set({
            'userWord' : userWord
        });
        document.querySelector("#process").innerHTML = "calculating";
        matching();
    })
});