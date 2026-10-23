<script>
/* Přihláška Judges & Crew: kontrola polí a odeslání přes Netlify Forms.
   Mimo formfactorygames.cz (náhled) se nic neodesílá. */
(function(){
  var f=document.querySelector('.crew-form'); if(!f) return;
  var msg=f.querySelector('.f-msg'), done=document.querySelector('.f-done');
  var live=/(^|\.)formfactorygames\.cz$|netlify\.app$/.test(location.hostname);
  function mark(el,bad){var box=el.closest('.opt,.chk,.fld,.fs')||el;box.classList.toggle('bad',bad);}
  function check(){
    var first=null;
    f.querySelectorAll('[required]').forEach(function(el){
      var ok;
      if(el.type==='radio'){ok=!!f.querySelector('input[name="'+el.name+'"]:checked');mark(el.closest('.fs'),!ok);}
      else if(el.type==='checkbox'){ok=el.checked;mark(el,!ok);}
      else{ok=el.checkValidity();mark(el,!ok);}
      if(!ok&&!first)first=el;
    });
    return first;
  }
  f.addEventListener('change',function(e){ if(f.dataset.tried) check(); });
  f.addEventListener('submit',function(e){
    e.preventDefault(); f.dataset.tried='1'; msg.hidden=true;
    var bad=check();
    if(bad){(bad.closest('.fs')||bad.closest('.fld')||bad.closest('.chk')||bad).scrollIntoView({block:'center'});try{bad.focus({preventScroll:true})}catch(_){}return;}
    var btn=f.querySelector('button[type=submit]'); btn.disabled=true;
    function ok(preview){
      f.hidden=true; done.hidden=false;
      if(preview){var p=done.querySelector('.f-prev');p.textContent=f.dataset.preview;p.hidden=false;}
      done.focus();
      if(window.gtag) gtag('event','generate_lead',{method:'crew_signup',role:(f.querySelector('input[name=role]:checked')||{}).value});
    }
    if(!live){ ok(true); return; }
    var data={}, order=[];  // víc zaškrtnutých hodnot jednoho pole -> "a, b"
    new FormData(f).forEach(function(v,k){ if(k in data){data[k]+=', '+v;} else {data[k]=v;order.push(k);} });
    var body=new URLSearchParams(order.map(function(k){return [k,data[k]];})).toString();
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body})
      .then(function(r){ if(!r.ok) throw r; ok(false); })
      .catch(function(){ btn.disabled=false; msg.textContent=f.dataset.err+' info@hyrox-czech.cz.'; msg.hidden=false; });
  });
})();
</script>
