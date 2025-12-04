import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import logos
import logoK from './images/logo K.png';
import logoText from './images/logo texte.png';
import logoPink from './images/Copie de Logo Klub rose (1).png';
import logoWhite from './images/Copie de Logo Klub blanc (1).png';

const logos = [logoK, logoText, logoPink, logoWhite];

const DURATION = 1; // durée fixe
const LOGO_DELAY = 0.2; // délai uniquement au début

const AnimatedLogo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const bgColors = [
        'rgba(33, 150, 243, 0.2)',
        'rgba(33, 150, 243, 0.3)',
        'rgba(33, 150, 243, 0.4)',
        'rgba(33, 150, 243, 0.5)',
    ];

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#fff',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* ⭕ Background circles FIRST */}
                    {bgColors.map((color, index) => (
                        <motion.div
                            key={index}
                            style={{
                                position: 'absolute',
                                width: 300 + index * 30,
                                height: 300 + index * 30,
                                borderRadius: '50%',
                                backgroundColor: color,
                                zIndex: 0,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: DURATION,
                                    ease: 'easeInOut',
                                },
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0,
                                transition: {
                                    duration: DURATION,
                                    ease: 'easeInOut',
                                },
                            }}
                        />
                    ))}

                    {/* ⭐ Logo AFTER 0.2s, only the first time */}
                    <motion.img
                        src={logos[currentIndex]}
                        alt={`Klub Logo ${currentIndex}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: DURATION,
                                ease: 'easeInOut',
                                delay: LOGO_DELAY,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                            transition: {
                                duration: DURATION,
                                ease: 'easeInOut',
                            },
                        }}
                        style={{
                            width: 250,
                            height: 'auto',
                            objectFit: 'contain',
                            zIndex: 2,
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AnimatedLogo;
