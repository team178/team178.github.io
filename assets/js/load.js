/* This is for all of the things that get done when the page loads */
// Imports Stencil font for use anywhere on page:
(function(d) {
  var config = {
  kitId: 'zpk3ogt',
  scriptTimeout: 3000,
  async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

$(window).load(function() {
  // For raffle:
  if ($('#raffle-meter-container').length > 0) {
    if (!(typeof (bIsIE) != 'undefined')) {
      $('#raffle-meter-container').ready(function() {
        $('#raffle-meter-container').show();
        $('#raffle-divider').show();
        $('#banner').hide();
      })
    } else {
      $('#raffle-meter-container-s').ready(function() {
        $('#raffle-meter-container-s').show();
      })
    }

  } else {
    $('#raffle-meter-container-s').ready(function() {
      $('#raffle-meter-container-s').show();
    })
  }
  // Makes the page visible:
  $("body").show();
});
