import './style.css';
import { SceneManager } from './SceneManager';
import { BuildingManager } from './BuildingManager';

// Wait for the window to load to ensure the canvas is available
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

    if (canvas) {
        // 1. Initialize the 3D Scene (Requirement 01)
        const sceneController = new SceneManager(canvas);

        // 2. Initialize Building Logic (Requirement 02)
        // We pass the scene from SceneManager to the BuildingManager
        new BuildingManager(sceneController.scene);
        
        console.log("SpaceSync Massing Editor Initialized 🏗️");
    } else {
        console.error("Could not find canvas element with ID 'renderCanvas'");
    }
});