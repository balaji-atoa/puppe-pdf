import { BrowserConnectOptions, GoToOptions, LaunchOptions, LowerCasePaperFormat, PaperFormat, PDFOptions, Viewport, WaitForSelectorOptions } from "puppeteer";
import type {Readable} from "stream"
declare namespace PuppePdf{
  function forgePDF(otps: UrlOptions | string):Promise<Buffer | Readable | Uint8Array>
  interface PDFOptions {
    format?: PaperFormat | string
  }
  type CustomBrowserLaunchArgumentOptions = {
    /**
     * Additional command line arguments to pass to the browser instance.
     */
    args: string[],
    /**
     * Specify the debugging port number to use
     */
    debuggingPort: number,
  }
  type launchOpts = LaunchOptions | BrowserConnectOptions | CustomBrowserLaunchArgumentOptions
  interface UrlOptions {
    /** 
     * the url which needs to be visited.
    */
    url?: string;
    html?: string;
    /**
     * The options passed to the browser during puppeteer browser launch.
     */
    launchOpts?: launchOpts;
    viewPort?: Viewport;
    failOnPageError?: boolean;
    goToOptions?: GoToOptions;
    selectorToWait?: string;
    waitForSelectorOpts?: WaitForSelectorOptions;
    pdfOpts?: PDFOptions
    saveToFile?: boolean;
    raw?: boolean;
    stream?: boolean;
    disableJavascript?: boolean;
  }
}
export = PuppePdf;