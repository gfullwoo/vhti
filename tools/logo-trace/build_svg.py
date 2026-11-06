import pickle
d = pickle.load(open('traced.pkl', 'rb'))
out, X0, Y0, S = d['out'], d['X0'], d['Y0'], d['S']

def P(pt):
    return (pt.x / S + X0, pt.y / S + Y0)

def path_d(plist):
    parts = []
    for curve in plist:
        sx, sy = P(curve.start_point)
        parts.append(f"M{sx:.2f} {sy:.2f}")
        for seg in curve.segments:
            if seg.is_corner:
                cx, cy = P(seg.c)
                ex, ey = P(seg.end_point)
                parts.append(f"L{cx:.2f} {cy:.2f}L{ex:.2f} {ey:.2f}")
            else:
                c1x, c1y = P(seg.c1); c2x, c2y = P(seg.c2); ex, ey = P(seg.end_point)
                parts.append(f"C{c1x:.2f} {c1y:.2f} {c2x:.2f} {c2y:.2f} {ex:.2f} {ey:.2f}")
        parts.append("Z")
    return "".join(parts)

allpts = []
for name in out:
    for curve in out[name]:
        allpts.append(P(curve.start_point))
        for seg in curve.segments:
            allpts.append(P(seg.end_point))
xs = [p[0] for p in allpts]; ys = [p[1] for p in allpts]
print('bbox', min(xs), max(xs), min(ys), max(ys))
pickle.dump({'charcoal': path_d(out['charcoal']), 'sage': path_d(out['sage']),
             'bbox': (min(xs), min(ys), max(xs), max(ys))}, open('paths.pkl', 'wb'))
print('charcoal d length', len(path_d(out['charcoal'])), 'sage d length', len(path_d(out['sage'])))
