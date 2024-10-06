declare module "react-quill" {
  import { Component } from "react";

  interface QuillOptions {
    theme?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    readOnly?: boolean;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
  }

  class Quill extends Component<QuillOptions> {}
  export { Quill };
  export default Quill;
}

// custom.d.ts
declare module "react-quill";
declare module "quill-image-resize-module-react";
