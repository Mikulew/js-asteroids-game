function Ship() {
    this.r = 0.03;
    this.rear_a = 50;
    this.a = 0;
    this.x = VAR.W / 2;
    this.y = VAR.H / 2;
    this.points = [{},{},{}];
}

Ship.prototype.draw = function() {
    Game.ctx.beginPath();
    for (var i = 0; i < 3; i++) {
        this.tmp_a = i === 0 ? this.a : (this.a + 180 + (i == 1 ? this.rear_a : -this.rear_a));
        this.tmp_r = i === 0 ? this.r : this.r * 0.5;
        this.points[i].x = Math.sin(Math.PI / 180 * this.tmp_a) * this.tmp_r * VAR.d + this.x;
        this.points[i].y = -Math.cos(Math.PI / 180 * this.tmp_a) * this.tmp_r * VAR.d + this.y;
        Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
    }
    Game.ctx.closePath();
    Game.ctx.stroke();
};