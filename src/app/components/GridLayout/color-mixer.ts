

export interface Color {
    r: number,
    g: number,
    b: number
}

export const toHex = (color: Color) => {
    const numberToHex = (x: number) => Math.round(x).toString(16).padStart(2, "0");
    const n2h = numberToHex;

    return `#${n2h(color.r)}${n2h(color.g)}${n2h(color.b)}`;
}

const inverse = (color: Color) => ({
    r: 255 - color.r,
    g: 255 - color.g,
    b: 255 - color.b
});

// vector RGB distance in cartesian 
const distance = (a: Color, b: Color) => {
    const out = ((a.r - b.r) * (a.r - b.r) + (a.g - b.g) * (a.g - b.g) + (a.b - b.b) * (a.b - b.b));
    return Math.sqrt(out) / (Math.sqrt(3.0) * 255); //scale to 0-1
}

const lerp = (a: Color, b: Color, blend: number) => ({
    r: (1.0 - blend) * a.r + blend * b.r,
    g: (1.0 - blend) * a.g + blend * b.g,
    b: (1.0 - blend) * a.b + blend * b.b,
})

export const blend = (a: Color, b: Color, blend: number) => {
    blend = 1 - blend;
    // from: https://github.com/ProfJski/ArtColors/blob/master/RYB.cpp
    const c = inverse(a);
    const d = inverse(b)

    const f: Color = {
        r: Math.max(0, 255 - c.r - d.r),
        g: Math.max(0, 255 - c.g - d.g),
        b: Math.max(0, 255 - c.b - d.b),
    };

    const colorDistance = distance(a, b);
    const blendFactor = 3.0 * blend * (1.0 - blend) * colorDistance;

    const positiveLerp = lerp(a, b, blend);
    return lerp(positiveLerp, f, blendFactor);
}