import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sphere({ randomScale, body, material }) {
	const meshRef = useRef();

	useFrame((state) => {
		meshRef.current.position.x = body.position.x;
		meshRef.current.position.y = body.position.y;
		meshRef.current.position.z = body.position.z;

		meshRef.current.quaternion.x = body.quaternion.x;
		meshRef.current.quaternion.y = body.quaternion.y;
		meshRef.current.quaternion.z = body.quaternion.z;
		meshRef.current.quaternion.w = body.quaternion.w;
	});

	return (
		<>
			<mesh
				ref={meshRef}
				castShadow
				position={body.position}
				quaternion={body.quaternion}
				scale={randomScale}
			>
				<sphereGeometry args={[randomScale, 100, 100]} />
				<meshStandardMaterial
					map={material.colorMap}
					displacementMap={material.height}
					normalMap={material.normalMap}
					roughnessMap={material.roughnessMap}
					aoMap={material.aoMap}
				/>
			</mesh>
		</>
	);
}
