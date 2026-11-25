<script>
(function(){
  function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch(e){return null;}}
  function ga(n,p){if(window.gtag)try{gtag('event',n,p||{});}catch(e){}}
  var pad=function(n){return (n<10?'0':'')+n;};
  var LANG=document.documentElement.lang;

  /* Hybrid Challenge 5. 12. 2026: první vlna 9:30, nová vlna každých 5:30, 4:00 práce, call-up 6 min před startem */
  function fmt(s){var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return pad(h)+':'+pad(m)+(x?':'+pad(x):'');}
  var FIRST=9*3600+30*60, GAP=330, WORK=240, CALL=360, WAVES=10;

  /* kdy startuju */
  document.querySelectorAll('.finder').forEach(function(f){
    var inp=f.querySelector('.wi'), lane=1, word=f.dataset.waveWord, btn=f.querySelector('.ics');
    var laneWord=btn?btn.dataset.laneWord:'';
    function o(k,v){var e=f.querySelector('[data-o="'+k+'"]');if(e)e.textContent=v;}
    function upd(){
      var n=parseInt(inp.value,10); if(isNaN(n)) return;
      n=Math.min(WAVES,Math.max(1,n));
      var st=FIRST+(n-1)*GAP;
      for(var i=0;i<5;i++){o('s'+i,fmt(st+i*GAP));o('e'+i,fmt(st+i*GAP+WORK));}
      o('c',fmt(st-CALL)); o('f',fmt(st+4*GAP+WORK)); o('wv',word+' '+n); o('wn',laneWord+' '+lane);
    }
    function step(d){var n=parseInt(inp.value,10)||1;inp.value=Math.min(WAVES,Math.max(1,n+d));upd();}
    inp.addEventListener('input',upd);
    inp.addEventListener('change',function(){step(0);});
    f.querySelector('.wm').addEventListener('click',function(){step(-1);});
    f.querySelector('.wp').addEventListener('click',function(){step(1);});
    f.querySelectorAll('.seg button').forEach(function(b){
      b.addEventListener('click',function(){
        lane=parseInt(b.dataset.lane,10);
        f.querySelectorAll('.seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
        upd();
      });
    });
    upd();

    /* start do kalendáře (.ics) */
    if(btn)btn.addEventListener('click',function(){
      var n=Math.min(WAVES,Math.max(1,parseInt(inp.value,10)||1)), st=FIRST+(n-1)*GAP;
      // 5. 12. 2026 je SEČ (UTC+1)
      var z=function(s){s-=3600;return '20261205T'+pad(Math.floor(s/3600))+pad(Math.floor(s%3600/60))+pad(s%60)+'Z';};
      var esc=function(t){return t.replace(/[,;\\]/g,function(c){return '\\'+c;});};
      var loc=esc(btn.dataset.addr), ln=laneWord+' '+lane;
      var ev=[
        [btn.dataset.sraz,32400,33300,''],
        ['Hybrid Challenge',st-CALL,st+4*GAP+WORK,'Call-up '+fmt(st-CALL)+' · Start '+fmt(st)+' · '+word+' '+n+' · '+ln]
      ];
      var now=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
      var L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//formfactorygames.cz//FFHG 2026//'+LANG.toUpperCase(),'CALSCALE:GREGORIAN'];
      ev.forEach(function(e,i){
        L.push('BEGIN:VEVENT','UID:ffhg2026-'+i+'-'+n+'-'+lane+'@formfactorygames.cz','DTSTAMP:'+now,
          'DTSTART:'+z(e[1]),'DTEND:'+z(e[2]),
          'SUMMARY:'+esc('Form Factory Hybrid Games · '+e[0]),'LOCATION:'+loc,
          'DESCRIPTION:'+esc((e[3]?e[3]+' · ':'')+'formfactorygames.cz'),
          'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+esc(e[0]),'TRIGGER:-PT10M','END:VALARM','END:VEVENT');
      });
      L.push('END:VCALENDAR');
      var blob=new Blob([L.join('\r\n')],{type:'text/calendar;charset=utf-8'});
      var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='form-factory-hybrid-games-'+n+'.ics';
      document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);
      ga('add_to_calendar',{wave:n,lane:lane});
    });
  });

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

  /* moje kategorie -> kalorie a zátěže ve workoutu a v tabulce */
  var cp=document.querySelectorAll('.cp button');
  function setCat(i,save){
    cp.forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.cat===i));});
    document.querySelectorAll('.wt').forEach(function(e){e.textContent=i<0?'':e.dataset.w.split('|')[i];});
    document.querySelectorAll('.wn').forEach(function(e){var w=e.dataset.w.split('|');e.textContent=i<0?w.join('/'):w[i];});
    document.querySelectorAll('#zateze tr').forEach(function(r){
      [].forEach.call(r.children,function(c,j){c.classList.toggle('sel',i>=0&&j===i+1);});
    });
    if(save){ls('ffhg-cat',String(i));ga('select_category',{category:['W','M'][i]});}
  }
  cp.forEach(function(b){b.addEventListener('click',function(){
    var i=+b.dataset.cat; setCat(b.getAttribute('aria-pressed')==='true'?-1:i,true);
  });});
  var saved=parseInt(ls('ffhg-cat'),10); if(saved>=0&&saved<2)setCat(saved,false);

  /* kalkulačka bodů: 100 × (N − r) / (N − 1), součet 5 stanovišť */
  var calc=document.querySelector('.calc');
  if(calc){
    var inps=calc.querySelectorAll('input');
    var pts=function(N,rk){rk=Math.min(N,Math.max(1,rk||1));return 100*(N-rk)/(N-1);};
    var run=function(){
      var N=Math.min(40,Math.max(2,parseInt(calc.querySelector('[data-c="n"]').value,10)||2));
      var a=calc.querySelectorAll('[data-c="1"]'),s=0;
      a.forEach(function(i){s+=pts(N,parseFloat(i.value));i.max=N;});
      var o=function(k,v){calc.querySelector('[data-r="'+k+'"]').textContent=v.toFixed(2).replace('.',LANG==='en'?'.':',');};
      o('a',s/a.length);o('t',s);
    };
    inps.forEach(function(i){i.addEventListener('input',run);});run();
  }

  /* checklist s uložením v prohlížeči */
  var ck=document.querySelector('.ck');
  if(ck){
    var boxes=ck.querySelectorAll('input[type=checkbox]');
    var st={};try{st=JSON.parse(ls('ffhg-ck')||'{}')||{};}catch(e){}
    var draw=function(){
      var n=0;boxes.forEach(function(b){if(b.checked)n++;});
      ck.querySelector('.ck-n').textContent=n+' / '+boxes.length+' '+ck.dataset.of;
      ck.querySelector('.ck-bar i').style.width=(100*n/boxes.length)+'%';
      ck.querySelector('.ck-done').hidden=n<boxes.length;
    };
    boxes.forEach(function(b){
      b.checked=!!st[b.dataset.k];
      b.addEventListener('change',function(){st[b.dataset.k]=b.checked?1:0;ls('ffhg-ck',JSON.stringify(st));draw();});
    });
    ck.querySelector('.ck-reset').addEventListener('click',function(){st={};ls('ffhg-ck',null);boxes.forEach(function(b){b.checked=false;});draw();});
    draw();
  }
})();
</script>
