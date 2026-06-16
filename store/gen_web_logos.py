#!/usr/bin/env python3
"""
デコボコカンパニー — Webサイト用ロゴ各種生成
全ピースバージョン（T字レイアウト）を各フォーマットで出力する

出力:
  public/favicon.png              64×64  ブラウザタブアイコン
  store/img/logo_circle_512.png  512×512 高解像度汎用
  store/img/logo_circle_192.png  192×192 PWA/各所汎用
  store/img/logo_horizontal.png  横長・透明背景 ヘッダー/バナー用
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

BASE    = os.path.dirname(os.path.abspath(__file__))
HP_ROOT = os.path.dirname(BASE)                        # company-hp/
IMG_DIR = os.path.join(BASE, "img")
PUB_DIR = os.path.join(HP_ROOT, "public")

FJB = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FB  = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

DEKO_C = (255,  95,  95, 255)
BOKO_C = ( 48, 200, 190, 255)
COMP_C = (100,  60, 190, 255)
WHITE  = (255, 255, 255, 255)

def fnt(path, size):
    try:    return ImageFont.truetype(path, size)
    except: return ImageFont.load_default()

def _piece(d, x1, x2, y1, y2, bump_r, rad, color,
           left_notch=False, right_bump=False,
           bottom_bump_xs=None, top_notch_xs=None):
    vmid = (y1 + y2) // 2
    d.rounded_rectangle([x1, y1, x2, y2], radius=rad, fill=color)
    if right_bump:
        d.ellipse([x2-bump_r, vmid-bump_r, x2+bump_r, vmid+bump_r], fill=color)
    if left_notch:
        d.ellipse([x1-bump_r, vmid-bump_r, x1+bump_r, vmid+bump_r], fill=(0,0,0,0))
    for bx in (bottom_bump_xs or []):
        d.ellipse([bx-bump_r, y2-bump_r, bx+bump_r, y2+bump_r], fill=color)
    for tx in (top_notch_xs or []):
        d.ellipse([tx-bump_r, y1-bump_r, tx+bump_r, y1+bump_r], fill=(0,0,0,0))

def draw_piece(img, x1, x2, y1, y2, bump_r, rad, color,
               left_notch=False, right_bump=False,
               bottom_bump_xs=None, top_notch_xs=None):
    lay = Image.new("RGBA", img.size, (0,0,0,0))
    _piece(ImageDraw.Draw(lay), x1, x2, y1, y2, bump_r, rad, color,
           left_notch, right_bump, bottom_bump_xs, top_notch_xs)
    img.alpha_composite(lay)

def draw_shadow(img, x1, x2, y1, y2, bump_r, rad, color,
                right_bump=False, bottom_bump_xs=None,
                blur=16, offset=10, alpha=55):
    sc   = (color[0]//3, color[1]//3, color[2]//3, alpha)
    vmid = (y1 + y2) // 2
    o    = offset
    lay  = Image.new("RGBA", img.size, (0,0,0,0))
    d    = ImageDraw.Draw(lay)
    d.rounded_rectangle([x1+o, y1+o, x2+o, y2+o], radius=rad, fill=sc)
    if right_bump:
        d.ellipse([x2-bump_r+o, vmid-bump_r+o, x2+bump_r+o, vmid+bump_r+o], fill=sc)
    for bx in (bottom_bump_xs or []):
        d.ellipse([bx-bump_r+o, y2-bump_r+o, bx+bump_r+o, y2+bump_r+o], fill=sc)
    lay = lay.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(lay)

# ── 共通パラメータ計算 ──────────────────────────────────────────────────────
def _layout(S, jp_size, co_size, tpad_h, tpad_v, bump_r, rad):
    """各サイズのレイアウト座標を計算して返す"""
    dummy = ImageDraw.Draw(Image.new("RGBA", (1,1)))
    f_jp = fnt(FJB, jp_size)
    f_co = fnt(FB,  co_size)

    bb_d = dummy.textbbox((0,0), "デコ",    font=f_jp)
    bb_b = dummy.textbbox((0,0), "ボコ",    font=f_jp)
    bb_c = dummy.textbbox((0,0), "Company", font=f_co)

    dw = bb_d[2]-bb_d[0];  dh = bb_d[3]-bb_d[1]
    bw = bb_b[2]-bb_b[0]
    cw = bb_c[2]-bb_c[0];  ch = bb_c[3]-bb_c[1]

    ph1       = dh + tpad_v * 2
    dpw       = dw + tpad_h * 2
    bpw_solid = bw + tpad_h * 2
    bpw       = bump_r + bpw_solid
    row_w     = dpw + bpw

    dx1 = (S - row_w) // 2
    jx1 = dx1 + dpw
    jx2 = jx1 + bpw
    deko_cx = dx1 + dpw // 2
    boko_cx = jx1 + bump_r + bpw_solid // 2

    ph2  = bump_r + ch + tpad_v * 2
    cx1  = dx1;  cx2 = jx2

    total_h = ph1 + ph2
    top_y   = S // 2 - total_h // 2

    y1_r1 = top_y;        y2_r1 = top_y + ph1
    y1_r2 = y2_r1;        y2_r2 = y1_r2 + ph2
    r1cy  = (y1_r1 + y2_r1) // 2

    return dict(
        f_jp=f_jp, f_co=f_co,
        bb_d=bb_d, bb_b=bb_b, bb_c=bb_c,
        dw=dw, dh=dh, cw=cw, ch=ch,
        dx1=dx1, jx1=jx1, jx2=jx2,
        deko_cx=deko_cx, boko_cx=boko_cx,
        cx1=cx1, cx2=cx2,
        y1_r1=y1_r1, y2_r1=y2_r1,
        y1_r2=y1_r2, y2_r2=y2_r2,
        r1cy=r1cy, tpad_h=tpad_h,
        bump_r=bump_r, rad=rad,
    )

def _draw_all(img, L):
    """影＋ピース＋テキストを描画"""
    br = L['bump_r'];  rad = L['rad']

    draw_shadow(img, L['dx1'], L['jx1'], L['y1_r1'], L['y2_r1'], br, rad, DEKO_C,
                right_bump=True, bottom_bump_xs=[L['deko_cx']])
    draw_shadow(img, L['jx1'], L['jx2'], L['y1_r1'], L['y2_r1'], br, rad, BOKO_C,
                bottom_bump_xs=[L['boko_cx']])
    draw_shadow(img, L['cx1'], L['cx2'], L['y1_r2'], L['y2_r2'], br, rad, COMP_C)

    draw_piece(img, L['dx1'], L['jx1'], L['y1_r1'], L['y2_r1'], br, rad, DEKO_C,
               right_bump=True, bottom_bump_xs=[L['deko_cx']])
    draw_piece(img, L['jx1'], L['jx2'], L['y1_r1'], L['y2_r1'], br, rad, BOKO_C,
               left_notch=True, bottom_bump_xs=[L['boko_cx']])
    draw_piece(img, L['cx1'], L['cx2'], L['y1_r2'], L['y2_r2'], br, rad, COMP_C,
               top_notch_xs=[L['deko_cx'], L['boko_cx']])

    d = ImageDraw.Draw(img)
    d.text((L['dx1'] + L['tpad_h'] - L['bb_d'][0],
            L['r1cy'] - L['dh']//2 - L['bb_d'][1]),
           "デコ", font=L['f_jp'], fill=WHITE)
    d.text((L['jx1'] + br + L['tpad_h'] - L['bb_b'][0],
            L['r1cy'] - L['dh']//2 - L['bb_b'][1]),
           "ボコ", font=L['f_jp'], fill=WHITE)

    comp_cy = L['y1_r2'] + br + (L['ch'] + L['tpad_h']) // 2
    comp_tx = (L['cx1'] + L['cx2']) // 2 - L['cw'] // 2 - L['bb_c'][0]
    d.text((comp_tx, comp_cy - L['ch']//2 - L['bb_c'][1]),
           "Company", font=L['f_co'], fill=WHITE)

# ── 円形ロゴ ────────────────────────────────────────────────────────────────
def make_circle(size=1000):
    img = Image.new("RGBA", (size, size), (255,255,255,255))
    jp  = max(20, size * 120 // 1000)
    co  = max(12, size *  68 // 1000)
    ph  = max(4,  size *  44 // 1000)
    pv  = max(2,  size *  24 // 1000)
    br  = max(4,  size *  40 // 1000)
    rd  = max(2,  size *  24 // 1000)
    L   = _layout(size, jp, co, ph, pv, br, rd)
    _draw_all(img, L)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size-1, size-1], fill=255)
    img.putalpha(mask)
    return img

# ── 横長ロゴ（透明背景）────────────────────────────────────────────────────
def make_horizontal(pad=12):
    """横長ロゴ（透明背景・余白最小）"""
    S   = 1000
    img = Image.new("RGBA", (S, S), (0,0,0,0))
    L   = _layout(S, 100, 56, 36, 20, 34, 20)
    _draw_all(img, L)

    # ドロップシャドウ考慮で少しだけ余白を取る
    x0 = L['dx1'] - pad
    x1 = L['jx2'] + pad + 10   # shadow offset 分
    y0 = L['y1_r1'] - pad
    y1 = L['y2_r2'] + pad + 10
    return img.crop((x0, y0, x1, y1))

# ── 生成・保存 ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.makedirs(IMG_DIR, exist_ok=True)
    os.makedirs(PUB_DIR, exist_ok=True)

    # 高解像度ベース
    base = make_circle(1000)

    # 円形各サイズ
    for s, name in [(512, "logo_circle_512.png"), (192, "logo_circle_192.png")]:
        path = os.path.join(IMG_DIR, name)
        base.resize((s, s), Image.LANCZOS).save(path)
        print(f"✅  {name} ({s}×{s}px)")

    # ファビコン → public/
    fav_path = os.path.join(PUB_DIR, "favicon.png")
    base.resize((64, 64), Image.LANCZOS).save(fav_path)
    print(f"✅  favicon.png (64×64px) → public/")

    # 横長ロゴ（store/img 保存 + public/ にも配置）
    horiz = make_horizontal()
    w, h  = horiz.size
    horiz.save(os.path.join(IMG_DIR, "logo_horizontal.png"))
    horiz.save(os.path.join(PUB_DIR, "logo.png"))
    print(f"✅  logo_horizontal.png ({w}×{h}px) → store/img/ & public/")
