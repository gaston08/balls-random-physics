const hitSound = new Audio("/sounds/hit.mp3");
import * as CANNON from "cannon-es";

export const defaultMaterial = new CANNON.Material("default");
export const defaultContactMaterial = new CANNON.ContactMaterial(
	defaultMaterial,
	defaultMaterial,
	{
		friction: 0.8,
		restitution: 0.5,
	},
);

export const playSound = (collision) => {
	const impactStrength = collision.contact.getImpactVelocityAlongNormal();

	let volume = (impactStrength * collision.target.mass) / 10;
	if (volume > 1) {
		volume = 1;
	} else if (volume < 0) {
		volume = 0;
	}
	hitSound.volume = volume;
	hitSound.currentTime = 0;
	hitSound.play();
};

export const createWorld = () => {
	// physic world
	// Setup our physics world
	const myworld = new CANNON.World({
		gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
	});

	myworld.allowSleep = true;
	myworld.broadphase = new CANNON.SAPBroadphase(myworld);

	myworld.defaultContactMaterial = defaultContactMaterial;

	// Create a static plane for the ground
	const groundBody = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
	myworld.addBody(groundBody);

	// add walls

	// walls1
	const walls1 = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	walls1.quaternion.setFromEuler(0, Math.PI, 0);
	walls1.position.x = 0;
	walls1.position.y = 0;
	walls1.position.z = 5;
	myworld.addBody(walls1);

	// walls2
	const walls2 = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	walls2.quaternion.setFromEuler(0, 0, -Math.PI / 2);
	walls2.position.x = 0;
	walls2.position.y = 0;
	walls2.position.z = -5;
	myworld.addBody(walls2);

	// walls3
	const walls3 = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	walls3.quaternion.setFromEuler(0, Math.PI / 2, 0);
	walls3.position.x = -5;
	walls3.position.y = 0;
	walls3.position.z = 0;
	myworld.addBody(walls3);

	// walls4
	const walls4 = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	walls4.quaternion.setFromEuler(0, -Math.PI / 2, 0);
	walls4.position.x = 5;
	walls4.position.y = 0;
	walls4.position.z = 0;
	myworld.addBody(walls4);

	return myworld;
};

export const getSphere = () => {
	let randomScale = getRandomArbitrary(0.1, 0.3);

	const body = new CANNON.Body({
		mass: randomScale,
		shape: new CANNON.Sphere(randomScale),
		material: defaultMaterial,
		position: new CANNON.Vec3(
			getRandomArbitrary(-1, 1),
			3,
			getRandomArbitrary(-1, 1),
		),
	});
	body.allowSleep = true;

	body.addEventListener("collide", playSound);
	return { body, randomScale };
};

export const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
};
