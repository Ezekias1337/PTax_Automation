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
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    //await driver.switchTo().newWindow('tab');
    const nyTaxBillWebsite = await driver.getWindowHandle();
    await driver.get("https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop");
    await driver
        .findElement(By.id("btAgree"))
        .click();
    await driver.switchTo().newWindow('tab');
    const ptaxWindow = await driver.getWindowHandle();
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
    // Opens a new tab and switches to new tab


    for (const item of arrayOfParcels) {

        //NEED TO UNCOMMENT THIS AFTER SORTING THROUGH CORRECT PARCELS TO FIX

        /* const parcelXPath = `//*[text()='${item + " (Pay by Electronic Funds Transfer)"}']`;
        const parcelToClick = await driver.wait(
            until.elementLocated(By.xpath(parcelXPath))
        );
        await parcelToClick.click();*/
        const taxBillDrivenTabXPath = `//*[text()='${"Tax Bill Driven"}']`;
        //const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

        await driver.switchTo().window(nyTaxBillWebsite);

        const boroughNumber = item.split("-")[0];
        const blockNumber = item.split("-")[1];
        const lotNumber = item.split("-")[2];

        if (boroughNumber === "1") {
            await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]"))
            ).click();
        } else if (boroughNumber === "2") {
            await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]"))
            ).click();
        } else if (boroughNumber === "3") {
            await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]"))
            ).click();
        } else if (boroughNumber === "4") {
            await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]"))
            ).click();
        } else if (boroughNumber === "5") {
            await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]"))
            ).click();
        }

        await driver.wait(
            until.elementLocated(By.id("inpTag"))
        ).sendKeys(blockNumber)

        await driver.wait(
            until.elementLocated(By.id("inpStat"))
        ).sendKeys(lotNumber)

        await driver.wait(
            until.elementLocated(By.id("btSearch"))
        ).click()

        const taxBillDrivenTabButtonToClick = await driver.wait(
            until.elementLocated(By.xpath(taxBillDrivenTabXPath))
        );
        await taxBillDrivenTabButtonToClick.click();

        const taxAssessmentButtonToClick = await driver.wait(
            until.elementLocated(By.xpath("/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a"))
        );
        await taxAssessmentButtonToClick.click();

        /* const originalInstallmentElement = await driver.wait(
            until.elementLocated(By.id("tbBasePaymentAmount2"))
        ); */


        //driver.wait(until.urlContains("Index"))

        console.log("Reached this part successfully")

        // Click account history tab
        const accountHistoryTab = await driver.wait(
            until.elementLocated(By.css("#sidemenu > ul > li:nth-child(3) > a > span"))
        )
        //console.log("accountHistoryTab", accountHistoryTab)

        accountHistoryTab.click();


        const payment3PulledFromNYSiteString = await driver.wait(
            until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]"))
        ).getAttribute("innerText");
        const payment4PulledFromNYSiteString = await driver.wait(
            until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]"))
        ).getAttribute("innerText");


        /* 
            Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
        */

        // Go back two pages to get tab ready for next parcel
        await driver.navigate().back();
        await driver.navigate().back();


        await driver.switchTo().window(ptaxWindow);
        await driver.switchTo().defaultContent();
        const iframe = driver.findElement(By.css("#fmeMain"));
        await driver.switchTo().frame(iframe);


        await driver.switchTo().defaultContent();
        await driver.switchTo().frame(0);

    }
}

/* dataEntryNYTaxBills(['491-1201', '491-1202', '491-1203', '491-1204', '491-1206', '491-1207', '491-1208', '491-1209', '491-1210', '491-1211', '491-1212', '491-1213', '491-1214', '491-1215', '491-1217', '491-1218', '491-1219', '491-1220', '491-1221', '491-1222', '491-1223', '491-1224', '491-1225', '491-1226', '491-1227', '491-1229', '491-1231', '491-1232', '491-1233', '491-1234', '491-1235', '491-1236', '491-1238', '491-1239', '491-1241', '491-1243', '491-1244', '491-1245', '491-1246', '491-1247', '491-1248', '491-1249', '491-1250', '491-1251', '491-1255', '491-1257', '491-1258', '491-1259', '491-1260', '491-1261', '491-1262', '491-1263', '491-1267', '491-1269', '491-1270', '491-1271', '491-1272', '491-1273', '491-1274', '491-1275', '491-1277', '491-1278', '491-1279', '491-1280', '491-1281', '491-1282', '491-1283', '491-1284', '491-1285', '491-1286', '491-1287', '491-1289', '491-1290', '491-1291', '491-1292', '491-1293', '491-1294', '491-1295', '491-1296', '491-1297', '491-1298', '491-1299', '491-1300', '491-1301', '491-1302', '491-1303', '491-1304', '491-1305', '491-1306', '491-1307', '491-1308', '491-1309', '491-1310', '491-1311', '491-1317', '491-1318', '491-1319', '491-1320', '491-1321', '491-1322', '491-1323', '491-1327', '491-1328', '491-1329', '491-1330', '491-1331', '491-1332', '491-1333', '491-1334', '491-1335', '491-1337', '491-1338', '491-1339', '491-1340', '491-1342', '491-1343', '491-1344', '491-1345', '491-1346', '491-1347', '491-1348', '491-1351', '491-1352', '491-1353', '491-1354', '491-1355', '491-1356', '491-1357', '491-1360', '491-1361', '491-1363', '491-1365', '491-1366', '491-1367', '491-1368', '491-1369', '491-1372', '491-1373', '491-1375', '491-1376', '491-1377', '491-1378', '491-1379', '491-1380', '491-1381', '491-1382', '491-1385', '491-1387', '491-1388', '491-1389', '491-1390', '491-1391', '491-1392', '491-1393', '491-1394', '491-1397', '491-1399', '491-1401', '491-1402', '491-1403', '491-1404', '491-1405', '491-1408', '491-1409', '491-1411', '491-1413', '491-1416', '491-1417', '491-1421', '491-1423', '491-1424', '491-1425', '491-1426', '491-1429', '491-1430', '491-1435', '491-1437', '491-1440', '491-1441', '491-1445', '491-1447', '491-1451', '491-1452', '491-1453', '491-1454', '491-1459', '491-1462', '491-1464', '491-1465', '491-1466', '491-1468', '491-1471', '491-1474', '491-1476', '491-1477', '491-1478', '491-1480', '491-1481', '491-1485', '491-1486', '491-1487', '491-1488', '491-1489', '491-1491', '491-1492', '491-1493', '491-1496', '491-1497', '491-1498', '491-1501', '491-1503', '491-1504', '491-1507', '491-1508', '491-1509', '491-1510', '491-1511', '491-1512', '491-1513', '491-1514', '491-1515', '491-1516', '491-1517', '491-1518', '491-1520', '491-1521', '491-1522', '491-1523', '491-1524', '491-1525', '491-1526', '491-1527', '491-1528', '491-1531', '491-1532', '491-1533', '491-1534', '491-1536', '491-1537', '491-1538', '491-1539', '491-1543', '491-1544', '491-1545', '491-1546', '491-1547', '491-1548', '491-1549', '491-1550', '491-1551', '491-1553', '491-1555', '491-1556', '491-1557', '491-1558', '491-1560', '491-1561', '491-1562', '491-1563', '491-1564', '491-1568', '491-1569', '491-1570', '491-1574', '491-1575', '491-1576', '491-1580', '491-1581', '491-1582', '491-1583', '491-1584', '491-1585', '491-1586', '491-1587', '491-1589', '491-1590', '491-1591', '491-1592', '491-1593', '491-1594']) */
dataEntryNYTaxBills(['1-1028-42', '1-1260-1301', '1-1260-1302', '1-1272-1201', '1-1289-1001', '1-1292-1304', '1-1292-1305', '1-1292-1306', '1-1292-1312', '1-1292-1313', '1-1292-1314', '1-1292-1315', '1-1292-1317', '1-1292-1323', '1-1292-1332', '1-1292-1342', '1-1292-1359', '1-1292-1361', '1-1292-1434', '1-1292-1435', '1-491-1227', '1-491-1229', '1-491-1231', '1-491-1232', '1-491-1233', '1-491-1234', '1-491-1235', '1-491-1236', '1-491-1238', '1-491-1239', '1-491-1241', '1-491-1243', '1-491-1244', '1-491-1245', '1-491-1246', '1-491-1247', '1-491-1248', '1-491-1249', '1-491-1250', '1-491-1251', '1-491-1255', '1-491-1257', '1-491-1258', '1-491-1259', '1-491-1260', '1-491-1261', '1-491-1262', '1-491-1263', '1-491-1267', '1-491-1269', '1-491-1270', '1-491-1271', '1-491-1272', '1-491-1273', '1-491-1302', '1-491-1303', '1-491-1304', '1-491-1305', '1-491-1306', '1-491-1307', '1-491-1308', '1-491-1309', '1-491-1310', '1-491-1311', '1-491-1317', '1-491-1318', '1-491-1319', '1-491-1320', '1-491-1321', '1-491-1322', '1-491-1323', '1-491-1327', '1-491-1328', '1-491-1329', '1-491-1330', '1-491-1331', '1-491-1332', '1-491-1333', '1-491-1334', '1-491-1335', '1-491-1337', '1-491-1338', '1-491-1339', '1-491-1340', '1-491-1342', '1-491-1343', '1-491-1344', '1-491-1345', '1-491-1346', '1-491-1347', '1-491-1348', '1-491-1351', '1-491-1352', '1-491-1353', '1-491-1354', '1-491-1355', '1-491-1356', '1-491-1357', '1-491-1360', '1-491-1361', '1-491-1363', '1-491-1365', '1-491-1366', '1-491-1367', '1-491-1368', '1-491-1369', '1-491-1372', '1-491-1373', '1-491-1375', '1-491-1376', '1-491-1377', '1-491-1378', '1-491-1379', '1-491-1380', '1-491-1381', '1-491-1382', '1-491-1385', '1-491-1387', '1-491-1388', '1-491-1389', '1-491-1390', '1-491-1391', '1-491-1392', '1-491-1393', '1-491-1394', '1-491-1397', '1-491-1399', '1-491-1401', '1-491-1402', '1-491-1403', '1-491-1404', '1-491-1405', '1-491-1408', '1-491-1409', '1-491-1411', '1-491-1413', '1-491-1416', '1-491-1417', '1-491-1421', '1-491-1423', '1-491-1424', '1-491-1425', '1-491-1426', '1-491-1429', '1-491-1430', '1-491-1435', '1-491-1437', '1-491-1440', '1-491-1441', '1-491-1445', '1-491-1447', '1-491-1451', '1-491-1452', '1-491-1453', '1-491-1454', '1-491-1459', '1-491-1462', '1-491-1464', '1-491-1465', '1-491-1466', '1-491-1468', '1-491-1471', '1-491-1474', '1-491-1476', '1-491-1477', '1-491-1478', '1-491-1480', '1-491-1481', '1-491-1485', '1-491-1486', '1-491-1487', '1-491-1488', '1-491-1489', '1-491-1491', '3-1190-1101', '3-1190-1103', '3-1190-1104', '3-1190-1106', '3-1190-1107', '3-1190-1111', '3-1190-1112', '3-1190-1113', '3-1190-1114', '3-1190-1116', '3-1190-1117', '3-1190-1119', '3-1190-1120', '3-1190-1122', '3-1190-1124', '3-1190-1125', '3-1190-1132', '3-1190-1136', '3-1190-1139', '3-1190-1140', '3-1190-1141', '3-1190-1142', '3-1190-1143', '3-1190-1145', '3-1190-1146', '3-1190-1148', '3-1190-1152', '3-1190-1153', '3-1190-1154', '3-1190-1157', '3-1190-1158', '3-1190-1159', '3-1190-1160', '3-1190-1161', '3-1190-1162', '3-1190-1164', '3-1190-1165', '3-1190-1167', '3-1190-1168', '3-1190-1169', '3-1190-1170', '3-1190-1171', '3-1190-1173', '3-1190-1174', '3-1190-1175', '3-1190-1176', '3-1190-1177', '3-1190-1178', '3-1190-1179', '3-1190-1180', '3-1190-1181', '3-1190-1183', '3-1190-1186', '3-1190-1187', '3-1190-1188', '3-1190-1189', '3-1190-1190', '3-1190-1192', '3-1190-1193', '3-1190-1194', '3-1190-1195', '3-1190-1196', '3-1190-1197', '3-1190-1198', '3-1190-1199', '3-1190-1200', '3-1190-1202', '3-1190-1203', '3-1190-1204', '3-1190-1205', '3-1190-1206', '3-1190-1208', '3-1190-1209', '3-1190-1210', '3-1190-1211', '3-1190-1212', '3-1190-1213', '3-1190-1215', '3-1190-1216', '3-1190-1218', '3-1190-1219', '3-1190-1220', '3-1190-1221', '3-1190-1222', '3-1190-1223', '3-1190-1225', '3-1190-1226', '3-1190-1227', '3-1190-1228', '3-1190-1229', '3-1190-1230', '3-1190-1231', '3-1190-1232', '3-1190-1234', '3-1190-1235', '3-1190-1236', '3-1190-1237', '3-1190-1238', '3-1190-1239', '3-1190-1240', '3-1190-1241', '3-1190-1242', '3-1190-1243', '3-1190-1244', '3-1190-1245', '3-1190-1246', '3-1190-1247', '3-1190-1248', '3-1190-1249', '3-1190-1250', '3-1190-1251', '3-1190-1252', '3-1190-1253', '3-1190-1254', '3-1190-1255', '3-1190-1256', '3-1190-1257', '3-1190-1258', '3-1190-1259', '3-1190-1260', '3-1190-1261', '3-1190-1262', '3-1190-1263', '3-1190-1264', '5-2400-140', '5-2400-150', '5-2400-180', '5-2400-185', '5-2400-199', '5-2400-200', '5-2400-211', '5-2400-300', '5-2400-375'])
