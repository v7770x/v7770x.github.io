
var projectsList = ['Nasa', 'Clothes', 'Music', 'Bike', 'Arm', 'Robotics','Hack','Line', 'Mars'];
$(document).ready(function(ready)
{
    for(let i=0; i<projectsList.length; i++)
        $('#p'+projectsList[i]).click(function(e){
            let s =this.id.substring(1);
            jumpLeftRight(2,projectsList.indexOf(s)+1);
        });
    $('.projectsIntroContainer').mouseenter(function(e)
    {
        $("#"+this.id+" h1").addClass("opacity100").removeClass("opacity0");
        $("#"+this.id+" div").addClass("opacityHover").removeClass("opacity100");
    });
    $('.projectsIntroContainer').mouseleave(function(e)
    {
        $("#"+this.id+" h1").addClass("opacity0").removeClass("opacity100");
        $("#"+this.id+" div").addClass("opacity100").removeClass("opacityHover");
    });
});