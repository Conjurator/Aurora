// 8、播放动画时，滑屏控制飞行物体位置；暂停动画时，滑屏旋转场景角度
function init(aircraft){
	var oldX = 0;
	var oldY = 0;
	var newX = 0;
	var newY = 0;
	var widthMove = 0;
	var heightMove = 0;
	document.addEventListener('touchstart', function(event){
		var target = event.targetTouches[0];
		oldX = target.clientX;
		oldY = target.clientY;
	})

	document.addEventListener('touchmove', function(event){
		event.preventDefault();
		event.stopPropagation();
		console.log(moveObject.canBemoved);
		if(moveObject.canBemoved){
			var target = event.targetTouches[0];
			console.log(newX)
			console.log(newY);
			newX = target.clientX;
			newY = target.clientY;
			var left = newX-oldX;
			var top = oldY-newY;

			widthMove = left / 1000;
			if(widthMove > 0.08) {
				widthMove = 0.08;
			} else if (widthMove < -0.08) {
				widthMove = -0.08;
			}
			
			heightMove = top / 2000;
			if(heightMove > 0.3) {
				heightMove = 0.3;
			} else if (heightMove < -0.3) {
				heightMove = -0.3;
			}

			widthMove = left / 1000;
			if(widthMove > 0.08) {
				widthMove = 0.08;
			} else if (widthMove < -0.08) {
				widthMove = -0.08;
			}
			
			heightMove = top / 2000;
			if(heightMove > 0.3) {
				heightMove = 0.3;
			} else if (heightMove < -0.3) {
				heightMove = -0.3;
			}

			aircraft.position.x = widthMove;
			aircraft.position.y = heightMove;
		}
		
		
	}, false)

	document.addEventListener('touchstart', function(event){
		var target = event.targetTouches[0];
	})
}

var moveObject={
	init,
	canBemoved:true
}

export default moveObject;
