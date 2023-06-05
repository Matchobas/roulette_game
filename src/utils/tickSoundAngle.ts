import { Howl } from "howler";

function convertToDegrees(angle: number) {
  return (angle * 180) / Math.PI;
}

export function tickSoundAngle(
  startAngle: number,
  sound: Howl,
  framesUpdateRate: number
) {
  console.log(convertToDegrees(framesUpdateRate));
  const endAngle = 2 * Math.PI;
  const fullRotations = startAngle / endAngle;
  const reducedStartAngle = Math.floor(
    convertToDegrees(startAngle - Math.floor(fullRotations) * endAngle)
  );
  // const framesInDegrees = convertToDegrees(framesUpdateRate);
  if (reducedStartAngle <= 271 && reducedStartAngle >= 269) {
    sound.play();
  }
}
