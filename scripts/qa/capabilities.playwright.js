async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3100/test');await page.emulateMedia({reducedMotion:'reduce'});
 await page.addScriptTag({path:'/private/tmp/vh-accessibility/node_modules/axe-core/axe.min.js'});
 const layouts=[],accessibility=[];
 for(const language of ['en','ro']) {
  if(language==='ro'){await page.setViewportSize({width:390,height:844});await page.locator('.mobileMenuToggle').click();await page.locator('.mobileMenu .languageSwitch button').last().click();}
  for(const width of [320,390,768,1024,1440]) {
   await page.setViewportSize({width,height:1000});
   for(const expanded of [false,true]) {
    for(const group of await page.locator('.skillGroup').all()){if(await group.evaluate(n=>n.open)!==expanded)await group.locator('summary').click();}
    layouts.push(await page.evaluate(()=>({language:document.documentElement.lang,width:innerWidth,expanded:[...document.querySelectorAll('.skillGroup')].every(n=>n.open),overflow:document.documentElement.scrollWidth>innerWidth,textOverflow:[...document.querySelectorAll('.skillGroup h4,.capabilityPreview li,.skillTools li,.resumeCardActions a,.resumeCardHeader h3,.resumeHeader p')].filter(n=>n.getClientRects().length&&n.scrollWidth>n.clientWidth+1).map(n=>n.textContent),grids:[getComputedStyle(document.querySelector('.skillGroups')).gridTemplateColumns,getComputedStyle(document.querySelector('.resumeGrid')).gridTemplateColumns]})));
    if(width===390||width===1440)accessibility.push({language,width,expanded,violations:await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}});return r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}));})});
   }
  }
 }
 const counts=await page.locator('.skillGroup').evaluateAll(ns=>ns.map(n=>({capabilities:n.querySelectorAll('.capabilityPreview li').length,tools:n.querySelectorAll('.skillTools li').length})));
 const first=page.locator('.skillGroup').first();await first.locator('summary').focus();const before=await first.evaluate(n=>n.open);await page.keyboard.press('Enter');const keyboard=await first.evaluate(n=>n.open)!==before;
 const pdfs=[],downloads=[];
 for(const card of await page.locator('.resumeCard').all()) {
  const href=await card.locator('.resumeOpen').getAttribute('href');const r=await page.request.get('http://127.0.0.1:3100'+href);const bytes=await r.body();pdfs.push({href,status:r.status(),signature:bytes.slice(0,4).toString()});
  const [download]=await Promise.all([page.waitForEvent('download'),card.locator('.resumeDownload').click()]);downloads.push({name:download.suggestedFilename(),failure:await download.failure()});
  const [popup]=await Promise.all([page.waitForEvent('popup'),card.locator('.resumeOpen').click()]);await popup.waitForLoadState('domcontentloaded');pdfs[pdfs.length-1].opens=popup.url().includes(href.split('?')[0]);await popup.close();
 }
 await page.locator('.resumePreview img').evaluateAll(async ns=>Promise.all(ns.map(n=>n.decode())));
 await page.setViewportSize({width:390,height:844});await page.locator('.sideSkillsBlock').screenshot({path:'/private/tmp/capabilities-final-mobile.png'});
 await page.goto('http://127.0.0.1:3100/test');await page.setViewportSize({width:1440,height:1000});await page.locator('.sideSkillsBlock').screenshot({path:'/private/tmp/capabilities-final-desktop.png'});
 const order=await page.locator('.resumeCardHeader h3').allTextContents();
 await page.goto('http://127.0.0.1:3100/');const homepage={newCards:await page.locator('.resumeCard').count(),oldActions:await page.locator('.cvVersion').count(),oldPreviews:await page.locator('.cvPreviewLink').count(),skills:await page.locator('.skillGroup').count()};
 return {layoutStates:layouts.length,layoutFailures:layouts.filter(x=>x.overflow||x.textOverflow.length),accessibilityStates:accessibility.length,accessibilityFailures:accessibility.filter(x=>x.violations.length),counts,keyboard,pdfs,downloads,order,homepage,errors};
}
