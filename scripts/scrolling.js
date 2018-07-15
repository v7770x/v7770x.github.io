

var scrollList = ['intro', 'workExperience', 'projects', 'skills', 'achievements','education','contactMe'];
var disableScroll = false;
var scrollIdList = scrollList.map(mapToId);
var scrollGearIdList = [];
var lastScroll = 0;
var transitionsComplete = [];
for(let x = 0; x<scrollList.length;x++)
    transitionsComplete.push(false);

var innerScrollList = [["intro", 'introExpand'],["workExperience", "triumf" , "spinLab", "cluep", "kumon"],
        ['projects','projNasa','projClothes','projMusic','projBike', 'projArm', 'projRobotics', 'projHack', 'projLine','projMars'],
        ["skills"],
        ["achievements","aNasa","a100","aTronDays","aOther","aNews"],['education'],['contactMe']];
var innerScrollIdList = innerScrollList.map(function(x)
{
    return x.map(mapToId);
});


function mapToId(x)
{
    return '#'+x;
}

var trackerSpacing = 0;
function getTrackerSpacing()
{
    if($(document).height()>=1000)
        return 140;
    else
        return 90;
}


$(document).ready(function(e)
    {
        var g = document.getElementById("trackerCircle");
        var gtx = g.getContext("2d");
        gtx.beginPath();
        gtx.arc(75/2,75/2,25,0,2*Math.PI);
        gtx.fillStyle= "#00A4BC";
        gtx.fill();
        gtx.stroke();

        trackerSpacing = getTrackerSpacing();
        for(let i = 0; i<scrollIdList.length; i++)
        {
            scrollGearIdList.push(mapToId("g"+i));
            $("#tracker").append("<div id='g"+i+"' class='gear gInactive'> <img id='gim"+i +"'src='images/gear.svg'></div>");
            $(scrollGearIdList[i]).css({top: 90*i +'px', left:(i%2==0)?0:'60px'})
        }
        $(scrollGearIdList[0]).addClass('gActive').removeClass('gInactive');
        $(scrollIdList[0]).addClass("active");

        for(let i =1; i<scrollIdList.length;i++)
            $(scrollIdList[i]).addClass("below");

        postScroll();

        for(let i = 0; i<scrollGearIdList.length;i++)
        {
            $(scrollGearIdList[i]).click((e)=>jumpToPage(getGearPage(e)));
        }
        window.addEventListener('wheel', function(e){
            let timeNow = (new Date).getTime();
            if(timeNow-lastScroll > 1000 && !disableScroll)
            {
                let prevCurrNext = getPrevCurrNext();
                let leftCenterRight = getLeftCenterRight(prevCurrNext[1]);
                
                if(e.deltaX<0)
                    scrollLeft(prevCurrNext[1],leftCenterRight);
                else if(e.deltaX-0<=0.0001)
                {}
                else
                    scrollRight(prevCurrNext[1], leftCenterRight);
                if(e.deltaY<0)
                    scrollUp(prevCurrNext);
                else if(e.deltaY-0<=0.0001)
                {}
                else    
                    scrollDown(prevCurrNext);
                lastScroll = timeNow;
                postScroll();
            }      

        });
        $("#g6 img").addClass('displayNone');

        $("#triumfIntro").click((e)=>jumpLeftRight(1, 1));
        $("#spinLabIntro").click((e)=>jumpLeftRight(1, 2));
        $("#kumonIntro").click((e)=>jumpLeftRight(1, 4));
        $("#cluepIntro").click((e)=>jumpLeftRight(1, 3));
        $("#rightArrow").click((e)=>{scrollRight(-1); updateLeftRightBar()});
        $("#leftArrow").click((e)=>{scrollLeft(-1);updateLeftRightBar();});
        $("#rightArrow").dblclick((e)=>{let curr = getPrevCurrNext()[1];jumpLeftRight(curr, innerScrollIdList[curr].length-1)});
        $("#leftArrow").dblclick((e)=>{let curr = getPrevCurrNext()[1];jumpLeftRight(curr, 0)});
        $("#achievementsNasa").click((e)=>jumpLeftRight(4,1));
        $("#achievements100").click((e)=>jumpLeftRight(4,2));
        $("#achievementsTronDays").click((e)=>jumpLeftRight(4,3));
        $("#achievementsOther").click((e)=>jumpLeftRight(4,4));
        $("#achievementsNews").click((e)=>jumpLeftRight(4,5));
        $(".scrollDownArrow").click((e)=>{scrollDown(getPrevCurrNext()); postScroll()});
        $('#sidebarHomeButton').click((e)=>sidebarButtonClicked(0));
        $('#sidebarWorkExperienceButton').click((e)=>sidebarButtonClicked(1));
        $('#sidebarProjectsButton').click((e)=>sidebarButtonClicked(2));
        $('#sidebarSkillsButton').click((e)=>sidebarButtonClicked(3));
        $('#sidebarAchievementsButton').click((e)=>sidebarButtonClicked(4));
        $('#sidebarEducationButton').click((e)=>sidebarButtonClicked(5));
        $('.toContact').click((e)=>sidebarButtonClicked(6));
        
        $('.toANasa').click((e)=>{jumpToPage(4); jumpLeftRight(4,1);});
        $('.toATronDays').click((e)=>{jumpToPage(4); jumpLeftRight(4,3);});

    }
);

function sidebarButtonClicked(num)
{
    closeSidebar();
    jumpToPage(num);

}

function getGearPage(e)
{
    let s = e.target.id;
    return parseInt(s[s.length-1]);
}

function jumpToPage(pg)
{
    for(let i =0; i<innerScrollIdList.length; i++)
    {
        for(let j = 0; j<innerScrollIdList[i].length;j++)
        {
            let curr = $(innerScrollIdList[i][j]);
            curr.removeClass("active above below");
            if(i<pg)
                curr.addClass("above");
            else if(i>pg)
                curr.addClass("below");
            else if(i==pg)
                curr.addClass("active");
        }
        let currG = $(scrollGearIdList[i]);
        currG.removeClass('gActive gInactive');
        if(i==pg)
            currG.addClass('gActive');
        else
            currG.addClass('gInactive');
        updateTrackerCircle(pg);
    } 
    postScroll();
}

function jumpLeftRight(currPg, slide)
{
    let len = innerScrollIdList[currPg].length;
    if(slide>=len)
        return;
    for(let i = 0; i < len; i++)
    {
        let curr = $(innerScrollIdList[currPg][i]);
        curr.removeClass("center left right");
        if(i<slide)
            curr.addClass('left');
        else if (i>slide)
            curr.addClass('right');
        else if (i==slide)
            curr.addClass('center');
    }
    postScroll();
    
}

function scrollUp(arr)
{
    if(arr[0]!=arr[1])
    {
        for(let i = 0; i<innerScrollIdList[arr[0]].length;i++)
            $(innerScrollIdList[arr[0]][i]).addClass("active").removeClass("above");
        for(let i = 0; i<innerScrollIdList[arr[1]].length;i++)
            $(innerScrollIdList[arr[1]][i]).addClass("below").removeClass("active");
        //gears
        $(scrollGearIdList[arr[0]]).addClass('gActive').removeClass('gInactive');
        $(scrollGearIdList[arr[1]]).addClass('gInactive').removeClass('gActive');
        updateTrackerCircle(arr[0]);
    }
}

function scrollDown(arr)
{
    if(arr[1]!=arr[2])
    {
        for(let i = 0; i<innerScrollIdList[arr[1]].length;i++)
            $(innerScrollIdList[arr[1]][i]).addClass("above").removeClass("active");
        for(let i = 0; i<innerScrollIdList[arr[2]].length;i++)
            $(innerScrollIdList[arr[2]][i]).addClass("active").removeClass("below");
        
        //gears
        $(scrollGearIdList[arr[2]]).addClass('gActive').removeClass('gInactive');
        $(scrollGearIdList[arr[1]]).addClass('gInactive').removeClass('gActive');
        updateTrackerCircle(arr[2]);

    }
}

function scrollLeft(curr, arr)
{
    if(curr==-1)
    {
        curr =  getPrevCurrNext()[1];
        arr = getLeftCenterRight(curr);
    }
    if(arr[0]!=arr[1])
    {
        $(innerScrollIdList[curr][arr[0]]).addClass("center").removeClass("left");
        $(innerScrollIdList[curr][arr[1]]).addClass("right").removeClass("center");
    }
}

function scrollRight(curr, arr)
{
    if(curr==-1)
    {
        curr =  getPrevCurrNext()[1];
        arr = getLeftCenterRight(curr);
    }
    if(arr[2]!=arr[1])
    {
        $(innerScrollIdList[curr][arr[2]]).addClass("center").removeClass("right");
        $(innerScrollIdList[curr][arr[1]]).addClass("left").removeClass("center");
    }
}

function updateTrackerCircle(next)
{
    $("#trackerCircle").css({left:$(scrollGearIdList[next]).css("left"),
        top:$(scrollGearIdList[next]).css("top")});
}


function getPrevCurrNext()
{
    let x = [], found = false, size = scrollIdList.length;
    for(let elem = 0; elem <size && !found; elem++)
    {
        if($(scrollIdList[elem]).hasClass("active"))
        {
            x.push((elem-1>=0)?elem-1:elem);
            x.push(elem);
            x.push((elem+1<size)?elem+1:elem);
            found = true;
        } 
    }
    return x;
}

function getLeftCenterRight(curr)
{
    let elems = [], found = false, size = innerScrollIdList[curr].length;
    for(var elem =0; elem <size&&!found; elem++)
    {
        if($(innerScrollIdList[curr][elem]).hasClass("center"))
        {
            elems.push((elem-1>=0)?elem-1:elem);
            elems.push(elem);
            elems.push((elem+1<size)?elem+1:elem);
            found = true;
        }
    }
    return elems;
}

function updateLeftRightBar()
{
    let arr = getLeftCenterRight(getPrevCurrNext()[1]);
    if(arr[0]==arr[1])
        $("#leftArrow").addClass('displayNone').removeClass('displayBlock');
    else
        $("#leftArrow").addClass('displayBlock').removeClass('displayNone'); 

    if(arr[1]==arr[2])
        $("#rightArrow").addClass('displayNone').removeClass('displayBlock');
    else
        $("#rightArrow").addClass('displayBlock').removeClass('displayNone'); 
    
}

function postScroll()
{
    if(!$(scrollIdList[0]).hasClass('active'))
        $('#logoContainer').removeClass('displayNone').addClass('displayBlock');
    else
        $('#logoContainer').removeClass('displayBlock').addClass('displayNone');
    
    if($(scrollIdList[1]).hasClass('active')&&!transitionsComplete[1])
    {
        $('#workExperienceHeadingContainer').addClass('workExpUp transitionA').removeClass('workExpDown');
        $('#workExperienceHeading').addClass('workExpSmall transitionA').removeClass('workExpBig');
        $('#triumfIntro').addClass('opacity1 transitionB').removeClass('opacity0');
        $('#spinLabIntro').addClass('opacity1 transitionC').removeClass('opacity0'); 
        $('#cluepIntro').addClass('opacity1 transitionB').removeClass('opacity0');
        $('#kumonIntro').addClass('opacity1 transitionC').removeClass('opacity0'); 
        transitionsComplete[1] = true;
        // disableScroll = true;
        // setTimeout(()=>disableScroll=false,5500);
    }
    if($(scrollIdList[6]).hasClass('active'))
        $('#trackerCircle').css('left','-=1000px');
    
    
    updateLeftRightBar();
        
}