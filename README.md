# ATVA Website

> Hivatalos bemutatkozó és ügyfélszerző weboldal: Pályázatírás · Projektmenedzsment · Céges Tanácsadás.

## Jellemzők / Features

- **Liquid Glass Design**: Prémium, Apple-ihlette vizes üveg textúra refrakciós élfényekkel és rétegzett mélységgel.
- **TidyFactor / Styler Animációk**: Finomhangolt, azonnali rugó-görbék (`cubic-bezier(0.16, 1, 0.3, 1)`), 8-állapotú interakciós mátrix és tapintható mikropresszió.
- **Kétnyelvű Rendszer (HU / EN)**:
  - Teljes magyar és angol nyelvű lokalizáció 79 egyedi felületi elemmel.
  - Automatikus böngészőnyelv-felismerés (`navigator.language`).
  - Gyors, újratöltés nélküli váltás szegmentált vezérlővel (`HU | EN`).
  - `localStorage` alapú állapotmegőrzés.
- **Mobil & Érintőképernyő Optimalizáció**:
  - Lekerekített folyékony üveg mobil navigációs fiók (`#mobileDrawer`) animált ikonváltóval.
  - iOS Safari automatikus zoom védelem (16px mezőméret).
  - Érintési célterületek $\ge 44\text{px}$.
  - Safe Area insets támogatás (notch, dynamic island).
- **Interaktív Kapcsolati Modul**: Valós idejű kliensoldali validáció, automatikus fókusz, vizuális visszajelzés és sikeres elküldési állapot.
- **Vercel & Git Ready**: Null-konfigurációs statikus kiszolgálás `vercel.json` biztonsági fejlécekkel.

## Telepítés & Helyi Futtatás / Local Setup

A weboldal tiszta, modern vanilla webtechnológiákkal készült (HTML5, CSS3, ES6+ JavaScript), így build-lépés nélkül bármilyen statikus szerverrel vagy közvetlenül böngészőből megnyitható:

```bash
# Egyszerű HTTP szerver indítása Python segítségével
python3 -m http.server 3000

# Vagy Vercel CLI segítségével
npx vercel dev
```

## Vercel Telepítés / Deployment

```bash
npx vercel --prod
```

## Licenc / Copyright

&copy; 2026 ATVA. Minden jog fenntartva.
