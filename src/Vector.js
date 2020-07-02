export default class Vector {
    constructor(ctx,i,j,originx,originy,vectorLen){
        this.ctx = ctx;
        this.i = i;
        this.j = j;
        this.originx = originx;
        this.originy = originy;
        this.vectorLen = vectorLen;
    }

    draw = (calcAngle) => {

        /* if i and j are both 0 then the vector is just a dot*/

        if(this.i ===0 && this.j ===0){

            let ctx = this.ctx;
            ctx.resetTransform();
            ctx.beginPath();
            ctx.arc(this.originx,this.originy,this.vectorLen*0.15,0,2*Math.PI);
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.stroke();
        }
        else {
            let angle = calcAngle(this.i,this.j);
            let arrowLen = this.vectorLen * 0.2;
            let ctx = this.ctx;

            ctx.resetTransform();
            ctx.beginPath();
            ctx.translate(this.originx,this.originy);
            ctx.rotate(-angle);

            
            ctx.lineWidth = 2;
            ctx.moveTo(0,0);
            ctx.lineTo(this.vectorLen,0);
            ctx.lineTo(this.vectorLen-arrowLen,arrowLen);
            ctx.moveTo(this.vectorLen,0);
            ctx.lineTo(this.vectorLen-arrowLen,-arrowLen);
            ctx.strokeStyle = "blue";
            ctx.stroke();
        
        }

        

    }

    
}