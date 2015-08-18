//app js

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
var loadingimg = "<img src=\"images/loading.gif\"/>";
//common end

//login start//////////////////////////////////
$(document).on("click", "#btn_Login", function () {
    appLogin.start();
}); 
var reqBase = "http://localhost:51230/api/";
var appLogin = {
    ctr:"Login",
    start:function() {
        var $btnLogin = $("#btn_Login");
        $btnLogin.append(loadingimg);
        $btnLogin.attr("disabled", true);

        var userid = $.trim($("#txtUser").val());
        var userpass = $.trim($("#txtPass").val());

        $.ajax({
            type: "post",
            url: reqBase + appLogin.ctr,
            data: { UserID: userid, UserPass: userpass },
            success: function (res) {
                if (res.code === 1) {
                    //login success
                    appLogin.hidLoginLoading($btnLogin);
                    $.bsAlertSuccess("登录成功", "#tip", 2);

                } else {
                    appLogin.hidLoginLoading($btnLogin);
                    $.bsAlertWarn(res.msg, "#tip", 4);
                }
            },
            error: function (e) {
                appLogin.hidLoginLoading($btnLogin);
                $.bsAlertWarn("系统出错", "#tip", 4);
                console.log(e);
            }
        });
    },
    hidLoginLoading: function($btnLogin) {
        $btnLogin.attr("disabled", false);
        $btnLogin.find("img").remove();
    }
}

/*login end*/


/*products start*/
var appProducts = {
    ctr: "Product",
    page: { index: 0, size: 10 },
    getList: function (successfunc) {
        $.ajax({
            type: "get",
            url: reqBase + appProducts.ctr,
            data: { pagesize: appProducts.page.size, pageindex: appProducts.page.index },
            dataType: "json",
            success: successfunc,
            error: function (e) {
                console.error(e);
                $.bsAlertWarn("系统出错", "#tip", 4);
            }
        });
    }
}
/*products end*/