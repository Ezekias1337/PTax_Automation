const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
//const options = new chrome.Options()

async function updatePropertyPOC(property, producingLeader, producer) {

    const propertyXPath = `//*[text()='${property}']`;



    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://ptax.ptaxsolution.com/Default.aspx");

    //await driver.manage().window().fullscreen();

    await driver.findElement(By.name("txtUserName")).sendKeys("fedwards");
    await driver
        .findElement(By.name("txtPassword"))
        .sendKeys("p@ssw0rd", Key.RETURN);

    //swap to iframe
    await driver.switchTo().frame(0);

    //swaps back to normal if needed for later
    /* await driver.switchTo().defaultContent(); */

    let checkBox = await driver.wait(
        until.elementLocated(By.name("CheckMyProperties"))
    );
    await driver.findElement(By.id("CheckMyProperties")).click();

    await driver
        .findElement(By.xpath("/html/body/form/div[4]/ul/li[24]/div/span[2]"))
        .click();
    /* "fmeMain" */


    let propertyToClick = await driver.wait(
        until.elementLocated(By.xpath(propertyXPath))
    );
    await propertyToClick.click();

    await driver.switchTo().defaultContent();
    // Store the web element
    const iframe = driver.findElement(By.css("#fmeMain"));
    // Switch to the frame
    await driver.switchTo().frame(iframe);


    let editPropertyButton = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[4]/table/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[2]/span/button"))
    );
    await editPropertyButton.click();


    let clientPOC = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[14]/table/tbody/tr[3]/td[2]/select/option[24]"))
    );
    await clientPOC.click();

    if (producingLeader === "Nick") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[18]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    } else if (producingLeader === "Tim") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[23]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    } else if (producingLeader === "Chelley") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[5]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    } else if (producingLeader === "Chelsea") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[6]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    }



    if (producer === "Chase") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[4]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    } else if (producer === "Justin") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[15]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    } else if (producer === "David") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[8]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    } else if (producer === "Jenn") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[13]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    }



    await driver.findElement(By.id("SaveButton")).click();

}

//updatePropertyPOC('The Globe','Tim','Justin');

async function dataEntryNYTaxBills(arrayOfParcels) {

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://ptax.ptaxsolution.com/Default.aspx");

    await driver.findElement(By.name("txtUserName")).sendKeys("fedwards");
    await driver
        .findElement(By.name("txtPassword"))
        .sendKeys("p@ssw0rd", Key.RETURN);

    //swap to iframe
    await driver.switchTo().frame(0);

    //swaps back to normal if needed for later
    /* await driver.switchTo().defaultContent(); */

    let checkBox = await driver.wait(
        until.elementLocated(By.name("CheckMyProperties"))
    );
    await driver.findElement(By.id("CheckMyProperties")).click();

    await driver
        .findElement(By.xpath("/html/body/form/div[4]/ul/li[24]/div/span[2]"))
        .click();
    /* "fmeMain" */

    let propertyToClick = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[4]/ul/li[24]/ul/li[266]/div/span[2]"))
    );
    await propertyToClick.click();

    for (const item of arrayOfParcels) {
        const parcelXPath = `//*[text()='${item + " (Pay by Electronic Funds Transfer)"}']`;
        const parcelToClick = await driver.wait(
            until.elementLocated(By.xpath(parcelXPath))
        );
        await parcelToClick.click();

        const taxBillDrivenTabXPath = `//*[text()='${"Tax Bill Driven"}']`;
        const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

        await driver.switchTo().defaultContent();
        // Store the web element
        const iframe = driver.findElement(By.css("#fmeMain"));
        // Switch to the frame
        await driver.switchTo().frame(iframe);

        const taxBillDrivenTabButtonToClick = await driver.wait(
            until.elementLocated(By.xpath(taxBillDrivenTabXPath))
        );
        await taxBillDrivenTabButtonToClick.click();

        const taxAssessmentButtonToClick = await driver.wait(
            until.elementLocated(By.xpath("/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a"))
        );
        await taxAssessmentButtonToClick.click();

        const desiredMilRateFloat = 0.107550;
        const desiredMilRateString = "0.107550";
        const milRateElement = await driver.wait(
            until.elementLocated(By.id("tbMillRate"))
        );
        const originalInstallmentElement = await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount2"))
        );
        const netAssedValueElement = await driver.wait(
            until.elementLocated(By.id("tbAssessedValueNet"))
        );
        const avTaxelement = await driver.wait(
            until.elementLocated(By.id("tbActualAVTax"))
        );

        const netAssedValueElementValueString = await netAssedValueElement.getAttribute("value");
        const netAssedValueElementValueStringCommasRemoved = netAssedValueElementValueString.replace(",", "")
        const netAssedValueElementValueInteger = parseFloat(netAssedValueElementValueStringCommasRemoved)


        const primitiveNewAmount = netAssedValueElementValueInteger * 0.107550;
        const newAVTaxAmount = ((primitiveNewAmount + Number.EPSILON) * 100) / 100;
        //const newAVTaxAmount = (netAssedValueElementValueInteger * 0.107550 * 100) / 100;
        const newAVTaxAmountString = newAVTaxAmount.toString();

        const originalInstallmentAmountString = await originalInstallmentElement.getAttribute("value");
        const originalInstallmentAmountStringCommasRemoved = originalInstallmentAmountString.replace(",", "")
        const originalInstallmentAmountStringDollarSignRemoved = originalInstallmentAmountStringCommasRemoved.split("").splice(1).join("");
        const originalInstallmentAmountNumber = parseFloat(originalInstallmentAmountStringDollarSignRemoved);

        const originalTotalAmountLiabilityString = await driver.findElement(By.id("tbTotalTaxLiability")).getAttribute("value");
        const originalTotalAmountLiabilityStringCommasRemoved = originalTotalAmountLiabilityString.replace(",", "")
        const originalTotalAmountLiabilityStringDollarSignRemoved = originalTotalAmountLiabilityStringCommasRemoved.split("").splice(1).join("");
        const originalTotalAmountLiabilityNumber = parseFloat(originalTotalAmountLiabilityStringDollarSignRemoved);

        const paymentAmountDifferencePerInstallment = (newAVTaxAmount - originalTotalAmountLiabilityNumber) / 2;
        const newInstallmentAmount = paymentAmountDifferencePerInstallment + originalInstallmentAmountNumber;
        const newInstallmentAmountString = newInstallmentAmount.toString();

        console.log("originalTotalAmountLiabilityNumber", originalTotalAmountLiabilityNumber)
        console.log("newAVTaxAmountString", newAVTaxAmountString)
        console.log("originalInstallmentAmountString", originalInstallmentAmountString)
        console.log("newInstallmentAmountString", newInstallmentAmountString)

        await driver.findElement(By.id("tbTotalTaxLiability")).sendKeys(Key.CONTROL, "a");
        await driver.findElement(By.id("tbTotalTaxLiability")).sendKeys(Key.DELETE);
        await driver.findElement(By.id("tbTotalTaxLiability")).sendKeys(newAVTaxAmountString);
        await driver.findElement(By.id("btnSaveLiability")).click();

        let nowExecute = false;

        function delayExecution() {
            for (let i = 0; i < 1000; i++) {
                let j = i;
                console.log(j)
                if(j === 999) {
                    nowExecute = true;
                }
            } 
        }

        delayExecution();

        await driver.wait(() => nowExecute === true, 30000)

        console.log("now entering text payment 3")

        await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount3"), 30000)
        ).sendKeys(Key.CONTROL, "a");
        await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount3"), 30000)
        ).sendKeys(Key.DELETE);
        await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount3"), 30000)
        ).sendKeys(newInstallmentAmountString);

        await driver.wait(
            until.elementLocated(By.id("tbBaseAmountTransmittal3"), 30000)
        ).sendKeys(Key.CONTROL, "a");
        await driver.wait(
            until.elementLocated(By.id("tbBaseAmountTransmittal3"), 30000)
        ).sendKeys(Key.DELETE);
        await driver.wait(
            until.elementLocated(By.id("tbBaseAmountTransmittal3"), 30000)
        ).sendKeys(newInstallmentAmountString);

        console.log("now entering text payment 4")

        await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount4"), 30000)
        ).sendKeys(Key.CONTROL, "a");
        await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount4"), 30000)
        ).sendKeys(Key.DELETE);
        await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount4"), 30000)
        ).sendKeys(newInstallmentAmountString);

        await driver.wait(
            until.elementLocated(By.id("tbBaseAmountTransmittal4"), 30000)
        ).sendKeys(Key.CONTROL, "a");
        await driver.wait(
            until.elementLocated(By.id("tbBaseAmountTransmittal4"), 30000)
        ).sendKeys(Key.DELETE);
        await driver.wait(
            until.elementLocated(By.id("tbBaseAmountTransmittal4"), 30000)
        ).sendKeys(newInstallmentAmountString);

        console.log("now saving payment information")

        await driver.wait(
            until.elementLocated(By.id("btnSaveALLPayment"), 30000)
        ).click();

        nowExecute = false;


        delayExecution();

        await driver.wait(() => nowExecute === true, 30000)

        await driver.switchTo().defaultContent();
        await driver.switchTo().frame(0);

    }
}

/* dataEntryNYTaxBills(['491-1201', '491-1202', '491-1203', '491-1204', '491-1206', '491-1207', '491-1208', '491-1209', '491-1210', '491-1211', '491-1212', '491-1213', '491-1214', '491-1215', '491-1217', '491-1218', '491-1219', '491-1220', '491-1221', '491-1222', '491-1223', '491-1224', '491-1225', '491-1226', '491-1227', '491-1229', '491-1231', '491-1232', '491-1233', '491-1234', '491-1235', '491-1236', '491-1238', '491-1239', '491-1241', '491-1243', '491-1244', '491-1245', '491-1246', '491-1247', '491-1248', '491-1249', '491-1250', '491-1251', '491-1255', '491-1257', '491-1258', '491-1259', '491-1260', '491-1261', '491-1262', '491-1263', '491-1267', '491-1269', '491-1270', '491-1271', '491-1272', '491-1273', '491-1274', '491-1275', '491-1277', '491-1278', '491-1279', '491-1280', '491-1281', '491-1282', '491-1283', '491-1284', '491-1285', '491-1286', '491-1287', '491-1289', '491-1290', '491-1291', '491-1292', '491-1293', '491-1294', '491-1295', '491-1296', '491-1297', '491-1298', '491-1299', '491-1300', '491-1301', '491-1302', '491-1303', '491-1304', '491-1305', '491-1306', '491-1307', '491-1308', '491-1309', '491-1310', '491-1311', '491-1317', '491-1318', '491-1319', '491-1320', '491-1321', '491-1322', '491-1323', '491-1327', '491-1328', '491-1329', '491-1330', '491-1331', '491-1332', '491-1333', '491-1334', '491-1335', '491-1337', '491-1338', '491-1339', '491-1340', '491-1342', '491-1343', '491-1344', '491-1345', '491-1346', '491-1347', '491-1348', '491-1351', '491-1352', '491-1353', '491-1354', '491-1355', '491-1356', '491-1357', '491-1360', '491-1361', '491-1363', '491-1365', '491-1366', '491-1367', '491-1368', '491-1369', '491-1372', '491-1373', '491-1375', '491-1376', '491-1377', '491-1378', '491-1379', '491-1380', '491-1381', '491-1382', '491-1385', '491-1387', '491-1388', '491-1389', '491-1390', '491-1391', '491-1392', '491-1393', '491-1394', '491-1397', '491-1399', '491-1401', '491-1402', '491-1403', '491-1404', '491-1405', '491-1408', '491-1409', '491-1411', '491-1413', '491-1416', '491-1417', '491-1421', '491-1423', '491-1424', '491-1425', '491-1426', '491-1429', '491-1430', '491-1435', '491-1437', '491-1440', '491-1441', '491-1445', '491-1447', '491-1451', '491-1452', '491-1453', '491-1454', '491-1459', '491-1462', '491-1464', '491-1465', '491-1466', '491-1468', '491-1471', '491-1474', '491-1476', '491-1477', '491-1478', '491-1480', '491-1481', '491-1485', '491-1486', '491-1487', '491-1488', '491-1489', '491-1491', '491-1492', '491-1493', '491-1496', '491-1497', '491-1498', '491-1501', '491-1503', '491-1504', '491-1507', '491-1508', '491-1509', '491-1510', '491-1511', '491-1512', '491-1513', '491-1514', '491-1515', '491-1516', '491-1517', '491-1518', '491-1520', '491-1521', '491-1522', '491-1523', '491-1524', '491-1525', '491-1526', '491-1527', '491-1528', '491-1531', '491-1532', '491-1533', '491-1534', '491-1536', '491-1537', '491-1538', '491-1539', '491-1543', '491-1544', '491-1545', '491-1546', '491-1547', '491-1548', '491-1549', '491-1550', '491-1551', '491-1553', '491-1555', '491-1556', '491-1557', '491-1558', '491-1560', '491-1561', '491-1562', '491-1563', '491-1564', '491-1568', '491-1569', '491-1570', '491-1574', '491-1575', '491-1576', '491-1580', '491-1581', '491-1582', '491-1583', '491-1584', '491-1585', '491-1586', '491-1587', '491-1589', '491-1590', '491-1591', '491-1592', '491-1593', '491-1594']) */
dataEntryNYTaxBills(['491-1229', '491-1231', '491-1232', '491-1233', '491-1234', '491-1235', '491-1236', '491-1238', '491-1239', '491-1241', '491-1243', '491-1244', '491-1245', '491-1246', '491-1247', '491-1248', '491-1249', '491-1250', '491-1251', '491-1255', '491-1257', '491-1258', '491-1259', '491-1260', '491-1261', '491-1262', '491-1263', '491-1267', '491-1269', '491-1270', '491-1271', '491-1272', '491-1273', '491-1302', '491-1303', '491-1304', '491-1305', '491-1306', '491-1307', '491-1308', '491-1309', '491-1310', '491-1311', '491-1317', '491-1318', '491-1319', '491-1320', '491-1321', '491-1322', '491-1323', '491-1327', '491-1328', '491-1329', '491-1330', '491-1331', '491-1332', '491-1333', '491-1334', '491-1335', '491-1337', '491-1338', '491-1339', '491-1340', '491-1342', '491-1343', '491-1344', '491-1345', '491-1346', '491-1347', '491-1348', '491-1351', '491-1352', '491-1353', '491-1354', '491-1355', '491-1356', '491-1357', '491-1360', '491-1361', '491-1363', '491-1365', '491-1366', '491-1367', '491-1368', '491-1369', '491-1372', '491-1373', '491-1375', '491-1376', '491-1377', '491-1378', '491-1379', '491-1380', '491-1381', '491-1382', '491-1385', '491-1387', '491-1388', '491-1389', '491-1390', '491-1391', '491-1392', '491-1393', '491-1394', '491-1397', '491-1399', '491-1401', '491-1402', '491-1403', '491-1404', '491-1405', '491-1408', '491-1409', '491-1411', '491-1413', '491-1416', '491-1417', '491-1421', '491-1423', '491-1424', '491-1425', '491-1426', '491-1429', '491-1430', '491-1435', '491-1437', '491-1440', '491-1441', '491-1445', '491-1447', '491-1451', '491-1452', '491-1453', '491-1454', '491-1459', '491-1462', '491-1464', '491-1465', '491-1466', '491-1468', '491-1471', '491-1474', '491-1476', '491-1477', '491-1478', '491-1480', '491-1481', '491-1485', '491-1486', '491-1487', '491-1488', '491-1489', '491-1491'])
