document.getElementById('province').disabled = true;
document.getElementById('reset').addEventListener('click',rst)
document.getElementById('start').addEventListener('click',countdown)
document.getElementById('pr').addEventListener('click',changetime)
document.getElementById('ghs').addEventListener('click',fetchFromServer)
dataObject = {
    "Ji_Lin": "which province has the Chinese characters 吉林 as its name?",
    "Liao_Ning":"What province is the southermost province in Manchuria?",
    "He_Bei":"What province means north of the river?",
    "Shan_Dong":"What province is known for its beer (hint: think Tsingdao)",
    "Zhe_Jiang":"What province's capital is Hangzhou?",
    "An_Hui":"What province houses the city Hefei?",
    "He_Nan":"What province is the Shaolin temple located?",
    "Shan_Xi":"What province means West of the mountains?",
    "Shaan_Xi":"What province are the terracotta warriors located?",
    "Gan_Su":"What province's capital is Lanzhou?",
    "Hu_Bei":"What province means north of the lake?",
    "Jiang_Xi":"What province houses many Gan Chinese people?",
    "Hu_Nan":"What province is Zhang Yixing and kuailedabenying from?",
    "Gui_Zhou":"What province is Gui Yang located in?",
    "Si_Chuan":"What province is known for its spicy 'chuancai'?",
    "Yun_Nan":"What province has penshui jie (water splashing festival)",
    "Qing_Hai":"What province's captial is Xining",
    "Hai_Nan":"What province is known for its chicken rice?",
    "Chong_Qing":"What is the largest city proper in the world?",
    "Tian_Jin":"What municipality is known for its goubuli bao zi?",
    "Bei_Jing":"Where is the capital of China?",
    "Ning_Xia":"What autonomous region was originally under Gansu?",
    "Nei_Meng_Gu":"What province is named after Mongolia",
    "Guang_Xi":"What province is known for its Yue Cai",
    "Xin_Jiang":"What province has Urumqi as its capital",
    "Xi_Zang":"What is the Chinese name for Tibet?",
    "Hei_Long_Jiang":"What is the most Northeast province in China?",
    "Jiang_Su":"Which province is 江苏 in Chinese?"
}
        //set minutes 
        var score = 0;
        var mins = 2; 
        var secs = mins * 60; 
        var index = 0;
        var paused = false;
        var currentprovince = "";
        var keys = Object.keys(dataObject);
        function changetime(){
            paused = !paused;
            if(paused){
                document.getElementById('province').disabled = true;
            }
            else{
            document.getElementById('province').disabled = false;
            }
        }
        function rst(){
            keys = Object.keys(dataObject);
            score = 0;
            mins = 2;
            secs = mins *60;
            document.getElementById('province').disabled = false;
            document.getElementById("minutes").style.color = "black";
            document.getElementById("seconds").style.color = "black";
            document.getElementById("minutes").value = mins;
            document.getElementById("seconds").value = '0';
            document.getElementById("score").innerHTML = "Score: "+score;
            resetColors();
        }
        function resetColors(){
            for(var i =0;i<keys.length;i++){
                document.getElementById(keys[i]).style.fill = 'rgb(222, 255, 224)';
            }
        }
        function playgame(){
            document.getElementById('province').disabled = false;
                if(keys.length<1){
                    document.getElementById('province').disabled = true;
                    mins = 0; secs = 0;
                    document.getElementById("question").innerHTML = "Out of provinces, Thank you for playing!";
                }
                else{
                    index = Math.floor(Math.random()*keys.length);
                    currentprovince=keys[index];
                    document.getElementById("question").innerHTML = dataObject[keys[index]];
                }
        }
        document.getElementById('province').addEventListener('keydown', function(e) {
            
            if(e.keyCode===13){          //enter key is pressed
                var answer = document.getElementById('province').value;
                console.log(answer);
                console.log(currentprovince);
                console.log(answer == currentprovince);
                if (answer == currentprovince) {
                    document.getElementById(currentprovince).style.fill='green';
                    score++;
                }
                else if (answer != currentprovince) {
                    document.getElementById(currentprovince).style.fill='red';
                }
            keys.splice(index, 1);
            document.getElementById("score").innerHTML = "Score: "+score;
            document.getElementById('province').value = "";
            playgame();
        
    }
});
        function countdown() { 
            setTimeout('Decrement()', 60); 
             playgame();
        } 
        function Decrement() { 
            if (document.getElementById) { 
                minutes = document.getElementById("minutes"); 
                seconds = document.getElementById("seconds"); 
                if (seconds < 59) { 
                    seconds.value = secs; 
                } 
                else { 
                    minutes.value = getminutes();
                    seconds.value = getseconds(); 
                } 
                if (mins < 1) { 
                    minutes.style.color = "red"; 
                    seconds.style.color = "red"; 
                } 
                if (mins < 0) { 
                    document.getElementById('msg').innerHTML = ("time is up");
                    fetchFromServer();
                    document.getElementById('province').disabled = true;
            document.getElementById("question").innerHTML = "Thank you for playing!";
                    // stopGame();
                    minutes.value = 0; 
                    seconds.value = 0; 
                } 
                else { 
                    if(!paused){
                        secs--; 
                    }
                    setTimeout('Decrement()', 1000); 
                } 
            } 
        } 
        /*stopGame(){
            
        }*/
        function getminutes() { 
            mins = Math.floor(secs / 60); 
            return mins; 
        } 
        function getseconds() { 
            return secs - Math.round(mins * 60); 
        } 
        function fetchFromServer() {
    console.log('ajax');
    var ajax_params = {
        'url'     : "mapworker",
        'type'    : "get",
        'data'    : {'score':score},
        'success' : onServerResponse
    }
    
    $.ajax( ajax_params )
}
function onServerResponse (responseText) {
    
    document.getElementById('highscore').innerHTML = ("Highscore: "+responseText);
}