
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const type = "image/png";
const codeInput = "input#tipo-vitoria";
const baseImage = new Image();
baseImage.src = "./img/base.png";

function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius = 5,
    fill = false,
    stroke = true
) {
    if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
}


document.querySelector(codeInput).value =
    names[Math.floor(Math.random() * names.length)];

baseImage.addEventListener("load", () => {

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(baseImage, 0, 0);
        context.save();
        context.translate(225, 420);

        const name = document.querySelector(codeInput).value.trim().toUpperCase();
        context.textBaseline = "middle";
        context.font = "126.13px Bebas Neue";
        const width = context.measureText(name).width;

        const paddingWidth = 50;

        context.fillStyle = "#1d70b7";

        roundRect(
            context,
            -180,
            -155 / 2,
            width + paddingWidth * 2,
            155, {
            tl: 75,
            bl: 05,
            br: 45,
            tr: 45,
        }
        );

        context.strokeStyle = '#ffc500';
        context.lineWidth = 7;
        context.stroke()


        context.fillStyle = "#f0f0f0";
        context.fillText(name, -130, 15);

        context.restore();
        setTimeout(draw, 100);
    }

    draw();
});