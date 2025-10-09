import React from "react";
import { Canvas, Path, Skia, Paint, SkRect } from "@shopify/react-native-skia";
import { View } from "react-native";

export const MyRing = () => {

    const path = Skia.Path.Make();
    const steps = 10;
    const radius = 200;
    path.moveTo(radius/2, 0);
    for(let i = 0; i < steps; i++) {
        path.addArc(<SkRect x={0} y={0} width={radius * 2} height={radius * 2}/>, (i * 360) / steps, 360 / steps);
    }

    return (
        <Canvas>

        </Canvas>
    )
}