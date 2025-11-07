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
    const width = 900;
    const height = 900;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
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

      model.scale.set(1.5, 1.5, 1.5);
      scene.add(model);

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

      // ⚙️ Логіка взаємодії
      let isDragging = false;
      const defaultCameraPos = new THREE.Vector3(0, 7, 18);

      renderer.domElement.addEventListener("mousedown", () => {
        isDragging = true;
      });
      renderer.domElement.addEventListener("mouseup", () => {
        isDragging = false;
      });

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();

        if (isDragging) {

        } else {
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
      style={{
        width: "900px",
        height: "900px",
      }}
    />
  );
}
