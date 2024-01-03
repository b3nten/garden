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