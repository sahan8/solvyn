export const motionDurations = { instant: 0, fast: 0.16, normal: 0.28, slow: 0.48, cinematic: 0.72 } as const;
export const motionEase = [0.22, 1, 0.36, 1] as const;
export const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: motionDurations.slow, ease: motionEase } } };
