import { useEffect } from "react";
import { useRef } from "react";

export function Canvas() {
  const ref = useRef();

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  class Vertex {
    constructor(horizontal) {
      this.horizontal = horizontal;
      this.randomX = [-5, window.innerWidth + 5];
      this.randomY = [-5, 600 + 5];
      this.randomSpeedNeg = [-3, -2];
      this.randomSpeedPos = [2, 3];
      if (horizontal) {
        this.x = this.randomX[getRandomInt(0, 2)];
        this.y = Math.random() * 600;
        this.vx =
          this.x > 0
            ? this.randomSpeedNeg[getRandomInt(0, 2)]
            : this.randomSpeedPos[getRandomInt(0, 2)];
        this.vy = (Math.random() - 0.5) * 5;
      } else {
        this.x = Math.random() * window.innerWidth;
        this.y = this.randomY[getRandomInt(0, 2)];
        this.vy =
          this.y > 0
            ? this.randomSpeedNeg[getRandomInt(0, 2)]
            : this.randomSpeedPos[getRandomInt(0, 2)];
        this.vx = (Math.random() - 0.5) * 5;
      }
      this.size = Math.ceil(Math.random() * 5);
      this.remove = false;
    }
    draw(ctx) {
      ctx.fillStyle = "#676767";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }
    move(ctx) {
      this.x += this.vx;
      this.y += this.vy;
      this.draw(ctx);
      if (this.horizontal) {
        if (this.x > window.innerWidth + 20 || this.x < -20) {
          this.x = this.randomX[getRandomInt(0, 2)];
          this.y = Math.random() * 600;
          this.vx =
            this.x > 0
              ? this.randomSpeedNeg[getRandomInt(0, 2)]
              : this.randomSpeedPos[getRandomInt(0, 2)];
          this.vy = (Math.random() - 0.5) * 5;
        }
      } else {
        if (this.y > 620 || this.y < -20) {
          this.x = Math.random() * window.innerWidth;
          this.y = this.randomY[getRandomInt(0, 2)];
          this.vy =
            this.y > 0
              ? this.randomSpeedNeg[getRandomInt(0, 2)]
              : this.randomSpeedPos[getRandomInt(0, 2)];
          this.vx = (Math.random() - 0.5) * 5;
        }
      }
    }
  }

  function connect(ctx) {
    const rad = 100; //radius when the line will be drawn
    for (let a = 0; a < dots.length; a++) {
      for (let b = a; b < dots.length; b++) {
        const dx = dots[a].x - dots[b].x;
        const dy = dots[a].y - dots[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < rad) {
          ctx.strokeStyle = "#ffffff";
          ctx.globalAlpha = 1 - distance / rad;
          ctx.beginPath();
          ctx.moveTo(dots[a].x, dots[a].y);
          ctx.lineTo(dots[b].x, dots[b].y);
          ctx.stroke();
        }
      }
    }
  }

  //creating the objects
  let requestId;
  let dotCount = 350;
  let dots = [];
  let horiz = true;
  function addDots() {
    horiz = horiz ? false : true;
    requestId = undefined;
    let x = new Vertex(horiz);
    dots.push(x);
    if (dotCount > 0) {
      start();
    } else {
      stop();
    }
    dotCount--;
  }

  function start() {
    if (!requestId) {
      setTimeout(() => {
        requestId = window.requestAnimationFrame(addDots);
      }, 1000 / 30);
    }
  }

  function stop() {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  }
  requestAnimationFrame(addDots);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 600;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.move(ctx);
      });
      connect(ctx);
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / 60);
    }
    requestAnimationFrame(animate);
  }, []);

  return <canvas id="canvas" ref={ref}></canvas>;
}
