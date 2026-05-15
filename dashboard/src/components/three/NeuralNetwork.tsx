"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralConnection({ count = 40 }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    }
    return p;
  }, [count]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 3) {
          positions.push(points[i].x, points[i].y, points[i].z);
          positions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  const linesRef = useRef<THREE.LineSegments>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    linesRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.y = time * 0.05;
    
    // Pulse opacity
    if (linesRef.current.material instanceof THREE.LineBasicMaterial) {
      linesRef.current.material.opacity = 0.1 + Math.sin(time) * 0.05;
    }
  });

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  return (
    <>
      <lineSegments ref={linesRef}>
        <primitive object={lineGeometry} />
        <lineBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
      </lineSegments>
      <points ref={pointsRef}>
        <primitive object={pointsGeometry} />
        <pointsMaterial size={0.1} color="#0ea5e9" transparent opacity={0.5} sizeAttenuation />
      </points>
    </>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 glow-mesh opacity-30" />
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <NeuralConnection count={60} />
      </Canvas>
    </div>
  );
}
