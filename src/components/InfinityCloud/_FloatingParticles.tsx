import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOATING_PARTICLE_COUNT = 40;
const SCENE_SIZE = 5; // Size of the cubic space for floating particles

const FloatingParticles: React.FC = () => {
    // Reference to the instanced mesh
    const instancedMesh = useRef<THREE.InstancedMesh>(null);
    // Dummy object used for transformations
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Initial positions of the particles
    // Randomly distributed within [-SCENE_SIZE/2, SCENE_SIZE/2]
    const positions = useMemo(() => new Array(FLOATING_PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3(
        (Math.random() - 0.5) * SCENE_SIZE,
        (Math.random() - 0.5) * SCENE_SIZE,
        (Math.random() - 0.5) * SCENE_SIZE
    )), []);

    // Initial velocities of the particles
    // Randomly distributed within [-0.005, 0.005]
    const velocities = useMemo(() => new Array(FLOATING_PARTICLE_COUNT).fill(0).map(() => new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
    )), []);

    // Animation frame update function
    useFrame((state: any, delta: number) => {
        if (instancedMesh.current) {
            for (let i = 0; i < FLOATING_PARTICLE_COUNT; i++) {
                // Update position based on velocity
                positions[i].add(velocities[i]);

                // Boundary check and velocity reversal
                // If the particle goes out of the scene, reverse the velocity
                // and bring it back to the edge of the scene
                if (Math.abs(positions[i].x) > SCENE_SIZE / 2) {
                    positions[i].x = Math.sign(positions[i].x) * SCENE_SIZE / 2;
                    velocities[i].x *= -1;
                }
                
                if (Math.abs(positions[i].y) > SCENE_SIZE / 2) {
                    positions[i].y = Math.sign(positions[i].y) * SCENE_SIZE / 2;
                    velocities[i].y *= -1;
                }
                
                if (Math.abs(positions[i].z) > SCENE_SIZE / 2) {
                    positions[i].z = Math.sign(positions[i].z) * SCENE_SIZE / 2;
                    velocities[i].z *= -1;
                }

                // Small random velocity change
                velocities[i].add(new THREE.Vector3(
                    (Math.random() - 0.5) * 0.0001,
                    (Math.random() - 0.5) * 0.0001,
                    (Math.random() - 0.5) * 0.0001
                ));

                // Apply position to instance
                // Set position of dummy object to position of ith particle
                dummy.position.copy(positions[i]);
                // Set scale of dummy object to 0.01 to make it small
                dummy.scale.setScalar(0.01);
                // Update transformation matrix of dummy object
                dummy.updateMatrix();
                // Set the transformation matrix of the ith instance to the dummy's matrix
                instancedMesh.current.setMatrixAt(i, dummy.matrix);
            }
            // Mark the instance matrix as needing an update
            instancedMesh.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={instancedMesh} args={[undefined, undefined, FLOATING_PARTICLE_COUNT]}>
            <sphereGeometry args={[1, 4, 4]} />
            <meshBasicMaterial color="#ffffff" />
        </instancedMesh>
    );
};

export default FloatingParticles;