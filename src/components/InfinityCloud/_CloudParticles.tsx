import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { getCSSVariable } from "../../utils/cssUtils";

const PARTICLE_COUNT = 2000;
const CURVE_SEGMENTS = 64;
const THICKNESS = 2.5;
const LERP_FACTOR = 0.01; // Adjust this value to control smoothness (0-1)

const CloudParticles: React.FC = () => {
    const [particleColor, setParticleColor] = useState<string>('');

    useEffect(() => {
        setParticleColor(getCSSVariable('--color-accent'));
    }, []);

    // Reference to the instanced mesh
    const instancedMesh = useRef<THREE.InstancedMesh>(null);
    // Dummy object used for transformations
    const dummy = useMemo(() => new THREE.Object3D(), []);
    // Clock to track elapsed time
    const clock = useRef(new THREE.Clock());

    // Initial positions of the particles
    const particlePositions = useMemo(() => new Array(PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3()), []);
    // Target positions for the particles to move towards
    const targetPositions = useMemo(() => new Array(PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3()), []);

    // Define the figure-8 curve
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            // Generate an array of Vector3 points that define the curve
            Array(CURVE_SEGMENTS).fill(0).map((_, i) => {
                // calculate the normalized index in range [0, 1) of the point on the curve
                const t = i / CURVE_SEGMENTS;
                // Calculate the x, y, z coordinates of the point on the curve
                const x = Math.sin(t * Math.PI * 2) * 2;
                const y = Math.sin(t * Math.PI * 4);
                const z = Math.cos(t * Math.PI * 2);
                return new THREE.Vector3(x, y, z);
            }),
            true  // Set to true to close the curve
        );
    }, []);

    // Radius of the tube
    const radius = THICKNESS / 2;

    // Animation frame update function
    useFrame(() => {
        if (instancedMesh.current) {
            const time = clock.current.getElapsedTime();

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                // calculate the position of the particle along the curve
                // based on the normalized index (0-1) and time (which moves the particles along the curve)
                // take the modulus to ensure that t stays in the range [0, 1)
                const t = (i / PARTICLE_COUNT + time * 0.1) % 1;
                const { position, normal } = getPointOnTube(curve, t, radius);

                // Calculate target position with some randomness
                targetPositions[i].copy(position).add(normal.multiplyScalar(Math.random() * radius));
                // Smoothly move particle towards target position
                particlePositions[i].lerp(targetPositions[i], LERP_FACTOR);

                // Apply position to instance
                dummy.position.copy(particlePositions[i]);
                dummy.scale.setScalar(0.005);
                dummy.updateMatrix();
                instancedMesh.current.setMatrixAt(i, dummy.matrix);
            }

            // Mark the instance matrix as needing an update
            instancedMesh.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={instancedMesh} args={[undefined, undefined, PARTICLE_COUNT]}>
            <sphereGeometry args={[1, 4, 4]} />
            <meshBasicMaterial color={particleColor} />
        </instancedMesh>
    );
};

/**
 * Calculates a point on a tube given a curve, a parameter value, and a radius.
 * 
 * @param curve - The curve representing the tube.
 * @param t - The parameter value along the curve. In the range [0, 1].
 * @param radius - The radius of the tube.
 * @returns An object containing the position and normal vectors of the point on the tube.
 */
function getPointOnTube(curve: THREE.CatmullRomCurve3, t: number, radius: number) {
    const position = new THREE.Vector3();
    const normal = new THREE.Vector3();
    
    // Get the point and tangent at the parameter value t
    curve.getPointAt(t, position);
    curve.getTangentAt(t, normal);

    // Define "up" vector pointing up in positive y-axis
    const up = new THREE.Vector3(0, 1, 0);

    // Calculate the axis perpendicular to the normal and up by taking the cross product
    const axis = new THREE.Vector3().crossVectors(up, normal).normalize();

    // Calculate a random angle in the range [0, 2π]
    const radialAngle = Math.random() * Math.PI * 2;

    // Calculate the binormal vector by taking the cross product of the normal and axis
    const binormal = new THREE.Vector3().crossVectors(normal, axis);

    // Calculate the radial vector by adding the scaled axis and binormal vectors
    const radialVector = new THREE.Vector3()
        .addScaledVector(axis, Math.cos(radialAngle))
        .addScaledVector(binormal, Math.sin(radialAngle));
    position.add(radialVector.multiplyScalar(radius));
    return { position, normal: radialVector };
}

export default CloudParticles;