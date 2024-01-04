import { Environment } from "@react-three/drei";

export function Scene(){
  return (
    <group>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="sunset" />
    </group>
  )
}


/*

Find each mesh in scene, export it and create a r3f file for each one with lods and preloader.

Export each mesh as a gltf;

*/