import { Howl } from "howler";
import { useRef } from "react";

interface SoundEffects {
  sounds: ("spinningMusic" | "wheelTick")[];
}

const soundEffects: Record<string, Howl> = {
  spinningMusic: new Howl({
    src: ["src/sounds/MISTERY_BOX.wav"],
    loop: true,
    volume: 0.2
  }),
  wheelTick: new Howl({
    src: ["src/sounds/57126__loofa__castanet-014.wav"],
    volume: 0.1
  })
};

export function changeSoundVolume(volume: number) {
  Object.values(soundEffects).forEach((value) => {
    value.volume(volume);
  });
}

export function useSoundEffects({ sounds }: SoundEffects) {
  const requiredSounds: Record<string, React.MutableRefObject<Howl>> = {};
  sounds.forEach((sound) => {
    if (soundEffects[sound]) {
      console.log(soundEffects[sound].volume());
      requiredSounds[sound] = useRef(soundEffects[sound]);
    }
  });

  return requiredSounds;
}
