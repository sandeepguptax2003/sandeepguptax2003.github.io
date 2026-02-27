import { useEffect, useRef, useCallback } from 'react';
import { Howl, Howler } from 'howler';

const AUDIO_URLS = {
  ambientHum: 'https://cdn.pixabay.com/audio/2022/10/24/audio_3aac0f7e14.mp3',
  mechanicalClack: 'https://cdn.pixabay.com/audio/2022/03/24/audio_53a1d0a4d8.mp3',
};

export function useAudioController(isActive: boolean) {
  const ambientRef = useRef<Howl | null>(null);
  const clackRef = useRef<Howl | null>(null);
  const wasActive = useRef(false);

  useEffect(() => {
    ambientRef.current = new Howl({
      src: [AUDIO_URLS.ambientHum],
      loop: true,
      volume: 0,
      preload: true,
    });

    clackRef.current = new Howl({
      src: [AUDIO_URLS.mechanicalClack],
      volume: 0.3,
      preload: true,
    });

    return () => {
      ambientRef.current?.unload();
      clackRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    if (isActive && !wasActive.current) {
      wasActive.current = true;
      if (Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume();
      }
      if (ambientRef.current) {
        ambientRef.current.play();
        ambientRef.current.fade(0, 0.15, 2000);
      }
    } else if (!isActive && wasActive.current) {
      wasActive.current = false;
      if (ambientRef.current) {
        ambientRef.current.fade(0.15, 0, 1000);
      }
    }
  }, [isActive]);

  const playClack = useCallback(() => {
    if (clackRef.current) {
      clackRef.current.play();
    }
  }, []);

  const startAudioOnGesture = useCallback(() => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
  }, []);

  return { playClack, startAudioOnGesture };
}
