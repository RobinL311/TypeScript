/// <reference path='fourslash.ts' />

////[|declare namespace [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}N|] {
////    export var x: number;
////}|]
////declare module "mod" {
////    [|export = [|{| "declarationRangeIndex": 2 |}N|];|]
////}
////declare module "a" {
////    [|import * as [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 4 |}O|] from "mod";|]
////    [|export { [|{| "declarationRangeIndex": 6 |}O|] as [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 6 |}P|] };|] // Renaming N here would rename
////}
////declare module "b" {
////    [|import { [|{| "declarationRangeIndex": 9 |}P|] as [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 9 |}Q|] } from "a";|]
////    export const y: typeof [|Q|].x;
////}

verify.noErrors();

const ranges = test.rangesByText();
const nRanges = ranges.get("N");// [N0, N1];
const oRanges = ranges.get("O");// [O0, O1];
const pRanges = ranges.get("P");//[P0, P1];
const qRanges = ranges.get("Q");//[Q0, Q1];

const ns = { definition: "namespace N", ranges: nRanges };
const os = { definition: "(alias) namespace O\nimport O", ranges: oRanges };
const ps = { definition: "(alias) namespace P\nexport P", ranges: pRanges };
const qs = { definition: "(alias) namespace Q\nimport Q", ranges: qRanges };

verify.referenceGroups(nRanges, [ns, os, ps, qs]);
verify.referenceGroups(oRanges, [os, ps, qs]);
verify.referenceGroups(pRanges, [ps, qs]);
verify.referenceGroups(qRanges, [qs]);

verify.rangesAreRenameLocations(nRanges);
verify.rangesAreRenameLocations(oRanges);
verify.rangesAreRenameLocations(pRanges);
verify.rangesAreRenameLocations(qRanges);
