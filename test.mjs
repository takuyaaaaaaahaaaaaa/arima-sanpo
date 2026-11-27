import test from 'node:test';import assert from 'node:assert/strict';import {prepareGraph,shortestPath,computeWalk} from './routing.js';
const raw={nodes:{a:[34.797,135.247],b:[34.797,135.248],c:[34.798,135.248],d:[34.798,135.247],x:[34.81,135.26]},edges:[['a','b',100,false],['b','c',100,false],['a','d',80,true],['d','c',100,true]]};const g=prepareGraph(raw);
test('walking route prefers a longer step-free route and returns road geometry',()=>{const p=shortestPath(g,'a','c');assert.equal(p.distance,200);assert.equal(p.coordinates.length,3);});
test('disconnected paths are rejected instead of straight line fallback',()=>assert.throws(()=>shortestPath(g,'a','x'),/つながって/));
test('out of area start is rejected',()=>assert.throws(()=>computeWalk(g,{lat:35,lng:135},{lat:34.797,lng:135.247},[{id:'s',lat:34.798,lng:135.248}],60),/近くに/));
test('time budget includes stop time and flags excess',()=>{const p=computeWalk(g,{id:'a',lat:34.797,lng:135.247},{id:'a',lat:34.797,lng:135.247},[{id:'c',lat:34.798,lng:135.248}],5);assert.equal(p.distance,400);assert.equal(p.totalMinutes,p.walkMinutes+10);assert(p.overBudget);});
