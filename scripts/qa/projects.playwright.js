async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle'});
 await page.setViewportSize({width:1440,height:1000});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addScriptTag({path:'/private/tmp/vh-accessibility/node_modules/axe-core/axe.min.js'});
 await page.locator('#framebreed-studio .projectDirectoryToggleRow button').click();
 await page.locator('#digitalstage .projectDirectoryToggleRow button').click();
 const ids=await page.locator('.projectDirectory .projectGridCard').evaluateAll(ns=>ns.map(n=>n.dataset.project));
 const layouts=[],accessibility=[],interactions=[];
 for(const lang of ['en','ro']){
  await page.locator('.languageSwitch button').nth(lang==='en'?0:1).click();
  for(const id of ids){
   const opener=page.locator('.projectDirectory [data-project="'+id+'"]');await opener.click();
   for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:1000});
    const layout=await page.locator('.projectDetail').evaluate(n=>({overflow:n.scrollWidth>n.clientWidth+1,bad:[...n.querySelectorAll('h2,h3,.projectWorkRecord li,.projectQuickFacts dd,.projectCredits dd,.projectContext')].filter(x=>x.scrollWidth>x.clientWidth+1).map(x=>x.className||x.tagName),tasks:n.querySelectorAll('.projectWorkRecord li').length,credits:n.querySelectorAll('.projectCredits dt').length}));
    layouts.push({lang,id,width,...layout});
    if(width===390||width===1440){const v=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}});return r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}));});accessibility.push({lang,id,width,violations:v});}
   }
   if(lang==='en'){
    await page.locator('.projectCloseButton').focus();await page.keyboard.press('Shift+Tab');const trap=await page.evaluate(()=>!!document.activeElement.closest('.projectDetail'));
    await page.locator('.projectMediaPreview').first().click();const nested=await page.evaluate(()=>!!document.activeElement.closest('.projectMediaLightbox'));
    await page.keyboard.press('Escape');const mediaReturn=await page.evaluate(()=>!!document.activeElement.closest('.projectMediaPreview'));
    await page.locator('.projectCaseNavigation button').last().click();const next=await page.locator('#project-detail-title').textContent();const reset=await page.locator('.projectDetail').evaluate(n=>n.scrollTop===0);await page.locator('.projectCaseNavigation button').first().click();
    await page.keyboard.press('Escape');const restored=await opener.evaluate(n=>document.activeElement===n);interactions.push({id,trap,nested,mediaReturn,next,reset,restored});
   }else await page.keyboard.press('Escape');
  }
 }
 return {layoutStates:layouts.length,layoutFailures:layouts.filter(x=>x.overflow||x.bad.length||!x.tasks||!x.credits),accessibilityStates:accessibility.length,accessibilityFailures:accessibility.filter(x=>x.violations.length),interactions,errors,inert:await page.locator('[inert]').count()};
}
