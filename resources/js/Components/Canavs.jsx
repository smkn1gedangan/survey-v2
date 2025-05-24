import React, { useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class DrawingCircle {
      constructor(x, y, speedX, speedY, radius, color) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
        this.color = color;
      }

      draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
      }

      update() {
        if (this.x - this.radius > canvas.width || this.x - this.radius < 0) {
          this.speedX = -this.speedX;
        } else if (
          this.y - this.radius > canvas.height ||
          this.y - this.radius < 0
        ) {
          this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
      }
    }

    const data = [];
    const number = window.innerWidth > 750 ? 50 : 20;
    for (let i = 0; i < number; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() + 0.5) * 2;
      const speedY = (Math.random() + 0.5) * 2;
      const radius = Math.random() * 20;
      const color = ['red', 'green', 'blue', 'yellow'][
        Math.floor(Math.random() * 4)
      ];
      data.push(new DrawingCircle(x, y, speedX, speedY, radius, color));
    }

    const draw = () => {
      requestAnimationFrame(draw);
      c.clearRect(0, 0, canvas.width, canvas.height);
      data.forEach((circle) => circle.update());
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 z-[-1]" />
  );
};

export default Canvas;
