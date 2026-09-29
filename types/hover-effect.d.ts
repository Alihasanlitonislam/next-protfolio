declare module 'hover-effect' {
  interface HoverEffectOptions {
    parent: HTMLElement;
    intensity?: number;
    image1: string;
    image2: string;
    displacementImage: string;
    speedIn?: number;
    speedOut?: number;
    easing?: any;
    angle?: number;
    imagesRatio?: number;
    hover?: boolean;
  }

  export default class HoverEffect {
    destroy() {
      throw new Error("Method not implemented.");
    }
    constructor(options: HoverEffectOptions);
  }
}
