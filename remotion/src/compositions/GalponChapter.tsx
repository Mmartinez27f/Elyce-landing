import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, FRAMES_PER_CHAPTER, SCENE_HEIGHT, SCENE_WIDTH } from '../constants';
import { lerpFrame } from '../utils/motion';

/**
 * Cap 0 — Galpón: cámara avanza hacia muelle + camión entra (capa integrada, sin colorkey).
 */
export const GalponChapter: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / Math.max(FRAMES_PER_CHAPTER - 1, 1);

  const scale = lerpFrame(frame, FRAMES_PER_CHAPTER, 1.02, 1.14);
  const panX = lerpFrame(frame, FRAMES_PER_CHAPTER, 0, 72);
  const panY = lerpFrame(frame, FRAMES_PER_CHAPTER, 0, 36);

  const truckX = lerpFrame(frame, FRAMES_PER_CHAPTER, SCENE_WIDTH * 0.92, SCENE_WIDTH * 0.58);
  const truckY = lerpFrame(frame, FRAMES_PER_CHAPTER, SCENE_HEIGHT * 0.52, SCENE_HEIGHT * 0.48);
  const truckRot = interpolate(t, [0, 1], [-4, 0], { extrapolateRight: 'clamp' });
  const truckScale = lerpFrame(frame, FRAMES_PER_CHAPTER, 0.88, 1);

  const shadowOpacity = interpolate(t, [0.2, 0.85], [0.15, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${-panX}px, ${-panY}px) scale(${scale})`,
          transformOrigin: '58% 52%',
        }}
      >
        <Img
          src={staticFile('scenes/01_galpon_empty.webp')}
          style={{
            width: SCENE_WIDTH,
            height: SCENE_HEIGHT,
            objectFit: 'cover',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: truckX,
          top: truckY,
          transform: `translate(-50%, -50%) rotate(${truckRot}deg) scale(${truckScale})`,
          filter: 'drop-shadow(0 18px 28px rgba(27, 67, 50, 0.22))',
        }}
      >
        <Img
          src={staticFile('sprites/truck.webp')}
          style={{ width: 420, height: 'auto' }}
        />
        <div
          style={{
            position: 'absolute',
            left: '18%',
            top: '78%',
            width: '62%',
            height: 16,
            borderRadius: 999,
            background: `rgba(27, 67, 50, ${shadowOpacity})`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
