import { Easing, interpolate } from 'remotion';

export function lerpFrame(
  frame: number,
  duration: number,
  from: number,
  to: number,
  easing = Easing.inOut(Easing.cubic),
): number {
  return interpolate(frame, [0, Math.max(duration - 1, 1)], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
}
