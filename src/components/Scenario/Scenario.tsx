import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useControls, button } from "leva";
import { Html, useProgress } from "@react-three/drei";
//import CannonDebugger from "cannon-es-debugger";
import { createWorld, getSphere } from "./utils";
import Sphere from "./Sphere";

function Loader() {
	const { progress } = useProgress();
	return <Html center>{progress} % loaded</Html>;
}

function MapScenario() {
	const world = useMemo(() => createWorld(), []);
	const [spheres, setSpheres] = useState([]);
	//const [cannonDebugger, setCannonDebugger] = useState({});
	//const { scene } = useThree();

	/*useEffect(() => {
		if (world) {
			setCannonDebugger(() => {
				return new CannonDebugger(scene, world, {});
			});
		}
	}, [world]);*/

	useControls("Spheres", {
		"Random texture": button(() => {
			const { body, randomScale } = getSphere();
			world.addBody(body);
			const randomMaterialIndex = Math.floor(Math.random() * 3);
			setSpheres((prev) => {
				return [
					...prev,
					{
						mesh: Sphere,
						body,
						randomScale,
						materialIndex: randomMaterialIndex,
					},
				];
			});
		}),
		"Lapis Lazuli": button(() => {
			const { body, randomScale } = getSphere();
			world.addBody(body);
			setSpheres((prev) => {
				return [
					...prev,
					{
						mesh: Sphere,
						body,
						randomScale,
						materialIndex: 0,
					},
				];
			});
		}),
		Malachite: button(() => {
			const { body, randomScale } = getSphere();
			world.addBody(body);
			setSpheres((prev) => {
				return [
					...prev,
					{
						mesh: Sphere,
						body,
						randomScale,
						materialIndex: 1,
					},
				];
			});
		}),
		"Tiger Eye Gem": button(() => {
			const { body, randomScale } = getSphere();
			world.addBody(body);
			setSpheres((prev) => {
				return [
					...prev,
					{
						mesh: Sphere,
						body,
						randomScale,
						materialIndex: 2,
					},
				];
			});
		}),
	});

	useFrame(() => {
		if (world) {
			//cannonDebugger.update();
			world.fixedStep();
		}
	});

	const [colorMap, normalMap, roughnessMap, aoMap, height] = useLoader(
		TextureLoader,
		[
			"/Wood_Herringbone_Tiles_004/Substance_Graph_BaseColor.jpg",
			"/Wood_Herringbone_Tiles_004/Substance_Graph_Normal.jpg",
			"/Wood_Herringbone_Tiles_004/Substance_Graph_Roughness.jpg",
			"/Wood_Herringbone_Tiles_004/Substance_Graph_AmbientOcclusion.jpg",
			"/Wood_Herringbone_Tiles_004/Substance_Graph_Height.jpg",
		],
	);

	colorMap.repeat.set(5, 5);
	colorMap.wrapS = THREE.RepeatWrapping;
	colorMap.wrapT = THREE.RepeatWrapping;
	colorMap.generateMipmaps = false;
	colorMap.minFilter = THREE.NearestFilter;
	colorMap.magFilter = THREE.NearestFilter;

	const lapis_lazuli = useLoader(TextureLoader, [
		`/balls/lapis_lazuli/basecolor.jpg`,
		`/balls/lapis_lazuli/normal.jpg`,
		`/balls/lapis_lazuli/roughness.jpg`,
		`/balls/lapis_lazuli/ao.jpg`,
		`/balls/lapis_lazuli/height.png`,
	]);

	const malachite = useLoader(TextureLoader, [
		`/balls/malachite/basecolor.jpg`,
		`/balls/malachite/normal.jpg`,
		`/balls/malachite/roughness.jpg`,
		`/balls/malachite/ao.jpg`,
		`/balls/malachite/height.png`,
	]);

	const tiger_eye_gem = useLoader(TextureLoader, [
		`/balls/tiger_eye_gem/basecolor.jpg`,
		`/balls/tiger_eye_gem/normal.jpg`,
		`/balls/tiger_eye_gem/roughness.jpg`,
		`/balls/tiger_eye_gem/ao.jpg`,
		`/balls/tiger_eye_gem/height.png`,
	]);

	lapis_lazuli[0].repeat.set(1, 1);
	lapis_lazuli[0].wrapS = THREE.RepeatWrapping;
	lapis_lazuli[0].wrapT = THREE.RepeatWrapping;
	lapis_lazuli[0].generateMipmaps = false;
	lapis_lazuli[0].minFilter = THREE.NearestFilter;
	lapis_lazuli[0].magFilter = THREE.NearestFilter;

	malachite[0].repeat.set(1, 1);
	malachite[0].wrapS = THREE.RepeatWrapping;
	malachite[0].wrapT = THREE.RepeatWrapping;
	malachite[0].generateMipmaps = false;
	malachite[0].minFilter = THREE.NearestFilter;
	malachite[0].magFilter = THREE.NearestFilter;

	tiger_eye_gem[0].repeat.set(1, 1);
	tiger_eye_gem[0].wrapS = THREE.RepeatWrapping;
	tiger_eye_gem[0].wrapT = THREE.RepeatWrapping;
	tiger_eye_gem[0].generateMipmaps = false;
	tiger_eye_gem[0].minFilter = THREE.NearestFilter;
	tiger_eye_gem[0].magFilter = THREE.NearestFilter;

	const materials = [
		{
			name: "lapis_lazuli",
			colorMap: lapis_lazuli[0],
			normalMap: lapis_lazuli[1],
			roughnessMap: lapis_lazuli[2],
			aoMap: lapis_lazuli[3],
			height: lapis_lazuli[4],
		},
		{
			name: "malachite",
			colorMap: malachite[0],
			normalMap: malachite[1],
			roughnessMap: malachite[2],
			aoMap: malachite[3],
			height: malachite[4],
		},
		{
			name: "tiger_eye_gem",
			colorMap: tiger_eye_gem[0],
			normalMap: tiger_eye_gem[1],
			roughnessMap: tiger_eye_gem[2],
			aoMap: tiger_eye_gem[3],
			height: tiger_eye_gem[4],
		},
	];

	return (
		<>
			<mesh
				rotation={[-Math.PI / 2, 0, 0]}
				receiveShadow
				position={[0, -0.35, 0]}
			>
				<planeGeometry args={[10, 10, 2, 2]} />
				<meshStandardMaterial
					map={colorMap}
					displacementMap={height}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					aoMap={aoMap}
				/>
			</mesh>
			<>
				{spheres.map((sphere) => {
					return (
						<sphere.mesh
							key={sphere.body.id}
							body={sphere.body}
							randomScale={sphere.randomScale}
							material={materials[sphere.materialIndex]}
						/>
					);
				})}
			</>
		</>
	);
}

export default function Scenario() {
	return (
		<>
			<Canvas camera={{ position: [1.5, 1.5, 1.5] }} shadows>
				<Suspense fallback={<Loader />}>
					<MapScenario />
				</Suspense>
				<OrbitControls target={[0, 0, 0]} enableDamping={false} />
				<Stats />
				<ambientLight args={[0xffffff, 3]} />
				<directionalLight castShadow position={[-4, 4, 2]} intensity={4} />
			</Canvas>
		</>
	);
}
