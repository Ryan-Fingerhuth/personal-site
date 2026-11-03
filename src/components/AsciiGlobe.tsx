import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Home.module.css';

// Stylized coastline outlines in longitude/latitude coordinates.
const continents = [
  [[-168, 70], [-153, 71], [-141, 69], [-128, 70], [-115, 73], [-98, 73], [-83, 69], [-78, 60], [-64, 60], [-55, 52], [-65, 45], [-70, 46], [-74, 40], [-76, 35], [-81, 25], [-83, 25], [-82, 30], [-90, 30], [-97, 26], [-97, 22], [-90, 21], [-87, 22], [-88, 16], [-84, 15], [-83, 10], [-78, 8], [-80, 7], [-86, 11], [-92, 15], [-99, 17], [-105, 21], [-110, 24], [-115, 32], [-111, 31], [-114, 27], [-110, 23], [-112, 23], [-117, 29], [-122, 38], [-125, 48], [-132, 54], [-140, 59], [-147, 61], [-153, 58], [-164, 55], [-158, 60], [-166, 64], [-168, 66]],
  [[-81, 12], [-74, 11], [-71, 12], [-62, 10], [-60, 7], [-52, 4], [-50, 0], [-43, -3], [-35, -6], [-35, -10], [-39, -18], [-41, -22], [-48, -28], [-53, -33], [-58, -38], [-63, -42], [-66, -50], [-68, -55], [-73, -53], [-75, -45], [-74, -36], [-71, -30], [-70, -18], [-76, -13], [-81, -5], [-80, 2], [-77, 7]],
  [[-54, 60], [-28, 70], [-40, 83], [-65, 78]],
  [[-17, 21], [-13, 28], [-9, 32], [-5, 36], [10, 37], [12, 33], [20, 32], [25, 32], [32, 31], [35, 24], [43, 12], [51, 12], [48, 5], [42, -1], [40, -10], [35, -19], [33, -26], [28, -33], [19, -35], [15, -29], [12, -18], [13, -9], [9, -1], [9, 4], [3, 6], [-5, 5], [-10, 6], [-16, 12]],
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 54], [9, 58], [5, 59], [7, 63], [20, 70], [30, 71], [31, 65], [40, 67], [55, 69], [70, 73], [90, 76], [110, 77], [130, 71], [150, 70], [179, 66], [175, 61], [164, 60], [160, 55], [156, 51], [155, 59], [143, 59], [140, 50], [135, 44], [129, 42], [129, 35], [126, 34], [124, 40], [120, 38], [122, 30], [118, 24], [110, 20], [108, 13], [104, 9], [100, 14], [104, 2], [101, 1], [98, 8], [96, 17], [90, 22], [86, 20], [80, 9], [77, 8], [73, 18], [68, 24], [61, 25], [57, 24], [52, 16], [44, 13], [40, 20], [35, 29], [36, 36], [29, 41], [26, 40], [24, 35], [20, 39], [19, 42], [16, 40], [15, 37], [12, 43], [7, 44], [3, 41], [0, 38]],
  [[113, -22], [114, -16], [123, -12], [129, -15], [132, -12], [136, -12], [137, -17], [141, -17], [143, -11], [146, -18], [153, -25], [153, -29], [149, -37], [146, -39], [140, -37], [137, -34], [131, -32], [124, -33], [116, -35], [113, -29]],
  [[47, -13], [51, -16], [47, -26], [44, -24]],
  [[130, 32], [142, 45], [145, 42], [138, 32]],
  [[166, -34], [178, -39], [168, -47], [165, -44]],
  [[-8, 50], [1, 51], [-1, 54], [-3, 59], [-6, 58], [-5, 54]],
  [[-10, 51], [-6, 52], [-6, 55], [-9, 55]],
  [[-24, 64], [-15, 63], [-13, 66], [-22, 67]],
  [[95, 5], [101, 1], [106, -6], [102, -5]],
  [[108, 7], [118, 6], [119, 0], [114, -4], [109, -1]],
  [[105, -6], [114, -7], [115, -9], [108, -8]],
  [[130, -3], [141, -2], [151, -6], [146, -10], [137, -6]],
  [[120, 18], [123, 14], [126, 8], [123, 7], [120, 12]],
  [[-85, 23], [-78, 22], [-74, 20], [-80, 21]],
  [[144, -40], [148, -41], [147, -44], [145, -44]],
];

function isLand(longitude: number, latitude: number) {
  if (latitude < -72) return true;
  return continents.some((outline) => {
    let inside = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const [xi, yi] = outline[i];
      const [xj, yj] = outline[j];
      if ((yi > latitude) !== (yj > latitude) &&
        longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  });
}

function renderGlobe(angle: number, cloudDrift = 0) {
  const layers = { land: '', ocean: '', clouds: '' };
  for (let row = 0; row < 61; row++) {
    const y = (row - 30) / 30.5;
    for (let column = 0; column < 121; column++) {
      const x = (column - 60) / 60.5;
      const radius = x * x + y * y;
      if (radius > 1) {
        layers.land += ' ';
        layers.ocean += ' ';
        layers.clouds += ' ';
        continue;
      }
      const z = Math.sqrt(1 - radius);
      const latitude = Math.asin(-y) * 180 / Math.PI;
      const longitude = ((Math.atan2(x, z) * 180 / Math.PI - angle + 540) % 360) - 180;
      const light = Math.max(0, -x * 0.35 - y * 0.25 + z * 0.8);
      // Periodic longitude keeps the cloud pattern seamless across the dateline.
      const u = (longitude + cloudDrift) * Math.PI / 180;
      const v = latitude * Math.PI / 180;
      const cloud = Math.sin(3 * u + 2 * Math.sin(3 * v)) *
        Math.cos(6 * v - Math.sin(2 * u)) +
        0.25 * Math.sin(9 * u + 7 * v) +
        0.12 * Math.sin(19 * u - 13 * v) * Math.cos(11 * v + 4 * u);
      const cloudy = cloud > 0.72 && Math.abs(latitude) < 72;
      const land = isLand(longitude, latitude);
      const ice = latitude < -71 + 3 * Math.sin(u * 5) || latitude > 79 ||
        (land && longitude > -65 && longitude < -28 && latitude > 65);
      const terrain = 0.08 * Math.sin(longitude * 0.35) * Math.cos(latitude * 0.4);
      const ramp = '.,:;=+*#%@';
      const shade = ramp[Math.min(ramp.length - 1, Math.floor(Math.max(0, light + terrain) * ramp.length))];
      layers.land += land && !cloudy && !ice ? shade : ' ';
      layers.ocean += !land && !cloudy && !ice ? (radius > 0.97 ? ':' : light > 0.65 ? '~' : light > 0.35 ? ':' : '.') : ' ';
      layers.clouds += ice ? (light > 0.5 ? '#' : '+') : cloudy ? (cloud > 1.05 ? '@' : cloud > 0.9 ? '%' : light > 0.35 ? '+' : ':') : ' ';
    }
    if (row < 60) {
      layers.land += '\n';
      layers.ocean += '\n';
      layers.clouds += '\n';
    }
  }
  return layers;
}

const initialFrame = renderGlobe(25);

export default function AsciiGlobe() {
  const landOutput = useRef<HTMLPreElement>(null);
  const oceanOutput = useRef<HTMLPreElement>(null);
  const cloudOutput = useRef<HTMLPreElement>(null);
  const rotation = useRef({ angle: 25, cloudDrift: 0 });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    const animate = (time: number) => {
      if (time - previous >= 80) {
        if (previous) {
          const elapsed = Math.min(time - previous, 100);
          rotation.current.angle = (rotation.current.angle + elapsed * 0.008) % 360;
          rotation.current.cloudDrift = (rotation.current.cloudDrift + elapsed * 0.002) % 360;
        }
        previous = time;
        const globe = renderGlobe(rotation.current.angle, rotation.current.cloudDrift);
        if (landOutput.current) landOutput.current.textContent = globe.land;
        if (oceanOutput.current) oceanOutput.current.textContent = globe.ocean;
        if (cloudOutput.current) cloudOutput.current.textContent = globe.clouds;
      }
      frame = requestAnimationFrame(animate);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!motion.matches && !paused && !document.hidden) frame = requestAnimationFrame(animate);
    };
    update();
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [paused]);

  return (
    <div className={styles.globe}>
      <div className={styles.globeLayers} role="img" aria-label="Rotating ASCII Earth with green continents, blue oceans, and drifting white clouds">
        <pre ref={oceanOutput} className={`${styles.globeArt} ${styles.globeOcean}`} aria-hidden="true">{initialFrame.ocean}</pre>
        <pre ref={landOutput} className={`${styles.globeArt} ${styles.globeLand}`} aria-hidden="true">{initialFrame.land}</pre>
        <pre ref={cloudOutput} className={`${styles.globeArt} ${styles.globeClouds}`} aria-hidden="true">{initialFrame.clouds}</pre>
      </div>
      <button className={styles.globeToggle} type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
        {paused ? 'Rotate globe' : 'Pause globe'}
      </button>
    </div>
  );
}
