class Car{
    constructor(x, y, height, width){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;

        this.controls = new VehicleControls();
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

        if(this.controls.forward){
            ctx.fillStyle = "green";
        }else if(this.controls.reverse){
            ctx.fillStyle = "red";
        }else{
            ctx.fillStyle = "black";
        }
        ctx.fill();
    }  
}