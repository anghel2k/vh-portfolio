async page => {
  const base = 'http://127.0.0.1:3100';
  const errors = [], badResponses = [], layouts = [], axeChecks = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if(r.status() >= 400 && !r.url().endsWith('/missing-page-audit')) badResponses.push({url:r.url(),status:r.status()}); });
  await page.emulateMedia({reducedMotion:'reduce'});
  const widths = [320,360,390,700,701,768,1024,1366,1440,1920];
  for(const route of ['/', '/test']) {
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(base + route);
    for(const language of ['en','ro']) {
      await page.setViewportSize({width:1440,height:1000});
      await page.locator('.headerActions .languageSwitch button').nth(language==='en'?0:1).click();
      for(const width of widths) {
        await page.setViewportSize({width,height:width===1366?768:900});
        layouts.push(await page.evaluate(() => {
          const copy=document.querySelector('.constellationCopy').getBoundingClientRect();
          const overlaps=[...document.querySelectorAll('.constellationSlot')].filter(n=>{
            const r=n.getBoundingClientRect(); return r.left<copy.right&&r.right>copy.left&&r.top<copy.bottom&&r.bottom>copy.top;
          }).map(n=>n.className);
          const overflowingText=[...document.querySelectorAll('h1,h2,h3,p,dt,dd,footer a')].filter(n=>n.getClientRects().length&&n.scrollWidth>n.clientWidth+2&&getComputedStyle(n).overflow==='visible').map(n=>n.className||n.tagName);
          return {route:location.pathname,language:document.documentElement.lang,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,overlaps,overflowingText,projects:document.querySelectorAll('.constellationProject').length};
        }));
        if(width===390||width===1440) {
          await page.addScriptTag({path:'/private/tmp/vh-accessibility/node_modules/axe-core/axe.min.js'});
          const violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));
          axeChecks.push({route,language,width,violations});
        }
      }
    }
  }
  const legalLayouts=[];
  for(const route of ['/terms','/termeni']) {
    await page.goto(base+route);
    for(const width of widths) {
      await page.setViewportSize({width,height:900});
      legalLayouts.push(await page.evaluate(()=>({route:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,textOverflow:[...document.querySelectorAll('h1,h2,p,a')].filter(n=>n.getClientRects().length&&n.scrollWidth>n.clientWidth+2).map(n=>n.textContent.slice(0,60)),h1:document.querySelectorAll('h1').length,sections:document.querySelectorAll('article>section').length,company:document.body.textContent.includes('49709618')&&document.body.textContent.includes('J2024000739135')})));
      if(width===390||width===1440) {
        await page.addScriptTag({path:'/private/tmp/vh-accessibility/node_modules/axe-core/axe.min.js'});
        axeChecks.push({route,width,violations:await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})))});
        await page.screenshot({path:`/private/tmp/vh-legal-${route.slice(1)}-${width}.png`});
      }
    }
    await page.locator('.legalContents a[href="#usage"]').click();
    if(!page.url().endsWith('#usage')) throw Error('Legal anchor did not navigate');
  }
  const r404=await page.goto(base+'/missing-page-audit');
  const notFound={status:r404.status(),homeLink:await page.locator('a[href="/"]').count()};
  const browser=page.context().browser();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});
  const staticPage=await nojs.newPage();await staticPage.goto(base+'/');
  const progressive=await staticPage.evaluate(()=>({h1:!!document.querySelector('h1'),projects:document.querySelectorAll('.constellationPicture').length,emails:document.querySelectorAll('a[href^="mailto:"]').length}));
  await staticPage.goto(base+'/terms');progressive.legalSections=await staticPage.locator('article>section').count();await nojs.close();
  await page.setViewportSize({width:1440,height:1000}); await page.goto(base+'/');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.locator('.clientLogoRail').scrollIntoViewIfNeeded();await page.waitForTimeout(300);
  const before=await page.locator('.clientLogoTrack').evaluate(n=>getComputedStyle(n).transform);await page.waitForTimeout(250);
  const ribbon={noPauseButton:await page.locator('.clientLogoPause').count()===0,moving:before!==await page.locator('.clientLogoTrack').evaluate(n=>getComputedStyle(n).transform)};
  await page.emulateMedia({reducedMotion:'reduce'});
  ribbon.reduced=await page.locator('.clientLogoTrack').evaluate(n=>getComputedStyle(n).animationName==='none');
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'/private/tmp/vh-after-hero-desktop.png'});
  await page.setViewportSize({width:390,height:844}); await page.screenshot({path:'/private/tmp/vh-after-hero-mobile.png'});
  await page.locator('.mobileMenuToggle').click();await page.locator('.mobileMenu .workNav').click();
  const mobileMenu={closed:await page.locator('.mobileMenu').count()===0,hash:await page.evaluate(()=>location.hash)};
  return {layoutStates:layouts.length,layoutFailures:layouts.filter(x=>x.overflow||x.overlaps.length||x.overflowingText.length||x.projects!==6),legalStates:legalLayouts.length,legalFailures:legalLayouts.filter(x=>x.overflow||x.textOverflow.length||x.h1!==1||x.sections!==6||!x.company),axeStates:axeChecks.length,axeFailures:axeChecks.filter(x=>x.violations.length),notFound,progressive,ribbon,mobileMenu,errors,badResponses};
}
