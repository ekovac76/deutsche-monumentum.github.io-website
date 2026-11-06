import os,difflib,sys
from html.parser import HTMLParser
class T(HTMLParser):
    def __init__(s): super().__init__(); s.o=[]; s.skip=0
    def handle_starttag(s,t,a):
        if t in('script','style'): s.skip+=1
        if t in('img','source','video'):
            for k,v in a:
                if k in('src','poster') and v: s.o.append(f'[{t}] '+v.split('?')[0].split('/')[-1][:60])
    def handle_endtag(s,t):
        if t in('script','style'): s.skip-=1
    def handle_data(s,d):
        if not s.skip and d.strip(): s.o.append(d.strip())
def txt(p):
    t=T(); t.feed(open(p,encoding='utf8').read()); return t.o
def alle(d):
    r=[]
    for w,_,fs in os.walk(d):
        r+= [os.path.relpath(os.path.join(w,f),d) for f in fs]
    return set(r)
for f in sorted(alle('json')|alle('cms')):
    if not f.endswith('.html'): continue
    if not (os.path.exists('json/'+f) and os.path.exists('cms/'+f)): print('NUR in', 'cms' if os.path.exists('cms/'+f) else 'json', f); continue
    d=[l for l in difflib.unified_diff(txt('json/'+f),txt('cms/'+f),lineterm='',n=0) if l[:1] in '+-' and not l.startswith(('+++','---'))]
    tx=[l for l in d if '[img]' not in l and '[source]' not in l and '[video]' not in l]
    if sorted(tx)==sorted(l[0].replace('+','#').replace('-','#')+l[1:] for l in tx) and sorted(l[1:] for l in tx if l[0]=='+')==sorted(l[1:] for l in tx if l[0]=='-'):
        print(f'== {f}: {len(d)-len(tx)} Bilder anders, Texte gleich' + (' (nur Reihenfolge)' if tx else ''))
    else:
        print(f'== {f}: {len(d)-len(tx)} Bilder anders, TEXT ANDERS:')
        for l in tx[:14]: print('   ',l[:160])
for d in ('json','cms'):
    print(d, sorted(x for x in os.listdir(d) if os.path.isdir(d+'/'+x)))
