async page => {
 await page.setViewportSize({width:1200,height:630});
 await page.goto('http://127.0.0.1:3100/');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.constellationPicture').evaluateAll(async ns=>Promise.all(ns.map(n=>n.decode())));
 // Presentation-only rules for the static social preview. Production layout is unchanged.
 await page.addStyleTag({content:`.siteHeader,.skipLink{display:none!important}.orbitalPreview .cleanHero{padding:14px 0 0;height:630px}.orbitalPreview .constellationStage{height:330px}.orbitalPreview .constellationCopy{padding:14px 24px 0}.orbitalPreview .cleanHero h1{font-size:52px;line-height:1.03}.orbitalPreview .constellationCopy>a{display:none}.orbitalPreview .constellationCopy>p:nth-of-type(2){margin-top:16px}.orbitalPreview .constellationSlot--lowerLeft{top:180px}.orbitalPreview .constellationSlot--lowerRight{top:160px}.orbitalPreview .constellationSlot--small{top:240px;width:74px;height:74px}.orbitalPreview .constellationSlot--center{top:18px;width:212px;height:206px}`});
 await page.locator('.cleanHero').screenshot({path:'/private/tmp/vh-og-portfolio.png'});
 return {width:1200,height:630};
}
