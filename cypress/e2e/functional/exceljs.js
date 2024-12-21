// EXECUTE THIS FILE WITH:  node exceljs.js
// GO TO THE PATH: C:\Users\zeapa\Repository\Cypress\CypressAutomation1\cypress/e2e/functional> node exceljs.js
const ExcelJS = require('exceljs');				//Top in the file


//Method 1
// const workbook = new ExcelJS.Workbook();
// const pathFileName = 'C:\\Users\\zeapa\\Repository\\Cypress\\CypressAutomation1\\cypress\\downloads\\order-invoice1_zeapaez.xlsx'
// workbook.xlsx.readFile(pathFileName).then(function(){
// 	const worksheet = workbook.getWorksheet('data')  
// 	worksheet.eachRow((row,rowNumber)=>{
// 		row.eachCell((cell,colNumber)=>{
// 			console.log(cell.value)
// 		})
// 	})
// })

//Method 2
async function readExcelTest() {
    const workbook = new ExcelJS.Workbook();
    //const pathFileName = 'C:\\Users\\zeapa\\Repository\\Cypress\\CypressAutomation1\\cypress\\downloads\\order-invoice1_zeapaez.xlsx'
    const pathFileName = 'C:/Users/zeapa/Repository/Cypress/CypressAutomation1/cypress/downloads/order-invoice1_zeapaez.xlsx'
    await workbook.xlsx.readFile(pathFileName)
    const worksheet = workbook.getWorksheet('data')
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {            //Scan all the document
            console.log(rowNumber)
            console.log(colNumber)
            if (cell.value == 'ADIDAS ORIGINAL') {
                console.log(cell.value)
                console.log(rowNumber)      //2 - row
                console.log(colNumber)      //2 - column
            }
            if (cell.value == 'India' || cell.value == 'Pakistan') {
                console.log(cell.value)
                console.log(rowNumber)      //2 - row
                console.log(colNumber)      //5 - column
            }
            if (cell.value == 'Puma shoes for Men') {
                console.log(cell.value)
                console.log(rowNumber)      // 4 - row
                console.log(colNumber)      // 3 - column
            }
            if (cell.value == 'Mexico') {
                console.log(cell.value)
                console.log(rowNumber)      // 5 - row
                console.log(colNumber)      // 5 - column
            }

        })
    })
}
//readExcelTest()


async function readExcelByCellTest() {
    const workbook = new ExcelJS.Workbook();
    //const pathFileName = 'C:\\Users\\zeapa\\Repository\\Cypress\\CypressAutomation1\\cypress\\downloads\\order-invoice1_zeapaez.xlsx'
    const pathFileName = 'C:/Users/zeapa/Repository/Cypress/CypressAutomation1/cypress/downloads/order-invoice1_zeapaez.xlsx'
    await workbook.xlsx.readFile(pathFileName)
    const worksheet = workbook.getWorksheet('data')

    let cell = worksheet.getCell(5, 5)
    console.log(cell.value)  // Mexico

    cell = worksheet.getCell(4, 3)
    console.log(cell.value)  // Puma shoes for Men
}
//readExcelByCellTest()

async function writeExcelByCellTest() {
    let output = { row: -1, column: -1 }
    const workbook = new ExcelJS.Workbook();
    const pathFileName = 'C:/Users/zeapa/Repository/Cypress/CypressAutomation1/cypress/downloads/order-invoice1_zeapaez.xlsx'
    await workbook.xlsx.readFile(pathFileName)
    const worksheet = workbook.getWorksheet('data')
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value == 'India' || cell.value == 'Pakistan') {  // Value to Change
                output.row = rowNumber          //2 - row
                output.column = colNumber       //5 - column
            }
        })
    })

    let cell = worksheet.getCell(output.row, output.column)
    let newValue =''
    if (cell.value == 'India') { newValue = "Pakistan" } // If the value is India the new value will be Pakistan
    if (cell.value == 'Pakistan') { newValue = "India" } // If the value is Pakistan the new value will be India
    cell.value = newValue
    await workbook.xlsx.writeFile(pathFileName) // Write/Set the new value 
    cell = worksheet.getCell(output.row, output.column)
    console.log(cell.value)     // Current value

    //// Reset value with this code
    // cell = worksheet.getCell(2, 5)
    // cell.value = "India"     // Set new value: India
    // await workbook.xlsx.writeFile(pathFileName) // Write/Set the new value
    // console.log(cell.value)      // Current value: India
}
writeExcelByCellTest()