"use client";

import { easings } from "@react-spring/web";
import TextEngine from "spring-text-engine";

import { Hover } from "@/components/animation/springs/hover";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";

/**
 * Client leaf for the home view — the animation showcase. Kept separate from
 * `HomeView` so the view itself stays a Server Component (hard rule #6).
 */
export const HomeShowcase = () => {
  return (
    <>
      <SpringTrigger tag="h1" from={{ y: "0rem" }} to={{ y: "10rem" }}>
        Hello World!
      </SpringTrigger>

      <TextEngine
        tag="h1"
        mode="once"
        lineIn={{ y: "0%", opacity: 1 }}
        lineOut={{ y: "100%", opacity: 0 }}
        lineStagger={100}
        lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
        overflow
      >
        Hover Me!
      </TextEngine>

      <Hover
        className="h-2.5 w-full bg-black fixed bottom-16 left-0"
        tag="div"
        from={{ maxWidth: "0%" }}
        to={{ maxWidth: "100%" }}
      />

      <TextEngine
        tag="h2"
        mode="progress"
        type="interpolate"
        interpolationStaggerCoefficient={0.5}
        letterIn={{ opacity: 1 }}
        letterOut={{ opacity: 0.1 }}
        wordIn={{ y: 0 }}
        wordOut={{ y: 50 }}
      >
        Yooooo that is a nice progress text with interpolation!
      </TextEngine>

      <TextEngine
        tag="h2"
        mode="progress"
        type="toggle"
        letterIn={{ opacity: 1 }}
        letterOut={{ opacity: 0.1 }}
        wordIn={{ y: 0 }}
        wordOut={{ y: 10 }}
      >
        Yooooo that is a nice progress text!
      </TextEngine>
    </>
  );
};
