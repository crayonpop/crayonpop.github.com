// AI39si7q8IlUgI1ivCf9kYln2XQlKvSYeD190pCovmgC_fps-fZ3G6WxbeQBqDmpTtiqXxIwry-2c13ieIc2YYx6_CTAdxqWmg


var titleEl;
var datas;
var now;
var allRank = false;
var catch_artist = "크레용팝"


$(function () {
    PlanetX.init({
        appkey: "c6e4b1a5-fec2-38ad-aed5-d9c67dd15f04",
        client_id: "345463c4-51b7-3c67-81fc-c1efaca7b586",
        scope: "",
        redirect_uri: "http://ellin.kd.io/"
    });

    melon();
});

function melon() {
    PlanetX.api("get", "http://apis.skplanetx.com/melon/charts/realtime?", "JSON", {
        "version": 1,
        "page": 1,
        "count": 100
    }, melon_realTime_callback);
    
}

function melon_realTime_callback ( data ) {
    var $targetEl,
        $targetNow,
        playList,
        symbol,
        melonData;

        $targetEl  = $("#songs");
        $targetNow = $("#now");

        melonData = data.melon.songs;
        datas = data;


        $targetNow.html("<h1>" + data.melon.rankDay +" / "+ data.melon.rankHour +":00" + "</h1><br>");
        
        for(var i = 0; i< data.melon.songs.song.length; i++)
        {
            var artistName = melonData.song[i].artists.artist[0].artistName;
            var songName   = melonData.song[i].songName
            var curRank    = melonData.song[i].currentRank;
            var pastRank   = melonData.song[i].pastRank;
            var imgLink    = getCoverImg(melonData.song[i].albumId);
            
            
            if( allRank || (artistName == catch_artist))
            {
                titleEl += 
                 "<tr align=center><td width=100%><b>" + songName + "</b></td></tr>"
                +"<tr align=center><td width=100%><img src='"+ getNumberIcon(i+1) +"' />위 ("+rankSymbol(curRank,pastRank) + Math.abs(pastRank - curRank) +")</td></tr>" 
                +"</tr><tr align=center><td width=100%>" + "<img style='width: 250px; height: auto;' src='"+ imgLink +"' /></td></tr>"
                // +"<tr align=center><td width=100%>" + rankSymbol(curRank,pastRank) + Math.abs(pastRank - curRank) + "</td></tr>"             
                
            } 
        }
        $targetEl.html(titleEl);

    //     PlanetX.api("get", "http://apis.skplanetx.com/melon/charts/todaytopsongs?", "JSON", {
    //     "version": 1,
    //     "page": 1,
    //     "count": 100
    // }, melon_todaySong_callback);
    
    
}

function melon_todaySong_callback(data)
{
        var $targetEl;

        $targetEl  = $("#songs");

        melonData = data.melon.songs;
        titleEl +="<tr align=right><td colspan=4><h2>일간차트</h2></td></tr>";

        for(var i = 0; i< data.melon.songs.song.length; i++)
        {
            var artistName = melonData.song[i].artists.artist[0].artistName;
            var songName   = melonData.song[i].songName
            var curRank    = melonData.song[i].currentRank;
            var pastRank   = melonData.song[i].pastRank;
            var imgLink    = getCoverImg(melonData.song[i].albumId);
            
            
            if( allRank || (artistName == catch_artist))
            {
                titleEl +=  "<tr align='center'>"
                +"<td width=10%><img src='"+ getNumberIcon(i+1) +"' /></td>" 
                +"<td width=10%>" + "<img style='width: 100px; height: auto;' src='"+ imgLink +"' /></td>"
                +"<td width=10%>" + rankSymbol(curRank,pastRank) + Math.abs(pastRank - curRank) + "</td>"             
                +"<td width=70%>" + songName + "</td></tr>";
            } 
        }
        $targetEl.html(titleEl);
}

function rankSymbol(curRank,pastRank){

    var symbol; 

    if(curRank<pastRank)   
        symbol = "<label style='color:red;'>▲</label>"    
    else if(curRank == pastRank) 
        symbol = "= "
    else  
        symbol = "▼"

    return symbol;
}

function getCoverImg(albumId){
    // http://image.melon.co.kr/cm/album/images/022/02/410/2202410_500.jpg
    var f1,
        f2,
        f3
        aId ="",
        imgUrl = "http://image.melon.co.kr/cm/album/images/0"

        aId = albumId.toString();

        f1 = aId.substring(0,2);
        f2 = aId.substring(2,4);
        f3 = aId.substring(4);

        imgUrl += f1 + "/" + f2 + "/" + f3 + "/" + aId + "_500.jpg";

        return imgUrl;
}

function getNumberIcon(rankNo)
{
    return imgUrl ="http://image.melon.co.kr/resource/image/cds/common/web/templet/num"+ rankNo +".png"
}

