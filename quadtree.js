class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        if(point.x < this.x + this.w && point.x > this.x - this.w && point.y > this.y - this.h && point.y < this.y + this.h) {
            return true;
        }

        return false;
    }

    intersects(area) {
        /* If any of the conditions satisfy, 
         * then they cannot intersect.
         * Coding Train Frogger Video for detailed explanation (I guess)
         */
        return !(area.x - area.w > this.x + this.w ||
            area.x + area.w < this.x - this.w ||
            area.y - area.h > this.y + this.h ||
            area.y + area.h < this.y - this.h);
    }

    intersectCircular() {
        
    }
}
let count = 0;
class Quadtree {
    constructor(boundary, cap) {
        this.boundary = boundary;
        this.capacity = cap;
        this.points = [];
        this.divided = false;
    }

    insert(point) {
        if(!this.boundary.contains(point)) return false;

        if(this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if(!this.divided) {
            this.subdivide();
            this.divided = true;
        }
        
        if(this.NE.insert(point)) return true;
        if(this.NW.insert(point)) return true;
        if(this.SE.insert(point)) return true;
        if(this.SW.insert(point)) return true;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;

        let north_east = new Rectangle(x + w, y - h, w, h);
        let north_west = new Rectangle(x - w, y - h, w, h);
        let south_east = new Rectangle(x + w, y + h, w, h);
        let south_west = new Rectangle(x - w, y + h, w, h);

        this.NE = new Quadtree(north_east, this.capacity);
        this.NW = new Quadtree(north_west, this.capacity);
        this.SE = new Quadtree(south_east, this.capacity);
        this.SW = new Quadtree(south_west, this.capacity);
    }

    query(areaRange, pointsFound) {
        if(!pointsFound) pointsFound = [];

        if(!this.boundary.intersects(areaRange)) return;

        for(let p of this.points) {
            if(areaRange.contains(p)) pointsFound.push(p);
            console.log(++count);
        }
        
        if(this.divided) {
            this.NE.query(areaRange, pointsFound);
            this.NW.query(areaRange, pointsFound);
            this.SE.query(areaRange, pointsFound);
            this.SW.query(areaRange, pointsFound);
        }
        return pointsFound;
    }

    show() {
        stroke(200);
        strokeWeight(1);
        noFill();
        rect(this.boundary.x, this.boundary.y, 2*this.boundary.w, 2*this.boundary.h);

        strokeWeight(3);
        for(let p of this.points) {
            point(p.x, p.y);
        }

        if(this.divided) {
            this.NE.show();
            this.NW.show();
            this.SE.show();
            this.SW.show();
        }
    }
}