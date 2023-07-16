import SubtitlesOctopus from "libass-wasm";
import workerUrl from "libass-wasm/dist/js/subtitles-octopus-worker.js?url";
import legacyWorkerUrl from "libass-wasm/dist/js/subtitles-octopus-worker-legacy.js?url";
import "libass-wasm/dist/js/subtitles-octopus-worker.wasm?url";

function main() {
  const testCanvas = document.getElementById("test-canvas") as HTMLCanvasElement;

  if (!testCanvas) {
    throw new Error("Canvas not found");
  }

  const renderer = new SubtitlesOctopus({
    canvas: testCanvas, // HTML5 video element
    subUrl: "/libass-wasm-vite-example/test.ass", // Link to subtitles
    fallbackFont: "/libass-wasm-vite-example/Arial.woff2",
    workerUrl,
    legacyWorkerUrl,
  });

  renderer.setCurrentTime(0);
}

main();
