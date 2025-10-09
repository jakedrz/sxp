import React from "react";
import { Canvas, Path, Skia, Paint } from "@shopify/react-native-skia";
import { View } from "react-native";

export const SkiaFitnessRing = ({
                                    size = 200,
                                    thickness = 24,
                                    color = "#A18ADF",
                                    shadowColor = "rgba(0,0,0,0.4)",
                                    percentage = 100,
                                }) => {
    const center = { x: size / 2, y: size / 2 };
    const radius = size / 2 - thickness / 2;
    const sweep = (Math.PI * 2 * percentage) / 100;
    const steps = 180; // number of stroke segments for gradient smoothness

    const paths = [];
    for (let i = 0; i < steps; i++) {
        const start = (i / steps) * sweep;
        const end = ((i + 1) / steps) * sweep;

        // Interpolate between colors (for simple gradient fade)
        const t = i / steps;
        const fade = Math.pow(1 - t, 2); // soft fade toward the end
        const r = Math.floor(161 * (1 - fade) + 92 * fade); // between #A18ADF and darker
        const g = Math.floor(138 * (1 - fade) + 63 * fade);
        const b = Math.floor(223 * (1 - fade) + 199 * fade);
        const segmentColor = `rgb(${r},${g},${b})`;

        // Create arc path
        const path = Skia.Path.Make();
        path.addArc(
            {
                x: center.x - radius,
                y: center.y - radius,
                width: radius * 2,
                height: radius * 2,
            },
            (start * 180) / Math.PI,
            ((end - start) * 180) / Math.PI
        );

        paths.push({ path, segmentColor });
    }

    return (
        <View style={{ width: size, height: size }}>
            <Canvas style={{ flex: 1 }}>
                {/* Soft shadow layer first */}
                {paths.map(({ path }, i) => (
                    <Path
                        key={`shadow-${i}`}
                        path={path}
                        style="stroke"
                        strokeWidth={thickness + 4}
                        color={shadowColor}
                        opacity={0.15}
                    />
                ))}

                {/* Actual gradient stroke segments */}
                {paths.map(({ path, segmentColor }, i) => (
                    <Path
                        key={`stroke-${i}`}
                        path={path}
                        style="stroke"
                        strokeWidth={thickness}
                        color={segmentColor}
                        strokeCap="round"
                    />
                ))}
            </Canvas>
        </View>
    );
};
