import { BrowserConnectOptions, GoToOptions, LaunchOptions, PDFOptions, Viewport, WaitForSelectorOptions } from "puppeteer";

declare namespace puppePdf{
  declare function convertWebsiteToPdf(otps: string | puppePdf.UrlOptions):Promise<Buffer> {}
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
  declare interface UrlOptions {
    /** 
     * the url which needs to be visited
    */
    url: string,
    /**
     * Delay the execution of puppeteer operations on the browser window by specified milliseconds.
     */
    slowMo?: number | undefined,
    launchOpts?: launchOpts,
    viewPort?: Viewport,
    failOnPageError?: boolean,
    goToOptions?: GoToOptions
    selectorToWait?: string,
    waitForSelectorOpts?: WaitForSelectorOptions,
    pdfOpts?: PDFOptions,
    saveToFile?: boolean,
    raw?: boolean,
    stream?: boolean,
    disableJavascript?: boolean
  }
}

export = puppePdf