const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(640,360)
    separationSlider = createSlider(0, 5, 1, 0.1) // 0 to 5, starting @ 1 and increment 0.1
    alignmentSlider = createSlider(0, 5, 1, 0.1) // 0 to 5, starting @ 1 and increment 0.1
    cohesionSlider = createSlider(0, 5, 1, 0.1) // 0 to 5, starting @ 1 and increment 0.1
    for (let i = 0; i < 300; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}