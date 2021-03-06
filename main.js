var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5 
autoSetCanvasSize(yyy)

ListentoUser(yyy)

var eraserEnable = false

eraser.onclick = function(){
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

pen.onclick = function(){
    eraserEnable =false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}

download.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
}

red.onclick = function(){
    context.strokeStyle = 'red'
    context.fillStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    context.fillStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    context.fillStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}
thin.onclick = function(){
    lineWidth = 5
}
thick.onclick =function(){
    lineWidth = 7
}


function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}


function  drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}



function autoSetCanvasSize(canvas){
    
    setCanvasSize()

    window.onresize = function(){
    setCanvasSize()
}

function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}
}

function ListentoUser(canvas){

    var using = false
    var lastPoint = {
        x: undefined,
        y:undefined
    }
    //特性检测
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if(eraserEnable){
                context.clearRect(x-5,y-5,10,10)
            }
            else{
                lastPoint= {
                    "x":x,
                    "y":y
                    }
            }
        }
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(!using){return}
            if(eraserEnable){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint ={
                    "x":x,
                    "y":y
                }
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
                
            }
        }
        canvas.ontouchend = function(aaa){
            using = false
        }//触屏设备
    }else{
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if(eraserEnable){
                context.clearRect(x-5,y-5,10,10)
            }
            else{
                lastPoint= {
                    "x":x,
                    "y":y
                    }
            }
        }
    
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            if(!using){return}
            if(eraserEnable){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint ={
                    "x":x,
                    "y":y
                }
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
                
            }
        }
    
        canvas.onmouseup = function(aaa){
            using = false
        } //非触屏设备
    }
    
}

    