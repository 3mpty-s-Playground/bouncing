"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";

const Scene = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine>(null);

    useEffect(() => {
        const { innerWidth, innerHeight } = window;

        const engine = Matter.Engine.create();
        const render = Matter.Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: innerWidth,
                height: innerHeight,
                wireframes: false,
                background: "transparent",
            },
        });

        const walls = [
            Matter.Bodies.rectangle(innerWidth / 2, 0, innerWidth, 30, {
                isStatic: true,
                render: {
                    visible: false,
                },
            }),
            Matter.Bodies.rectangle(-15, innerHeight / 2, 30, innerHeight, {
                isStatic: true,
                render: { visible: false },
            }),
            Matter.Bodies.rectangle(
                innerWidth + 15,
                innerHeight / 2,
                30,
                innerHeight,
                {
                    isStatic: true,
                    render: { visible: false },
                }
            ),
            Matter.Bodies.rectangle(
                innerWidth / 2,
                innerHeight,
                innerWidth,
                30,
                {
                    isStatic: true,
                    render: { visible: false },
                }
            ),
        ];

        const obstacleRadius =
            innerWidth > 480 ? innerWidth / 7.5 : innerWidth / 3;
        const obstacle = Matter.Bodies.circle(
            innerWidth / 2,
            innerHeight / 2,
            obstacleRadius,
            {
                isStatic: true,
                render: {
                    visible: true,
                    fillStyle: "#252422",
                },
            }
        );

        Matter.World.add(engine.world, obstacle);

        const icons = [
            "/icons/email.svg",
            "/icons/instagram.svg",
            "/icons/snapchat.svg",
            "/icons/tiktok.svg",
            "/icons/youtube.svg",
        ];

        icons.forEach((texture) => {
            for (let i = 0; i < 5; i++) {
                const ball = Matter.Bodies.circle(
                    Math.random() * innerWidth,
                    0,
                    innerWidth > 480 ? 30 : 15,
                    {
                        restitution: 0.5,
                        friction: 0,
                        render: {
                            sprite: {
                                texture,
                                xScale: innerWidth > 480 ? 0.1 : 0.05,
                                yScale: innerWidth > 480 ? 0.1 : 0.05,
                            },
                        },
                    }
                );
                Matter.World.add(engine.world, ball);
            }
        });

        const mouseControls = Matter.MouseConstraint.create(engine, {
            mouse: Matter.Mouse.create(sceneRef.current!),
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        Matter.World.add(engine.world, [...walls, mouseControls]);

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);

        engineRef.current = engine;

        const handleResize = () => {
            render.options.width = innerWidth;
            render.options.height = innerHeight;
            Matter.Render.setPixelRatio(render, 1);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            Matter.World.clear(engine.world, true);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#FFFCF2",
            }}
            ref={sceneRef}>
            <h1
                style={{
                    color: "#FFFCF2",
                    mixBlendMode: "difference",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "20vw",
                    textTransform: "uppercase",
                }}>
                Contact
            </h1>
        </div>
    );
};

export default Scene;
