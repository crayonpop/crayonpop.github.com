// AI39si7q8IlUgI1ivCf9kYln2XQlKvSYeD190pCovmgC_fps-fZ3G6WxbeQBqDmpTtiqXxIwry-2c13ieIc2YYx6_CTAdxqWmg


var titleEl;
var datas;
var datas2;
var now;
var allRank = false;
var catch_artist = "크레용팝"


 $.ajax({
        url: "http://gdata.youtube.com/feeds/api/videos/qCPFK61Yu3M?v=2&alt=json",
        dataType: "json",                         
        success: function (data){
            var viewcount = data.entry.yt$statistics.viewCount;
            var stillShot = data.entry.media$group.media$thumbnail[1].url;
            var mediaUrl  = data.entry.media$group.media$player.url;
            var titleName = data.entry.title.$t

            var urls = "<h1 id='count'></h1><br>"
            urls += "<a href='"+mediaUrl+"'><img src='" +stillShot +"'/></a><br><br>";
            
            $("#titlename").html(titleName);
            $("#mvcut").html(urls);
            new numberCounter("count",viewcount);
        }
    });

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


        $targetNow.html("<h1>" + data.melon.rankDay +"<p>-</p>"+ data.melon.rankHour +":00" + "</h1><br>");
        
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
                +"<tr align=center><td width=100%><img src='"+ getNumberIcon(i+1) +"' alt='"+(i+1)+"위' />위 ("+rankSymbol(curRank,pastRank) + Math.abs(pastRank - curRank) +")</td></tr>" 
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
                +"<td width=10%><img src='"+ getNumberIcon(i+1) +"' alt='"+(i+1)+"위' /></td>" 
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

function commaNum(num) {  
        var len, point, str;  
  
        num = num + "";  
        point = num.length % 3  
        len = num.length;  
  
        str = num.substring(0, point);  
        while (point < len) {  
            if (str != "") str += ",";  
            str += num.substring(point, point + 3);  
            point += 3;  
        }  
        return str;  
    }  

function numberCounter(target_frame, target_number) {
    this.count = 0; this.diff = 0;
    this.target_count = parseInt(target_number);
    this.target_frame = document.getElementById(target_frame);
    this.timer = null;
    this.counter();
};
    numberCounter.prototype.counter = function() {
        var self = this;
        this.diff = this.target_count - this.count;
 
        if(this.diff > 0) {
            self.count += Math.ceil(this.diff / 5);
        }
 
        this.target_frame.innerHTML = commaNum(this.count);
 
        if(this.count < this.target_count) {
            this.timer = setTimeout(function() { self.counter(); }, 15);
        } else {
            clearTimeout(this.timer);
        }
    };
    numberCounter.prototype.formatNumber = function(num) {
        num+= '';
        x = num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(d+)(d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };

    