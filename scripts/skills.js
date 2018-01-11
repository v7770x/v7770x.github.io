$(document).ready(function(ready)
{
    let programmingLanguages = ["Javascript", "Python", "React.js", "Node.js", "C++", "HTML/CSS", "ROS", "Java", "C#", "Tensorflow"];
    let programmingLanguagesPercent = [95, 80, 90, 40, 80, 95, 30, 50, 60];
    let designingTools = ["Solidworks", "AutoCAD"];
    let designingToolsPercent = [65, 80];
    let mechanicalSkills = ["Machining", "3D Printing", "Laser Cutting"];
    let mechanicalSkillsPercent = [50, 40, 60];
    let otherSkills = [ "Linux Cmd Ln", "Windows Cmd Ln", "Office"];
    let otherSkillsPercent = [ 40, 70,90];
    
    for(let i =0; i<programmingLanguages.length/2; i++)
    {
        $("#programmingRow1").append(
            '<div class="skillContainer" id="programming'+ programmingLanguages[i].replace(/\s/g,'')  +'">\
                <div class="body skillHeading">'+programmingLanguages[i] +'</div>\
                <div class = "skillRangeFront" style = "width:'+ programmingLanguagesPercent[i] +'%"></div>\
                <div class = "skillRangeBack"></div>\
            </div>'
        );
    }
    for(let i = Math.floor(programmingLanguages.length/2); i<programmingLanguages.length; i++)
    {
        $("#programmingRow2").append(
            '<div class="skillContainer" id="programming'+ programmingLanguages[i].replace(/\s/g,'') +'">\
                <div class="body skillHeading">'+programmingLanguages[i] +'</div>\
                <div class = "skillRangeFront" style = "width:'+ programmingLanguagesPercent[i] +'%"></div>\
                <div class = "skillRangeBack"></div>\
            </div>'
        );
    }
    for(let i =0; i<designingTools.length;i++)
    {
        $("#designingTools").append(
            '<div class="skillContainer" style="width:100%" id="designingTools'+ designingTools[i].replace(/\s/g,'') +'">\
                <div class="body skillHeading">'+designingTools[i] +'</div>\
                <div class = "skillRangeFront" style = "width:'+ designingToolsPercent[i] +'%"></div>\
                <div class = "skillRangeBack"></div>\
            </div>'
        );
    }
    for(let i =0; i<mechanicalSkills.length;i++)
    {
        $("#mechanicalSkills").append(
            '<div class="skillContainer" style="width:100%" id="mechanicalSkills'+ mechanicalSkills[i].replace(/\s/g,'') +'">\
                <div class="body skillHeading">'+mechanicalSkills[i] +'</div>\
                <div class = "skillRangeFront" style = "width:'+ mechanicalSkillsPercent[i] +'%"></div>\
                <div class = "skillRangeBack"></div>\
            </div>'
        );
    }
    for(let i =0; i<otherSkills.length;i++)
    {
        $("#otherSkills").append(
            '<div class="skillContainer" style="width:100%" id="otherSkills'+ otherSkills[i].replace(/\s/g,'') +'">\
                <div class="body skillHeading">'+otherSkills[i] +'</div>\
                <div class = "skillRangeFront" style = "width:'+ otherSkillsPercent[i] +'%"></div>\
                <div class = "skillRangeBack"></div>\
            </div>'
        );
    }

});