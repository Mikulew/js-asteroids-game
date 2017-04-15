window.onload = function() {
    Game.init();
};

VAR = {
    fps: 60,
    W: 0,
    H: 0,
    lastTime: 0,
    lastUpdate: -1,
    rand: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

Game = {
    init: function() {
        Game.canvas = document.createElement('canvas');
        Game.hit_canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        this.hit_ctx = this.hit_canvas.getContext('2d');
        Game.layout();
        window.addEventListener('resize', Game.layout, false);
        document.body.appendChild(Game.canvas);
        for (var i = 0; i < 4; i++) {
            new Rock();
        }
        Game.ship = new Ship();
        window.addEventListener('keydown', Game.onKey, false);
        window.addEventListener('keyup', Game.onKey, false);
        Game.animationLoop();
    },
    stop: function() {
        window.removeEventListener('keydown', Game.onKey, false);
        window.removeEventListener('keyup', Game.onKey, false);
    },
    onKey: function(e) {
         if (e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39) {
             e.preventDefault();
             if (e.type == 'keydown' && !Game['key_' + e.keyCode]) {
                 Game['key_' + e.keyCode] = true;
                 if (e.keyCode == 37) {
                     Game.key_39 = false;
                 } else if (e.keyCode == 39) {
                     Game.key_37 = false;
                 } else if (e.keyCode == 32) {
                     new Bullet();
                 }
             }
             else if (e.type = 'keyup') {
                 Game['key_' + e.keyCode] = false;
             }
         }
    },
    layout: function() {
        VAR.W = window.innerWidth;
        VAR.H = window.innerHeight;
        VAR.d = Math.min(VAR.W, VAR.H);
        Game.canvas.width = VAR.W;
        Game.canvas.height = VAR.H;
        Game.ctx.fillStyle = "white";
        Game.hit_canvas.width = VAR.W;
        Game.hit_canvas.height = VAR.H;
        Game.hit_ctx.fillStyle = "#ff0000";
        Game.ctx.strokeStyle = "white";
        Game.ctx.lineWidth = 3;
        Game.ctx.lineJoin = "round";
    },
    animationLoop: function(time) {
        requestAnimationFrame(Game.animationLoop);
        if(time - VAR.lastTime >= 1000 / VAR.fps) {
            VAR.lastTime = time;
            Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
            Game.ship.draw();
            Rock.draw();
            Bullet.draw();
        }
    }
};