export class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: 0,
            y: 0,
        }
    }
    
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill()
    }

    setVelocity(x = 0, y = 0) {
        this.velocity = {
            x,
            y
        };
    }
}


