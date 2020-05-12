import React, { useEffect, useRef } from 'react';
import * as THREE from "three";

function App() {
  const space = useRef();

  useEffect(() => {
    setup(space);
  }, [])

  return (
    <div className="App">
      <section ref={space}></section>
    </div>
  );
}

let setup = (ref) => {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  ref.current.appendChild( renderer.domElement );
  createStars(scene, camera, renderer);
}

let createStars = (scene, camera, renderer) => {
  let starGeo = new THREE.Geometry();
  for(let i = 0; i < 4000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    starGeo.vertices.push(star);
  }

  let loader = new THREE.TextureLoader();
    loader.load("./star.png",
    (texture) => {
      let starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        map: texture
      });
      let stars = new THREE.Points(starGeo, starMaterial);
      scene.add(stars);
      renderer.render(scene, camera);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  )
}




export default App;
