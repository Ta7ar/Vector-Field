export default class Vector {
    constructor(ctx, i, j) {
        this.ctx = ctx;
        this.i = i;
        this.j = j;
        
    }

    draw = (originx, originy, vectorLen) => {

        /* if i and j are both 0 then the vector is just a dot*/

        if (this.i === 0 && this.j === 0) {

            let ctx = this.ctx;
            ctx.resetTransform();
            ctx.beginPath();
            ctx.arc(originx, originy, vectorLen * 0.15, 0, 2 * Math.PI);
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.stroke();
        } else {
            let angle = this.calcAngle(this.i, this.j);
            let arrowLen = vectorLen * 0.2;
            let ctx = this.ctx;

            ctx.resetTransform();
            ctx.beginPath();
            ctx.translate(originx, originy);
            ctx.rotate(-angle);

            
            ctx.lineWidth = 2;
            ctx.moveTo(0, 0);
            ctx.lineTo(vectorLen, 0);
            ctx.lineTo(vectorLen - arrowLen, arrowLen);
            ctx.moveTo(vectorLen, 0);
            ctx.lineTo(vectorLen - arrowLen, -arrowLen);
            ctx.strokeStyle = "blue";
            ctx.stroke();
        
        }

        

    }

    

    calcAngle = (x, y) => {
        if (x === 0 && y === 0) {
            return null;
        } else if (x > 0 && y > 0) {
            return Math.atan(y / x);
        } else if (x < 0 && y > 0) {
            return Math.PI - Math.atan(y / -x);
        } else if (x < 0 && y < 0) {
            return Math.PI + Math.atan(y / x);
        } else if (x > 0 && y < 0) {
            return 2 * Math.PI - Math.atan(-y / x);
        } else if (x === 0) {
            return y > 0 ? Math.PI / 2 : 1.5 * Math.PI;
        }
        return x > 0 ? 0 : Math.PI;
    }

    
}
