<script>
(function(){

  var W1=600, W2=750, W3=890, CALL=8;
  function fmt(m){var h=Math.floor(m/60),mm=m%60;return (h<10?'0':'')+h+':'+(mm<10?'0':'')+mm;}
  document.querySelectorAll('.finder').forEach(function(f){
    var inp=f.querySelector('.wi'), lane=1, word=f.dataset.waveWord;
    function o(k,v){f.querySelector('[data-o="'+k+'"]').textContent=v;}
    function upd(){
      var n=parseInt(inp.value,10); if(isNaN(n)) return;
      n=Math.min(25,Math.max(1,n));
      var k=(n-1)*4+lane, w2=Math.min(13,Math.ceil(k/8));
      var a=W1+(n-1)*4, b=W2+(w2-1)*8, c=W3+(n-1)*4;
      o('s1',fmt(a)); o('c1',fmt(a-CALL));
      o('s2',fmt(b)); o('c2',fmt(b-CALL)); o('w2n',word+' '+w2);
      o('s3',fmt(c)); o('c3',fmt(c-CALL));
    }
    function step(d){var n=parseInt(inp.value,10)||1;inp.value=Math.min(25,Math.max(1,n+d));upd();}
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
  });
})();
</script>