/*
 *  Mac_dock for menu 
 *  
 *  Copyright (c) 2013 SeanGo Chen
 *
**/
$(document).ready(
	function(){
		parent1=$("a:first");
		prev2=parent1.prev().prev().find(" a ");
		prev1=parent1.prev().find(" a ");
		next1=parent1.next().find(" a ");
		next2=parent1.next().next().find(" a ");
		var originSize=parent1.width();
		var goalSize=100;
		var dock_items =$('a.dock_item');
		dock_items.width($(window).height()*0.05);

		dock_items.mouseover(function (e) {
			parent1=$(this);
			prev1=parent1.prev();
			prev2=prev1.prev();
			next1=parent1.next();
			next2=next1.next();

			if (next1.hasClass("hide_dock")) 
				next1=$();
			if (next2.hasClass("hide_dock")) 
				next2=$();		
		});
		dock_items.mousemove(function (e) {
			curX = e.pageX + document.documentElement.scrollTop;
			curY = e.pageY + document.documentElement.scrollLeft;
			offsetX = $(this).offset().left;
			offsetY = $(this).offset().top;
			enlargeRate = curX-offsetX;
			smoothEnlarge = curY-offsetY;
			var smoothRate;

			if(smoothEnlarge > 20) {
				smoothRate = 1;
			} else {
				smoothRate = smoothEnlarge/20;				
			}

			$(this).width(smoothRate*(goalSize - originSize)+originSize);

			if (enlargeRate > goalSize) {
				enlargeRate = goalSize;
			};
			
			prev2.width((goalSize-enlargeRate)*0.375*smoothRate+originSize);
			prev1.width((goalSize-enlargeRate)*0.125*smoothRate+originSize+smoothRate*goalSize*0.375);
			next1.width(enlargeRate*smoothRate*0.125+originSize+smoothRate*goalSize*0.375);
			next2.width(enlargeRate*smoothRate*0.375+originSize);
		});

		$('div.dock_container').hover(
			function (e1) {
				$('div.dock_container').height(goalSize+20);
				dock_items.width(originSize);
			},
			function (e2){
				dock_items.animate({width: $(window).height()*0.05},100);
				$(this).animate({height: $(window).height()*0.1},100);	
			}
		);		
	});
	