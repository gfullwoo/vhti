import pickle
p = pickle.load(open('paths.pkl', 'rb'))
x0, y0, x1, y1 = p['bbox']
pad = 4
vx, vy = round(x0 - pad, 1), round(y0 - pad, 1)
vw, vh = round(x1 - x0 + 2*pad, 1), round(y1 - y0 + 2*pad, 1)
CHAR, SAGE = '#2E2A26', '#5B6B5A'
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx} {vy} {vw} {vh}" role="img" aria-label="VHTI">
  <title>VHTI</title>
  <path fill="{SAGE}" fill-rule="evenodd" d="{p['sage']}"/>
  <path fill="{CHAR}" fill-rule="evenodd" d="{p['charcoal']}"/>
</svg>
'''
open('vhti-logo.svg', 'w').write(svg)
print('viewBox', vx, vy, vw, vh, 'bytes', len(svg))
