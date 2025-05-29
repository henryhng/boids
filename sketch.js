const flock = [];

let alignmentSlider, cohesionSlider, separationSlider;
let alignText, cohesionText, separationText;

function setup() {
  createCanvas(960, 540);

  // alignment slider + label
  alignmentSlider = createSlider(0, 5, 1, 0.1);
  alignmentSlider.parent('alignSliderContainer');
  alignText = createSpan(alignmentSlider.value());
  alignText.parent('alignSliderContainer');
  alignmentSlider.input(() => alignText.html(alignmentSlider.value()));

  // cohesion slider + label
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider.parent('cohesionSliderContainer');
  cohesionText = createSpan(cohesionSlider.value());
  cohesionText.parent('cohesionSliderContainer');
  cohesionSlider.input(() => cohesionText.html(cohesionSlider.value()));

  // separation slider + label
  separationSlider = createSlider(0, 5, 1, 0.1);
  separationSlider.parent('separationSliderContainer');
  separationText = createSpan(separationSlider.value());
  separationText.parent('separationSliderContainer');
  separationSlider.input(() => separationText.html(separationSlider.value()));

  // initialize flock
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
