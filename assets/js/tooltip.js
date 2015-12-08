$("<style type='text/css' id='dynamic' />").appendTo("head");

function getPos(e){
    $("#dynamic").text(".tooltip:hover:after { left:" + e.offsetX+ "px;}" + ".tooltip:hover:after { top:" + e.offsetY+ "px;}");
}