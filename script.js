const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlearray = [];
let hue = 0;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = 
{
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click',function(event)
{
    mouse.x = event.x;    
    mouse.y = event.y;
    for(let i=0;i<10;i++)
    {
        particlearray.push(new Particle());
    }
})
canvas.addEventListener('mousemove',function(event)
{
    mouse.x = event.x;    
    mouse.y = event.y;
    for(let i=0;i<5;i++)
    {
        particlearray.push(new Particle());
    }
})



class Particle{
    constructor()
    {
        this.x=mouse.x;
        this.y=mouse.y;
        // this.x= Math.random() * canvas.width;
        // this.y= Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ' , 100%,50%)';
    }
    update()
    {
        this.x += this.speedX;      
        this.y += this.speedY; 
        if(this.size > 0.2) this.size -= 0.1;     
    }
    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}

function init()
{
    for(let i=0;i<100;i++)
    {
        particlearray.push(new Particle());
    }
}

init();

function handleParticle()
{
    for(let i=0;i<particlearray.length;i++)
    {
        particlearray[i].update();
        particlearray[i].draw();
        if(particlearray[i].size <= 0.3)
        {
            particlearray.splice(i,1);
            i--;
        }
    }
}
 

function animate()
{
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticle();
    hue+=5;
    requestAnimationFrame(animate);
}

animate();