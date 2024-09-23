import { GoToOptions, PDFOptions, Viewport, WaitForSelectorOptions } from "puppeteer";

declare function convertWebsiteToPdf(otps: string | puppePdf.UrlOptions):Promise<Buffer> {}

declare namespace puppePdf{
  declare interface UrlOptions {
    url: string,
    slowMo?: number | undefined,
    viewPort?: Viewport,
    failOnPageError?: boolean,
    goToOptions?: GoToOptions
    selectorToWait?: string,
    waitForSelectorOpts?: WaitForSelectorOptions,
    pdfOpts?: PDFOptions,
    saveToFile?: boolean
  }
}

export = puppePdf