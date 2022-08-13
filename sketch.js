let quadtree;
function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
    
    let rectangle = new Rectangle(200, 200, 200, 200)
    quadtree = new Quadtree(rectangle, 4);

    for(let i=0; i < 100; i++) {
        quadtree.insert(new Point(random(width), random(height)));
    }

    quadtree.show();

    stroke('#77dd77');
    noFill();
    strokeWeight(1)
    let range = new Rectangle(random(width), random(height), 25, 25);
    rect(range.x, range.y, 2*range.w, 2*range.h);

    strokeWeight(2);
    let pointsFound = quadtree.query(range);
    if(pointsFound) {
        for(let p of pointsFound) {
            point(p.x, p.y);
        }
    }

    noLoop();
}

function draw() {
    // clear();
    // quadtree.show();
    
    // stroke('#77dd77');
    // let range = new Rectangle(mouseX, mouseY, 25, 25);
    // rect(range.x, range.y, 2*range.w, 2*range.h);

    // let pointsFound = quadtree.query(range);
    // if(pointsFound) {
    //     for(let p of pointsFound) {
    //         point(p.x, p.y);
    //     }
    // }
}

function mousePressed() {
    quadtree.insert(new Point(random(width), random(height)));
}