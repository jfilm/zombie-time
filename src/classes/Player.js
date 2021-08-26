export class Player {


    constructor(x, y, radius, color) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

    }

    
    update() {

    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill()
    }


}


