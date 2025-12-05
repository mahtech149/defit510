import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import logos
import logoK from './images/logo K.png';
import logoText from './images/logo texte.png';
import logoPink from './images/Copie de Logo Klub rose (1).png';
import logoWhite from './images/Copie de Logo Klub blanc (1).png';

const AnimatedLogo = () => {
    const [stage, setStage] = useState(0); // 0: K, 1: KLUB (progressive), 2: White, 3: Pink
    const [letterProgress, setLetterProgress] = useState(0); // 0: K, 1: KL, 2: KLU, 3: KLUB

    useEffect(() => {
        const sequence = async () => {
            // Stage 0: Show K
            setStage(0);
            setLetterProgress(0);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Stage 1: Progressive reveal K → KL → KLU → KLUB
            setStage(1);
            // Show K (already visible from previous stage)
            await new Promise(resolve => setTimeout(resolve, 600));
            setLetterProgress(1); // Show KL
            await new Promise(resolve => setTimeout(resolve, 600));
            setLetterProgress(2); // Show KLU
            await new Promise(resolve => setTimeout(resolve, 600));
            setLetterProgress(3); // Show KLUB (full)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Stage 2: White logo
            setStage(2);
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Stage 3: Pink logo
            setStage(3);
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Loop back
            setStage(0);
            setLetterProgress(0);
        };

        sequence();
        const interval = setInterval(sequence, 12000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Animated gradient background */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    background: stage === 0
                        ? 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)'
                        : stage === 1
                            ? 'radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%)'
                            : stage === 2
                                ? 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)'
                                : 'radial-gradient(circle, rgba(250, 112, 154, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                    perspective: '1000px',
                }}
            >
                <AnimatePresence mode="wait">
                    {/* Stage 0: Logo K - Zoom in from center */}
                    {stage === 0 && (
                        <motion.div
                            key="logoK"
                            style={{
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.3,
                                rotateY: -180,
                                filter: 'blur(20px)',
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateY: 0,
                                filter: 'blur(0px)',
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.5,
                                rotateY: 180,
                                filter: 'blur(20px)',
                                transition: { duration: 0.8 }
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 15,
                                duration: 1.5
                            }}
                        >
                            <motion.img
                                src={logoK}
                                alt="Klub K"
                                style={{
                                    width: 350,
                                    height: 'auto',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.6))',
                                }}
                                animate={{
                                    y: [0, -15, 0],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            {/* Pulsing rings */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: `${100 + i * 30}%`,
                                        height: `${100 + i * 30}%`,
                                        borderRadius: '50%',
                                        border: `2px solid rgba(255, 255, 255, ${0.4 - i * 0.15})`,
                                        zIndex: -1,
                                    }}
                                    animate={{
                                        scale: [1, 1.3 + i * 0.1, 1],
                                        opacity: [0.4 - i * 0.15, 0.6 - i * 0.15, 0.4 - i * 0.15],
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* Stage 1: Logo Text (KLUB) - Progressive letter reveal K → KL → KLU → KLUB */}
                    {stage === 1 && (
                        <motion.div
                            key="logoText"
                            style={{
                                position: 'relative',
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.2,
                                rotateX: 90,
                                transition: { duration: 0.8 }
                            }}
                            transition={{
                                duration: 0.6,
                                ease: 'easeOut',
                            }}
                        >
                            {/* Progressive clip-path reveal based on letterProgress */}
                            <motion.img
                                src={logoText}
                                alt="Klub Text"
                                style={{
                                    width: 400,
                                    height: 'auto',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))',
                                }}
                                animate={{
                                    clipPath: letterProgress === 0
                                        ? 'inset(0 80% 0 0)' // Show only K (~20% of width)
                                        : letterProgress === 1
                                            ? 'inset(0 55% 0 0)' // Show KL (~45% of width)
                                            : letterProgress === 2
                                                ? 'inset(0 30% 0 0)' // Show KLU (~70% of width)
                                                : 'inset(0 0% 0 0)', // Show KLUB (100%)
                                    filter: [
                                        'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))',
                                        'drop-shadow(0 0 50px rgba(255, 255, 255, 0.8))',
                                        'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))',
                                    ],
                                }}
                                transition={{
                                    clipPath: {
                                        duration: 0.6,
                                        ease: [0.4, 0, 0.2, 1],
                                    },
                                    filter: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                            />
                            {/* Description text - appears when KLUB is complete */}
                            {letterProgress === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: -70,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                        maxWidth: '500px',
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        Application dédiée aux <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>-26 ans</span>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.6 }}
                                        style={{
                                            marginTop: '8px',
                                            fontSize: '0.9rem',
                                            opacity: 0.9,
                                        }}
                                    >
                                        Profitez d'avantages dans pleins d'établissements !
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Stage 2: White Logo - Color wash transition */}
                    {stage === 2 && (
                        <motion.div
                            key="logoWhite"
                            style={{
                                position: 'relative',
                            }}
                            initial={{
                                opacity: 0,
                                filter: 'brightness(0) saturate(0%)',
                                rotateX: -90,
                            }}
                            animate={{
                                opacity: 1,
                                filter: 'brightness(1) saturate(100%) drop-shadow(0 0 40px rgba(255, 255, 255, 0.7))',
                                rotateX: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                rotateY: 90,
                                transition: { duration: 0.8 }
                            }}
                            transition={{
                                duration: 1.5,
                                ease: 'easeOut',
                            }}
                        >
                            <motion.img
                                src={logoWhite}
                                alt="Klub White"
                                style={{
                                    width: 400,
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                                animate={{
                                    rotate: [0, 2, -2, 0],
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            {/* Animated light sweep */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '50%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    zIndex: 1,
                                    pointerEvents: 'none',
                                }}
                                animate={{
                                    left: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 1.5,
                                    ease: 'easeInOut',
                                }}
                            />
                        </motion.div>
                    )}

                    {/* Stage 3: Pink Logo - 3D flip reveal */}
                    {stage === 3 && (
                        <motion.div
                            key="logoPink"
                            style={{
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.5,
                                rotateY: 180,
                                rotateX: 45,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateY: 0,
                                rotateX: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.3,
                                rotateY: -180,
                                transition: { duration: 0.8 }
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 80,
                                damping: 15,
                                duration: 1.8
                            }}
                        >
                            <motion.img
                                src={logoPink}
                                alt="Klub Pink"
                                style={{
                                    width: 400,
                                    height: 'auto',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 0 50px rgba(255, 192, 203, 0.8))',
                                }}
                                animate={{
                                    scale: [1, 1.08, 1],
                                    filter: [
                                        'drop-shadow(0 0 50px rgba(255, 192, 203, 0.8))',
                                        'drop-shadow(0 0 70px rgba(255, 192, 203, 1))',
                                        'drop-shadow(0 0 50px rgba(255, 192, 203, 0.8))',
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            {/* Rotating energy rings */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: `${110 + i * 25}%`,
                                        height: `${110 + i * 25}%`,
                                        borderRadius: '50%',
                                        border: `3px solid rgba(255, 192, 203, ${0.5 - i * 0.15})`,
                                        zIndex: -1,
                                    }}
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.15 + i * 0.1, 1],
                                        opacity: [0.4 - i * 0.15, 0.7 - i * 0.15, 0.4 - i * 0.15],
                                    }}
                                    transition={{
                                        rotate: {
                                            duration: 5 + i * 2,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        },
                                        scale: {
                                            duration: 2.5 + i * 0.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        },
                                        opacity: {
                                            duration: 2.5 + i * 0.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        },
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AnimatedLogo;
