import { useRef, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = ({brandColor, linkColor, count}) => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            className="contents"
            options={{
                fullScreen: { enable: false },
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                detectRetina: true,
                particles: {
                    number: { value: count, density: { enable: true, area: 900 } },
                    color: { value: brandColor },
                    shape: { type: "circle" },
                    opacity: { value: 0.25 },
                    size: { value: { min: 1, max: 2.5 } },
                    links: {
                        enable: true,
                        color: linkColor,
                        opacity: 0.25,
                        width: 1,
                        distance: 140,
                    },
                    move: {
                        enable: true,
                        speed: 0.6,
                        direction: "none",
                        outModes: { default: "out" },
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 150, links: { opacity: 0.35 } },
                        repulse: { distance: 120 },
                    },
                },
            }}
        />
    );
};

export default ParticlesBackground;
