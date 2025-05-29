class Boid{
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        /* randomize velocities */
        this.acceleration = createVector();
        this.maxForce = 1 /* force in which velocity is being changed / aligned */
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add (other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce)
        }
        return steering;
    }

     cohesion(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total); // to get avg location
            steering.sub(this.position); // vector from original to average
            steering.setMag(this.maxSpeed); // desired velocity
            steering.sub(this.velocity);
            steering.limit(this.maxForce)
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position)
                diff.div(d); // inversely proportional to distance
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total); // to get avg location
            steering.setMag(this.maxSpeed); // desired velocity
            steering.sub(this.velocity);
            steering.limit(this.maxForce)
        }
        return steering;
    }


    flock(boids) {
        this.acceleration.mult(0);
        let separation = this.separation(boids);        
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);

        separation.mult(separationSlider.value());
        alignment.mult(alignmentSlider.value());
        cohesion.mult(cohesionSlider.value());
        
        

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y)
    }
}