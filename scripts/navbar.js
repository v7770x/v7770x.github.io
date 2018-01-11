var sidebar = false;
function closeSidebar()
{
    disableScroll=false;
    $('#sidebarOuterContainer').animate({opacity:0}).promise().done(function(){
        $('#sidebarOuterContainer').css("left","-100%");
        sidebar = false;
        
        $("#clickBar").addClass("fa-bars").removeClass("fa-times");
    });
    $("#sidebarInnerContainer").animate({left:'-100%'});
    $('#navClick').animate({left:'100px'});

}
$(document).ready(function(){
    var c = document.getElementById("logo");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(50,50,40,0,2*Math.PI);
    ctx.fillStyle = "#46344e";
    ctx.fill();
    ctx.stroke();
    
    var b = document.getElementById("logo2");
    var btx = b.getContext("2d");
    btx.beginPath();
    btx.arc(50,50,40,0,2*Math.PI);
    btx.fillStyle = "#006699";
    btx.fill();
    btx.stroke();    
    //$('#intro').css('height', '100%').css('height', '-=100px');
    
    $('#sidebarOuterContainer').click(function (){closeSidebar();});
    $("#navClick").click(
        function()
        {
            if(!sidebar)
            {
                disableScroll=true;
                $('#sidebarOuterContainer').css("left","0px");
                $('#sidebarOuterContainer').animate({opacity:1}).promise().done(function(){
                    $("#clickBar").removeClass("fa-bars").addClass("fa-times");
                    sidebar = true;
                    
                });
                $("#sidebarInnerContainer").animate({left:'0px'});
                $('#navClick').animate({left:'450px'});
    
            }else
            {
              closeSidebar();
            }
        }
    );
});
