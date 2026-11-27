import fs from 'node:fs';
import assert from 'node:assert/strict';
const spots=JSON.parse(fs.readFileSync('data/spots.json'));
const photos=JSON.parse(fs.readFileSync('data/photos.json'));
assert.equal(new Set(spots.map(s=>s.id)).size,spots.length,'Duplicate IDs');
for(const s of spots){assert(s.id&&s.name&&s.sources.length&&s.checkedAt);assert(Array.isArray(s.categories)&&s.categories.length);assert(Array.isArray(s.menus));assert(s.yearEnd['2026-12-29']!==undefined);assert(s.yearEnd['2026-12-30']!==undefined);assert((s.lat===null&&s.lng===null)||(s.lat>34.78&&s.lat<34.82&&s.lng>135.22&&s.lng<135.28),`Invalid coordinates ${s.name}`);for(const m of s.menus)assert(m.price===null||Number.isFinite(m.price));for(const source of [...s.sources,...s.official])assert(/^https?:\/\//.test(typeof source==='string'?source:source.url));}
for(const list of Object.values(photos))for(const p of list){assert(p.author&&p.license&&p.source&&p.licenseUrl);assert(fs.existsSync(p.src));}
assert(fs.existsSync('data/walking-graph.json'));
console.log(`Validated ${spots.length} spots, ${Object.values(photos).flat().length} photo references. Static build ready.`);
