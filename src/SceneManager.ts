import { 
    Engine, 
    Scene, 
    ArcRotateCamera, 
    Vector3, 
    HemisphericLight, 
    DirectionalLight, 
    MeshBuilder, 
    Color3,
    ShadowGenerator,
    AxesViewer
} from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";

export class SceneManager {
    private engine: Engine;
    public scene: Scene;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);

        this.initScene();
        this.startRenderLoop();
    }

    private initScene() {
    // 1. Camera - Set to our 45-degree angle
    const camera = new ArcRotateCamera(
        "mainCamera", 
        -Math.PI / 2, 
        Math.PI / 4, // Your chosen Beta value!
        50, 
        Vector3.Zero(), 
        this.scene
    );
    camera.attachControl(this.canvas, true);

    // 2. Light - Directional light for shadows later
    const light = new DirectionalLight("sun", new Vector3(-1, -2, -1), this.scene);
    light.position = new Vector3(20, 40, 20);

    // 3. Ground & Grid
    const ground = MeshBuilder.CreateGround("site", { width: 50, height: 40 }, this.scene);
    
    // Create the 1m grid material
    const grid = new GridMaterial("gridMaterial", this.scene);
    grid.gridRatio = 1; // Lines every 1 meter
    grid.mainColor = new Color3(0.1, 0.1, 0.1); // Dark background
    grid.lineColor = new Color3(0.3, 0.3, 0.3); // Gray lines
    
    ground.material = grid;

    // 4. Axis Helper (Red=X, Green=Y, Blue=Z)
    // This helps orient the user in 3D space
    new AxesViewer(this.scene, 5); 
}

    private startRenderLoop(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // Handle window resize
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        
    }
}