async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3100/test');await page.emulateMedia({reducedMotion:'reduce'});
 await page.addScriptTag({path:'/private/tmp/vh-accessibility/node_modules/axe-core/axe.min.js'});
 const layouts=[],accessibility=[];
 for(const language of ['en','ro']) {
  if(language==='ro'){await page.setViewportSize({width:390,height:844});await page.locator('.mobileMenuToggle').click();await page.locator('.mobileMenu .languageSwitch button').last().click();}
  for(const width of [320,390,768,1024,1440]) {
   await page.setViewportSize({width,height:1000});
   layouts.push(await page.locator('.companyPanel').evaluateAll(ns=>ns.map(n=>({width:innerWidth,language:document.documentElement.lang,company:n.dataset.company,pageOverflow:document.documentElement.scrollWidth>innerWidth,panelOverflow:n.scrollWidth>n.clientWidth+1,textOverflow:[...n.querySelectorAll('h3,p,strong,time,button')].filter(el=>el.getClientRects().length&&el.scrollWidth>el.clientWidth+1).map(el=>el.textContent)}))));
   if(width===390||width===1440)accessibility.push({language,width,violations:await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}});return r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}));})});
  }
 }
 const fb=page.locator('.companyPanel[data-company=framebreed]');
 await fb.locator('.companyMilestones button').first().focus();await page.keyboard.press('Enter');
 const previous={pressed:await fb.locator('.companyMilestones button').first().getAttribute('aria-pressed'),scope:await fb.locator('.companyScope').textContent()};
 await fb.locator('.companyMilestones button').last().click();const current=await fb.locator('.companyMilestones button').last().getAttribute('aria-pressed');
 const flows=[];
 for(const company of ['framebreed','digitalstage','veliumin','tranding']) {
  const panel=page.locator('.companyPanel[data-company='+company+']');
  for(let i=0;i<3;i++) {await panel.locator('.companyWorkflow button').nth(i).click();flows.push({company,i,expanded:await panel.locator('.companyWorkflow button').nth(i).getAttribute('aria-expanded'),text:await panel.locator('.companyWorkflowDetail').textContent()});}
  await panel.locator('.companyWorkflow button').last().click();
  await panel.locator('.companyMore summary').focus();await page.keyboard.press('Enter');
  flows.push({company,disclosure:await panel.locator('.companyMore').evaluate(n=>n.open&&n.querySelector('p').getBoundingClientRect().height>0)});
  await panel.locator('.companyMore summary').click();
 }
 const stages=await page.locator('.companyPanel').evaluateAll(ns=>ns.map(n=>({company:n.dataset.company,count:n.querySelectorAll('.companyMilestones li').length,period:n.querySelector('.companyPeriod').textContent})));
 const expandedAxe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}});return r.violations.map(v=>v.id);});
 await page.setViewportSize({width:390,height:844});await fb.screenshot({path:'/private/tmp/company-final-mobile.png'});
 await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});
 await page.reload();await page.locator('.companyPanel[data-company=digitalstage]').scrollIntoViewIfNeeded();
 await page.locator('.companyPanel[data-company=digitalstage]').evaluate(async el=>Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished)));
 await page.locator('.companyPanel[data-company=digitalstage]').screenshot({path:'/private/tmp/company-final-ds.png'});
 await page.locator('#experience').scrollIntoViewIfNeeded();await page.screenshot({path:'/private/tmp/company-timeline-final.png'});
 const reveal=await page.locator('.companyPanel[data-company=digitalstage]').evaluate(el=>el.classList.contains('isRevealed'));
 await page.locator('#framebreed-studio [data-project=raye]').first().click();const project=await page.locator('.projectDetail').isVisible();await page.keyboard.press('Escape');
 await page.goto('http://127.0.0.1:3100/');
 const homepage={newPanels:await page.locator('.companyPanel').count(),originalHeaders:await page.locator('.careerHeader').count()};
 return {layoutStates:layouts.flat().length,layoutFailures:layouts.flat().filter(x=>x.pageOverflow||x.panelOverflow||x.textOverflow.length),accessibilityStates:accessibility.length,accessibilityFailures:accessibility.filter(x=>x.violations.length),previous,current,flows,stages,expandedAxe,reveal,project,homepage,errors};
}
