const htmlPdf = require ('html-pdf-chrome');
const colors = require('colors');


const printPageToPDF = async (driver, outputFilename) => {
  const DEFAULT_PRINT_PATH =
    'C:/Users/frank.edwards/Desktop/Tax_Bills_Check Requests_And_Assessment_Notices/Assessment_Notices';
  console.log ('Getting the html...');
  const sourceHTML = await driver
    .findElement (By.css ('body'))
    .getAttribute ('innerHTML');
  //let sourceHTML = await driver.getSource();

  console.log ('Printing the html using Chrome...');
  let pdf = await htmlPdf.create (sourceHTML);

  console.log ('Saving the PDF to ' + outputFilename + '...');
  await pdf.toFile (`${DEFAULT_PRINT_PATH} ${outputFilename}`);
  console.log ('File saved!');
};

module.exports = printPageToPDF;