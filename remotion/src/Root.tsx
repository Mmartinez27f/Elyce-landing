import { Composition } from 'remotion';
import { GalponChapter } from './compositions/GalponChapter';
import { FRAMES_PER_CHAPTER, SCENE_HEIGHT, SCENE_WIDTH } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GalponChapter"
        component={GalponChapter}
        durationInFrames={FRAMES_PER_CHAPTER}
        fps={FRAMES_PER_CHAPTER}
        width={SCENE_WIDTH}
        height={SCENE_HEIGHT}
      />
    </>
  );
};
