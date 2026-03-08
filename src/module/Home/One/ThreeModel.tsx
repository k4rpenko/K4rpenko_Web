"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styles from "./page.module.css";

export default function ThreeModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const width = mountRef.current?.clientWidth || 100;
    const height = mountRef.current?.clientHeight || 100;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current?.appendChild(renderer.domElement);

    // 🎮 Контрол
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = false;

    // 🎯 Обмежуємо обертання — тільки X і Y
    controls.minPolarAngle = Math.PI / 3; // мінімальний нахил (вгору)
    controls.maxPolarAngle = Math.PI / 1.5; // максимальний нахил (вниз)

    controls.minAzimuthAngle = -Math.PI / 4; // поворот вліво
    controls.maxAzimuthAngle = Math.PI / 4; // поворот вправо


    // 💡 Світло
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x404040, 1));

    // 🌈 HDRI
    new RGBELoader().load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      }
    );

    // 📦 Модель
    const loader = new GLTFLoader();
    loader.load("/3d/abstract_figure_twist.glb", (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);

      scene.add(model);

      const handleResize = () => {
        if (!mountRef.current) return;
        
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      model.traverse((child: any) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 1.0,
            roughness: 0.2,
            envMapIntensity: 1.2,
          });
        }
      });


      let isDragging = false;
      const defaultCameraPos = new THREE.Vector3(0, 7, 18);

      renderer.domElement.addEventListener("mousedown", () => (isDragging = true));
      renderer.domElement.addEventListener("mouseup", () => (isDragging = false));

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();

        if (!isDragging) {
          camera.position.lerp(defaultCameraPos, 0.03);
          model.rotation.y += 0.005; 
        }

        renderer.render(scene, camera);
      };

      animate();
    });

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className={styles.threed}
      ref={mountRef}
    />
  );
}