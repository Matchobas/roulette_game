export function adaptWheelTitle(
  title: string,
  startAngle: number,
  endAngle: number,
  radius: number
) {
  const textAngle = (endAngle - startAngle) / 2 + startAngle;
  const textWidth = title.length;
  const textStart =
    radius / 2 - textWidth * 5 <= 30 ? 50 : radius / 2 - textWidth * 4;
  const betterFontSize = 20 - 5 * Math.floor(textWidth / 20);
  const radiusFontLimit = radius + 130;
  let adaptedFontSizeNumber = 10;
  if (betterFontSize > 7) {
    adaptedFontSizeNumber = 20 - 5 * Math.floor(textWidth / 20);
    if (textWidth * betterFontSize > radiusFontLimit)
      adaptedFontSizeNumber -= 3;
  } else {
    adaptedFontSizeNumber = 7;
  }

  return [textAngle, textStart, adaptedFontSizeNumber];
}
