class Samurai {
    constructor(game) {
        this.game = game;

        this.shootingSprite = ASSET_MANAGER.getAsset("./Shot.png");
        this.runningSprite = ASSET_MANAGER.getAsset("./Run.png");

        this.state = "shooting"; 
        this.x = 0; 
        this.y = 200; 

        this.shootingFrames = 14;
        this.shootingFrameWidth = this.shootingSprite.width / this.shootingFrames;
        this.shootingFrameHeight = this.shootingSprite.height;
        this.shootingFrameDuration = 0.1;
        this.shootingElapsedTime = 0;
        this.shootingTotalTime = this.shootingFrameDuration * this.shootingFrames;

        this.runningFrames = 8;
        this.runningFrameWidth = this.runningSprite.width / this.runningFrames;
        this.runningFrameHeight = this.runningSprite.height;
        this.runningFrameDuration = 0.1;
        this.runningElapsedTime = 0;
        this.runningTotalTime = this.runningFrameDuration * this.runningFrames;

        this.speed = 150; 
    }

    update() {
        if (this.state === "shooting") {
            this.shootingElapsedTime += this.game.clockTick;
            if (this.shootingElapsedTime >= this.shootingTotalTime) {
                this.state = "running";
                this.shootingElapsedTime = 0; 
            }
        } else if (this.state === "running") {
            this.runningElapsedTime += this.game.clockTick;

            this.x += this.speed * this.game.clockTick;

            if (this.runningElapsedTime >= this.runningTotalTime) {
                this.runningElapsedTime -= this.runningTotalTime;
            }

            if (this.x > 1024) {
                this.x = 0;
                this.state = "shooting";
                this.runningElapsedTime = 0; 
            }
        }
    }

    draw(ctx) {
        if (this.state === "shooting") {
            const frame = Math.floor(this.shootingElapsedTime / this.shootingFrameDuration);
            const sourceX = frame * this.shootingFrameWidth;
            const sourceY = 0;

            ctx.drawImage(
                this.shootingSprite,
                sourceX, sourceY, this.shootingFrameWidth, this.shootingFrameHeight, 
                this.x, this.y, this.shootingFrameWidth, this.shootingFrameHeight 
            );
        } else if (this.state === "running") {
            const frame = Math.floor(this.runningElapsedTime / this.runningFrameDuration);
            const sourceX = frame * this.runningFrameWidth;
            const sourceY = 0;

            ctx.drawImage(
                this.runningSprite,
                sourceX, sourceY, this.runningFrameWidth, this.runningFrameHeight, 
                this.x, this.y, this.runningFrameWidth, this.runningFrameHeight 
            );
        }
    }
}
