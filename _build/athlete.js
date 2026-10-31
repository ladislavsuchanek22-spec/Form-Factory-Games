<script>
(function(){
  function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch(e){return null;}}
  function ga(n,p){if(window.gtag)try{gtag('event',n,p||{});}catch(e){}}
  var pad=function(n){return (n<10?'0':'')+n;};

  /* odpočet do startu */
  var cd=document.querySelector('.cdown');
  if(cd){
    var T=new Date(cd.dataset.t).getTime();
    var u=function(k,v){cd.querySelector('[data-u="'+k+'"]').textContent=pad(v);};
    var tick=function(){
      var s=Math.floor((T-Date.now())/1000);
      if(s<=0){cd.hidden=true;return false;}
      cd.hidden=false;
      u('d',Math.floor(s/86400));u('h',Math.floor(s%86400/3600));u('m',Math.floor(s%3600/60));u('s',s%60);
      return true;
    };
    if(tick())setInterval(tick,1000);
  }

  /* moje kategorie -> zátěže ve workoutech a v tabulce */
  var cp=document.querySelectorAll('.cp button');
  function setCat(i,save){
    cp.forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.cat===i));});
    document.querySelectorAll('.wt').forEach(function(e){e.textContent=i<0?'':e.dataset.w.split('|')[i];});
    document.querySelectorAll('#zateze tr').forEach(function(r){
      [].forEach.call(r.children,function(c,j){c.classList.toggle('sel',i>=0&&j===i+1);});
    });
    document.body.classList.toggle('has-cat',i>=0);
    if(save){ls('ffg-cat',String(i));ga('select_category',{category:['WO','WP','MO','MP'][i]});}
  }
  cp.forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.cat; setCat(b.getAttribute('aria-pressed')==='true'?-1:i,true);
  });});
  var saved=parseInt(ls('ffg-cat'),10); if(saved>=0&&saved<4)setCat(saved,false);

  /* W2 AMRAP: skóre a tempo na kolo */
  var am=document.querySelector('.amcalc');
  if(am){
    var r=am.querySelector('.am-r'),x=am.querySelector('.am-x');
    var up=function(){
      var R=Math.max(0,parseInt(r.value,10)||0),X=Math.min(49,Math.max(0,parseInt(x.value,10)||0));
      var s=R*50+X; am.querySelector('.am-s').textContent=s;
      var p=s?Math.round(360/(s/50)):0;
      am.querySelector('.am-p').textContent=s?Math.floor(p/60)+':'+pad(p%60):'–';
    };
    r.addEventListener('input',up);x.addEventListener('input',up);up();
  }

  /* kalkulačka bodů: 100 × (N − r) / (N − 1) */
  var calc=document.querySelector('.calc');
  if(calc){
    var inps=calc.querySelectorAll('input');
    var pts=function(N,rk){rk=Math.min(N,Math.max(1,rk||1));return 100*(N-rk)/(N-1);};
    var run=function(){
      var N=Math.min(100,Math.max(2,parseInt(calc.querySelector('[data-c="n"]').value,10)||2));
      var avg=function(w){var a=calc.querySelectorAll('[data-c="'+w+'"]'),s=0;a.forEach(function(i){s+=pts(N,parseFloat(i.value));});return s/a.length;};
      var w1=avg('1'),w2=avg('2'),w3=avg('3');
      var o=function(k,v){calc.querySelector('[data-r="'+k+'"]').textContent=v.toFixed(2).replace('.',document.documentElement.lang==='en'?'.':',');};
      o('1',w1);o('2',w2);o('3',w3);o('t',w1+w2+w3);
      inps.forEach(function(i){if(i.dataset.c!=='n')i.max=N;});
    };
    inps.forEach(function(i){i.addEventListener('input',run);});run();
  }

  /* starty do kalendáře (.ics) podle vlny a dráhy ve finderu */
  document.querySelectorAll('.finder').forEach(function(f){
    var btn=f.querySelector('.ics'); if(!btn)return;
    btn.addEventListener('click',function(){
      var g=function(k){return f.querySelector('[data-o="'+k+'"]').textContent.trim();};
      var wave=f.querySelector('.wi').value, lane=(f.querySelector('.seg [aria-pressed="true"]')||{}).dataset;
      lane=lane?lane.lane:'1';
      // 5. 12. 2026 je SEČ (UTC+1)
      var z=function(hm,add){var p=hm.split(':'),m=(+p[0])*60+(+p[1])+(add||0)-60;return '20261205T'+pad(Math.floor(m/60))+pad(m%60)+'00Z';};
      var esc=function(s){return s.replace(/[,;\\]/g,function(c){return '\\'+c;});};
      var loc=esc(btn.dataset.addr), word=f.dataset.waveWord; lane=btn.dataset.laneWord+' '+lane;
      var ev=[
        [btn.dataset.sraz,'09:30',15,''],
        ['W1 Power Grid',g('s1'),16,'Call-up '+g('c1')+' · '+word+' '+wave+' · '+lane],
        ['W2 The Engine',g('s2'),6,'Call-up '+g('c2')+' · '+g('w2n')],
        ['W3 Final Grind',g('s3'),16,'Call-up '+g('c3')+' · '+word+' '+wave+' · '+lane]
      ];
      var now=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
      var L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//formfactorygames.cz//FFG 2026//CS','CALSCALE:GREGORIAN'];
      ev.forEach(function(e,i){
        // call-up 8 min před startem -> připomínka 10 min předem
        L.push('BEGIN:VEVENT','UID:ffg2026-'+i+'-'+wave+'-'+lane.replace(/\D/g,'')+'@formfactorygames.cz','DTSTAMP:'+now,
          'DTSTART:'+z(e[1],i?-8:0),'DTEND:'+z(e[1],e[2]),
          'SUMMARY:'+esc('Form Factory Games · '+e[0]),'LOCATION:'+loc,
          'DESCRIPTION:'+esc((e[3]?e[3]+' · ':'')+'formfactorygames.cz'),
          'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+esc(e[0]),'TRIGGER:-PT10M','END:VALARM','END:VEVENT');
      });
      L.push('END:VCALENDAR');
      var blob=new Blob([L.join('\r\n')],{type:'text/calendar;charset=utf-8'});
      var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='form-factory-games-'+wave+'.ics';
      document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);
      ga('add_to_calendar',{wave:wave,lane:lane});
    });
  });

  /* checklist s uložením v prohlížeči */
  var ck=document.querySelector('.ck');
  if(ck){
    var boxes=ck.querySelectorAll('input[type=checkbox]');
    var st={};try{st=JSON.parse(ls('ffg-ck')||'{}')||{};}catch(e){}
    var draw=function(){
      var n=0;boxes.forEach(function(b){if(b.checked)n++;});
      ck.querySelector('.ck-n').textContent=n+' / '+boxes.length+' '+ck.dataset.of;
      ck.querySelector('.ck-bar i').style.width=(100*n/boxes.length)+'%';
      ck.querySelector('.ck-done').hidden=n<boxes.length;
    };
    boxes.forEach(function(b){
      b.checked=!!st[b.dataset.k];
      b.addEventListener('change',function(){st[b.dataset.k]=b.checked?1:0;ls('ffg-ck',JSON.stringify(st));draw();});
    });
    ck.querySelector('.ck-reset').addEventListener('click',function(){st={};ls('ffg-ck',null);boxes.forEach(function(b){b.checked=false;});draw();});
    draw();
  }
})();
</script>
