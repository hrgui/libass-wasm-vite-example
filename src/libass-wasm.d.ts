declare module "libass-wasm" {
  interface OptionsBase {
    /**
     * The video element to attach listeners to
     */
    video?: HTMLVideoElement;

    /**
     * The canvas to render the subtitles to.
     * If none is given it will create a new canvas and insert it as a sibling of the video element (only if the video element exists)
     */
    canvas?: HTMLCanvasElement;

    /**
     * The URL of the worker
     * @default `subtitles-octopus-worker.js`
     */
    workerUrl?: string;

    /**
     * The URL of the legacy worker
     * @default `subtitles-octopus-worker-legacy.js`
     */
    legacyWorkerUrl?: string;

    /**
     * An array of links to the fonts used in the subtitle
     */
    fonts?: string[];

    /**
     * Object with all available fonts - Key is font name in lower case, value is link
     *
     * @example `{"arial": "/font1.ttf"}`
     */
    availableFonts?: Record<string, string>;

    /**
     * URL to override fallback font, for example, with a CJK one.
     * @default "Liberation Sans"
     */
    fallbackFont?: string;

    /**
     * The amount of time the subtitles should be offset from the video
     *
     * @default 0
     */
    timeOffset?: number;

    /**
     * Whether performance info is printed in the console
     *
     * @default false
     */
    debug?: boolean;

    /**
     * Function that's called when SubtitlesOctopus is ready
     */
    onReady?: () => void;

    /**
     * Function called in case of critical error meaning the subtitles wouldn't be shown
     * and you should use an alternative method (for instance it occurs if browser doesn't support web workers)
     */
    onError?: () => void;

    /**
     * Rendering mode. (If not set, the deprecated option lossyRender is evaluated)
     * js-blend - JS Blending
     * wasm-blend - WASM Blending, currently the default
     * lossy - Lossy Render Mode (EXPERIMENTAL)
     */
    renderMode?: "js-blend" | "wasm-blend" | "lossy";

    /**
     * Target FPS
     *
     * @default 24
     */
    targetFps?: number;

    /**
     * libass bitmap cache memory limit in MiB (approximate)
     * @default 0 - no limit
     */
    libassMemoryLimit?: number;

    /**
     * libass glyph cache memory limit in MiB (approximate)
     * @default 0 - no limit
     */
    libassGlyphLimit?: number;

    /**
     * Scale down (< 1.0) the subtitles canvas to improve performance at the expense of quality, or scale it up (> 1.0).
     * @default 1 no scaling - must be a number > 0
     */
    prescaleFactor?: number;

    /**
     * The height beyond which the subtitles canvas won't be prescaled.
     * @default 1080
     */
    prescaleHeightLimit?: number;

    /**
     * The maximum rendering height of the subtitles canvas. Beyond this subtitles will be upscaled by the browser.
     * @default 0 - no limit
     */
    maxRenderHeight?: number;

    /**
     *  If set to true, attempt to discard all animated tags. Enabling this may severly mangle complex subtitles and should only be considered as an last ditch effort of uncertain success for hardware otherwise incapable of displaing anything. Will not reliably work with manually edited or allocated events.
     * @default false - do nothing
     */
    dropAllAnimations?: boolean;

    /**
     * Enable Fast Render Mode (Lossy)
     *
     * This is experimental feature
     *
     * @default false
     * @see https://github.com/libass/JavascriptSubtitlesOctopus#fast-render-mode-lossy-experimental
     */
    lossyRender?: boolean;
  }

  interface OptionsWithSubUrl extends OptionsBase {
    /** The URL of the subtitle file to play. (Require either subUrl or subContent to be specified) */
    subUrl: string;
  }

  interface OptionsWithSubContent extends OptionsBase {
    /** The content of the subtitle file to play. (Require either subContent or subUrl to be specified) */
    subContent: string;
  }

  export type Options = OptionsWithSubUrl | OptionsWithSubContent;

  declare class SubtitlesOctopus {
    constructor(options: Options);

    /**
     * Render subtitles at specified time
     * @param time
     */
    setCurrentTime(time: number): void;

    /**
     * Works the same as the {@link subUrl} option. It will set the subtitle to display by its URL.
     * @param url
     */
    setTrackByUrl(url: string): void;

    /**
     * Works the same as the {@link subContent} option. It will set the subtitle to display by its content.
     * @param content
     */
    setTrack(content: string): void;

    /**
     * This simply removes the subtitles.
     * You can use {@link setTrackByUrl} or {@link setTrack} methods to set a new subtitle file to be displayed.
     */
    freeTrack(): void;

    /**
     * Destroy instance
     */
    dispose(): void;
  }

  export default SubtitlesOctopus;
}
