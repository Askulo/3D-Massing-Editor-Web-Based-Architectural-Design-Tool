import './style.css' // Import your CSS for layout
import { SceneManager } from './SceneManager'

// 1. Get the canvas element from the HTML
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// 2. Safety check: make sure the canvas actually exists
if (canvas) {
    // 3. Initialize our 3D Scene
    new SceneManager(canvas);
} else {
    console.error("Canvas element 'renderCanvas' not found!");
}