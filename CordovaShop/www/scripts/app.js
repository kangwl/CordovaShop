//app js
var reqBase = "http://cordovaserv.apphb.com/api/";

function dealHash() {
    var hash = location.hash;
    if (hash !== "") {
        var partialHtml = hash.substr(1) + ".html";
        $.ajax({
            type: "get",
            url: "partial/" + partialHtml,
            data: {},
            async: false,
            success: function (res) {
                $("#maincontent").append(res);
            }
        });
        $("#navul").find("li").removeClass("active");
        $(hash + "li").addClass("active");
    }
}
//common start
var loadingimg = "<img id='loadingimg' src=\"images/loading.gif\"/>";
 
//common end
