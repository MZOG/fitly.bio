"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;

  #define PI 3.14159265359

  // ----------------------------------------
  // 2D noise
  // ----------------------------------------

  vec2 hash2(vec2 p) {
    p = vec2(
      dot(p, vec2(127.1, 311.7)),
      dot(p, vec2(269.5, 183.3))
    );

    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(
        dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)),
        u.x
      ),
      mix(
        dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)),
        u.x
      ),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  // ----------------------------------------
  // Organic distortion
  // ----------------------------------------

  vec2 warp(vec2 p, float time) {

    float n1 = fbm(
      p * 1.1 +
      vec2(time * 0.018, -time * 0.012)
    );

    float n2 = fbm(
      p * 1.4 +
      vec2(-time * 0.012, time * 0.016)
    );

    return p + vec2(n1, n2) * 0.18;
  }

  // ----------------------------------------
  // Organic glowing blob
  // ----------------------------------------

  float blob(
    vec2 uv,
    vec2 position,
    float size,
    float time
  ) {

    vec2 p = uv - position;

    p = warp(p * 2.0, time);

    float d = length(p);

    float n = fbm(
      p * 2.2 +
      vec2(time * 0.015, -time * 0.01)
    );

    d += n * 0.18;

    return 1.0 - smoothstep(
      size * 0.15,
      size,
      d
    );
  }

  void main() {

    // ----------------------------------------
    // Coordinates
    // ----------------------------------------

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float aspect =
      u_resolution.x / u_resolution.y;

    uv.x *= aspect;

    float time = u_time;

    // ----------------------------------------
    // Base
    // ----------------------------------------

    vec3 color = vec3(
      0.008,
      0.012,
      0.011
    );

    // ----------------------------------------
    // Large green flare
    // ----------------------------------------

    float green = blob(
      uv,
      vec2(aspect * 0.28, 0.70),
      0.72,
      time
    );

    // ----------------------------------------
    // Blue flare
    // ----------------------------------------

    float blue = blob(
      uv,
      vec2(aspect * 0.78, 0.28),
      0.68,
      time + 4.0
    );

    // ----------------------------------------
    // Small central teal flare
    // ----------------------------------------

    float teal = blob(
      uv,
      vec2(aspect * 0.54, 0.48),
      0.42,
      time + 8.0
    );

    // ----------------------------------------
    // Colors
    // ----------------------------------------

    color += green * vec3(
      0.015,
      0.55,
      0.30
    );

    color += blue * vec3(
      0.015,
      0.22,
      0.65
    );

    color += teal * vec3(
      0.00,
      0.32,
      0.28
    );

    // ----------------------------------------
    // Fine noisy texture
    // ----------------------------------------

    float grain =
      noise(uv * u_resolution.xy * 0.45);

    grain = grain * 0.035;

    color += grain;

    // ----------------------------------------
    // Vignette
    // ----------------------------------------

    vec2 centered =
      gl_FragCoord.xy / u_resolution.xy - 0.5;

    centered.x *= aspect;

    float vignette =
      1.0 - smoothstep(
        0.25,
        1.15,
        length(centered)
      );

    color *= mix(
      0.55,
      1.0,
      vignette
    );

    // ----------------------------------------
    // Output
    // ----------------------------------------

    gl_FragColor = vec4(
      color,
      1.0
    );
  }
`;

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL is not supported.");
      return;
    }

    // ----------------------------------------
    // Shader helper
    // ----------------------------------------

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);

      if (!shader) {
        throw new Error("Unable to create shader");
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));

        gl.deleteShader(shader);

        throw new Error("Shader compilation failed");
      }

      return shader;
    };

    // ----------------------------------------
    // Program
    // ----------------------------------------

    const vertex = createShader(gl.VERTEX_SHADER, vertexShader);

    const fragment = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    const program = gl.createProgram();

    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));

      return;
    }

    gl.useProgram(program);

    // ----------------------------------------
    // Fullscreen triangle
    // ----------------------------------------

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");

    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // ----------------------------------------
    // Uniforms
    // ----------------------------------------

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const timeLocation = gl.getUniformLocation(program, "u_time");

    // ----------------------------------------
    // Resize
    // ----------------------------------------

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const width = Math.floor(canvas.clientWidth * dpr);

      const height = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;

        gl.viewport(0, 0, width, height);
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas);

    // ----------------------------------------
    // Animation
    // ----------------------------------------

    let animationFrame = 0;
    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      // VERY slow movement
      gl.uniform1f(timeLocation, elapsed * 0.45);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    // ----------------------------------------
    // Cleanup
    // ----------------------------------------

    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();

      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
