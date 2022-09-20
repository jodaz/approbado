import pug from 'pug'
import puppeteer from 'puppeteer-core'
import { PUPPETEER_BROWSER_PATH } from './env'

/**
 *
 * @param {object} compilerParams: parameters passed for the compiler
 * @param {string} templatePath: template file path
 * @param {string} pdfFilePath: pdf file path
 * @returns
 */
export const PDF = async (compilerParams, templatePath, pdfFilePath) => {
    const compiledFunction = pug.compileFile(templatePath);

    const compiledContent = compiledFunction(compilerParams);

    const browser = await puppeteer.launch({
        executablePath: PUPPETEER_BROWSER_PATH
    })

    const page = await browser.newPage()
    await page.setContent(compiledContent)

    await page.pdf({ path: pdfFilePath, format: 'a4' });

    return true;
}
