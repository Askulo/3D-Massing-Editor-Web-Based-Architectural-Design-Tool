import { Scene, MeshBuilder, Vector3, Color3, StandardMaterial, PointerEventTypes, AbstractMesh } from "@babylonjs/core";

export class BuildingManager {
    private scene: Scene;
    private buildingCount: number = 0;

    constructor(scene: Scene) {
        this.scene = scene;
        this.setupPointerObserver();
    }

    private setupPointerObserver() {
        // This listens for clicks in the 3D scene
        this.scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type === PointerEventTypes.POINTERTAP) {
                const pickInfo = pointerInfo.pickInfo;

                // Check if we actually hit something (ground or another building)
                if (pickInfo?.hit && pickInfo.pickedPoint) {
                    this.placeBuilding(pickInfo.pickedPoint, pickInfo.pickedMesh ?? undefined);
                }
            }
        });
    }

    private placeBuilding(point: Vector3, hitMesh?: AbstractMesh) {
    const width = 10;
    const depth = 10;
    const height = 3;

    // 1. Grid Snapping 
    const snappedX = Math.round(point.x);
    const snappedZ = Math.round(point.z);
    
    // 2. Vertical Stacking Logic
    let posY = 0;

    // Check if we hit a building mass instead of the ground 
    if (hitMesh && hitMesh.name !== "site") {
        // Use the bounding box to find the exact top Y coordinate
        const boundingInfo = hitMesh.getBoundingInfo();
        posY = boundingInfo.boundingBox.maximumWorld.y;
    }

    // 3. Create the Mesh
    const box = MeshBuilder.CreateBox(`building_${this.buildingCount++}`, {
        width: width,
        depth: depth,
        height: height
    }, this.scene);

    // 4. Pivot-Correct Positioning 
    // We lift the center of the box by half its height from the starting posY
    box.position = new Vector3(snappedX, posY + (height / 2), snappedZ);

    // Add a distinct muted color 
const colors = [
    new Color3(0.6, 0.5, 0.5),
    new Color3(0.5, 0.6, 0.5),
    new Color3(0.5, 0.5, 0.6),
    new Color3(0.6, 0.6, 0.5),
    new Color3(0.5, 0.6, 0.6)
];

const mat = new StandardMaterial(`mat_${this.buildingCount}`, this.scene);
mat.diffuseColor = colors[this.buildingCount % colors.length];

box.material = mat;
    

}
}