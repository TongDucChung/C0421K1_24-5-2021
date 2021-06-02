function Tank(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.radius = 10;
    this.speedX = 10;
    this.speedY = 0;
    this.power = 3;
    this.cx = mapWidth /10*9;
    this.cy = mapHeight / 5*4;
    this.angle = 0;
    this.balls = [];
    this.cannonHeight = this.radius / 2;
    this.cannonWidth = this.cannonHeight * 3;
}

Tank.prototype.draw = function (context) {
    context.beginPath();
    context.fillStyle = "green";
    context.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2, true);

    context.fill();
    context.closePath();

    // cannon
    context.save();
    context.translate(this.cx, this.cy);
    context.rotate(this.angle);
    context.beginPath();
    context.fillStyle = "red";
    context.rect(0, -this.cannonHeight / 2, this.cannonWidth, this.cannonHeight);

    context.fill();
    context.closePath();
    context.restore();

    // yellow circle
    context.beginPath();
    context.fillStyle = "yellow";
    context.arc(this.cx, this.cy, this.radius / 2, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].draw(context);
    }

}

Tank.prototype.update = function () {

    for (var i = 0; i < this.balls.length; i++) {
        var item = this.balls[i];
        item.update();
        if (item.update()) {
            this.balls.splice(i, 1);
        }
    }
}
Tank.prototype.fire = function(targetX, targetY,turn){
    var dx = targetX - this.cx;
    var dy = targetY - this.cy;
    // tính độ lớn của lực bắn dựa trên độ xa gần vị trí con trỏ của cannon
    var power = Math.floor(Math.sqrt(dx*dx+dy*dy)/20);

    if(this.balls.length == 1)
        return;
    var dirX = Math.cos(this.angle);
    var dirY = Math.sin(this.angle);

    var startX = this.cx + this.cannonWidth * dirX;//tọa độ bắt đầu
    var startY = this.cy + this.cannonWidth * dirY;

    var ball = new Ball(this.mapWidth,this.mapHeight,startX,startY,dirX,dirY,power);
    this.balls.push(ball);
}
Tank.prototype.rotateCannon = function (targetX, targetY) {
    var dx = targetX - this.cx;
    var dy = targetY - this.cy;
    this.angle = Math.atan2(dy, dx);
}
Tank.prototype.move = function () {
    this.cx += this.speedX;
    this.cy += this.speedY;

    this.left = this.cx - this.radius;
    this.top = this.cy - this.radius;
    this.right = this.cx + this.radius;
    this.bottom = this.cy + this.radius;
}
Tank.prototype.resetSpeed = function () {
    this.speedX = 0;
    this.speedY = 0;
}
Tank.prototype.moveLeft = function () {
    this.speedX = -this.power;
}
Tank.prototype.moveRight = function () {
    this.speedX = this.power;
}