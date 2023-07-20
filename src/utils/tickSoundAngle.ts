import { Howl } from "howler";

function convertToDegrees(angle: number) {
  return (angle * 180) / Math.PI;
}

export function tickSoundAngle(
  startAngle: number,
  sound: Howl,
  framesUpdateRate: number,
  newRotation = true
) {
  const framesOffset = convertToDegrees(framesUpdateRate);
  const endAngle = 2 * Math.PI;
  const fullRotations = Math.floor(startAngle / endAngle);
  const reducedStartAngle = convertToDegrees(
    startAngle - fullRotations * endAngle
  );
  // if (
  //   reducedStartAngle <= 270 &&
  //   reducedStartAngle > 269 - framesOffset / 200 &&
  //   newRotation
  // ) {
  //   sound.play();
  // }
}
