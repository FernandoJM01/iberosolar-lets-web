$(function(){
  $(".container.irradiance").click(function (){
    $(".pop-upGraphContainer").addClass("visible");
    document.body.style.overflow = 'hidden';
  });

  $(".pop-upGraph #closeIcon").click(function (){
    $(".pop-upGraphContainer").removeClass("visible");
    document.body.style.overflow = 'auto';
  });
});