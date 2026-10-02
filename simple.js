// Visual shell only. Calendar calculations and persisted record keys remain in the original modules.
(() => {
  const ganzhiColors={
    甲:'#24934f',乙:'#24934f',寅:'#24934f',卯:'#24934f',
    丙:'#ed3217',丁:'#ed3217',巳:'#ed3217',午:'#ed3217',
    戊:'#d89a00',己:'#d89a00',辰:'#d89a00',戌:'#d89a00',丑:'#d89a00',未:'#d89a00',
    庚:'#3f7fe8',辛:'#3f7fe8',申:'#3f7fe8',酉:'#3f7fe8',
    壬:'#000',癸:'#000',亥:'#000',子:'#000'
  };
  const loginView=document.querySelector('#loginView');
  if(loginView){
    const SIGN_API_URL=window.SIGN_API_URL||'https://mopu.top/api/sign';
    const SEND_API_URL=window.SEND_API_URL||SIGN_API_URL.replace(/\/sign\/?$/,'/send');
    const LOGIN_PHONE_KEY='qiyuan-login-phone';
    const LOGIN_PRO_KEY='qiyuan-login-pro';
    document.body.classList.add('login-active');
    const form=loginView.querySelector('#loginForm');
    const phone=loginView.querySelector('#loginPhone');
    const code=loginView.querySelector('#loginCode');
    const send=loginView.querySelector('#sendLoginCode');
    const error=loginView.querySelector('#loginError');
    const validPhone=()=>/^1\d{10}$/.test(phone.value.trim());
    let remaining=0;
    let timer=0;
    const setError=(message='')=>{error.textContent=message;};
    const enterHome=()=>{
      document.body.classList.remove('login-active');
      loginView.classList.remove('active');
      document.querySelector('#homeView')?.classList.add('active');
      window.showView?.('home');
    };
    const loginBack=loginView.querySelector('#loginBack');
    const hasLoginPhone=()=>Boolean(localStorage.getItem(LOGIN_PHONE_KEY));
    loginBack.hidden=!hasLoginPhone();
    loginBack.addEventListener('click',()=>{if(hasLoginPhone())enterHome();});
    phone.addEventListener('input',()=>{phone.value=phone.value.replace(/\D/g,'').slice(0,11);setError();});
    code.addEventListener('input',()=>{code.value=code.value.replace(/\D/g,'').slice(0,6);setError();});
    send.addEventListener('click',async()=>{
      if(!validPhone()){setError('请输入正确的11位手机号');phone.focus();return;}
      if(remaining)return;
      send.disabled=true;send.textContent='发送中';setError('');
      try{
        const response=await fetch(SEND_API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone.value.trim()})});
        const payload=await response.json().catch(()=>({}));
        if(!response.ok || (payload.status!==undefined && Number(payload.status)!==200)){
          const message=typeof payload.message==='string'?payload.message:typeof payload.msg==='string'?payload.msg:'验证码发送失败';
          throw new Error(message);
        }
        remaining=60;send.textContent=`${remaining} 秒`;
        timer=window.setInterval(()=>{
          remaining-=1;
          send.textContent=remaining?`${remaining} 秒`:'重新获取';
          if(!remaining){window.clearInterval(timer);send.disabled=false;}
        },1000);
        setError('验证码已发送');code.focus();
      }catch(sendError){
        send.disabled=false;send.textContent='获取验证码';setError(sendError.message||'验证码发送失败');
      }
    });
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!validPhone()){setError('请输入正确的11位手机号');phone.focus();return;}
      if(!code.value.trim()){setError('请输入验证码');code.focus();return;}
      const submit=form.querySelector('.login-submit');
      submit.disabled=true;setError('正在登录…');
      try{
        const response=await fetch(SIGN_API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone.value.trim(),code:code.value.trim()})});
        const payload=await response.json().catch(()=>({}));
        if(!response.ok || (payload.status!==undefined && Number(payload.status)!==200))throw new Error(payload.msg||'登录失败');
        const loginData=[payload?.msg,payload?.data,payload].find(value=>value && typeof value==='object' && value.phone);
        const returnedPhone=loginData?.phone;
        if(!returnedPhone)throw new Error('登录接口未返回手机号');
        localStorage.setItem(LOGIN_PHONE_KEY,String(returnedPhone));
        const membership=Number(loginData?.pro);
        localStorage.setItem(LOGIN_PRO_KEY,membership===1||membership===2?String(membership):'0');
        loginBack.hidden=false;
        setError();enterHome();
      }catch(loginError){setError(loginError.message||'登录服务暂时无法连接');}
      finally{submit.disabled=false;}
    });
    if(hasLoginPhone())enterHome();
  }
  if(document.querySelector('#homeView')) {
    const home=document.querySelector('#homeView');
    const original=home.querySelector('.home-actions');
    original.className='simple-home';
    // Both entry marks share the same palette and geometry scale.
    const selfMark='<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false"><g class="symbol-lines"><path d="M0 65 C43 54 67 68 100 100 C133 132 157 146 200 135"/><path d="M0 135 C43 146 67 132 100 100 C133 68 157 54 200 65"/></g><circle class="symbol-center" cx="100" cy="100" r="9"/></svg>';
    const situationMark='<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false"><path class="symbol-lines" d="M66 10V190 M134 10V190 M10 66H190 M10 134H190"/><g class="symbol-dots"><circle cx="33" cy="33" r="3"/><circle cx="100" cy="33" r="3"/><circle cx="167" cy="33" r="3"/><circle cx="33" cy="100" r="3"/><circle cx="167" cy="100" r="3"/><circle cx="33" cy="167" r="3"/><circle cx="100" cy="167" r="3"/><circle cx="167" cy="167" r="3"/></g><circle class="symbol-center" cx="100" cy="100" r="9"/></svg>';
    original.innerHTML=`<h1 class="simple-home-title"><span>内观于心</span><i aria-hidden="true"></i><span>外观于事</span></h1><div class="simple-home-choices"><button class="simple-choice" id="openBazi" type="button"><span class="simple-symbol left">${selfMark}</span><strong>观己</strong></button><button class="simple-choice" id="openQimen" type="button"><span class="simple-symbol right">${situationMark}</span><strong>观局</strong></button></div>`;
    // Run before app-root.js binds existing entry IDs.
    const author=home.querySelector('#openAuthorModal');
    author.className='simple-author';
  }
  // Apply presentation after each Qimen/calendar render, including hour changes.
  for(const result of document.querySelectorAll('#qimenResult,#calendarResult')){
    const formatResult=()=>{
      const note=result.querySelector('.qimen-footnote');
      if(note && !note.children.length){
        const items=note.textContent.trim().split(/\s*(?=空亡：|马星：)/);
        note.replaceChildren(...items.map(text=>{
          const item=document.createElement('span');item.textContent=text.trim();return item;
        }));
      }
      result.querySelectorAll('.sizhu-table td').forEach(cell=>{
        const text=cell.textContent.trim();
        cell.classList.toggle('simple-water',/^[壬癸亥子]$/.test(text));
        if(ganzhiColors[text])cell.style.color=ganzhiColors[text];
      });
    };
    new MutationObserver(formatResult).observe(result,{childList:true});
    formatResult();
  }
  if(document.querySelector('#resultArea')) {
    const nav=document.createElement('nav');
    nav.className='simple-fortune-nav';nav.setAttribute('aria-label','盘面与运程');
    nav.innerHTML='<button type="button" data-mode="base" aria-pressed="true">原局</button><button type="button" data-mode="luck" aria-pressed="false">大运</button><button type="button" data-mode="year" aria-pressed="false">流年</button>';
    document.body.append(nav);
    nav.addEventListener('click',e=>{
      const button=e.target.closest('[data-mode]');if(!button)return;
      if(button.dataset.mode==='base')removePillarLevel(1);
      const target=button.dataset.mode==='base'?document.querySelector('.chart-card'):document.querySelector(button.dataset.mode==='luck'?'#luckStrip':'#yearStrip').closest('.fortune-tier');
      nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
    document.querySelector('.fortune-card').addEventListener('click',e=>{
      const b=e.target.closest('[data-type]');if(!b)return;
      const selected=[...document.querySelectorAll('.timeline-item.active')].some(x=>x.dataset.type===b.dataset.type && x.dataset.key===b.dataset.key);
      if(!selected)return;
      const mode=b.dataset.type==='luck'?'luck':'year';
      nav.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.mode===mode)));
    });
    new MutationObserver(()=>{
      const labels=[...document.querySelectorAll('#baziGrid .pillar-label')].map(x=>x.textContent);
      const mode=labels.includes('流年')?'year':labels.includes('大运')?'luck':'base';
      document.querySelector('.chart-card')?.classList.toggle('has-added-pillars',labels.length>4);
      document.querySelector('.chart-card')?.classList.toggle('has-eight-pillars',labels.length===8 && labels.includes('流日'));
      nav.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.mode===mode)));
      document.querySelectorAll('#monthStrip button').forEach(x=>{x.disabled=!labels.includes('流年');x.title=x.disabled?'请先选择流年':'';});
      document.querySelectorAll('#dayStrip button').forEach(x=>{x.disabled=!labels.includes('流月');x.title=x.disabled?'请先选择流月':'';});
    }).observe(document.querySelector('#baziGrid'),{childList:true});
  }
  // Archive navigation shares the existing record stores; no new storage keys.
  const history=document.querySelector('#queryPage') || document.querySelector('#queryView .query-page');
  if(history){
    const isBazi=!!document.querySelector('#queryPage');
    const tabs=document.createElement('nav');tabs.className='simple-history-tabs';tabs.setAttribute('aria-label','存档类型');
    tabs.innerHTML=`<button type="button" data-kind="bazi" aria-pressed="${isBazi}">观己</button><span aria-hidden="true">│</span><button type="button" data-kind="qimen" aria-pressed="${!isBazi}">观局</button>`;
    history.prepend(tabs);
    tabs.addEventListener('click',e=>{
      const button=e.target.closest('[data-kind]');if(!button)return;
      if((button.dataset.kind==='bazi')===isBazi)return;
      if(isBazi && window.parent!==window){window.parent.showView('query');}
      else if(!isBazi){
        window.showView('bazi');
        const target=document.querySelector('#baziView iframe');
        if(typeof target.contentWindow.openQueryPage==='function')target.contentWindow.openQueryPage();
      }
    });
    const title=history.querySelector(isBazi?'.query-backbar':'.query-head');
    const select=history.querySelector(isBazi?'#toggleQuerySelect':'#selectArchiveMode');
    if(select)title.append(select);
    const del=history.querySelector(isBazi?'#queryDeleteTop':'#deleteArchive');
    const footer=document.createElement('div');footer.className='simple-history-footer';
    footer.append(del);
    history.append(footer);
    const status=document.createElement('span');status.setAttribute('aria-live','polite');footer.append(status);
    const list=history.querySelector(isBazi?'#queryList':'#archiveList');
    const update=()=>{const count=list.querySelectorAll(isBazi?'.query-item.selected':'tr.selected').length;status.textContent=`已选择 ${count} 项`;del.disabled=count===0;};
    new MutationObserver(update).observe(list,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});update();
  }
})();
