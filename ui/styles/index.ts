type Palette = [
  zero: string,
  one: string,
  two: string,
  three: string,
  four: string,
  five: string,
  six: string,
  seven: string,
  eight: string,
  nine: string,
];

const Palette = (...args: Palette) => args;

export const palegreen = Palette(
  "#EBEDE9",
  "#D6DAD2",
  "#C1C8BC",
  "#ADB6A5",
  "#99A38F",
  "#7A876E",
  "#5C6553",
  "#3D4337",
  "#292D25",
  "#141612",
);

export const vibrantgreen = Palette(
  "#E9EFE6",
  "#D3DFCD",
  "#BCCFB4",
  "#A5BF9B",
  "#8FAF83",
  "#79A06A",
  "#547048",
  "#425738",
  "#263220",
  "#131910",
);

export const timberwolf = Palette(
  "#F7F4F2",
  "#E8DFD9",
  "#D9C9BF",
  "#C9B3A6",
  "#B19281",
  "#A27C67",
  "#8B6855",
  "#654C3E",
  "#4C392F",
  "#261C17"
)

const colors = {
  background: 9,
  backgroundFocus: 8,
  backgroundHover: 0,
  backgroundPress: 0,
  backgroundStrong: 0,
  backgroundTransparent: 0,
  borderColor: 0,
  borderColorFocus: 0,
  borderColorHover: 0,
  borderColorPress: 0,
  color: 0,
  colorFocus: 0,
  colorHover: 0,
  colorPress: 0,
  colorTransparent: 0,
  placeholderColor: 0,
  shadowColor: 0,
  shadowColorFocus: 0,
  shadowColorHover: 0,
  shadowColorPress: 0,
};

const scales = {
  sm: .7,
  md: 1,
  lg: 1.3,
};

const createTheme = <
  Colors extends Record<string, number>,
  Palettes extends Record<string, Palette>,
  Scales extends Record<string, number>,
>(args: {
  colors: Colors;
  palettes: Palettes;
  scales: Scales;
}) => {
  const colorCache = new Map<Palette, Record<keyof Colors, string>>();
  const colorsFromPalette = (palette: Palette) =>
    Object.entries(args.colors).reduce((acc, [key, value]) => {
      acc[key as keyof Colors] = palette[value];
      return acc;
    }, {} as Record<keyof Colors, string>);
  const colors = Object.entries(args.palettes).reduce(
    (acc, [key, palette]) => {
      acc[key] = colorsFromPalette(palette);
      return acc;
    },
    {} as any,
  ) as Record<keyof Palettes, Record<keyof Colors, string>> & {
    palette: (palette: Palette) => Record<keyof Colors, string>;
  };
  colors.palette = (palette) => {
    const cached = colorCache.get(palette);
    if (cached) {
      return cached;
    }
    const result = colorsFromPalette(palette);
    colorCache.set(palette, result);
    return result;
  };

  return {
    colors,
    scales: args.scales,
    palettes: args.palettes,
  };
};

export const darkTheme = createTheme({
  palettes: {
    primary: palegreen,
    primary_vibrant: vibrantgreen,
    secondary: timberwolf,
  },
  colors,
  scales,
});
