let map = function (width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var offsetX = 0;
    // create map, để vẽ địa hình nhìn giống núi non ta dùng lineTo() vẽ và lặp nó lại
    context.beginPath();
    context.moveTo(0, Math.floor(Math.random() * canvas.height));
    context.fillStyle = "#FF0000";
    context.fillRect(600, 400, 300, 600);
    context.fillRect(0, 500, 300, 100);
    context.fillRect(300, 150, 60, 20);
    context.fillRect(500    , 150, 60, 20);
    context.fillRect(400, 150, 60, 20);

}