           
$(document).ready(function(){

    $('body').append('test');
});

 
chrome.extension.onConnect.addListener(function(port) {
      port.onMessage.addListener(function(msg) {
            data= JSON.stringify($('#junkdrawer').clone().html()); 
             port.postMessage({reply: data});

                $('body').append('msg '+ msg);  
              });
});

$('body').prepend('<div class="ui-widget-content" id="junkdrawer"><h3 class="ui-widget-header"></h3><div id="data" ></div></div> ');


function update(){

    // We can do xhr and can access local files like this:
    $.get("chrome-extension://ginfiphcnjiiecbdmgmagnhjjcplmjco/test", function(data){
    
        // do something with data.    
    });
}


$('#junkdrawer').hover(function(e){

        e.stopPropagation();

        $('#junkdrawer').css({opacity:1});
        $('#junkdrawer').css({height:500, width:250, opacity:1} );
});

$('#junkdrawer').click(function(e){

        e.stopPropagation();
        
});

$('body').click(function(){
        
    tagElements();
    $('#junkdrawer').css({opacity:.5, width:5});

});


$( "#junkdrawer" ).droppable({
    
    drop: function( event, ui ) {
        
        console.log(event);
        $(ui.draggable[0]).css({position:'relative', top:0, left:0});
        
        console.log(ui.draggable[0]);
        console.log(localStorage.el);

        $('#data').append($('<div />').html(ui.draggable));

return false;
    }
});


function tagElements(){

    $('a').draggable();
    $('a').css({border:"2px groove blue"});

    $('img').css({border:"5px groove green"});
    $('img').draggable();
    $('img').click(function(e){
        
            e.stopPropagation();
            e.preventDefault();
            $('#data').append($('<div />').html(this));
    });

    $('p').css({border:"2px groove yellow"});
    $('p').draggable();
    $('span').css({border:"2px groove yellow"});
    $('span').draggable();

}


try {
    $('*').each(function(el){

        if($(this).css('background-image') != 'none') {
            
            console.log($(this).css('background-image'));
            $(this).css({border:'2px solid red'});
            $(this).draggable();
        }
    });

    $('*').contents().each(function(){
        
        if (this.nodeType == 3){

            if (this.nodeValue.trim() != "" && this.parentNode !="") 
                $(this).text($('<p />').text($(this))).css({'font-size':'50pt', 'background-color':'yellow'});

        }
        
        
    });
}
catch(e) {

    console.log(e);
}


chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
            sendResponse(JSON.stringify($('#junkdrawer').html()));    
                $('body').append('sending msg<br />');  
          });


