'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SpinningLogo() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8
      groupRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      <mesh position={[-0.5, -0.5, -0.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </group>
  )
}

function AnimatedBox({ initialPosition }: { initialPosition: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition))
  const currentPosition = useRef(new THREE.Vector3(...initialPosition))

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    return new THREE.Vector3(
      current.x + randomDirection[0] * 3,
      0.5,
      current.z + randomDirection[1] * 3
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current)
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x))
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z))
      setTargetPosition(newPosition)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.05)
      meshRef.current.position.copy(currentPosition.current)
    }
  })

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={1} />
      </lineSegments>
    </mesh>
  )
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ]

  return (
    <>
      <OrbitControls 
        enableZoom={false}
        enablePan={false} 
        enableRotate={false}
        autoRotate={true}
        autoRotateSpeed={1.0}
        target={[0, 0, 0]}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.3}
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor="rgb(255, 255, 255)"
        cellColor="rgb(128, 128, 128)"
        fadeDistance={30}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  )
}

export default function LandingPage3D() {
  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* Hero Section with 3D Background */}
      <div className="relative w-full h-screen overflow-hidden bg-black">
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-5xl mx-auto px-6">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full">
                Production-Ready Hedera Infrastructure
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Enterprise-Grade
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Oracle Dashboard
              </span>
              <br />
              Built on Hedera
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Oracle management with real-time analytics, HCS consensus service integration, 
              and interactive 3D data visualization for enterprise applications.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center mb-10 text-sm">
              <div className="flex items-center bg-green-500/20 border border-green-500/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-white">Real-time Data</span>
              </div>
              <div className="flex items-center bg-blue-500/20 border border-blue-500/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-white">9+ Oracle Providers</span>
              </div>
              <div className="flex items-center bg-purple-500/20 border border-purple-500/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-white">Interactive Queries</span>
              </div>
              <div className="flex items-center bg-orange-500/20 border border-orange-500/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-white">Hedera Consensus</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link 
                href="/getting-started" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link 
                href="/oracles" 
                className="border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Try Oracle Assistant
              </Link>
            </div>
          </div>
        </div>
        
        {/* 3D Background */}
        <Canvas 
          shadows 
          camera={{ position: [25, 25, 25], fov: 60 }} 
          className="absolute inset-0 opacity-40"
        >
          <Scene />
        </Canvas>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
      </div>
    </div>
  )
}